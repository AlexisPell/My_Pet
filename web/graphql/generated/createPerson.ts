/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPerson
// ====================================================

export interface createPerson_createPerson_errors {
  __typename: "FieldError";
  errorType: string;
  message: string;
}

export interface createPerson_createPerson_person {
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

export interface createPerson_createPerson {
  __typename: "PersonResponse";
  errors: createPerson_createPerson_errors[] | null;
  person: createPerson_createPerson_person | null;
}

export interface createPerson {
  createPerson: createPerson_createPerson;
}

export interface createPersonVariables {
  name: string;
  surname: string;
  patronymic: string;
  card: string;
  state?: string | null;
}
