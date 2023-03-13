import { useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import GET_QUERY from '../graphql/Queries';

function Home() {
  const { loading, error, data } = useQuery(GET_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.proposals.slice(0, 10).map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader title={proposal.title} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {proposal.body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Home;
