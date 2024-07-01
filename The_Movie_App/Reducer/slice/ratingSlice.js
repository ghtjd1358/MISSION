import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs, query, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../firebase';
import axios from 'axios';

const db = getFirestore(app);
const auth = getAuth();
const TMDB_API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';

// 비동기 작업 정의: 별점을 가져오는 작업
export const fetchRatings = createAsyncThunk(
'ratings/fetchRatings',
async (_, { rejectWithValue }) => {
const user = auth.currentUser;
if (user) {
try {
const q = query(
collection(db, 'ratings'),
where('userId', '==', user.uid)
);
const querySnapshot = await getDocs(q);
const ratings = await Promise.all(
querySnapshot.docs.map(async (doc) => {
const movieId = doc.data().movieId;
const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
return { id: doc.id, ...response.data, rating: doc.data().rating };
})
);
return ratings;
} catch (err) {
return rejectWithValue(err.message);
}
} else {
return rejectWithValue('User not authenticated');
}
}
);

// 비동기 작업 정의: 별점을 저장하는 작업
export const saveRating = createAsyncThunk(
'ratings/saveRating',
async ({ movieId, rating }, { rejectWithValue }) => {
const user = auth.currentUser;
if (user) {
try {
const q = query(
collection(db, 'ratings'),
where('userId', '==', user.uid),
where('movieId', '==', movieId)
);
const querySnapshot = await getDocs(q);
if (!querySnapshot.empty) {
// 이미 존재하는 경우 업데이트
const docRef = doc(db, 'ratings', querySnapshot.docs[0].id);
await updateDoc(docRef, { rating });
} else {
// 존재하지 않는 경우 새로 추가
await addDoc(collection(db, 'ratings'), {
userId: user.uid,
movieId,
rating,
});
}
return { movieId, rating };
} catch (err) {
return rejectWithValue(err.message);
}
} else {
return rejectWithValue('User not authenticated');
}
}
);

const initialState = {
ratings: [],
loading: false,
error: null,
};

const ratingSlice = createSlice({
name: 'rating',
initialState,
reducers: {
setRating: (state, action) => {
state.ratings = action.payload;
},
},
extraReducers: (builder) => {
builder
.addCase(fetchRatings.pending, (state) => {
state.status = 'loading';
state.error = null;
})
.addCase(fetchRatings.fulfilled, (state, action) => {
state.status = 'succeeded';
state.ratings = action.payload;
})
.addCase(fetchRatings.rejected, (state, action) => {
state.status = 'failed';
state.error = action.payload;
})
.addCase(saveRating.fulfilled, (state, action) => {
const { movieId, rating } = action.payload;
const existingRating = state.ratings.find(r => r.movieId === movieId);
if (existingRating) {
existingRating.rating = rating;
} else {
state.ratings.push(action.payload);
}
})
.addCase(saveRating.rejected, (state, action) => {
state.error = action.payload;
});
},
});

export const { setRating } = ratingSlice.actions;
export default ratingSlice.reducer;