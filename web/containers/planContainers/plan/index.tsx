import React, { useEffect, useMemo, useState } from 'react';

import { Input, Tooltip, Button, Upload } from 'antd';
import { EditTwoTone, CheckCircleTwoTone, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

// Apollo
import { useQuery } from '@apollo/client';
import { GET_PLAN } from './../../../operations/queries/plan';
import { plan, planVariables } from './../../../graphql/generated/plan';

import Spinner from './../../../components/loader';

interface PlanProps {
  planId: number;
}

const numRows = 20;
const numCols = 20;

const Plan: React.FC<PlanProps> = ({ planId }) => {
  const { data, loading, error } = useQuery<plan, planVariables>(GET_PLAN, {
    variables: { id: planId },
  });
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
      rows.push(
        Array.from(Array(numCols), (_, colIdx) => ({
          x: rowIdx,
          y: colIdx,
        }))
      );
    }
    return rows;
  });

  const [editingPlan, setEditingPlan] = useState({
    isEditingPlan: false,
    planName: '',
  });

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  };

  const pickACell = (rId: number, cId: number) => {
    console.log(rId, cId);
  };

  if (loading) return <Spinner tip='Plan is loading...' />;
  if (error) return <h1>Error occured...</h1>;
  return (
    <div className='plan'>
      <div className='plan-header'>
        <div>
          {editingPlan.isEditingPlan ? (
            <div className='plan-header__name'>{data?.plan?.name}</div>
          ) : (
            <>
              <Input className='plan-header__input' size='large' defaultValue={data?.plan?.name} />
              <Tooltip title="Update plan's name">
                <Button type='link'>
                  <CheckCircleTwoTone style={{ fontSize: '18px' }} />
                </Button>
              </Tooltip>
            </>
          )}{' '}
          <Tooltip title="Edit plan's name">
            <EditTwoTone
              style={{ fontSize: '18px', marginLeft: '10px' }}
              onClick={() =>
                setEditingPlan({
                  isEditingPlan: !editingPlan.isEditingPlan,
                  planName: data!.plan!.name,
                })
              }
            />
          </Tooltip>
          <Upload {...props}>
            <Button className='plan-header__photo-upload' icon={<UploadOutlined />}>
              Upload plan photo
            </Button>
          </Upload>
        </div>
        <div className='plan-header__date'>
          <div>Created at: {moment(data!.plan!.createdAt, 'x').format('DD MMM YYYY hh:mm a')}</div>
          <div>
            Last updated: {moment(data!.plan!.updatedAt, 'x').format('DD MMM YYYY hh:mm a')}
          </div>
        </div>
      </div>
      <div className='plan-body'>
        {!data?.plan?.photoUrl && (
          <div>Add a background image for visualising your building's floor schema</div>
        )}
        <div className='grid'>
          {grid.map((rows, rIdx) =>
            rows.map((col, cIdx) => {
              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className='grid-cell'
                  onClick={() => pickACell(rIdx, cIdx)}
                >
                  x
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
