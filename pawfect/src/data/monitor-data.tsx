import food from '../assets/info/food.png';
import water from '../assets/info/water.png';
import { useEffect, useState } from 'react';
import { readData } from './database-realtime';
import { onValue, ref } from 'firebase/database';
import { database } from '../firebase';

interface MonitorInfoData {
  id: number;
  image: string;
  title: string;
  content?: string;
  times: number;
}

export const GetMonitorInfoData = (): MonitorInfoData[] => {
  const [ data, setData ] = useState({ water: 0, food: 0 });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readData('Success'); // Assuming readData returns the data from Firebase
        setData(result);
        onValue(ref(database, 'Success'), (snapshot) => {
          setData(snapshot.val());
        }
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const monitorInfoData: MonitorInfoData[] = [
  {
    id: 1,
    image: food,
    title: 'Food',
    content: 'On',
    times: data.food,
  },
  {
    id: 2,
    image: water,
    title: 'Water',
    content: 'On',
    times: data.water,
  },
];
  return monitorInfoData;
}
