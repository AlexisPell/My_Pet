import { gql } from '@apollo/client';

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $surname: String!
    $patronymic: String!
    $card: String!
    $state: String
  ) {
    createPerson(
      name: $name
      surname: $surname
      patronymic: $patronymic
      card: $card
      state: $state
    ) {
      errors {
        errorType
        message
      }
      person {
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
  }
`;
