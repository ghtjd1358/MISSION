import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';
const URL = 'https://api.themoviedb.org/3';

export const fetchNowPlaying = createAsyncThunk('movies/fetchNowPlaying', async () => {
  const response = await axios.get(`${URL}/movie/now_playing?api_key=${API_KEY}&language=ko`);
  return response.data.results;
});

export const fetchPopular = createAsyncThunk('movies/fetchPopular', async () => {
  const response = await axios.get(`${URL}/movie/popular?api_key=${API_KEY}&language=ko`);
  return response.data.results;
});

export const fetchTopRated = createAsyncThunk('movies/fetchTopRated', async () => {
  const response = await axios.get(`${URL}/movie/top_rated?api_key=${API_KEY}&language=ko`);
  return response.data.results;
});

export const fetchUpcoming = createAsyncThunk('movies/fetchUpcoming', async () => {
  const response = await axios.get(`${URL}/movie/upcoming?api_key=${API_KEY}&language=ko`);
  return response.data.results;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    nowPlayingStatus: 'idle',
    popularStatus: 'idle',
    topRatedStatus: 'idle',
    upcomingStatus: 'idle',
    nowPlayingError: null,
    popularError: null,
    topRatedError: null,
    upcomingError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlaying.pending, (state) => {
        state.nowPlayingStatus = 'loading';
      })
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.nowPlayingStatus = 'succeeded';
        state.nowPlayingMovies = action.payload;
      })
      .addCase(fetchNowPlaying.rejected, (state, action) => {
        state.nowPlayingStatus = 'failed';
        state.nowPlayingError = action.error.message;
      })
      .addCase(fetchPopular.pending, (state) => {
        state.popularStatus = 'loading';
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popularStatus = 'succeeded';
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.popularStatus = 'failed';
        state.popularError = action.error.message;
      })
      .addCase(fetchTopRated.pending, (state) => {
        state.topRatedStatus = 'loading';
      })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.topRatedStatus = 'succeeded';
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchTopRated.rejected, (state, action) => {
        state.topRatedStatus = 'failed';
        state.topRatedError = action.error.message;
      })
      .addCase(fetchUpcoming.pending, (state) => {
        state.upcomingStatus = 'loading';
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.upcomingStatus = 'succeeded';
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.upcomingStatus = 'failed';
        state.upcomingError = action.error.message;
      });
  },
});



export default moviesSlice.reducer;
