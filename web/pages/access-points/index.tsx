import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface NextProps {}

const AccessPoints: NextPage<NextProps> = () => {
  const router = useRouter();

  return (
    <div className='content-layout'>
      <Head>
        <title>AccessPoints settings</title>
      </Head>
      <h1>AccessPoints page list</h1>
    </div>
  );
};

export default AccessPoints;
