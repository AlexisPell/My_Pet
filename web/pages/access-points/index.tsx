import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Navbar from 'containers/navbar';

interface NextProps {}

const AccessPoints: NextPage<NextProps> = () => {
  const router = useRouter();

  return (
    <>
      <Navbar title='access points' />
      <div className='content-layout'>
        <h1>AccessPoints page list</h1>
      </div>
    </>
  );
};

export default AccessPoints;
