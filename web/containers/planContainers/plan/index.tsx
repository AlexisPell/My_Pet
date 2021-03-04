import React, { useEffect, useMemo, useState } from 'react';

import { List, Input, Button } from 'antd';

// Apollo
import { useQuery } from '@apollo/client';
import { GET_PLAN } from './../../../operations/queries/plan';
import { plan, planVariables } from './../../../graphql/generated/plan';

import Spinner from './../../../components/loader';

interface PlanProps {
  planId: number;
}

const Plan: React.FC<PlanProps> = ({ planId }) => {
  const { data, loading, error } = useQuery<plan, planVariables>(GET_PLAN, {
    variables: { id: planId },
  });

  if (loading) return <Spinner tip='Plan is loading...' />;
  if (error) return <h1>Error occured...</h1>;

  return (
    <div>
      <h1>plan</h1>
      <h2>plan name: {data?.plan?.name}</h2>
    </div>
  );
};

export default Plan;
