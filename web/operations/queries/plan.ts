import { gql } from '@apollo/client';

export const GET_PLAN = gql`
  query plan($id: Int!) {
    plan(id: $id) {
      id
      name
      photoUrl
      accessPointIds
      createdAt
      updatedAt
    }
  }
`;
