---
name: general-refactor-skill
description: Use this skill when refactoring any codebase to improve ownership boundaries, modularity, route separation, and maintainability without changing intended behavior. Apply it when the user wants large conditional components split into dedicated files, wrapper abstractions removed, inline route/page logic extracted, or section-level components organized with clear module ownership.
---

# General Refactor Skill

Use this skill when refactoring any codebase in the same manner, rule set, and style as requested in this conversation.

## Goal

Refactor for:

- clear ownership
- module-level separation
- route-level separation
- section-level modularity
- minimal hidden abstraction
- preserved UI and behavior

The default principle is:

- do not keep many unrelated concerns inside one file
- do not keep one giant component that conditionally renders many modules
- do not create fake modularity through thin wrapper files
- prefer dedicated components per module, page, and section

## Core refactor rules

### 1. Split giant conditional components

If one file renders multiple unrelated modules based on props, route state, tab state, or conditionals like `type`, `kind`, `mode`, `variant`, `activeTab`, or similar, split it into dedicated files.

Bad pattern:

- one component rendering many module types through conditionals
- one page switching multiple business sections inside the same JSX body
- one route component operating as a catch-all for many unrelated modules

Preferred pattern:

- one dedicated component per module
- one dedicated route component per route-level concern
- one dedicated page per meaningful user-facing page

### 2. Dedicated files must contain dedicated code

Do not create “dedicated” files that only import a generic shared component and pass props into it.

Bad pattern:

- `UserList.jsx` importing `GenericList.jsx`
- `ProductHeader.jsx` importing `SharedHeader.jsx`
- `OrdersFilters.jsx` importing `CommonFilters.jsx`

when those shared files still own the real rendering logic.

Preferred pattern:

- `UserList.jsx` owns its own JSX
- `UserCard.jsx` owns its own JSX
- `UserFilters.jsx` owns its own JSX

Use a shared helper only when it is truly small and logic-neutral.

### 3. Modularize by meaningful sections

When a page has distinct visual or functional sections, split them into dedicated components.

Common section candidates:

- hero
- header
- sidebar
- filters
- list section
- card
- details/specs block
- form section
- info section
- banner
- empty state
- actions/footer block

Do not force everything into one file if the sections are clearly separate responsibilities.

### 4. Prefer route-driven separation over local tab-only separation

If the user wants different modules, tabs, or categories to behave like distinct pages, use actual routing where appropriate.

Examples of when to do this:

- nested product categories
- dashboard submodules
- admin/user module pages
- catalog sections with their own URLs

If URL-level separation is requested, use real routes instead of only local state toggles.

### 5. Keep shared components only when they are truly generic

Acceptable shared components:

- app shell pieces like navbar/footer
- auth guards
- tiny helpers with no business-specific branching
- neutral UI primitives

Avoid shared components that:

- render multiple business modules through conditionals
- hide most of the real markup for unrelated modules
- act as generic mega-wrappers for supposedly dedicated files

If a shared component still owns module-specific behavior, split it.

### 6. Avoid inline page bodies inside route containers

Do not define many page components inline inside route files, dashboard files, or shell files if they are real pages.

Preferred pattern:

- route file imports page files
- page files import section files
- section files import lower-level module-specific pieces as needed

### 7. Avoid duplicate navigation exposure without intent

If a feature is meant to be accessed through a hub page, do not also expose every child module as duplicate top-level navigation unless the user explicitly wants both.

Navigation should reflect the intended user flow, not internal convenience.

### 8. Preserve behavior while refactoring

This refactor style is structural first.

Do:

- preserve current routes unless the user asked to change them
- preserve API calls and wiring
- preserve UI classes and styling hooks unless needed
- preserve redirects, forms, and page behavior

Do not:

- silently redesign the interface
- rename features casually
- break links, IDs, or route contracts
- alter business logic unless the user asked for that too

### 9. Prefer exact names over vague names

Use names tied to the real module.

Prefer:

- `UserDetailsHeader`
- `OrdersListingCard`
- `InventoryFilters`

Avoid:

- `CommonSection`
- `GlobalCard`
- `UniversalPanel`

Good names should reveal ownership clearly.

### 10. Remove fake abstraction layers

If a component exists only to forward props to another “shared” component with nearly no logic, flatten it or rewrite it with dedicated JSX.

If a shared abstraction makes ownership harder to understand, it is usually the wrong abstraction.

### 11. Apply the same standard consistently

If the same anti-pattern appears elsewhere in the codebase, refactor it in the same spirit.

Examples:

- giant conditional pages
- huge dashboard containers
- generic module wrappers
- details pages missing consistent structure
- monolithic forms with unrelated sections

Do not fix only one occurrence if the surrounding code clearly follows the same bad pattern and the user’s request applies broadly.

## Generic catalog/module pattern

When refactoring a repeated module family such as catalogs, dashboards, management modules, or detail pages:

- one route component per module where appropriate
- one dedicated header per module
- one dedicated filters component per module if filters belong to that module
- one dedicated listing/details section per module
- one dedicated card per module
- one dedicated empty state if needed
- one dedicated banner/supporting section if it is owned by that module

Do not solve this only by wrapping one big shared component with many module-specific filenames.

## Generic detail-page pattern

For detail pages:

- use a dedicated overview component if the page is multi-section
- split gallery, specs, details, actions, and side panels when useful
- keep equivalent detail pages structurally aligned if they represent parallel entities

If one parallel detail page is missing important parts that another has, align them.

## File editing guidance

- use safe file editing practices
- preserve unrelated local changes
- prefer understandable file boundaries over clever abstractions
- remove dead wrapper files when they are no longer useful
- avoid leaving behind unused mega-components in active module chains

## Validation

After refactoring:

- run the available build/test check if practical
- verify imports resolve
- verify route structure still works logically
- verify dedicated files are not still delegating real ownership to generic mega-components
- check for unused leftover files when relevant

## Output expectations

When reporting the refactor:

- lead with the outcome
- mention the module/page families refactored
- mention the key files added/updated/removed
- call out whether old shared files are still used or are now removable
- confirm validation status

