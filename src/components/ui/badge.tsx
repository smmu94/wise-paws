import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-salmon !text-white hover:bg-salmon/90",
        secondary: "bg-medium-gray !text-white hover:bg-dark-gray",
        destructive: "bg-destructive !text-white hover:bg-destructive/90",
        outline: "border-light-gray text-dark-gray hover:bg-light-cream hover:text-salmon hover:border-salmon",
        ghost: "text-medium-gray hover:bg-light-cream hover:text-salmon",
        link: "!text-salmon underline-offset-4 hover:underline",
      },
      size: {
        small: "text-small px-2 py-0", 
        default: "text-small-bolder px-2.5 py-0.5",
        large: "text-body px-4 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }