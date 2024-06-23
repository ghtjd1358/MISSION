import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';

export const movieDetail = createAsyncThunk(
  'detail/movieDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}&language=ko`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'credits,videos,similar'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    movie: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(movieDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(movieDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(movieDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default detailSlice.reducer;
