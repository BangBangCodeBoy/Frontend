import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-primary-foreground shadow hover:bg-primary-500/90 ",

        outline:
          "border border-primary-500 bg-background shadow-sm hover:bg-primary-50  text-primary-500 ",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-primary-400/80 hover:text-gray-0 ",
        ghost: "hover:bg-primary-300 hover:text-gray-0 ",
      },
      weight: {
        regular: "Button2",
        bold: "Button1",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded px-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "regular",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
