# React Best Practices |

## Explicit Types

TypeScript can often infer a type without help — `useState(0)` already knows `count` is a `number`, no annotation needed. Explicit types earn their keep at **boundaries**: component props, function signatures, and anywhere data enters your app from the outside (an API response, `localStorage`, a form).

```ts
// ❌ whatever the API happens to send back, typed as `any`
const [posts, setPosts] = useState([]);
fetch("/api/posts")
  .then((res) => res.json())
  .then(setPosts);
// posts[0].titel — typo, no error, breaks silently at runtime

// ✅ the shape is written down once, and TypeScript checks every use of it
interface Post {
  id: number;
  title: string;
  body: string;
}

const [posts, setPosts] = useState<Post[]>([]);
fetch("/api/posts")
  .then((res) => res.json())
  .then((data: Post[]) => setPosts(data));
// posts[0].titel — red squiggly line, caught before it ships
```

The `Post` interface isn't just documentation — it's what makes `TodoItemProps`, `UseCountdownProps`, and every other `interface` in this course actually useful: a typo in a field name becomes a compile error instead of a silent `undefined` on screen.

### `unknown`, not `any`, when the shape isn't known yet

Some boundaries genuinely can't be typed up front — a `catch` block doesn't know what was thrown, `JSON.parse` doesn't know what it parsed. Reaching for `any` there feels harmless, but `any` doesn't just mean "unchecked here" — it spreads. Assign it to a variable, pass it to a function, spread it into an object, and everything that touches it becomes untyped too, silently, with no warning at the point it happens.

```ts
// ❌ `any` — TypeScript stops checking the moment it touches `error`
try {
  await savePost(post);
} catch (error: any) {
  console.log(error.message); // looks fine — but nothing checked `message` exists
}

// ✅ `unknown` — TypeScript forces you to check before you can use it
try {
  await savePost(post);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message); // safe — narrowed to Error first
  }
}
```

> 💡 The same spreading applies to components: spread an `any`-typed object into props (`<UserCard {...userData} />` where `userData` is `any`) and every prop on `UserCard` silently stops being checked, even the ones typed correctly in `UserCardProps`. One `any` at the boundary is enough to blind TypeScript to everything built on top of it.

### A closed set of values: union type or `as const` — not `enum`

Course 1 names `Difficulty` as an `enum`. Worth revisiting: `enum` is the one construct in this course that doesn't fully disappear at compile time — it emits a real runtime object, unlike every other type here. That's exactly what TypeScript 5.8's `--erasableSyntaxOnly` flag was built to catch, and current guidance steers new code toward one of two replacements instead, depending on whether the values are needed at runtime.

A **string union**, when a prop or variable just needs restricting to a fixed set of strings:

```ts
// ✅ disappears completely at compile time — zero runtime cost
type Difficulty = "EASY" | "MEDIUM" | "HARD";

interface ChallengeCardProps {
  title: string;
  difficulty: Difficulty;
}

const ChallengeCard = ({ title, difficulty }: ChallengeCardProps) => (
  <Chip label={`${title} — ${difficulty}`} />
);
```

An **`as const` object**, when the values themselves are needed at runtime too — to loop over them and build a dropdown, for instance:

```ts
// ✅ a real object, so its values can be iterated — the type is derived from it, not written twice
export const Difficulty = {
  Easy: "EASY",
  Medium: "MEDIUM",
  Hard: "HARD",
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

const DifficultySelect = ({
  value,
  onChange,
}: {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
}) => (
  <Select value={value} onChange={(e) => onChange(e.target.value as Difficulty)}>
    {Object.values(Difficulty).map((level) => (
      <MenuItem key={level} value={level}>
        {level}
      </MenuItem>
    ))}
  </Select>
);
```

`Difficulty.Easy` still reads exactly like the `enum` version did — same call-site ergonomics, same closed set, same autocomplete. The difference only shows up in the compiled output: a plain object literal, not a separate runtime enum construct.

> 💡 Default to the string union. Reach for the `as const` object specifically once the values themselves are needed, not just the type — populating a `<Select>`, checking a value a user typed against the valid options, logging every option. If all `Difficulty` ever does is sit in a type annotation, the object is unused weight.

`Record` still gets its exhaustiveness guarantee from either version — the key type just has to be closed, and both a string union and an `as const`-derived type qualify:

```ts
// ✅ Record<Difficulty, string> demands one entry per Difficulty — nothing missing, nothing extra
const difficultyColor: Record<Difficulty, string> = {
  EASY: "success",
  MEDIUM: "warning",
  HARD: "error",
};
```

Add a fourth difficulty later and `difficultyColor` stops compiling until a color is added for it too — the same guarantee `enum` gave, without paying for a runtime enum construct to get it.

> 💡 `Record` earns its keep specifically when the key type is _closed_ — a string union or an `as const`-derived type, same as `Difficulty` here. `Record<string, V>` gives up that guarantee entirely, since any string is a valid key — at that point it's no safer than a plain index signature. Reach for a `Map<string, V>` instead once the keys are genuinely open-ended.

### `extends` gives you fields, not behavior — reach for a discriminant

`SingleChoiceChallenge extends BaseChallenge` and `CodingChallenge extends BaseChallenge` (Course 1, named `BaseChallenge` here to make clear it's a building block, not a type anything gets assigned to directly) share every field `BaseChallenge` defines — but an interface can't override behavior the way a class can. There's no built-in way to ask "which kind of challenge is this?" and get anything type-safe back, so code that needs to handle each kind differently reaches for a runtime check with no compiler help behind it:

```ts
// ❌ nothing here tells TypeScript which fields actually exist on `challenge`
const grade = (challenge: BaseChallenge, answer: unknown): boolean => {
  if ("correctOptionIndex" in challenge) {
    // challenge.correctOptionIndex — red squiggly line, BaseChallenge has no such field
    // the only way forward from here is an unsafe `as SingleChoiceChallenge` cast
  }
  return false;
};
```

The fix is a **discriminant** — one literal-typed field every variant sets to a different value, so a plain `switch` narrows the type for you automatically:

```ts
interface BaseChallenge {
  id: number;
  title: string;
  points: number;
}

interface SingleChoiceChallenge extends BaseChallenge {
  type: "single";
  options: string[];
  correctOptionIndex: number;
}

interface CodingChallenge extends BaseChallenge {
  type: "coding";
  starterCode: string;
  testCases: string[];
}

type Challenge = SingleChoiceChallenge | CodingChallenge;

// ✅ switching on `type` narrows `challenge` to the exact interface, field by field
const grade = (challenge: Challenge, answer: number[]): boolean => {
  switch (challenge.type) {
    case "single":
      return answer.length === 1 && answer[0] === challenge.correctOptionIndex;
    case "coding":
      return challenge.testCases.every((test) =>
        runTest(challenge.starterCode, test),
      );
  }
};
```

Inside `case "single":`, TypeScript already knows `challenge` is a `SingleChoiceChallenge` — `challenge.correctOptionIndex` is available, `challenge.starterCode` isn't, with no cast and no `in` check needed anywhere. `extends` still does its job here, keeping `id`/`title`/`points` defined once on `BaseChallenge` instead of copy-pasted into all three — the discriminant doesn't replace inheritance, it's what makes a hierarchy of interfaces actually usable at the point code needs to branch on which one it's holding.

This is exactly where it pays off once there's more than one challenge on screen. A real quiz almost certainly mixes all three kinds — that's the whole point of `extends`ing a common `BaseChallenge`, since every item only needs to satisfy that shared shape to be useful in bulk, no matter which of the three interfaces it actually is:

```ts
const challenges: Challenge[] = [singleChoiceQuiz, codingChallenge];

// ✅ every item only needs to be a BaseChallenge for this — mixing three different
// interfaces in one array is exactly what a shared base type makes possible
const totalPoints = challenges.reduce((sum, challenge) => sum + challenge.points, 0);

// ✅ each item still narrows individually while mapping, based on its own `type`
const ChallengeList = () => (
  <Stack spacing={2}>
    {challenges.map((challenge) => {
      switch (challenge.type) {
        case "single":
          return <ChoiceChallengeCard key={challenge.id} challenge={challenge} />;
        case "coding":
          return <CodingChallengeCard key={challenge.id} challenge={challenge} />;
      }
    })}
  </Stack>
);
```

`totalPoints` never has to ask which kind of challenge it's looking at — `points` is guaranteed by `BaseChallenge` alone, on every item in the array, regardless of which of the three interfaces it actually is. `ChallengeList` does need to know, once it has to render a different layout per kind, and gets there the same way `grade` did: by narrowing on `type` inside the loop, not by checking each item's shape by hand. One `extends`-built array, two completely different ways of using it — bulk operations that only touch the shared base, and per-item operations that narrow down to the specific variant.

> 💡 This is the same shape as `severity` in the component design section below: one field with a closed set of values, instead of separate booleans or an untagged shared shape. `type: "single" | "coding"` here does the identical job `severity: "error" | "warning" | "success"` does there — and because the switch above covers every member of that closed set, TypeScript can tell the function always returns a `boolean`, with no `default` case needed.

> 🔧 **Exercise: add `MultipleChoiceChallenge` back in.** This model only has two variants right now, but a real quiz app needs more — bring back a question with several correct answers:
>
> 1. Add an interface `MultipleChoiceChallenge extends BaseChallenge` with `type: "multiple"`, `options: string[]`, and `correctOptionIndexes: number[]` — the same shape `SingleChoiceChallenge` has, except more than one answer can be correct.
> 2. Add it as a third member of the `Challenge` union.
> 3. Try compiling `grade` as it stands, with no other changes. It should fail — not with a vague error, but by pointing at the exact gap: `challenge.type` can now be `"multiple"`, and the `switch` no longer covers every case, so not every path returns a `boolean` anymore.
> 4. Add the missing `case "multiple":`, then do the same for `ChallengeList`.
>
> That failed compile _is_ the exercise's point. This is what "scalable" means for a model like this one: growing it isn't "remember everywhere `Challenge` gets used and hope nothing was missed" — it's add one interface, add one union member, and let the compiler list every place still expecting the old, smaller set. A plain `object` or an untyped `challenge: any` would have let step 2 through silently, with the missing case discovered by a user instead of a compiler.

## Think in state

Most bugs in this category share the same root cause: treating a piece of state as something to keep _in sync_, instead of something to _compute_ — or updating it from a value that's already stale by the time the update actually runs.

### Derive during render, don't sync

```ts
// ❌ an effect that exists only to keep two pieces of state in sync
const [firstName, setFirstName] = useState("Alex");
const [lastName, setLastName] = useState("Doe");
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);

// ✅ no effect, no second state, no chance of the two going stale
const fullName = firstName + " " + lastName;
```

The question to ask before writing `useEffect`: _is this synchronizing with something outside React_ (the network, the DOM, a timer, a subscription)? If yes, it's a real effect. If not, there's a sharper rule hiding underneath: **if a state setter is only ever called synchronously, from inside an effect, that state probably shouldn't exist at all.** `setFullName` is never called from a click, a keystroke, anything asynchronous — only from that one effect, every time `firstName` or `lastName` changes. That's the signal. It applies well past string concatenation — a filtered list kept "in sync" with a search term, or a total kept "in sync" with a list of line items, are the exact same shape of bug, just with a bigger computation on the right-hand side.

### Trigger it directly, don't watch for it

A different flavor of the same mistake: a function changes state, and a separate effect watches for that change to do something else — even though, right where the state was changed, exactly what caused it and what should happen next was already known.

```ts
// ❌ this effect fires for every reason `bookmarked` could become true,
// not just the one click the code actually cares about
const [bookmarked, setBookmarked] = useState(false);

useEffect(() => {
  if (bookmarked) {
    showToast(`${article.title} bookmarked`);
  }
}, [bookmarked, article]);

const handleBookmarkClick = () => {
  setBookmarked(true);
};
```

```ts
// ✅ the toast happens exactly where the click is handled — no effect needed
const [bookmarked, setBookmarked] = useState(false);

const handleBookmarkClick = () => {
  setBookmarked(true);
  showToast(`${article.title} bookmarked`);
};
```

The effect version doesn't actually know _why_ `bookmarked` became `true` — only that it did. Land on a different article that happens to already be bookmarked, or remount the component with `bookmarked` starting out `true`, and the toast fires again for no click at all. The event handler doesn't have that problem, because it isn't guessing: it's already the one place in the code that knows a bookmark click just happened, so showing the toast is one more line in that same function, not a reaction bolted on from outside, watching a value and hoping it can reconstruct what caused it.

> 💡 Same test as the rest of this section: is this synchronizing with something _outside_ React? A toast triggered by a click isn't — it's a direct consequence of that click, so it belongs in the same handler as the state update that caused it. Save `useEffect` for what an event handler genuinely can't cover: something that has to happen in response to a component mounting, a prop changing, or a value changing for a reason that isn't any single event the code controls.

### Resetting state when props change

The instinct once a component holds a draft — an editable copy of something selected elsewhere — is to sync it with an effect whenever the selection changes:

```ts
// ❌ the non-solution: syncing a prop into state with an effect
const UserPanel = ({ initialEmail }: { initialEmail: string }) => {
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  return <TextField value={email} onChange={(e) => setEmail(e.target.value)} />;
};
```

Worth calling an anti-pattern outright, not just a style nit. Effects exist to sync React state with something _outside_ React — `localStorage`, a subscription, the DOM. Here, `email` and `initialEmail` both already live inside React; nothing external is being synchronized, it's just one piece of state chasing another one render behind. The condition doesn't even match the real intent, either: the goal is "reset the draft when a _different user_ is selected," not "reset it whenever `initialEmail` changes" — two users can share an email, and the effect has no way to tell those cases apart.

Two real fixes exist, and which one's right depends on how much the rest of the app needs to know about every keystroke.

**Lift the state up**, making `UserPanel` fully controlled:

```ts
// ✅ App owns the draft, UserPanel just renders what it's given
const App = () => {
  const [selected, setSelected] = useState(users[0]);
  const [email, setEmail] = useState(selected.email);

  return (
    <>
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => {
            setSelected(user);
            setEmail(user.email); // two calls to keep in sync, every time
          }}
        >
          {user.name}
        </button>
      ))}
      <UserPanel email={email} onEmailChange={setEmail} />
    </>
  );
};

const UserPanel = ({
  email,
  onEmailChange,
}: {
  email: string;
  onEmailChange: (value: string) => void;
}) => <TextField value={email} onChange={(e) => onEmailChange(e.target.value)} />;
```

This works, but notice the cost. Every keystroke in the input now re-renders `App` and everything under it, not just `UserPanel` — fine here, not necessarily fine in a bigger tree. And look closely at `email`: until the user actually types something, it's just `selected.email`, duplicated into a second piece of state — the exact "derive during render, don't sync" problem from earlier in this section, one click away from where it's actually visible. `onClick` has to remember to call both `setSelected` and `setEmail` together, the same way `setFullName` had to be kept in sync with `firstName`/`lastName` by hand.

**Or keep the draft local, and remount with a `key`** instead:

```ts
// ✅ same shape as the very first version, `email` stays local to UserPanel
const App = () => {
  const [selected, setSelected] = useState(users[0]);

  return (
    <>
      {users.map((user) => (
        <button key={user.id} onClick={() => setSelected(user)}>
          {user.name}
        </button>
      ))}
      <UserPanel key={selected.id} initialEmail={selected.email} />
    </>
  );
};

const UserPanel = ({ initialEmail }: { initialEmail: string }) => {
  const [email, setEmail] = useState(initialEmail);
  return <TextField value={email} onChange={(e) => setEmail(e.target.value)} />;
};
```

Same component, same UX, one line different from the broken effect version above: `key={selected.id}` at the call site. A new key means React throws the old `UserPanel` instance away and mounts a fresh one, with `email` back at its real initial value — no effect, no missed dependency, no stale draft. Typing no longer touches `App` at all, and `email` never has to be kept in sync with anything, because it never left `UserPanel` in the first place.

> 💡 Default to the `key` version — it keeps state exactly as local as "keep state as local as possible" (a few sections down) already argues for, with none of the lifted version's re-render cost. Reach for lifting state up specifically once something _outside_ `UserPanel` genuinely needs the draft on every keystroke — live validation shown elsewhere on the page, a sibling that mirrors the value as it's typed. If nothing outside needs it until the user's done, it never had to leave `UserPanel`.

### Functional updates

`setCount(count + 1)` reads `count` from the render this closure was created in. That's fine for a single call from a click handler — but inside anything that might run more than once, or after a delay, before that render's `count` is up to date, it silently uses a stale value.

```ts
// ❌ both calls close over the same `count` from this render
const handleDoubleIncrement = () => {
  setCount(count + 1);
  setCount(count + 1);
};
// count only ever goes up by 1, not 2

// ✅ each call gets the actual latest value, guaranteed
const handleDoubleIncrement = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
};
// count goes up by 2, every time
```

This is exactly the trick the `Countdown` exercise depends on: a `setInterval` callback that closes over `count` once and runs every second forever would keep reading the _first_ render's `count` — `setTime((t) => ...)` reads the current value at the moment each tick actually fires, not whatever `time` was when the effect first ran.

> 💡 Default to the functional form any time the new state depends on the old state. It costs nothing when it isn't needed, and it's the only correct option when it is.

## Component design

### small, cohesive, decoupled

Four symptoms below, one underlying cause: a component that knows more than it needs to — about where its state should really live, about how many jobs it's supposed to do, about the exact shape of the data it's handed, about every configuration it might ever be asked for.

### Keep state as local as possible

State should live in the closest component that actually needs it — not lifted to a parent, and definitely not put in a global store, until two or more components genuinely need to share it.

```ts
// ❌ search text lifted to the page, for a search box only SearchBar uses
const HomePage = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <SearchBar query={query} onQueryChange={setQuery} />
      <ArticleList articles={articles} />
    </>
  );
};

// ✅ SearchBar owns its own input state — HomePage doesn't need to know it exists
const SearchBar = ({ onSearch }: { onSearch: (q: string) => void }) => {
  const [query, setQuery] = useState("");
  return (
    <TextField
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
};
```

The moment a _second_ component genuinely needs `query` too — `ArticleList` filtering by it, for instance — that's when it's time to lift the state up to their closest common parent. Not sooner. Lifting state "just in case" is how a small app ends up with half its `useState` calls living three components above where they're actually read.

### One component, one job

If a component fetches data, transforms it, manages form state, _and_ renders three different layouts depending on a prop, it's really three or four components wearing a trenchcoat.

```ts
// ❌ one component doing data fetching, loading UI, error UI, and the list
const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;
  return (
    <Stack spacing={2}>
      {articles.map((a) => (
        <Stack key={a.id}>
          <Typography variant="h6">{a.title}</Typography>
          <Typography>{a.excerpt}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

// ✅ fetching lives in a hook; rendering is split into components with one job each
const ArticlesPage = () => {
  const { articles, loading } = useArticles();

  if (loading) return <CircularProgress />;
  if (articles.length === 0) return <Typography>No articles yet.</Typography>;

  return (
    <Stack spacing={2}>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </Stack>
  );
};
```

`useArticles` owns the fetching. `ArticleCard` owns rendering one article. `ArticlesPage` just wires the two together — and every state the user can actually see (loading, empty, has-articles) gets its own `if` with its own `return`, top to bottom, instead of one expression trying to account for all three at once. Reading down the function tells you every screen it can show; nothing is nested inside a ternary you have to mentally evaluate first. Each piece can be read, tested, and changed on its own, without having to hold the other two in your head at the same time.

### Low coupling, high cohesion

**Cohesion** is how related the things _inside_ one unit are. **Coupling** is how much one unit depends on the specifics of another. The goal is components and hooks that are highly cohesive (everything inside them belongs together) and loosely coupled (they don't need to know much about who's using them).

A custom hook is high cohesion in practice: `usePosts` bundles the state, the fetch, and the reload logic that all change together, into one unit — instead of scattering three separate `useState` calls and an effect across a component that also has to render a UI.

Coupling shows up most in how components take their data. A component tied to one specific model is _coupled_ to that model — it can't be reused for anything else, and it breaks the moment that model's shape changes:

```ts
// ❌ coupled to `User` specifically — useless for anything that isn't a User
interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => (
  <Card>
    <Typography variant="h6">{user.name}</Typography>
    <Typography color="text.secondary">{user.email}</Typography>
  </Card>
);
```

```ts
// ✅ generic — knows nothing about User, Post, or any other domain model
interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const InfoCard = ({ title, subtitle, children }: CardProps) => (
  <Card>
    <Typography variant="h6">{title}</Typography>
    {subtitle && <Typography color="text.secondary">{subtitle}</Typography>}
    {children}
  </Card>
);

// UserCard becomes a thin adapter, built on top of the generic one
const UserCard = ({ user }: { user: User }) => (
  <InfoCard title={user.name} subtitle={user.email} />
);
```

`InfoCard` doesn't know `User` exists — it can render a post, a product, a notification, anything with a title. `UserCard` is the one small piece of code that knows about `User`, and it's just translating that model into props `InfoCard` already understands. When the `User` type changes, only `UserCard` has to change. When you need a `ProductCard` next month, `InfoCard` is already there for it.

> 💡 A good sign a component is too coupled to one model: its prop is the whole object (`user: User`) instead of the individual fields it actually renders (`title`, `subtitle`). Passing the whole object is what makes it impossible to reuse for anything that isn't that exact type.

### Composition over boolean flags

Booleans multiply. One flag is two states to handle; two flags is four, whether or not all four actually mean something. A component whose API is a pile of booleans can always be asked to be in a state that doesn't make sense.

```ts
// ❌ isError, isWarning, isSuccess — any combination is technically valid
interface AlertBannerProps {
  message: string;
  isError?: boolean;
  isWarning?: boolean;
  isSuccess?: boolean;
}

const AlertBanner = ({
  message,
  isError,
  isWarning,
  isSuccess,
}: AlertBannerProps) => (
  <Alert
    severity={
      isError ? "error" : isWarning ? "warning" : isSuccess ? "success" : "info"
    }
  >
    {message}
  </Alert>
);
// <AlertBanner isError isSuccess message="..." /> — compiles fine, silently renders "error"

// ✅ one prop, one of a fixed set of values — impossible states aren't reachable
interface AlertBannerProps {
  message: string;
  severity?: "error" | "warning" | "success" | "info";
}

const AlertBanner = ({ message, severity = "info" }: AlertBannerProps) => (
  <Alert severity={severity}>{message}</Alert>
);
// <AlertBanner severity="danger" message="..." /> — red squiggly line, caught before it ships
```

This isn't a made-up rule for this example — it's why MUI's own `Alert` takes a `severity` prop instead of `isError`/`isWarning`/`isSuccess` booleans. `severity="error"` is also just easier to read at the call site than three unrelated booleans: it tells you these options are mutually exclusive, where a fistful of booleans never does.

> 💡 Reach for this the moment two boolean props on the same component are ever meant to be mutually exclusive. If only one of them can ever be `true` at a time, they were never really separate booleans — they were one variant.

### Name and default a single boolean so it reads on its own

Not every boolean needs to become a variant — one flag toggling one thing on is a normal prop. Name it for what `true` means, default it to the ordinary case:

```ts
// ❌ withoutBorder={false} — false, without a border... so it has one?
const Card = ({ withoutBorder = false }: { withoutBorder?: boolean }) => (
  <Box sx={{ border: withoutBorder ? "none" : "1px solid" }} />
);

// ✅ <Card /> — no border. <Card withBorder /> — reads exactly as it behaves.
const Card = ({ withBorder = false }: { withBorder?: boolean }) => (
  <Box sx={{ border: withBorder ? "1px solid" : "none" }} />
);
```

```ts
// ❌ notEnabled — a double negative the moment it's ever set explicitly
const Button = ({ notEnabled = false }: { notEnabled?: boolean }) => (
  <button disabled={notEnabled}>Save</button>
);

// ✅ disabled — <Button disabled /> says exactly what happens
const Button = ({ disabled = false }: { disabled?: boolean }) => (
  <button disabled={disabled}>Save</button>
);
```

```ts
// ❌ visible, defaulting to true — every ordinary call site has to opt out
const Modal = ({ visible = true }: { visible?: boolean }) => (visible ? <Dialog /> : null);
// <Modal visible={false} /> needed just to do nothing

// ✅ hidden, defaulting to false — leaving the prop out is already the ordinary case
const Modal = ({ hidden = false }: { hidden?: boolean }) => (hidden ? null : <Dialog />);
// <Modal /> — shown, zero props. <Modal hidden /> — the one time it isn't.
```

> 💡 Name the prop for whichever state is the _exception_, not just whichever word sounds positive — `hidden` beats `visible` here specifically because most instances are visible. Either way: omitting the prop means the ordinary case, setting it means "turn on the thing this name says."

## Structure the app

Course 1 introduced the smallest structure that works — a `components/` folder and a `pages/` folder, fine for two or three files. Four shapes cover everything past that point, and the part that's usually unclear isn't what each one looks like, it's which one actually fits. Roughly the order an app outgrows them: **small, horizontal, vertical, hybrid.**

### Small — flat, no domain split

```plaintext
src/
├── components/
│   ├── Card/
│   │   └── Card.tsx
│   └── NavBar/
│       └── NavBar.tsx
├── pages/
│   └── HomePage/
│       └── HomePage.tsx
└── App.tsx
```

**Use it when:** a prototype, a course exercise, anything under a dozen files you're confident stays that way — Course 1's structure, unchanged. There's nothing to colocate yet; a `features/` folder here would be one folder per file. Note `Card/Card.tsx`, not just `Card.tsx`, even here — a component gets its own folder from day one, ready for a test or a stylesheet later with no rename. That pattern repeats through every tree below.

### Horizontal — grouped by technical type

```plaintext
src/
├── components/
│   ├── ArticleCard/
│   │   └── ArticleCard.tsx
│   ├── LoginForm/
│   │   └── LoginForm.tsx
│   └── InfoCard/
│       └── InfoCard.tsx
├── hooks/
│   ├── useArticles.ts
│   └── useAuth.ts
├── utils/
│   └── formatArticleDate.ts
└── types/
    ├── article.ts
    └── user.ts
```

**Use it when:** there's no real domain to split by — a component library, a design system, anything whose entire job is being reusable primitives rather than features. Outside that case, it's the shape to grow out of: `components/`, `hooks/`, `utils/`, and `types/` group files by **what they are**, not **what they do**, so everything about one feature scatters across all four — `ArticleCard` here, `useArticles` there, `article.ts` somewhere else. Touch "articles" and four unrelated folders change; delete it and the same four need auditing to be sure nothing was left behind.

A tempting half-fix that isn't one: nesting a domain folder *inside* each type folder.

```plaintext
src/
├── components/
│   ├── articles/
│   │   └── ArticleCard/
│   │       └── ArticleCard.tsx
│   └── user/
│       └── LoginForm/
│           └── LoginForm.tsx
├── hooks/
│   ├── articles/
│   │   └── useArticles.ts
│   └── user/
│       └── useAuth.ts
└── types/
    ├── articles/
    │   └── types.ts
    └── user/
        └── types.ts
```

There's an `articles/` folder now — three of them — which is exactly what makes this one easy to mistake for fixed. It isn't: working on "articles" still means opening three separate trees, and deleting it means finding and removing all three. The domain split has to happen *before* the type split, at the very top, or it's still Horizontal underneath.

### Vertical — grouped by feature

```plaintext
src/
├── features/
│   ├── articles/
│   │   ├── ArticleCard/
│   │   │   └── ArticleCard.tsx
│   │   ├── ArticlesPage/
│   │   │   └── ArticlesPage.tsx
│   │   ├── useArticles.ts
│   │   ├── formatArticleDate.ts
│   │   └── types.ts
│   └── auth/
│       ├── LoginForm/
│       │   └── LoginForm.tsx
│       ├── useAuth.ts
│       └── types.ts
└── components/
    └── InfoCard/
        └── InfoCard.tsx           # shared — see Hybrid below
```

**Use it when:** this is the default for a real product app — most of what it does is domain logic, split across more than one feature. `useArticles`, `ArticleCard`, and `ArticlesPage` — the same three pieces split apart in "one component, one job" — land inside one `articles/` folder, not three. Delete `features/articles/` and the whole feature goes with it: component, hook, types, helper, nothing orphaned in a `hooks/` or `utils/` for someone to find six months later and wonder about.

### Hybrid — vertical for features, a thin horizontal layer for what's actually shared

```plaintext
src/
├── features/
│   ├── articles/
│   │   ├── ArticleCard/
│   │   │   └── ArticleCard.tsx
│   │   ├── ArticlesPage/
│   │   │   └── ArticlesPage.tsx
│   │   ├── useArticles.ts
│   │   └── types.ts
│   └── auth/
│       ├── LoginForm/
│       │   └── LoginForm.tsx
│       ├── UserCard/
│       │   └── UserCard.tsx    # adapter — knows about User, built on InfoCard below
│       ├── useAuth.ts
│       └── types.ts
├── components/   # InfoCard — generic, reused by 2+ features, no model knowledge
│   └── InfoCard/
│       └── InfoCard.tsx
├── hooks/        # useDebounce — doesn't know articles or auth exist
│   └── useDebounce.ts
└── lib/          # apiClient — infrastructure every feature's hooks build on
    └── apiClient.ts
```

**Use it when:** almost always, eventually — this is what Vertical turns into the moment a second feature needs something the first one already built. `InfoCard` starts out living inside whichever feature needed a generic card first, and only moves out to `components/` once a *second* feature genuinely needs it too — the same "don't lift until two need it" rule as component state, one level up. `UserCard` stays put in `auth/` even sitting right next to `InfoCard`'s new home, because it isn't generic: it's the adapter that knows `User` exists, built on top of `InfoCard`, and that domain knowledge is exactly what keeps it out of the shared folder. `components/`, `hooks/`, and `lib/` here look like Horizontal, and that's the difference worth noticing — Horizontal starts that way for *everything* and stays that way; Hybrid's horizontal layer stays deliberately thin, holding only what's earned a spot outside any one feature.

> 💡 Reaching for a shared folder "just in case," before a second feature actually needs it, is how Hybrid quietly turns back into Horizontal.

### One name per concern

Two folders for the same job force a coin flip every time something new needs a home — and once nobody's sure which one is "correct," things pile up wherever's already biggest, which is exactly how a single file quietly becomes one that does everything:

```plaintext
❌ two names, one job each — new code goes wherever, nobody agrees which
src/
├── helpers/
│   └── formatDate.ts
└── utils/
    ├── formatCurrency.ts
    ├── validateEmail.ts
    ├── debounce.ts
    ├── ...                 # 40 more, unrelated to each other
    └── index.ts             # "just import from utils" — so everyone does

public/
└── logo.png
assets/
└── images/
    └── hero-banner.jpg
```

```plaintext
✅ one name, one job, one home
src/
└── utils/
    ├── formatDate.ts
    ├── formatCurrency.ts
    ├── validateEmail.ts
    └── debounce.ts

public/
└── images/
    ├── logo.png
    └── hero-banner.jpg
```

`helpers/` vs `utils/`, `public/` vs `assets/` — same job, two names, and the second isn't doing anything the first wasn't already doing. The real cost isn't the extra folder; it's what it trains people to do. When it's unclear which of two places something belongs, the path of least resistance is "wherever's already the biggest" — so `utils/index.ts` ends up forty unrelated functions deep, imported everywhere, understood by no one. That's "one component, one job" from earlier, failing at the file level instead of the component level: a file that handles everything is exactly as unreadable as a component that does.

> 💡 If `helpers/` and `utils/` can't be told apart in one sentence, they're not two things — pick one name, delete the other, move everything into it.

## Theme First

From the MUI course: `sx` is for one-off, this-instance-only adjustments. Anything that should look the same everywhere — every `Button`, every `Chip` — belongs in `theme.ts`, once, not copy-pasted onto every instance.

```ts
// ❌ the same sx, pasted onto every Button in the app
<Button sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>
  Save
</Button>
```

```ts
// ✅ defined once, applies everywhere a Button appears
export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none", fontWeight: 600 },
      },
    },
  },
});
```

```ts
// every Button in the app now looks like this, with zero sx
<Button>Save</Button>
```

If you catch yourself writing the same `sx={{ ... }}` twice, that's the signal it belongs in the theme instead.

> 💡 It's the same shared-vs-local split as the previous section, just one layer down: `theme.ts` is the shared layer every component draws from by default, `sx` is the local override for the one instance that actually needs to differ.

### Add a variant, don't fight the existing ones

Sometimes `styleOverrides` on `root` isn't enough, because the need isn't a tweak to every `Button` — it's a genuinely new _kind_ of `Button`, standing alongside `contained`/`outlined`/`text`. MUI's theme supports that directly, through `variants`, instead of an `sx` repeated at every call site that needs it:

```ts
// ✅ a new variant, defined once in the theme — not a per-instance sx
export const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "subtle" },
          style: { backgroundColor: "action.hover", boxShadow: "none" },
        },
      ],
    },
  },
});
```

```ts
<Button variant="subtle">Cancel</Button>
```

One step still missing: this doesn't type-check yet. MUI's `Button` only knows about `"contained" | "outlined" | "text"` — `"subtle"` is invisible to it until the type itself is extended, the same move "write explicit types" already made the case for, just aimed at a library's types instead of an in-house one:

```ts
// ✅ module augmentation — teaches MUI's own types about the new variant
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    subtle: true;
  }
}
```

`<Button variant="subtle">` now autocompletes and type-checks exactly like the built-in variants; `<Button variant="sutble">` is a red squiggly line, caught before it ships — the same guarantee a closed union or a `Record` gives everywhere else in this course, here applied to a component library's own props instead of one written in-house.

> 💡 Reach for a new variant instead of a one-off `sx` the moment a style is going to be reused as a _named, recognizable option_ — "the subtle button," not just "the button on this one screen that happens to look different." If it only ever needs to exist in one place, `sx` was right the first time.

<div style="height:200px"></div>
