import { gql } from '@apollo/client';

export const GET_ACCESS_POINT = gql`
  query accessPoint($id: Int!) {
    accessPoint(id: $id) {
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
