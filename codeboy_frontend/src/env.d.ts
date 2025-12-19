/// <reference types="vite/client" />

declare module "*.svg" {
  import type { FunctionalComponent, SVGAttributes } from "vue";

  const component: FunctionalComponent<SVGAttributes>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}
