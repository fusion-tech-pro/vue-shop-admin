/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL?: string;
  // TODO: add more env variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
