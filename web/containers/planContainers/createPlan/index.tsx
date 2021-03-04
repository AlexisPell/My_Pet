import React, { useState } from 'react';

import { Modal, Input, message } from 'antd';

import { useMutation } from '@apollo/client';
import { CREATE_PLAN } from './../../../operations/mutations/createPlan';
import { createPlan, createPlanVariables } from './../../../graphql/generated/createPlan';
import { GET_PLANS } from './../../../operations/queries/plans';
import { plans } from 'graphql/generated/plans';
import { plan } from 'graphql/generated/plan';
import { GET_PLAN } from 'operations/queries/plan';

interface indexProps {
  visible: boolean;
  onClose: () => void;
}

const CreatePlan: React.FC<indexProps> = ({ visible, onClose }) => {
  const [createPlan] = useMutation<createPlan, createPlanVariables>(CREATE_PLAN);

  const [name, setName] = useState('');

  const createNewPlan = async () => {
    console.log('im here?');
    if (!name.length) {
      message.warning("Plan's name may not be void");
    } else if (name.length < 2) {
      message.warning("Too short for plan's name :)");
    } else {
      const { data } = await createPlan({
        variables: { name },
        // refetchQueries: [{ query: GET_PLANS }],
        update: (store, { data }) => {
          if (data && !data.createPlan.errors) {
            const cachedPlans = store.readQuery<plans>({
              query: GET_PLANS,
            });

            store.writeQuery<plans>({
              query: GET_PLANS,
              data: {
                plans: [data!.createPlan.plan!, ...cachedPlans!.plans],
              },
            });
            message.success("New floor's plan successfully created");
            onClose();
          } else if (data && data.createPlan.errors) {
            const error = data.createPlan.errors[0];
            message.warning(
              <div style={{ fontSize: '18px' }}>
                {error.errorType}
                <br />
                {error.message}
              </div>
            );
          }
        },
      });
    }
  };

  return (
    <Modal
      width='400px'
      visible={visible}
      onCancel={onClose}
      onOk={createNewPlan}
      destroyOnClose
      title={<strong style={{ fontSize: '24px' }}>Create new plan</strong>}
    >
      <Input
        size='large'
        placeholder="Floor's name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};

export default CreatePlan;
