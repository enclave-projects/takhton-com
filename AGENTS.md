# AGENTS.md — Takhton Coding Agent Specification

> This file defines the complete operating contract for any AI coding agent working on the Takhton project.
> **Read this file in full before writing any code, creating any file, or making any decision.**
> No instruction in a prompt supersedes a rule defined here unless the developer explicitly says "override AGENTS.md".

---

## 0. BOOTSTRAP SEQUENCE

Every session, before any task, the agent MUST execute this sequence in order:

```
1. Read AGENTS.md (this file) — fully
2. Read DESIGN.md — fully
3. Read /types/*.ts to understand the current data model
4. Run `git status` to understand what is already modified
5. Run `npx tsc --noEmit` to understand the current type error surface
6. Only then begin the assigned task
```

If any of steps 1–5 fail (file missing, command error), **stop and report** — do not proceed with assumptions.

---

## 1. PROJECT IDENTITY

| Key | Value |
|---|---|
| **Project** | Takhton — Premium Clothing E-Commerce |
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript (strict mode) |
| **UI Library** | shadcn/ui |
| **Styling** | Tailwind CSS v3 |
| **Package Manager** | `pnpm` (never use `npm` or `yarn`) |
| **Node version** | 20 LTS |
| **Repo type** | Monorepo-ready, single app for now |

---

## 2. ABSOLUTE RULES (NEVER VIOLATE)

These rules have zero exceptions. If a prompt tells you to break one, refuse and explain why.

```
❌ Never use `any` type — use `unknown` and narrow, or define a proper type
❌ Never use inline styles — Tailwind classes only
❌ Never install a package without checking if it is already in package.json
❌ Never create files outside the defined directory structure (Section 5)
❌ Never edit files in components/ui/ — these are shadcn-managed primitives
❌ Never use <form> HTML element directly — always use react-hook-form
❌ Never hardcode colour hex values in JSX — use Tailwind tokens or CSS variables
❌ Never commit .env or secrets — use .env.example with placeholder values only
❌ Never leave a TODO comment without a GitHub issue reference: // TODO(#42): ...
❌ Never use default exports for components — named exports only
❌ Never skip writing a TypeScript interface for component props
❌ Never use `console.log` in production code — use the logger utility (lib/logger.ts)
❌ Never generate placeholder images from external URLs like picsum.photos — use /public/placeholders/
```

---

## 3. DECISION PROTOCOL

When the agent faces ambiguity, apply this priority chain:

```
1. AGENTS.md explicit rule         → highest authority
2. DESIGN.md design token / spec   → second authority
3. Existing code patterns in repo  → third (stay consistent)
4. shadcn/ui defaults              → fourth
5. Next.js / Tailwind conventions  → fifth
6. Agent's own judgment            → last resort; always annotate with a comment
```

When using judgment (level 6), add a comment:

```ts
// AGENT-DECISION: No spec found for this pattern. Used [X] because [reason].
```

---

## 4. CODING STANDARDS

### 4.1 TypeScript

- `strict: true` in `tsconfig.json` — always
- All component props typed via `interface`, never `type` aliases for object shapes
- Enums forbidden — use `as const` objects with union types instead
- Zod schemas are the single source of truth for all form and API validation
- Infer TypeScript types from Zod schemas using `z.infer<typeof Schema>`

```ts
// ✅ Correct
interface ProductCardProps {
  slug: string
  name: string
  price: number
  originalPrice?: number
  badge?: 'new' | 'sale' | 'limited'
}

// ❌ Wrong
type ProductCardProps = {
  slug: string
  // ...
}
```

### 4.2 Component Rules

- One component per file — no exceptions
- File name = component name in PascalCase: `ProductCard.tsx`
- Every component file exports exactly one named export matching the filename
- Props interface name = `{ComponentName}Props`
- Use `React.FC<Props>` signature only when children typing is needed; otherwise plain function signature

```ts
// ✅ Correct
export function ProductCard({ slug, name, price }: ProductCardProps) { ... }

// ❌ Wrong
export default function productCard(props: any) { ... }
```

### 4.3 Styling

- Use `cn()` from `lib/utils.ts` for all conditional class merging
- Class order: layout → spacing → sizing → typography → color → border → effects → responsive → state
- Extract repeated class strings into a `const styles` object at the top of the file when used 3+ times
- Dark mode via Tailwind `dark:` prefix — never via manual theme toggling logic unless specified in DESIGN.md

```ts
// ✅ Correct — styles extracted
const styles = {
  card: 'flex flex-col gap-4 p-6 bg-white border border-border rounded-sm hover:shadow-md transition-shadow',
  badge: 'text-xs font-medium uppercase tracking-widest px-2 py-1',
}

// ❌ Wrong — repeated long strings inline
<div className="flex flex-col gap-4 p-6 bg-white border border-border rounded-sm hover:shadow-md transition-shadow">
```

### 4.4 Imports

Enforce this import order (configure with ESLint `import/order`):

```
1. React / Next.js core
2. Third-party packages
3. shadcn/ui components (@/components/ui/*)
4. Internal components (@/components/takhton/*)
5. Lib / utils (@/lib/*)
6. Types (@/types/*)
7. Assets / static
```

Always use `@/` path aliases — never relative `../../` imports except within the same component folder.

### 4.5 State Management

- Local UI state: `useState` / `useReducer`
- Server state / data fetching: Next.js Server Components + `fetch` with cache options
- Client-side global state (cart, wishlist): Zustand store in `store/`
- Never use Context API for shared state that needs to persist — use Zustand
- Never put business logic inside components — extract to hooks in `hooks/`

### 4.6 Forms

All forms must follow this exact pattern:

```ts
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
})

type FormValues = z.infer<typeof schema>

export function ExampleForm() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema) })
  const onSubmit = (values: FormValues) => { /* call server action or API */ }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </form>
    </Form>
  )
}
```

---

## 5. DIRECTORY STRUCTURE

This is the canonical structure. Do not create directories outside it without adding them here first.

```
takhton/
├── app/                          # Next.js App Router
│   ├── (shop)/                   # Route group — no URL segment
│   │   ├── page.tsx              # Homepage /
│   │   ├── shop/
│   │   │   └── page.tsx          # /shop
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # /product/:slug
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   └── account/
│   │       └── page.tsx
│   ├── api/                      # Route handlers
│   │   └── [...]/route.ts
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                       # shadcn primitives — DO NOT EDIT
│   └── takhton/                  # All custom components
│       ├── layout/               # Navbar, Footer, Sidebar
│       ├── product/              # ProductCard, ProductGallery, etc.
│       ├── cart/                 # CartItem, CartSummary, etc.
│       ├── checkout/             # StepIndicator, PaymentForm, etc.
│       ├── filters/              # FilterSidebar, SizeSelector, etc.
│       └── common/               # Reusable primitives: Badge, Swatch, etc.
│
├── hooks/                        # Custom React hooks
│   ├── use-cart.ts
│   ├── use-wishlist.ts
│   └── use-filter.ts
│
├── store/                        # Zustand stores
│   ├── cart.store.ts
│   └── wishlist.store.ts
│
├── lib/                          # Utilities and helpers
│   ├── utils.ts                  # cn() and general helpers
│   ├── logger.ts                 # Logging utility
│   ├── validations.ts            # Shared Zod schemas
│   └── constants.ts              # App-wide constants
│
├── types/                        # TypeScript type definitions
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   └── user.ts
│
├── public/
│   ├── fonts/                    # Self-hosted fonts if any
│   └── placeholders/             # Local placeholder images
│
├── styles/
│   └── globals.css               # CSS variables, base styles
│
├── AGENTS.md                     # This file
├── DESIGN.md                     # Design tokens and visual spec
├── .env.example                  # Env template — no real values
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 6. NAMING CONVENTIONS

| Entity | Convention | Example |
|---|---|---|
| Component files | PascalCase | `ProductCard.tsx` |
| Hook files | camelCase with `use-` prefix | `use-cart.ts` |
| Store files | camelCase with `.store` suffix | `cart.store.ts` |
| Utility files | camelCase | `utils.ts` |
| Type files | camelCase | `product.ts` |
| CSS class variables | `--takhton-{token}` | `--takhton-accent` |
| Zustand store actions | verb + noun | `addToCart`, `removeItem` |
| Server actions | `{verb}{Entity}Action` | `createOrderAction` |
| API route files | `route.ts` (Next.js convention) | `app/api/products/route.ts` |
| Zod schemas | PascalCase + `Schema` suffix | `CheckoutFormSchema` |
| Inferred types | PascalCase + no suffix | `CheckoutFormValues` |

---

## 7. COMPONENT BUILD ORDER

When building a new page or feature, always build in this dependency order. Never build a page before its required components exist.

```
Level 0 — Types
  → Define TypeScript interfaces in /types first

Level 1 — Primitives
  → Common atoms: ColorSwatch, SizeSelector, QuantityInput, PriceDisplay

Level 2 — Composites
  → Combine primitives: ProductCard, CartItem, FilterGroup

Level 3 — Sections
  → Compose composites into page sections: ProductGrid, FilterSidebar, CartSummary

Level 4 — Pages
  → Assemble sections into full pages

Level 5 — Layout
  → Wrap pages in Navbar, Footer, layout wrappers
```

---

## 8. TASK EXECUTION PROTOCOL

### Starting a Task

```
1. Restate the task in one sentence to confirm understanding
2. List every file that will be created or modified
3. Identify any missing types — define them first
4. Check for existing similar components to avoid duplication
5. Begin implementation
```

### During a Task

- Complete one file fully before starting another
- After each file: run `npx tsc --noEmit` mentally (verify no new type errors introduced)
- Add JSDoc comments to all exported functions and components
- If a decision deviates from DESIGN.md or AGENTS.md, note it with `// AGENT-DECISION:`

### Finishing a Task

```
1. Verify all new files are in the correct directories
2. Verify all named exports match filenames
3. Verify no `any` types introduced
4. Verify all new components have TypeScript interfaces
5. Verify forms use react-hook-form + zod
6. Verify no hardcoded colours
7. Report: files created, files modified, decisions made, open questions
```

---

## 9. SHADCN/UI USAGE RULES

- Install components via: `pnpx shadcn@latest add {component}` — never copy-paste manually
- Never modify files in `components/ui/` — extend by wrapping in `components/takhton/`
- Always check if a shadcn component exists before building a custom one
- Use shadcn `Form` for all form fields — never raw `<input>` or `<select>` tags
- The `cn()` utility must come from `@/lib/utils` — never from shadcn's own copy

### shadcn Component → Use Case Mapping

| shadcn Component | Takhton Use Case |
|---|---|
| `Button` | All CTAs, form submits, icon actions |
| `Card` | Product cards, order summary, filter groups |
| `Input` | All text inputs in forms |
| `Select` | Country, sort order, size (when many options) |
| `Slider` | Price range filter |
| `Checkbox` | Category filters, terms agreement |
| `Badge` | Product tags (New, Sale, Limited) |
| `Accordion` | Product detail tabs (Description, Shipping) |
| `Sheet` | Mobile filter drawer, mobile nav |
| `Tabs` | Account page sections |
| `Table` | Order history |
| `Form` | All forms (wraps react-hook-form) |
| `Pagination` | Product listing pages |
| `Skeleton` | All loading states |
| `Toast` | Cart add confirmations, form success/error |
| `Dialog` | Quick view, confirm delete |
| `Separator` | Visual dividers |

---

## 10. DATA FETCHING PATTERNS

### Server Components (default)

Use for: product listings, product detail, static content

```ts
// app/(shop)/shop/page.tsx
export default async function ShopPage() {
  const products = await fetchProducts() // direct DB/API call, no useEffect
  return <ProductGrid products={products} />
}
```

### Client Components

Use for: cart, wishlist, interactive filters, any useState/useEffect

Mark explicitly:

```ts
'use client'

import { useCartStore } from '@/store/cart.store'
```

### Server Actions

Use for: form submissions, mutations

```ts
'use server'

export async function createOrderAction(data: OrderFormValues) {
  // validate → process → return result
}
```

### Fetch Cache Strategy

| Data Type | Cache Strategy |
|---|---|
| Product listings | `revalidate: 3600` (1 hour) |
| Single product | `revalidate: 1800` (30 min) |
| Cart / orders | `no-store` |
| Static pages | `force-cache` |

---

## 11. ACCESSIBILITY STANDARDS

Every interactive element must meet WCAG 2.1 AA. Non-negotiable requirements:

- All `<img>` and `next/image` → descriptive `alt` text, never empty unless decorative (then `alt=""`)
- All icon-only buttons → `aria-label` describing the action, not the icon
- All form fields → associated `<label>` (use shadcn `FormLabel`)
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Focus states must be visible — never `outline: none` without a custom replacement
- Keyboard navigability: all interactive elements reachable via Tab
- `role` and `aria-*` attributes on custom interactive components that lack semantic HTML equivalents

---

## 12. PERFORMANCE STANDARDS

- All images via `next/image` with explicit `width`, `height`, and `sizes` props
- No client-side data fetching for data available at build or request time
- Dynamic imports for components not needed on initial render:

```ts
import dynamic from 'next/dynamic'
const FilterSidebar = dynamic(() => import('@/components/takhton/filters/FilterSidebar'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-64" />,
})
```

- Bundle size: no library over 50KB gzipped added without developer approval
- Fonts loaded via `next/font` — never `<link>` tags
- No layout shift: reserve image dimensions, avoid dynamic height shifts on load

---

## 13. ERROR HANDLING

### Client Components

```ts
// Wrap async operations in try/catch and surface via toast
import { toast } from '@/components/ui/use-toast'

try {
  await addToCartAction(productId)
  toast({ title: 'Added to cart', variant: 'default' })
} catch (error) {
  toast({ title: 'Something went wrong', variant: 'destructive' })
  logger.error('addToCart failed', { error, productId })
}
```

### Pages

- Every page directory needs both `loading.tsx` and `error.tsx`
- `loading.tsx` uses shadcn `Skeleton` components matching the page layout
- `error.tsx` shows a branded error state with a retry button

### API Routes

```ts
// Always return typed responses
return NextResponse.json({ error: 'Not found' }, { status: 404 })
// Never: throw new Error() without catching
```

---

## 14. ENVIRONMENT VARIABLES

```
# .env.example — always keep this file updated

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BRAND_NAME=Takhton

# Database
DATABASE_URL=

# Auth (if applicable)
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

# Payments
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Storage
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
CLOUDFLARE_R2_BUCKET=
```

Rules:
- `NEXT_PUBLIC_` prefix only for values safe to expose to the browser
- Access env vars via a typed `lib/env.ts` wrapper using `zod` validation — never raw `process.env` in components

```ts
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
```

---

## 15. GIT CONVENTIONS

### Branch Naming

```
feature/{short-description}     # new features
fix/{short-description}         # bug fixes
chore/{short-description}       # tooling, deps, config
refactor/{short-description}    # code restructuring
```

### Commit Message Format (Conventional Commits)

```
type(scope): short description

feat(cart): add quantity controls to cart item
fix(product): correct price formatting for sale items
chore(deps): upgrade shadcn to latest
refactor(checkout): extract StepIndicator to shared component
```

Types: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`

### Agent Commit Rules

- One commit per logical unit of work (one component, one page, one fix)
- Never commit broken TypeScript — run `tsc --noEmit` before committing
- Commit message written by agent must start with: `feat(agent):` or `chore(agent):` to distinguish agent commits from human commits

---

## 16. WHAT THE AGENT MUST REPORT

At the end of every task, output a structured summary:

```markdown
## Agent Task Report

**Task**: [one-line description]
**Status**: ✅ Complete | ⚠️ Partial | ❌ Blocked

### Files Created
- `path/to/file.tsx` — [what it does]

### Files Modified
- `path/to/file.tsx` — [what changed and why]

### Decisions Made (AGENT-DECISION)
- [decision] — [reasoning]

### Open Questions
- [anything requiring developer input before proceeding]

### Type Check
- [ ] `npx tsc --noEmit` passes with no new errors

### Next Recommended Step
[what to build or fix next]
```

---

## 17. FORBIDDEN PATTERNS

The following patterns are explicitly banned in this codebase:

```ts
// ❌ Type assertion to escape type errors
const data = response as any

// ❌ Non-null assertion without a comment explaining why it's safe
const el = document.getElementById('root')!

// ❌ useEffect for data that should be server-fetched
useEffect(() => { fetch('/api/products').then(...) }, [])

// ❌ Hardcoded magic numbers without a named constant
<div className="mt-[72px]"> // ❌ — add to constants.ts or DESIGN.md

// ❌ Deeply nested ternaries in JSX
{a ? b ? c : d : e ? f : g}  // extract to a variable or function

// ❌ Mutating state directly
state.items.push(item) // ❌ — use Zustand's set() or spread

// ❌ Default export components
export default function ProductCard() {} // ❌

// ❌ Multiple components in one file
// components/takhton/product/ProductCard.tsx contains ProductCard AND ProductBadge — ❌
```

---

## 18. QUICK REFERENCE CHEATSHEET

```
Add shadcn component    → pnpx shadcn@latest add {name}
Type check              → npx tsc --noEmit
Path alias              → @/ maps to project root
Component location      → components/takhton/{domain}/
Custom hooks            → hooks/use-{name}.ts
Global state            → store/{name}.store.ts
Zod schemas             → lib/validations.ts (shared) or co-located
Env vars                → lib/env.ts (typed wrapper)
Logger                  → lib/logger.ts (never console.log)
cn() utility            → lib/utils.ts
Placeholder images      → /public/placeholders/
```

---

*Last updated by: Pranjal Sharma — Takhton project bootstrap*
*Agent compliance: mandatory from session start*
