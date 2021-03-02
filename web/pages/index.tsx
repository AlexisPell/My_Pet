import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { LockOutlined } from '@ant-design/icons';

const App: NextPage = () => {
  const router = useRouter();

  return (
    <div className='app'>
      <Head>
        <title>Main</title>
      </Head>
      <div className='app__content'>
        <h1 className='to-center'>
          Smart Checkpoint <LockOutlined />
        </h1>
        <h2 className='to-center'>Passenger Сontrol Tracker</h2>
        <br />
        <h3>Visualise whole your office floor after floor, using your own photo-Schema</h3>
        <h3>Place objects of type of checkpoints, doors and strongboxes on schema</h3>
        <h3>Upload your employees in database</h3>
        <h3>And customize rights to access points for each person in particular</h3>
        <h3 className='to-right'>As simple as never</h3>
      </div>
      <div className='app__links'>
        <Link href='/'>
          <a onClick={() => router.push('/')}>Read more about it</a>
        </Link>
      </div>
    </div>
  );
};

export default App;
