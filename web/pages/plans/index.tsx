import React, { useMemo, useState } from 'react';
import { NextPage } from 'next';

import { List, Input, Tooltip, Modal } from 'antd';
import { DeleteTwoTone, EditTwoTone, PlusSquareTwoTone } from '@ant-design/icons';

const { confirm } = Modal;

// Apollo
import { useQuery, useMutation } from '@apollo/client';
import { GET_PLANS } from './../../operations/queries/plans';
import { plans } from './../../graphql/generated/plans';
import { DELETE_PLAN } from 'operations/mutations/deletePlan';
import { deletePlans, deletePlansVariables } from 'graphql/generated/deletePlans';

import Spinner from './../../components/loader';
import Navbar from './../../containers/navbar/index';
import Plan from './../../containers/planContainers/plan/index';
import CreatePlan from './../../containers/planContainers/createPlan/index';

const Plans: NextPage = () => {
  const { data, loading, error } = useQuery<plans>(GET_PLANS, { ssr: false });
  const [deletePlan] = useMutation<deletePlans, deletePlansVariables>(DELETE_PLAN);

  // local state
  const [filterPattern, setFilterPattern] = useState('');
  const [createPlanModalVisible, setCreatePlanModalVisible] = useState(false);
  const [planId, setPlanId] = useState<number>();

  // plans memo
  const plans = useMemo(() => {
    if (loading && error) return null;
    if (filterPattern !== '') {
      return data?.plans.filter((p) => p.name.toLowerCase().includes(filterPattern));
    }
    return data?.plans;
  }, [data, loading, error, filterPattern, setFilterPattern]);

  if (loading) return <Spinner tip='Plans are loading...' />;
  if (error) return <h1>Error occured...</h1>;
  return (
    <>
      <Navbar title='plans' />
      <div className='content-layout plans'>
        <div className='plans__list'>
          <List
            size='large'
            bordered
            header={
              <>
                <div className='plans__list-item' style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '20px' }}>Plans List:</strong>
                  <div>
                    <PlusSquareTwoTone
                      style={{ fontSize: '20px' }}
                      onClick={() => setCreatePlanModalVisible(true)}
                    />
                  </div>
                </div>
                <Input
                  placeholder='Filter plans'
                  value={filterPattern}
                  onChange={(e) => {
                    setFilterPattern(e.target.value);
                  }}
                />
              </>
            }
            dataSource={plans!}
            renderItem={(plan) => (
              <List.Item onClick={() => setPlanId(plan.id)} className='plans__list-item'>
                <Tooltip title={plan.name}>
                  <div key={plan.id}>{plan.name}</div>
                </Tooltip>
                <div>
                  <EditTwoTone />
                  <Tooltip title={`Delete ${plan.name}`}>
                    <DeleteTwoTone
                      onClick={() =>
                        confirm({
                          title: `Do you want to delete plan ${plan.name}?`,
                          onOk: () =>
                            deletePlan({
                              variables: { ids: [plan.id] },
                              refetchQueries: [{ query: GET_PLANS }],
                            }),
                        })
                      }
                    />
                  </Tooltip>
                </div>
              </List.Item>
            )}
          />
        </div>
        <Plan planId={planId || data!.plans[0].id} />
      </div>
      {createPlanModalVisible && (
        <CreatePlan
          visible={createPlanModalVisible}
          onClose={() => setCreatePlanModalVisible(false)}
        />
      )}
    </>
  );
};

export default Plans;
