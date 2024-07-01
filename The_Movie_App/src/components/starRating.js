import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { saveRating, fetchRatings } from '../../Reducer/slice/ratingSlice';

export default function StarRatingComponent({ movieId }) {
const dispatch = useDispatch();
const { ratings, loading, error } = useSelector((state) => state.rating);

const userRating = ratings.find(r => r.movieId === movieId)?.rating || 0;
const [rating, setRating] = useState(userRating);

useEffect(() => {
dispatch(fetchRatings());
}, []);

const handleRating = (rate) => {
setRating(rate);
dispatch(saveRating({ movieId, rating: rate }));
};

return (
<View>
<Rating
     startingValue={rating}
     imageSize={30}
     onFinishRating={handleRating}
   />
<Text>Current Rating: {rating}</Text>
</View>
);
}