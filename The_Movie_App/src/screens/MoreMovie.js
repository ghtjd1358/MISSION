import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMorePopular } from '../../Reducer/slice/movieSlice';
import { useNavigation } from '@react-navigation/native';

const MoreMovies = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { popularMovies, popularStatus } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMorePopular());
  }, [dispatch]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.movieItem} 
      onPress={() => navigation.navigate('Detail', { id: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieRating}>Rating: {item.vote_average}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Popular Movies</Text>
      {popularStatus === 'loading' ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={popularMovies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  poster: {
    width: 200,
    height: 300,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  movieRating: {
    fontSize: 16,
    color: 'gray',
  },
});

export default MoreMovies;
