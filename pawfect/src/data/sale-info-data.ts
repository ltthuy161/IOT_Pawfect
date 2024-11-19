import food from '../assets/info/food.png';
import water from '../assets/info/water.png';
import { readData } from './database-realtime';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../firebase';

interface SaleInfoData {
  id: number;
  image: string;
  title: string;
  sales: number;
  date: string;
}

export const GetSaleInfoData = (): SaleInfoData[] => {
  // inintialize data state
  const [dataDrink, setDataDrink] = useState({ resval: 0  });
  const [dataFood, setDataFood] = useState({ grams: 0 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readData('Drink'); // Assuming readData returns the data from Firebase
        setDataDrink(result);
        onValue(ref(database, 'Drink'), (snapshot) => {
          setDataDrink(snapshot.val());
        });
        const result2 = await readData('Food'); // Assuming readData returns the data from Firebase
        setDataFood(result2);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const saleInfoData: SaleInfoData[] = [
    {
      id: 1,
      image: water,
      title: 'Water',
      sales: dataDrink.resval,
      date: 'August 2024',
    },
    {
      id: 2,
      image: food,
      title: 'Food',
      sales: dataFood.grams,
      date: 'August 2024',
    },
  ];

  return saleInfoData;
};
