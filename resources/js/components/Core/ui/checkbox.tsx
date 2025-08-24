import * as React from "react"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type CheckboxProps = ComponentProps<"input"> & {
  className?: string
}

export function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "checkbox ",
        className
      )}
      {...props}
    />
  )
}
