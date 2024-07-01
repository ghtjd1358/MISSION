import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';
const URL = 'https://api.themoviedb.org/3';

export const filterMovies = createAsyncThunk(
  'filter/filterMovies',
  async ({ filter, page }) => {
    const URLS = {
      popular: `${URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
      top_rated: `${URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
      now_playing: `${URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`,
    };

    const url = URLS[filter] || URLS.popular;
    const response = await axios.get(url);
    console.log('response data', response.data)
    return { filter, movies: response.data.results, page };  
  }
);

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    movies: {
      popular: [],
      top_rated: [],
      now_playing: []
    },
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(filterMovies.fulfilled, (state, action) => {
        const { filter, movies, page } = action.payload;
        state.status = 'succeeded';
        if (page === 1) {
          state.movies[filter] = movies;
        } else {
          state.movies[filter] = [...state.movies[filter], ...movies];
        }
      })
      .addCase(filterMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default filterSlice.reducer;
