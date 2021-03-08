import { gql } from '@apollo/client';

export const UPDATE_ACCESS_POINT = gql`
  mutation updateAccessPoint(
    $id: Int!
    $name: String
    $type: String
    $x: Int
    $y: Int
    $planId: Int
  ) {
    updateAccessPoint(id: $id, name: $name, type: $type, x: $x, y: $y, planId: $planId) {
      errors {
        errorType
        message
      }
      accessPoint {
        id
        name
        type
        x
        y
        personIds
        planId
        createdAt
        updatedAt
      }
    }
  }
`;
