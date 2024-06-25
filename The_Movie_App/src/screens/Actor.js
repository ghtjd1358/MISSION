import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { filterMovies } from '../../Reducer/slice/filterSlice';
import styles from '../components/styles/actorstyles';
import { useNavigation } from '@react-navigation/native';

const MoviesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const movies = useSelector(state => state.filter.items);
  const status = useSelector(state => state.filter.status);
  const [filter, setFilter] = useState('popular');

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={()=>{
        navigation.navigate('Detail', {id : item.id})
      }}
    >
      <View style={styles.movieContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
        <View style={styles.movieDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>평점: {item.vote_average}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  useEffect(() => {
    dispatch(filterMovies(filter));
  }, [filter, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setFilter('popular')}>
          <Text style={styles.buttonText}>인기순</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setFilter('top_rated')}>
          <Text style={styles.buttonText}>평점순</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setFilter('now_playing')}>
          <Text style={styles.buttonText}>신규순</Text>
        </TouchableOpacity>
      </View>
      {status === 'loading' ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default MoviesScreen;
