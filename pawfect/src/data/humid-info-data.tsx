import humidity from '../assets/info/humidity.png';
import temperature from '../assets/info/cold.png';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { readData } from './database-realtime';

interface HumidInfoData {
  id: number;
  image: string;
  title: string;
  value: number;
  date: string;
}

export const GetHumidInfoData = (): HumidInfoData[] => {
  const [dataHmd, setDataHmd] = useState({Data: 0 });
  const [dataTmp, setDataTmp] = useState({tempC: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readData('Humidity'); // Assuming readData returns the data from Firebase
        setDataHmd(result);
        onValue(ref(database, 'Humidity'), (snapshot) => { 
          setDataHmd(snapshot.val()) 
        });

        const result2 = await readData('Temperature'); // Assuming readData returns the data from Firebase
        setDataTmp(result2);
        onValue(ref(database, 'Temperature'), (snapshot) => { 
          setDataTmp(snapshot.val()) 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const humidInfoData: HumidInfoData[] = [
    {
      id: 1,
      image: humidity,
      title: 'Humidity (%)',
      value: dataHmd.Data,
      date: 'August 2024',
    },
    {
      id: 2,
      image: temperature,
      title: 'Temperature (°C)',
      value: dataTmp.tempC,
      date: 'August 2024',
    },
  ];
  return humidInfoData;
};

