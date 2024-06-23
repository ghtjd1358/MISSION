import { configureStore } from '@reduxjs/toolkit'; 
import movieReducer from './slice/movieSlice'; 
import searchReducer from './slice/searchSlice';
import detailReducer from './slice/detailSlice';
import filterReducer from './slice/filterSlice';
// import ratingReducer from './slice/ratingSlice';
import favoritesReducer from './slice/favoriteSlice'


const store = configureStore({
    reducer : {
        movies: movieReducer,
        search: searchReducer,
        detail : detailReducer,
        filter : filterReducer,
        // ratings : ratingReducer,
        favorites : favoritesReducer
    }
});

export default store;