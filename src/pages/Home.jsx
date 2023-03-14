/* eslint-disable */
import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import {GET_QUERY} from '../graphql/Queries';

function Home() {
  const { loading, error, data } = useQuery(GET_QUERY);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (

    <div className='grid gap-4 grid-cols-3 grid-rows-3 h-2/3'>
      {data.proposals.slice(0, 10).map((proposal) => (
        <Card variant="outlined" key={proposal.id} >
          <CardHeader title={proposal.title} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Start Date: {new Date(proposal.start * 1000).toDateString()} 
              {new Date(proposal.start * 1000).toLocaleTimeString()}
              <br/>
              End Date: {new Date(proposal.end * 1000).toDateString()} 
              {new Date(proposal.end * 1000).toLocaleTimeString()}
              <br/>
              By: {proposal.author}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Home;
