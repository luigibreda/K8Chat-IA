'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconSpinner, IconDownload } from '@/components/ui/icons'

interface LoginButtonProps extends ButtonProps {
  provider?: string
  showIcon?: boolean
  text?: string
}

export function LoginButton({
  provider = 'google', // Adiciona uma prop 'provider' com 'github' como default
  text = 'Login with GitHub',
  showIcon  = true,
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  // Ajusta o texto e ícone dependendo do provedor
  let ProviderIcon = showIcon ? IconGitHub : null;
  if (provider === 'google') {
    text = 'Login with Google';
    ProviderIcon = showIcon ? IconDownload : null; // Certifique-se de ter um componente IconGoogle
  }

  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        signIn(provider, { callbackUrl: `/` });
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : ProviderIcon ? (
        <ProviderIcon className="mr-2" />
      ) : null}
      {text}
    </Button>
  );

  // return (
  //   <Button
  //     variant="outline"
  //     onClick={() => {
  //       setIsLoading(true)
  //       // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
  //       signIn('github', { callbackUrl: `/` })
  //     }}
  //     disabled={isLoading}
  //     className={cn(className)}
  //     {...props}
  //   >
  //     {isLoading ? (
  //       <IconSpinner className="mr-2 animate-spin" />
  //     ) : showIcon  ? (
  //       <IconGitHub className="mr-2" />
  //     ) : null}
  //     {text}
  //   </Button>
  // )
}
