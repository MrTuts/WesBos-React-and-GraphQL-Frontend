import { ReactNode } from 'react';

import SignIn from './SignIn';
import { useUser } from './User';

type Props = {
  children: ReactNode;
};

export default function PleaseSignIn({ children }: Props) {
  const me = useUser();
  if (!me) {
    return <SignIn />;
  }
  return <>{children}</>;
}
