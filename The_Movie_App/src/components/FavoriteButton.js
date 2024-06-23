import { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { getFirestore, collection, setDoc, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../firebase';

const db = getFirestore(app);
const auth = getAuth();

const FavoriteButton = ({ movieId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const checkFavorite = async () => {
        const q = query(
          collection(db, 'favorites'),
          where('userId', '==', user.uid),
          where('movieId', '==', movieId)
        );
        const querySnapshot = await getDocs(q);
        setIsFavorite(!querySnapshot.empty);
      };

      checkFavorite();
    }
  }, [movieId, user]);

  const handleFavorite = async () => {
    if (isFavorite) {
      const q = query(
        collection(db, 'favorites'),
        where('userId', '==', user.uid),
        where('movieId', '==', movieId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setIsFavorite(false);
    } else {
      const docRef = doc(collection(db, 'favorites'));
      await setDoc(docRef, {
        userId: user.uid,
        movieId: movieId,
      });
      setIsFavorite(true);
    }
  };

  return (
    <Button
      title={isFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
      onPress={handleFavorite}
    />
  );
};

export default FavoriteButton;
