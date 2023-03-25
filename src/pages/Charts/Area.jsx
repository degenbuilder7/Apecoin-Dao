import React from 'react';
import { ChartsHeader } from '../../components';

const Area = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-secondary-dark-bg dark:bg-white rounded-3xl">
    <ChartsHeader category="Bar" title="Voting on Proposal" />
    <iframe
      src="https://dune.com/embeds/522157/984458"
      title="Proposal Chart"
      width="100%"
      height="500px"
      allowFullScreen
    />
  </div>
);

export default Area;
