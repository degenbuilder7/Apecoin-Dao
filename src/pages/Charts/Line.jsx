import React from 'react';

import { ChartsHeader, ProposalChart } from '../../components';

const Line = () => (
  <div className="m-4 md:m-10 mt-24 p-10  dark:bg-white rounded-3xl">
    <ChartsHeader category="Line" title="Proposal Chart" />
    <div className="w-full">
      <ProposalChart />
    </div>
  </div>
);

export default Line;
