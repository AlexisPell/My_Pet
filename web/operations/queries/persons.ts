import { gql } from '@apollo/client';

export const GET_PERSONS = gql`
  query persons {
    persons {
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
    }
  }
`;
