import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';
const URL = 'https://api.themoviedb.org/3';

const URLS = {
  popular: `${URL}/movie/popular?api_key=${API_KEY}`,
  top_rated: `${URL}/movie/top_rated?api_key=${API_KEY}`,
  now_playing: `${URL}/movie/now_playing?api_key=${API_KEY}`,
};

export const filterMovies = createAsyncThunk(
  'movies/filterMovies',
  async (filterType) => {
    const url = URLS[filterType] || URLS.popular;
    const response = await axios.get(url);
    return response.data.results;
  }
);

const filterSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    status: null,
    favorites: [],
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        movie => movie.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(filterMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(filterMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite } = filterSlice.actions;

export default filterSlice.reducer;
