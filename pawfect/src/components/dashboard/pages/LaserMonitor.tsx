import { ReactElement } from 'react';
import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Image from '../../../components/base/Image';
import { writeData, readData } from '../../../data/database-realtime';
import { useEffect, useState } from 'react';

type laserInfoProps = {
  id: number;
  image?: string;
  title: string;
  content: string;
};

const LaserInfo = ({ id, image, title, content }: laserInfoProps): ReactElement => {
   const [data, setData] = useState({ Laser1: 0, Laser2: 0, Servo: 0, Pump: 0 });

   useEffect(() => {
     const fetchData = async () => {
       try {
         const result = await readData('Request'); // Assuming readData returns the data from Firebase
         setData(result);
       } catch (error) {
         console.error('Error fetching data:', error);
       }
     };

     fetchData();
   }, []);
  const SendRequest = () => {
    // write data to the database
    const data_request = data;
    if (id === 1) data_request['Laser1'] = 1 - data.Laser1;
    else if (id === 2)
      data_request['Laser2'] = 1 - data.Laser2;
    writeData('Request', data_request);
  }
  return (
    <Card
      sx={(theme) => ({
        boxShadow: theme.shadows[4],
        width: 1,
        height: 'auto',
      })}
    >
      <CardMedia
        sx={{
          maxWidth: 70,
          maxHeight: 70,
        }}
      >
        <Image src={`${image}`} width={1} height={1} />
      </CardMedia>
      <CardContent
        sx={{
          flex: '1 1 auto',
          padding: 0,
          ':last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
            {title}
          </Typography>
            <Button variant="contained" color="primary" onClick={SendRequest}>
          <Typography variant="body2" component="p" color="text.primary">
            {content}
          </Typography>
            </Button>
        </Stack>
        
      </CardContent>
    </Card>
  );
};

export default LaserInfo;
