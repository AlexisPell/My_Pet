import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';
import { usePnPQuery } from '../operations/queries/personsAndPasses';

import { GET_PERSONS } from './../operations/queries/persons';

const App: NextPage = () => {
  // const { data, loading, error } = usePnPQuery();
  const { data, loading, error } = useQuery(GET_PERSONS);

  console.log('PNP DATA: ', data);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      <Head>
        <title>Main</title>
      </Head>
      <h1>Next ts graphql</h1>
    </div>
  );
};

export default App;
