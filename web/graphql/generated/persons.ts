/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: persons
// ====================================================

export interface persons_persons {
  __typename: "Person";
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  card: string;
  state: string;
  photo: string | null;
  accessPointIds: number[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface persons {
  persons: persons_persons[];
}
