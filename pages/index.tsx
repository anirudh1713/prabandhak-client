import type {NextPage} from 'next';
import {useUser} from '../lib/contexts/user-context';

const Home: NextPage = () => {
  const {
    userState: {user},
  } = useUser();

  return <div>Welcome to Prabandhak, {user?.name}</div>;
};

export default Home;
