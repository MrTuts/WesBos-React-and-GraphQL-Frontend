import Link from 'next/link';

import SignOut from './SignOut';
import { useUser } from './User';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  const user = useUser();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign in</Link>
        </>
      )}
    </NavStyles>
  );
}
