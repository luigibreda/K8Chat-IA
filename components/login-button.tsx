'use client'

import * as React from 'react';
import { signIn } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { IconSpinner } from '@/components/ui/icons'; 

interface LoginButtonProps extends ButtonProps {
  provider: string;
  icon: React.ReactNode; // Passa um componente de ícone como prop
  text: string;
}

export function LoginButton({
  provider,
  icon,
  text,
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

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
      {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : icon}
      {text}
    </Button>
  );
}