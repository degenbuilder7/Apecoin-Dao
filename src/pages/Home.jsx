import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_QUERY , GET_VOTES } from "../graphql/Queries";

function Home() {
  // const [citySearched, setCitySearched] = useState("");
  const [getData, { data, error }] = useLazyQuery(GET_QUERY);
  const [getVotes, { votedata, voteerror }] = useLazyQuery(GET_VOTES);
  console.log('the data is', data);
  console.log('votes are ', votedata, voteerror);
  if (error) return <h1> Error found</h1>;

  if (data) {
    console.log(data);
  }

  return (
    <div className="home">
      <h1>Search For Proposal</h1>
      <input
        type="text"
        placeholder="City name..."
        // onChange={(event) => {
        //   setCitySearched(event.target.value);
        // }}
      />
      <button onClick={() => getData()}> Search</button>
      {/* <button onClick={() => getVotes()}> Search</button> */}
      <div className="apecoin">
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

export default Home;
