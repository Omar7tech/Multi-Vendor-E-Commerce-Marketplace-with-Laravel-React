import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/react'
import { ComponentProps } from 'react'

type TextLinkProps = ComponentProps<typeof Link> & {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral'
}

export default function TextLink({
  className = '',
  children,
  variant = 'default',
  ...props
}: TextLinkProps) {
  const variantClass =
    variant === 'default' ? 'link' : `link link-${variant}`

  return (
    <Link
      className={cn(variantClass, className)}
      {...props}
    >
      {children}
    </Link>
  )
}
