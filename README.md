# Nuxt 3 Admin System

A production-ready robust admin dashboard built with Nuxt 3 and PrimeVue. The project architecture relies heavily on Feature-Sliced Design to ensure scalability and maintainability, segregating domains into a modular feature approach.

## 🚀 Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com/) (Vue 3, SSR, Auto-imports)
- **Language:** TypeScript 5
- **UI Components:** [PrimeVue 4](https://primevue.org/) (Aura preset)
- **Styling:** Tailwind CSS 3
- **State Management:** Pinia (with `pinia-plugin-persistedstate`)
- **Forms & Validation:** VeeValidate + Zod
- **Networking:** Axios (with central `useApi` interceptors)
- **Icons & Toasts:** `@iconify/vue`, `vue-sonner`
- **Package Manager:** pnpm

---

## ✨ Key Features

1. **Feature-Sliced Architecture:** Instead of a bloated `pages/` directory, business logic is isolated in the `/features` folder (e.g., `features/company`). Each feature houses its own schemas, types, API clients, and composables.
2. **Robust Permission System:**
   - A global `authStore` stores the user's `moduleTypeList` containing permissions.
   - The `usePermission` composable is available anywhere to check permissions dynamically (`hasPermission('Company')`).
   - Module-level Nuxt route middleware (`middleware/permission.ts`) guards page access based on a `requiredModule` defined in `definePageMeta`.
3. **JWT Authentication & Axios Interceptors:**
   - Global configured Axios (`useApi()`) automatically attaches the JWT token from Pinia to outgoing requests.
   - Triggers automatic redirects to `/login` if a 401 Unauthorized API response is encountered.
4. **Built-in Dark Mode:** Managed smoothly with the Custom PrimeVue Aura preset and `useTheme()` composable.
5. **Type-Safe Validation:** Forms leverage VeeValidate integrated with Zod to maintain strictly typed inputs (e.g. `companySchema`).

---

## 📂 Project Structure

```text
admin-system/
├── assets/
│   ├── css/              # Tailwind directives and company brand theme variables
│   └── images/           # Static assets like logo
├── components/
│   ├── layout/           # Structural pieces: AppSidebar, AppHeader
│   └── shared/           # Reusable UI wrappers: PageHeader, ConfirmDialog
├── composables/          # Global hooks: useApi, usePermission, useTheme
├── features/             # Business modules (Domain logic)
│   └── company/          # Example feature: contains api/, schemas/, composables/, types/
├── layouts/              # Nuxt layouts: default.vue (Dashboard) and auth.vue (Login)
├── middleware/           # Route guards: auth.global.ts and permission.ts
├── pages/                # Nuxt file-based router routing maps to feature views
├── stores/               # Global state management: auth.store.ts
└── types/                # Global interface contracts
```

---

## 🛠 Setup & Development

### 1. Requirements

Ensure you have Node.js and [pnpm](https://pnpm.io/) installed.

### 2. Environment Variables

Create an `.env` file in the root based on your backend environment:

```env
NUXT_PUBLIC_API_BASE=https://your-api.com/api
NUXT_SESSION_PASSWORD=replace-this-with-a-32-char-min-secret
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run Development Server

```bash
pnpm dev
# The app will start on http://localhost:3000
```

### 5. Production Build

To check types and build for production:

```bash
pnpm vue-tsc --noEmit
pnpm build
pnpm preview
```

---

## 📖 Developer Guide

### Adding a New Feature Module (e.g., "Product")

1. **Create the Feature Folder:** Make `features/product/` with subfolders for `api`, `schemas`, `composables`, and `types`.
2. **Define Schema:** Create a Zod schema in `schemas/product.schema.ts`.
3. **Define API:** Create the axios calls in `api/product.api.ts` utilizing `useApi()`.
4. **Create Logic:** Expose reactive states and functions in `composables/useProduct.ts`.
5. **Create Page:** Add `pages/product/index.vue` and lock it down with permissions:

```html
<script setup lang="ts">
  definePageMeta({
    middleware: ["auth", "permission"],
    requiredModule: "Product", // Must match the Exact type string from the /me API
  });
</script>
```

6. **Update Sidebar:** Finally, add the route inside `components/layout/AppSidebar.vue` using your exact `type` string.
