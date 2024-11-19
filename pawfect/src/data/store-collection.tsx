// write collection to firestore database
import { setDoc, getDocs, doc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';

// write collection to firestore database
export function writeCollection(collectionName: string, data: any) {
    try {
        const docRef = doc(collection(firestore, collectionName));
        setDoc(docRef, data);
        console.log('Collection successfully written!');
    } catch (e) {
        console.error('Error writing collection to firestore', e);
    }
}

// read collection from firestore database and return it as an array of objects
export async function readCollection(collectionName: string) {
    const docRef = collection(firestore, collectionName);
    const docSnap = await getDocs(docRef);
    const data: any[] = [];
    docSnap.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}