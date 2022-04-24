import type {GetServerSideProps, NextPage} from 'next';
import {ssrRequest} from '../lib/axios/ssr-axios';
import {useUser} from '../lib/contexts/user-context';
import {IGetMeResponse} from '../lib/types/api-responses/auth';

const Home: NextPage = () => {
  const {
    userState: {user},
  } = useUser();

  return <div>Welcome to Prabandhak, {user?.name}</div>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const res = await ssrRequest<IGetMeResponse>(
      '/auth/me',
      context.req,
      context.res,
    );
    // TODO - get more data here

    return {
      props: {
        user: res.data.user,
      },
    };
  } catch (error: any) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
