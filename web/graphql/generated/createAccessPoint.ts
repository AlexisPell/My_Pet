/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAccessPoint
// ====================================================

export interface createAccessPoint_createAccessPoint_errors {
  __typename: "FieldError";
  errorType: string;
  message: string;
}

export interface createAccessPoint_createAccessPoint_accessPoint {
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

export interface createAccessPoint_createAccessPoint {
  __typename: "AccessPointResponse";
  errors: createAccessPoint_createAccessPoint_errors[] | null;
  accessPoint: createAccessPoint_createAccessPoint_accessPoint | null;
}

export interface createAccessPoint {
  createAccessPoint: createAccessPoint_createAccessPoint;
}

export interface createAccessPointVariables {
  name: string;
  type: string;
}
