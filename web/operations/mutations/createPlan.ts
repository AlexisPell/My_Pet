import { gql } from '@apollo/client';

export const CREATE_PLAN = gql`
  mutation createPlan($name: String!) {
    createPlan(name: $name) {
      errors {
        errorType
        message
      }
      plan {
        id
        name
        photoUrl
        accessPointIds
        createdAt
        updatedAt
      }
    }
  }
`;
