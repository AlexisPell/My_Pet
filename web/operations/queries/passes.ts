import { gql } from '@apollo/client';

export const GET_PASSES = gql`
  query passes {
    passes {
      id
      card
      state
      personId
      createdAt
      updatedAt
    }
  }
`;
