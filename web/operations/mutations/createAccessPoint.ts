import { gql } from '@apollo/client';

export const CREATE_ACCESS_POINT = gql`
  mutation createAccessPoint($name: String!, $type: String!) {
    createAccessPoint(name: $name, type: $type) {
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
