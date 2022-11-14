# Shop Admin Panel

Helps manage shop information

## Stack

- Vue 3
- Node 16
- Pinia
- Vue-Router
- SCSS
- Quasar
- ESLint & Prettier

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

_Don't forget to add Prettier and Eslint to VSCode as well._

_Add "Format on save" and select Default Formatter -> Prettier._

## Forlder structure

```
.
├── src/
│   ├── assets/
│   │   └── styles (scss source files and mixins)
│   ├── core/
│   │   ├── config (config data and constants)
│   │   ├── models (domain entities, such as User)
│   │   └── router (vue-router setup)
│   ├── data (sources, clients and services)
│   │   ├── network_client (axios client setup)
│   │   ├── dto (response entities, such as UserResponse)
│   │   └── *_source (api/database service)
│   ├── pages/
│   │   └── sign_in/
│   │       ├── components (page-specific components, such as forms)
│   │       ├── entities (page-specific models, such as SignInFormState)
│   │       └── SignInPage.vue (entry page file)
│   ├── components (shared componets folder)
│   ├── stores (pinia files)/
│   │   └── user.ts (user store setup with actions and getters)
│   ├── utils (folder for common utils)
│   ├── App.vue (app's main file)
│   └── main.ts (app's entry point)
└── .env (environment settings)
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
