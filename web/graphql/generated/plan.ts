/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: plan
// ====================================================

export interface plan_plan {
  __typename: "Plan";
  id: number;
  name: string;
  photoUrl: string | null;
  accessPointIds: number[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface plan {
  plan: plan_plan | null;
}

export interface planVariables {
  id: number;
}
