"use client";

import { useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

function Field({ className, orientation = "vertical", ...props }: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug text-body", className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug text-body-bolder text-dark-gray",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border border-light-gray *:data-[slot=field]:p-4",
        className
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn("flex w-fit items-center gap-2 text-sm leading-snug font-medium text-dark-gray", className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-dark-gray text-small leading-normal", className)}
      {...props}
    />
  );
}

function FieldError({ className, children, errors, ...props }: React.ComponentProps<"div"> & { errors?: Array<{ message?: string }> }) {
  const content = useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;

    const uniqueErrors = [...new Map(errors.map((e) => [e?.message, e])).values()];
    if (uniqueErrors.length === 1) return uniqueErrors[0]?.message;

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((e, i) => e?.message && <li key={i}>{e.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  return (
    <div role="alert" data-slot="field-error" className={cn("text-destructive text-small", className)} {...props}>
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
  FieldTitle,
};
