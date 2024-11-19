import { ReactElement } from 'react';
import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Image from '../../../components/base/Image';
import { useEffect, useState } from 'react';
import { writeData, readData } from '../../../data/database-realtime';
import addNotification from 'react-push-notification';
import logo from '../../../assets/logo/elegant-logo.png';

type monitorInfoProps = {
  id: number;
  image?: string;
  title: string;
  content?: string;
  times: number;
};

const MonitorInfo = ({ id, image, title, content, times }: monitorInfoProps): ReactElement => {
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
    if (id === 1) data_request['Servo'] = 1;
    else if (id === 2) data_request['Pump'] = 1;
    writeData('Request', data_request);

     // increasing the value
     readData('Success').then((result) => {
      if(id === 1) 
        writeData('Success', { food: result.food + 1, water: result.water });
      else if(id === 2)
        writeData('Success', { water: result.water + 1, food: result.food });
    });
    // send notification to the user when the request is sent
    try {
      addNotification({
        title: 'Pawfect Care',
        message: 'Request sent successfully!',
        theme: 'darkblue',
        native: true,
        duration: 5000,
        icon: logo,
        onClick: () => {
          console.log('Notification Clicked!');
        }
      });
      console.log('Notification sent successfully!');
    } 
    catch (error) {
      console.error('Error sending notification:', error);
    }
  };

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
          <Button variant="contained" color="primary">
            <Typography variant="body2" component="p" color="text.primary" onClick={SendRequest}>
              {content}
            </Typography>
          </Button>
            <Typography variant="body1" component="p" color="text.primary">
              {times} times
            </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MonitorInfo;