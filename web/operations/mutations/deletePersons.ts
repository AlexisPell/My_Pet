import { gql } from '@apollo/client';

export const DELETE_PERSONS = gql`
  mutation deletePersons($ids: [Int!]!) {
    deletePersons(ids: $ids)
  }
`;
