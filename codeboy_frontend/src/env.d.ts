/// <reference types="vite/client" />

export const BASE_URL = "http://localhost:8080";

declare module "*.svg" {
  import type { FunctionalComponent, SVGAttributes } from "vue";

  const component: FunctionalComponent<SVGAttributes>;
  export default component;
}
