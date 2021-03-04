import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PageHeader, Button } from 'antd';

import { UnlockOutlined } from '@ant-design/icons';
import Head from 'next/head';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className='navbar'>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='navbar__top'>
        <strong style={{ fontSize: '26px' }}>
          Smart Checkpoint <UnlockOutlined />
        </strong>
        <div>
          <Link href='/about'>
            <a onClick={() => router.push('/about')}>About</a>
          </Link>
        </div>
      </div>
      <PageHeader
        className='navbar__bottom'
        title={title}
        extra={[
          <div className='navbar__buttons'>
            <Button key='3' onClick={() => router.push('/persons')}>
              Persons Control
            </Button>
            <Button onClick={() => router.push('/access-points')}>Access Points</Button>
            <Button onClick={() => router.push('/plans')}>Floor plans</Button>
          </div>,
        ]}
      />
    </div>
  );
};

export default Navbar;
