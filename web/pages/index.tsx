import { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { GET_PERSONS } from '../operations/queries/persons';
import { GET_PASSES } from '../operations/queries/passes';
import { useEffect } from 'react';
import { localPnp } from '../lib/apolloCache';
import { usePnPQuery } from '../operations/queries/personsAndPasses';

const App: NextPage = () => {
  // const { data, loading, error } = useQuery(GET_PERSONS);
  // const { data: passesData, loading: passesLoading, error: passesError } = useQuery(GET_PASSES);

  // localPnp([...data.persons, ...passesData.passes]);
  // console.log('pnp: ', localPnp());
  // console.log('Data: ', data, passesData);

  const { data, loading, error } = usePnPQuery();

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
