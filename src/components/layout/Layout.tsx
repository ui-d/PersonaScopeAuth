import * as React from 'react';

interface props {
  children: React.ReactNode;
}

export function Layout({ children }: props): JSX.Element {
  return <>{children}</>;
}
