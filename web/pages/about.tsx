import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from 'containers/navbar';

const About: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Navbar title='About app' />
      <div className='about'>
        <div className='about__content'>
          <h1>
            This small app is about to track and control access for persons to get to some places
            inside your office/ building
          </h1>
          <h3>How it works?</h3>
          <span>another one</span>
        </div>
        <div className='about__links'>
          <Link href='/'>
            <a onClick={() => router.push('/')}>Back to main page</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
