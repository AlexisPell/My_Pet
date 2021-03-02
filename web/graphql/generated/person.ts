/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: person
// ====================================================

export interface person_person {
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
  concattedBIO: string;
}

export interface person {
  person: person_person | null;
}

export interface personVariables {
  id: number;
}
