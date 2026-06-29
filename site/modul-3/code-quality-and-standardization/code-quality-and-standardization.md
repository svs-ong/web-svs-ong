# Code Quality & Standardization in Next.js  
Using ESLint & Prettier  
_Last updated: November 2025_

---

## 1. Why this matters  
Maintaining a large codebase (especially in a team) demands consistency, readability, and catching issues early. Two major tools help:

- **ESLint** – static code analysis / linting: finds potential bugs, enforces coding standards, flags anti-patterns.  
- **Prettier** – opinionated code formatter: enforces consistent style (indentation, quotes, semicolons, etc.).  
- Combined in a Next.js environment, they help you avoid style debates, reduce code review noise, and enforce best practices.

Specifically for Next.js:  
- Next.js ships with ESLint integration out of the box via `eslint-config-next` / `@next/eslint-plugin-next`. :contentReference[oaicite:4]{index=4}  
- You must integrate Prettier in a way that doesn’t conflict with ESLint rules (and vice versa).  
- You can automate linting+formatting (on save, pre-commit, CI) so that quality is baked in.

---

## 2. Overview of tooling  
| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Lint/statically analyze code for correctness, best practices, style | Next.js provides default config with `eslint-config-next` which includes `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-next`. :contentReference[oaicite:5]{index=5} |
| Prettier | Automatically format code to consistent style | Has configuration via `.prettierrc`, supports a wide range of languages/formats. :contentReference[oaicite:6]{index=6} |
| eslint-config-prettier / eslint-plugin-prettier | Bridge between ESLint + Prettier: disable ESLint rules conflicting with Prettier + allow Prettier errors to surface via ESLint. :contentReference[oaicite:7]{index=7} |

---

## 3. Initial Setup in Next.js  
### 3.1 Create your Next.js app  
If starting fresh with TypeScript:  
```bash
npx create-next-app@latest my-app --typescript
