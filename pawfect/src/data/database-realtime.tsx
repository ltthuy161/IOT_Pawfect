import { database } from '../firebase';
import { ref, get, set } from 'firebase/database';

// read data from firebase database
export const readData = async (path: string) => {
    const snapshot = await get(ref(database, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available');
    }
  };
  
  // write data to firebase database
  export const writeData = async (object: string, data: any) => {
    try {
      await set(ref(database, object), data);
      console.log('Data successfully written!');
    } catch (e) {
      console.error('Error writing data to database', e);
    }
  };
  