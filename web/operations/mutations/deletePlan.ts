import { gql } from '@apollo/client';

export const DELETE_PLAN = gql`
  mutation deletePlans($ids: [Int!]!) {
    deletePlans(ids: $ids)
  }
`;
