import { Stack } from '@mui/material';
import { GetSaleInfoData } from '../../../data/sale-info-data';
import SaleInfo from './SaleInfo';

const SaleInfoCards = () => {
  const saleInfoData = GetSaleInfoData();
  return (
    <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {saleInfoData.map((saleInfoDataItem) => (
        <SaleInfo
          key={saleInfoDataItem.id}
          title={saleInfoDataItem.title}
          image={saleInfoDataItem.image}
          sales={saleInfoDataItem.sales}
          date={saleInfoDataItem.date}
        />
      ))}
    </Stack>
  );
};

export default SaleInfoCards;
