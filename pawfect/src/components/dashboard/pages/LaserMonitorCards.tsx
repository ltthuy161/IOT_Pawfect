import { Stack } from '@mui/material';
import { laserInfoData } from '../../../data/laser-monitor-data';
import LaserInfo from './LaserMonitor';

const LaserInfoCards = () => {
  return (
    <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {laserInfoData.map((laserInfoDataItem) => (
        <LaserInfo
          id = {laserInfoDataItem.id}
          title={laserInfoDataItem.title}
          image={laserInfoDataItem.image}
          content={laserInfoDataItem.content}
        />
      ))}
    </Stack>
  );
};

export default LaserInfoCards;
