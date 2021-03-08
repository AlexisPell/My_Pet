/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: accessPoints
// ====================================================

export interface accessPoints_accessPoints {
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

export interface accessPoints {
  accessPoints: accessPoints_accessPoints[];
}
