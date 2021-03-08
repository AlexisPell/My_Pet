/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateAccessPoint
// ====================================================

export interface updateAccessPoint_updateAccessPoint_errors {
  __typename: "FieldError";
  errorType: string;
  message: string;
}

export interface updateAccessPoint_updateAccessPoint_accessPoint {
  __typename: "AccessPoint";
  id: number;
  name: string;
  type: string;
  x: number | null;
  y: number | null;
  personIds: number[] | null;
  planId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface updateAccessPoint_updateAccessPoint {
  __typename: "AccessPointResponse";
  errors: updateAccessPoint_updateAccessPoint_errors[] | null;
  accessPoint: updateAccessPoint_updateAccessPoint_accessPoint | null;
}

export interface updateAccessPoint {
  updateAccessPoint: updateAccessPoint_updateAccessPoint | null;
}

export interface updateAccessPointVariables {
  id: number;
  name?: string | null;
  type?: string | null;
  x?: number | null;
  y?: number | null;
  planId?: number | null;
}
