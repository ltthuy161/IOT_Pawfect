import { Stack } from '@mui/material';
import { GetHumidInfoData } from '../../../data/humid-info-data';
import HumidInfo from './HumidityInfo';

const LaserInfoCards = () => {
    const HumidInfoData = GetHumidInfoData();
    return (
        <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
            <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={4.75}>
                {HumidInfoData.map((saleInfoDataItem) => (
                    <HumidInfo
                        key={saleInfoDataItem.id}
                        title={saleInfoDataItem.title}
                        image={saleInfoDataItem.image}
                        value={saleInfoDataItem.value}
                        date={saleInfoDataItem.date}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default LaserInfoCards;
