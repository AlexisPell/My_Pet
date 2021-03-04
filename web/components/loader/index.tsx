import React from 'react';
import { Spin } from 'antd';

interface SpinProps {
  tip: string;
}

const Spinner: React.FC<SpinProps> = ({ tip }) => {
  return (
    <div style={{ width: 'auto', display: 'flex', justifyContent: 'center', paddingTop: '25px' }}>
      <Spin tip={tip} />
    </div>
  );
};

export default Spinner;
