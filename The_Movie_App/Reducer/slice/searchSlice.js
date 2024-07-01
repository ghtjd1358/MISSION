import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';
const URL = 'https://api.themoviedb.org/3/search/movie';

export const searchMovies = createAsyncThunk(
  'search/fetchMovies',
  async (query) => {
    try {
      const response = await axios.get(
        `${URL}?api_key=${API_KEY}&query=${query}&language=ko`
      );
      return response.data.results;
    } catch (error) {
      return new Error(error.message)
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
