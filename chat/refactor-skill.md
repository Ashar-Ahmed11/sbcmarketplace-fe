---
name: sbc-marketplace-refactor-skill
description: Use this skill when refactoring the SBC Marketplace React/Express codebase. Apply it when the user asks to modularize files, remove conditional mega-components, split route-specific pages into dedicated components, keep UI behavior intact while improving ownership boundaries, or align implementation structure with the refactor style established in this conversation.
---

# SBC Marketplace Refactor Skill

Use this skill when working inside this repository and the user wants the code refactored to follow the exact structural style requested across this project.

## Goal

Refactor for clear ownership, route-level separation, and component modularity without changing the intended UI or flows.

The main principle is:

- do not keep many unrelated concerns inside one file
- do not use one generic component that conditionally renders many modules
- do not keep route components embedded inside other route files
- prefer dedicated components per module, page, and section

## Non-negotiable refactor rules

### 1. One module should not be driven by a giant conditional component

If a file renders different modules based on props such as `activeTab`, `type`, `kind`, or route-derived conditionals, split it into dedicated files.

Examples:

- do not keep one marketplace catalog component for trucks, machinery, materials, and spare parts
- do not keep one service page component handling unrelated service modules through conditionals
- do not keep one dashboard route file defining many page bodies inline

Preferred result:

- `MarketplaceTrucksCatalog.jsx`
- `MarketplaceMachineryCatalog.jsx`
- `MarketplaceMaterialsCatalog.jsx`
- `MarketplaceSparePartsCatalog.jsx`

Each should own its own section composition.

### 2. Dedicated files must contain dedicated code

Do not create thin wrappers that only import a shared generic component and pass different props.

Bad pattern:

- `TruckListingsSection.jsx` importing `MarketplaceListingsSection.jsx`
- `TruckCatalogHeader.jsx` importing `MarketplaceCatalogHeader.jsx`
- `TruckCatalogFilters.jsx` importing `MarketplaceCatalogFilters.jsx`

Preferred pattern:

- `TruckListingsSection.jsx` contains truck listing section JSX
- `TruckListingCard.jsx` contains truck listing card JSX
- `TruckCatalogHeader.jsx` contains truck header JSX
- `TruckCatalogFilters.jsx` contains truck filter JSX

Apply the same rule to machinery, material, spare parts, services, dashboard modules, and other similar areas.

### 3. Modularize by section

When a page has multiple clear UI sections, split them into dedicated files.

Examples of valid section components:

- hero
- filters
- listing card
- listing section
- info/specs card
- other products
- banner
- load more
- sidebar
- form block

Do not dump all sections into one page file unless the page is genuinely tiny.

### 4. Route-specific pages must use route-specific files

If the user asks for nested routes, implement them with actual `Route` and `Switch` usage instead of local tab state only.

Examples:

- `/marketplace/trucks`
- `/marketplace/construction-machinery`
- `/marketplace/construction-material`
- `/marketplace/spare-parts`

If a page represents different modules by URL, each route should render its own dedicated module component.

### 5. Keep shared layout components only when they are truly layout-only

Acceptable shared components:

- top-level navbar
- top-level footer
- protected route
- very small framework-neutral helpers

Avoid shared components that hide business-specific rendering for multiple modules behind prop conditionals.

If a shared component still contains business logic for multiple modules, split it.

### 6. Dashboard files must not contain multiple route page bodies inline

If route components are declared inside a dashboard file, move them into their own files and import them.

Examples:

- `UserDashboard.jsx` should import route pages, not define them inline
- `MyListingsPage.jsx` can route to module pages, but those module pages should exist as separate files

### 7. Sidebar navigation should not duplicate module access unnecessarily

If a module is meant to be accessed through a hub page like `My Listings`, do not also expose all its child modules as duplicate sidebar entries unless the user explicitly asks for both.

### 8. Preserve UI and behavior while refactoring

Refactoring is structural first, not visual redesign.

Do:

- preserve existing classes unless a change is required
- preserve route behavior
- preserve API wiring
- preserve forms, data flow, and redirects

Do not:

- silently redesign the UI
- rename routes unnecessarily
- break detail page links

### 9. Prefer exact ownership names

Use concrete names tied to the module instead of vague names.

Prefer:

- `TruckListingCard`
- `MaterialCatalogFilters`
- `SparePartsOtherProducts`

Avoid:

- `CommonCatalogSection`
- `SharedCard`
- `UniversalMarketplaceBlock`

### 10. Avoid repeated mega-files across the project

If you see the same anti-pattern elsewhere, refactor it in the same spirit:

- one file handling many unrelated modules
- many pages embedded in one file
- generic wrapper files with no ownership

Apply the same modular structure consistently.

## Specific marketplace refactor pattern

For marketplace product catalogs, follow this ownership style:

- one route component per catalog
- one dedicated filter component per catalog
- one dedicated header component per catalog
- one dedicated listings section per catalog
- one dedicated listing card per catalog
- one dedicated load more component per catalog
- one dedicated banner component per catalog
- one dedicated other products component per catalog

Do not solve this by making all of those files wrappers around shared generic marketplace components.

Each dedicated file should contain its own JSX.

## Specific services and detail-page pattern

For detail pages and service modules:

- use dedicated overview components
- keep gallery, specs, info sections, and side cards separated when appropriate
- if one module page is missing parts that another parallel page has, align the structure so all equivalent pages have the same component completeness

## File editing guidance

- use `apply_patch` for edits
- preserve unrelated user changes
- prefer small, understandable file boundaries
- do not leave dead wrapper files when they are no longer useful

## Validation

After refactoring:

- run a build check if available
- verify imports resolve
- verify route paths still work logically
- verify there are no leftover direct imports from old generic mega-components in the refactored module chain

## Output expectations

When reporting back:

- lead with what was refactored
- mention the key files changed
- note whether old generic files are still used or can be removed
- confirm build/test status

