import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export function subscribeToDistractions(callback) {
  return onSnapshot(collection(db, 'classifications'), (querySnapshot) => {
    const distractions = [];
    querySnapshot.forEach((doc) => {
      distractions.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(distractions);
  }, (error) => {
    console.error('Error subscribing to distractions:', error);
    callback([]);
  });
}
