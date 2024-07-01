import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../firebase';
import axios from 'axios';

const db = getFirestore(app);
const auth = getAuth();
const TMDB_API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const q = query(
          collection(db, 'favorites'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const favoriteMovies = await Promise.all(
          querySnapshot.docs.map(async (favoriteDoc) => {
            const movieId = favoriteDoc.data().movieId;
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`) 
            return { id: favoriteDoc.id, ...response.data };
          })
        );
        return favoriteMovies;
      } catch (err) {
        throw new Error(err.message);
      }
    } else {
      throw new Error('User not authenticated');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default favoritesSlice.reducer;
