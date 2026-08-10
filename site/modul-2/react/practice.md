# Practice

## Starter

> 🔧 **Exercise** — given `types.ts` and `CatCard.tsx`, write only `CatsPage.tsx`:\*\*
>
> **Requirements — write `CatsPage.tsx`:**
>
> - Import `cats` and `Gender` from `types.ts`, and `CatCard` from `CatCard.tsx`.
> - Use `.filter()` on `cats` to keep only the ones where `gender === Gender.Male`.
> - Use `.map()` on that filtered list to render one `CatCard` per male cat, passing `name`, `breed`, `age` and `imageUrl` as props, plus a `key`.
> - Don't reach for `useState` or any other hook — `cats` is a plain constant array; deriving a shorter list from it with `.filter()` doesn't need component state.
>
> **Verify:**
>
> - Count the male cats in the `cats` array by hand, then confirm `CatsPage` renders exactly that many `CatCard`s — no females sneak in.
> - Add a 6th cat to the array with `gender: Gender.Female` — the page shouldn't change. Add one with `Gender.Male` — a new card should appear.

```ts
// types.ts
export enum Gender {
  Male = "male",
  Female = "female",
}

export interface Cat {
  id: number;
  name: string;
  breed: string;
  age: number;
  gender: Gender;
  imageUrl: string;
}

export const cats: Cat[] = [
  {
    id: 1,
    name: "Whiskers",
    breed: "Siamese",
    age: 2,
    gender: Gender.Male,
    imageUrl: "https://placekitten.com/300/200",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Persian",
    age: 3,
    gender: Gender.Female,
    imageUrl: "https://placekitten.com/301/200",
  },
  {
    id: 3,
    name: "Tom",
    breed: "Maine Coon",
    age: 1,
    gender: Gender.Male,
    imageUrl: "https://placekitten.com/302/200",
  },
  {
    id: 4,
    name: "Bella",
    breed: "Ragdoll",
    age: 4,
    gender: Gender.Female,
    imageUrl: "https://placekitten.com/303/200",
  },
  {
    id: 5,
    name: "Leo",
    breed: "Bengal",
    age: 2,
    gender: Gender.Male,
    imageUrl: "https://placekitten.com/304/200",
  },
];
```

```ts
// CatCard.tsx
interface CatCardProps {
  name: string;
  breed: string;
  age: number;
  imageUrl: string;
}

export const CatCard = ({ name, breed, age, imageUrl }: CatCardProps) => {
  return (
    <div className="cat-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>
        {breed}, {age} years old
      </p>
    </div>
  );
};
```

## Team Work

Same shared project — this time recreated in React. `homework/html` (the Food Ninja blog from Web Basics) is your reference: same 4 pages, same content, but now split into components instead of one static HTML file each. Skip CSS entirely for this pass — the goal is structure, not styling.

- **Set up the app:** fork the repo, branch under your team name, and create a new Vite React + TypeScript app named `react-homework` (see `homework/react/README.md`).
- **Pages, wired with React Router:** `HomePage`, `AboutPage`, `ContactPage`, `ArticlePage`. Use `<Routes>`/`<Route>` and `<Link>` for navigation between them — no `useNavigate` or other hooks needed, `<Link>` alone is enough at this stage.
- **Components to split out:**
  - `Navbar` — logo + links to Blog / About / Contact.
  - `Footer`.
  - `ArticleCard` — takes `title`, `category`, `excerpt`, `date` and `imageUrl` as props.
  - `CategoryPill` — takes a single `label` prop.
  - `ArticleDetail` — the title/author/body block used on `ArticlePage`.
- **HomePage:** copy the 6 articles from `homework/html/index.html` into a local `articles.ts` constant (same shape as `cats` from the starter exercise above), then `.map()` them into `ArticleCard`s. The category pills can just render a static, hardcoded list of `CategoryPill`s for now — no filtering logic yet.
- **About / Contact / Article pages:** mostly static JSX carried over from the matching `.html` file — the point here is that the content now lives in its own component/page file, not that anything behaves differently yet.

> 💡 Every page here can be built from props and plain constants, exactly like `CatsPage` above — no `useState` anywhere in this app yet. Making the category pills actually filter, or the contact form actually submit, is what the React Hooks course is for.

<div style="height:200px"></div>
