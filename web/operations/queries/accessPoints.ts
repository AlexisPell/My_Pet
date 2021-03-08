import { gql } from '@apollo/client';

export const GET_ACCESS_POINTS = gql`
  query accessPoints {
    accessPoints {
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
`;
