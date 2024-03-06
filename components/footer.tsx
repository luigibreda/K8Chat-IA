import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Kaká, assistente virtual da K8 -{' '}
      <ExternalLink href="https://www.meuk8.com.br/">meuk8.com.br</ExternalLink>. Todos os direitos reservados.
    </p>
  )
}
