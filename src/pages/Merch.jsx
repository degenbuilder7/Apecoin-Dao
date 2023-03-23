/* eslint-disable */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { Chat } from "@pushprotocol/uiweb";
import data from './data.json';

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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState([]);

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const theme = {
    btnColorPrimary: "#3e89e6",
    bgColorSecondary: "#3e89e6",
    moduleColor: "#f0f0f0",
  };

  return (
    <>
    <h1 className='text-sky-400 text-center text-6xl'>APE Merch</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }} className="my-6">
      {data.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 345, margin: '1rem' }}>
          <CardMedia
            component="img"
            height="583"
            width="583"
            image={item.image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.subheader}
            </Typography>
          </CardContent>
          <Button className='text-center'>{`Buy for ${item.price} APECOIN`}</Button>
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
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
        <Chat
          account="0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132"
          supportAddress="0xe0c98ed63F1f6Bc8bF745BaC44EeE732eEE78FC5"
          apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
          env="staging"
          greetingMsg={`Get Notified when new proposals arrive`}
          modalTitle={`Chat about Proposals`}
          theme={theme}
        />
    </div>
    </>
  );
}
