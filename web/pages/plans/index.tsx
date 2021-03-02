import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface NextProps {}

const Plans: NextPage<NextProps> = () => {
  const router = useRouter();

  return (
    <div className='content-layout'>
      <Head>
        <title>Plans playing</title>
      </Head>
      <h1>Plans page list</h1>
    </div>
  );
};

export default Plans;
