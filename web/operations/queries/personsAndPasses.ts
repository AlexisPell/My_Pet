import { localPnp } from './../../lib/apolloCache';
import { GET_PASSES } from './passes';
import { GET_PERSONS } from './persons';
import { useQuery } from '@apollo/client';

export const usePnPQuery = () => {
  const { data: personsData, loading: personsLoading, error: personsError } = useQuery(GET_PERSONS);
  const { data: passesData, loading: passesLoading, error: passesError } = useQuery(GET_PASSES);

  if (personsData && passesData && !personsLoading && !passesLoading) {
    const persons = personsData.persons;
    const passes = passesData.passes;
    localPnp([...personsData.persons, ...passesData.passes] as any);
  }

  return {
    data: localPnp(),
    loading: personsLoading || passesLoading,
    error: personsError || passesError,
  };
};
