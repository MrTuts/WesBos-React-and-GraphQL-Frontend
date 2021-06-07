import { useRouter } from 'next/router';

import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage() {
  const { query } = useRouter();

  const token = (query?.token || '') as string;
  if (!token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <Reset token={token} />
    </div>
  );
}
