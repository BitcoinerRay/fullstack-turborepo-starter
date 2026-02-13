# Frontend (Next.js)

**Updated:** 2025-02-13

## Entry

- `next.config.ts` → `withNextIntl` plugin
- `app/[locale]/layout.tsx` → root layout, locale validation

## App Router

```
app/[locale]/
  layout.tsx   # NextIntlClientProvider, ZodErrorProvider, ToastProvider, ReactQueryProvider
  page.tsx     # Home (getTranslations)
  error.tsx
  global-error.tsx
```

## Components

| Component           | Path                                         | Exports                                                                                   |
| ------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Header              | `components/header/`                         | Header                                                                                    |
| Footer              | `components/footer/`                         | Footer                                                                                    |
| LocaleSelect        | `components/footer/components/LocaleSelect/` | LocaleSelect                                                                              |
| FloatLabelInputText | `components/float-label-input-text/`         | FloatLabelInputText                                                                       |
| LoadingAnimation    | `components/loading-animation/`              | LoadingAnimation                                                                          |
| ui/                 | `components/ui/`                             | Button, Input, Label, Select, AlertDialog, DropdownMenu, NavigationMenu, Sonner (Toaster) |

## Providers

- `ZodErrorProvider` (zod-error)
- `ToastProvider` (toast), `ConfirmProvider` (confirm)
- `ReactQueryProvider` (react-query)

## Hooks

- `useConfirmDialog`, `useToast`

## Utils

- `cn` → `lib/utils.ts` (classnames)

## i18n

- `routing.ts` → locales: en, de
- `request.ts` → getRequestConfig, loads `locales/{locale}.json`
- `navigation.ts` → Link, redirect, usePathname, useRouter, getPathname

## Store

- `loading.store.ts` → useLoadingStore (zustand)

## External Deps

- `next`, `next-intl`, `primereact`, `@tanstack/react-query`, `zustand`, `zod`, `react-hook-form`, `@hookform/resolvers`
