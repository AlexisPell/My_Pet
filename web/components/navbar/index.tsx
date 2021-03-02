import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PageHeader, Button } from 'antd';

import { UnlockOutlined } from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';

const Navbar: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState('in charge for safety');

  console.log('router', router);

  return (
    <div className='navbar'>
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
        title='Title'
        subTitle='This is a subtitle'
        // tags={<Tag color='blue'>Running</Tag>}
        extra={[
          <div className='navbar__buttons'>
            <Button
              key='3'
              onClick={() => {
                setTitle('Personal Administrating');
                router.push('/persons');
              }}
            >
              Personal Control
            </Button>
            <Button
              onClick={() => {
                setTitle('Access Points customization');
                router.push('/access-points');
              }}
            >
              Access Points
            </Button>
            <Button
              onClick={() => {
                setTitle('Floor Plans control');
                router.push('/plans');
              }}
            >
              Building Floors
            </Button>
          </div>,
        ]}
      />
    </div>
  );
};

export default Navbar;
