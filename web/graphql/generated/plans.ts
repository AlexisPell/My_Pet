/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: plans
// ====================================================

export interface plans_plans {
  __typename: "Plan";
  id: number;
  name: string;
  photoUrl: string | null;
  accessPointIds: number[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface plans {
  plans: plans_plans[];
}
