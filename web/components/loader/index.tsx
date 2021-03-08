import React from 'react';
import { Spin } from 'antd';

interface SpinProps {
  tip: string;
}

const Spinner: React.FC<SpinProps> = ({ tip }) => {
  return <Spin tip={tip} />;
};

export default Spinner;
