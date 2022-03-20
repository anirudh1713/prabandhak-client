import type { NextPage } from 'next';
import axios from '../lib/axios';

const Home: NextPage = () => {
  return (
    <div>
      Prabandhak
      <button
        type="button"
        onClick={async () => {
          await axios.get('/auth/test');
        }}
      >
        click
      </button>
    </div>
  );
};

export default Home;
