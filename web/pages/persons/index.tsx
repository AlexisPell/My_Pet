import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface NextProps {}

const Persons: NextPage<NextProps> = () => {
  const router = useRouter();

  return (
    <div className='content-layout'>
      <Head>
        <title>Personal administrating</title>
      </Head>
      <h1>Persons page list</h1>
    </div>
  );
};

export default Persons;
