import { gql } from '@apollo/client';

export const UPDATE_PERSON = gql`
  mutation updatePerson(
    $id: Int!
    $name: String
    $surname: String
    $patronymic: String
    $card: String
    $state: String
  ) {
    updatePerson(
      id: $id
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
