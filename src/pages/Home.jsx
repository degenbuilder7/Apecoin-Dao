/* eslint-disable */
import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import {GET_QUERY} from '../graphql/Queries';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cardStyle = {
  height: '400px', // set a fixed height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const cardContentStyle = {
  flexGrow: 1,
  overflow: 'hidden',
};
function Home() {
  const { loading, error, data } = useQuery(GET_QUERY);
  const [expanded, setExpanded] = React.useState(Array(10).fill(false));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleExpandClick = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <>
    <h1 className='text-green-400 text-center text-6xl'>APE Proposals</h1>
    <div className='grid gap-4 grid-cols-3 grid-rows-3 h-2/ my-6 p-6'>
      {data.proposals.slice(0, 10).map((proposal, index) => (
        <Card variant="outlined" key={proposal.id} style={cardStyle}>
          <div>
            <CardHeader title={proposal.title} />
            <CardContent style={cardContentStyle}>
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
          </div>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded[index]}
              onClick={() => handleExpandClick(index)}
              aria-expanded={expanded[index]}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
            <div style={{ height: '200px', overflowY: 'auto' }}>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  {proposal.body}
                </Typography>
              </CardContent>
            </div>
          </Collapse>
        </Card>
      ))}
    </div>
    </>
  );
}
export default Home;
