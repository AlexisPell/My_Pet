import { NextPage } from 'next';
// import { useRouter } from 'next/router';

import { Button } from 'antd';

interface NextProps {}

const CreatePlan: NextPage<NextProps> = () => {
  return (
    <div>
      <h1>Create plan</h1>
      <Button>Create me!</Button>
    </div>
  );
};

export default CreatePlan;
