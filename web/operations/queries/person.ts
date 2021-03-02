import { gql } from '@apollo/client';

export const GET_PERSON = gql`
  query person($id: Int!) {
    person(id: $id) {
      id
      name
      surname
      patronymic
      card
      state
      photo
      accessPointIds
      createdAt
      updatedAt
      concattedBIO
    }
  }
`;
