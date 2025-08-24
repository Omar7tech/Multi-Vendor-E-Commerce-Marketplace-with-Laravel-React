import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type ButtonProps = React.ComponentProps<"button"> & {
  variant?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "link"
    | "outline"
    | "destructive"
    | "info"
    | "success"
    | "warning"
    | "error"
  size?: "sm" | "md" | "lg" | "icon"
  asChild?: boolean
}

function Button({
  className,
  variant = "neutral",
  size = "md",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
    icon: "btn-square btn-md",
  }

  return (
    <Comp
      className={cn(`btn btn-${variant} ${sizeClasses[size]}`, className)}
      {...props}
    />
  )
}

export { Button }
