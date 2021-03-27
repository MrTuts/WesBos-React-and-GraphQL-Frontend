import { ReactNode } from 'react';

import Header from './Header';

type Props = {
  children: ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <div>
      <Header />
      <h1>Cool</h1>
      {children}
    </div>
  );
}
