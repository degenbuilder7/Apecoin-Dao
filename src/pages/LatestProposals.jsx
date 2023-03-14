/* eslint-disable */
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {  GET_LATEST_PROPOSALS } from '../graphql/Queries';

function LatestProposals() {
  // const [citySearched, setCitySearched] = useState('');
  // const [getData, { data, error }] = useLazyQuery(GET_QUERY);
  const [getProposals, { data, error }] = useLazyQuery(GET_LATEST_PROPOSALS);
  // console.log('the data is', data);
  console.log('proposal ', data, error);
  console.log(data.proposals,'k');
  // if (error) return <h1> Error found</h1>;

  // if (data) {
  //   console.log(votedata);
  // }

  return (
    <div className='home'>
      <h1>Search For Proposal</h1>
      <input
        type='text'
        placeholder='City name...'
        // onChange={(event) => {
        //   setCitySearched(event.target.value);
        // }}
      />
      {/* <button onClick={() => getData()}> Search</button> */}
      <button onClick={() => getProposals()}> Search</button>
      <div className='apecoin'>
        {/* {data && (
          <>
            <h1>
              Description: {data.}
            </h1>
            <h1>xyz: {data.}</h1>
          </>
        )} */}
      </div>
    </div>
  );
}

export default LatestProposals;
