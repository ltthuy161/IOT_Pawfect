import { Stack } from '@mui/material';
import { GetMonitorInfoData } from '../../../data/monitor-data';
import MonitorInfo from './Monitor';

const MonitorInfoCards = () => {
  const monitorInfoData = GetMonitorInfoData();
  return (
    <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {monitorInfoData.map((laserInfoDataItem) => (
        <MonitorInfo
            id={laserInfoDataItem.id}
            title={laserInfoDataItem.title}
            image={laserInfoDataItem.image}
            content={laserInfoDataItem.content}
            times={laserInfoDataItem.times}
        />
      ))}
    </Stack>
  );
};

export default MonitorInfoCards;
