import { gql } from '@apollo/client';

export const GET_PLANS = gql`
  query plans {
    plans {
      id
      name
      photoUrl
      accessPointIds
      createdAt
      updatedAt
    }
  }
`;
