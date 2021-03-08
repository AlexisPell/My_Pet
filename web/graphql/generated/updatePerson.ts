/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePerson
// ====================================================

export interface updatePerson_updatePerson_errors {
  __typename: "FieldError";
  errorType: string;
  message: string;
}

export interface updatePerson_updatePerson_person {
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

export interface updatePerson_updatePerson {
  __typename: "PersonResponse";
  errors: updatePerson_updatePerson_errors[] | null;
  person: updatePerson_updatePerson_person | null;
}

export interface updatePerson {
  updatePerson: updatePerson_updatePerson | null;
}

export interface updatePersonVariables {
  id: number;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
  card?: string | null;
  state?: string | null;
}
