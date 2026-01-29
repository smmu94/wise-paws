import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-salmon/50",
  {
    variants: {
      variant: {
        default: "bg-salmon !text-white hover:opacity-90 shadow-sm",
        dark: "bg-dark-gray !text-white hover:bg-medium-gray",
        outline: "border border-light-gray bg-transparent hover:bg-light-cream !text-dark-gray",
        ghost: "hover:bg-light-gray/20 !text-medium-gray !hover:text-dark-gray",
        link: "!text-salmon underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 text-body-bolder",
        sm: "h-9 px-4 text-small-bolder",
        lg: "h-12 px-8 text-body-bolder text-lg",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }