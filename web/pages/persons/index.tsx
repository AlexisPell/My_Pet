import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Navbar from 'containers/navbar';

interface NextProps {}

const Persons: NextPage<NextProps> = () => {
  const router = useRouter();

  return (
    <>
      <Navbar title='persons administrating' />
      <div className='content-layout'>
        <h1>Persons page list</h1>
      </div>
    </>
  );
};

export default Persons;
