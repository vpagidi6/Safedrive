import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function getDistractions() {
  try {
    const querySnapshot = await getDocs(collection(db, 'classifications'));
    const distractions = [];
    
    querySnapshot.forEach((doc) => {
      distractions.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return distractions;
  } catch (error) {
    console.error('Error fetching distractions:', error);
    return [];
  }
}
