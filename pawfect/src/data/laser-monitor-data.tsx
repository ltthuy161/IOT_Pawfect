import laser from '../assets/info/laser.png'

interface LaserInfoData {
  id: number;
  image: string;
  title: string;
  content: string;
}

export const laserInfoData: LaserInfoData[] = [
  {
    id: 1,
    image: laser,
    title: 'Laser 1',
    content: 'On/Off',
  },
  {
    id: 2,
    image: laser,
    title: 'Laser 2',
    content: 'On/Off',
  },
];
