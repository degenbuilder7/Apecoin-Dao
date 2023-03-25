/* eslint-disable */
import React from 'react';
import { ChartsHeader } from '../../components';

const ApeHolder = () => {
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Pie" title="Top 100 Ape Holders" />
      <iframe
        src="https://dune.com/embeds/526098/991668"
        title="Voting on Proposal Chart"
        width="100%"
        height="500px"
        allowfullscreen
      />
    </div>
  );
};

export default ApeHolder;
