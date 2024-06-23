import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { filterMovies } from '../../Reducer/slice/filterSlice';

const MoviesScreen = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.filter.items);
  const status = useSelector(state => state.filter.status);
  const [filter, setFilter] = useState('popular');

  useEffect(() => {
    dispatch(filterMovies(filter));
  }, [filter, dispatch]);

  const renderMovie = ({ item }) => {
    return (
      <View style={styles.movieContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
        <View style={styles.movieDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>Rating: {item.vote_average}</Text>
        </View>
      </View>
    );
  };

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
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight : 25
  },
  movieContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 150,
  },
  movieDetails: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MoviesScreen;
