import * as React from "react"
import { cn } from "@/lib/utils"

type AlertProps = React.ComponentProps<"div"> & {
  variant?: "default" | "destructive"
  className?: string
}

export function Alert({ className = "", variant = "default", ...props }: AlertProps) {
  const variantClass = variant === "destructive" ? "alert-error" : "alert-info"

  return (
    <div
      role="alert"
      className={cn("alert rounded-lg shadow-md grid grid-cols-[0_1fr] gap-2 items-start", variantClass, className)}
      {...props}
    />
  )
}

export function AlertTitle({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-medium text-base", className)}
      {...props}
    />
  )
}

export function AlertDescription({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-muted", className)}
      {...props}
    />
  )
}
