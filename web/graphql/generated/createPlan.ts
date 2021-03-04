/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPlan
// ====================================================

export interface createPlan_createPlan_errors {
  __typename: "FieldError";
  errorType: string;
  message: string;
}

export interface createPlan_createPlan_plan {
  __typename: "Plan";
  id: number;
  name: string;
  photoUrl: string | null;
  accessPointIds: number[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface createPlan_createPlan {
  __typename: "PlanResponse";
  errors: createPlan_createPlan_errors[] | null;
  plan: createPlan_createPlan_plan | null;
}

export interface createPlan {
  createPlan: createPlan_createPlan;
}

export interface createPlanVariables {
  name: string;
}
