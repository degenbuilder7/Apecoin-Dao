/* eslint-disable */
import React from 'react';
import { ChartsHeader } from '../../components';

const Bar = () => {
  return (
    <div className="m-4 md:m-10 mt-24 p-10  dark:bg-white rounded-3xl">
      <ChartsHeader category="Bar" title="Voting on Proposal" />
      <iframe
        src="https://dune.com/embeds/2210809/3626347"
        title="Voting on Proposal Chart"
        width="100%"
        height="500px"
        allowFullScreen
      />
    </div>
  );
};

export default Bar;
