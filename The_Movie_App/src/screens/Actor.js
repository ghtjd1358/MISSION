import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { filterMovies } from '../../Reducer/slice/filterSlice';
import styles from '../components/styles/actorstyles';
import { useNavigation } from '@react-navigation/native';

const MoviesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { movies, status } = useSelector(state => state.filter);
  const [filter, setFilter] = useState('popular');
  const [page, setPage] = useState(1);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('Detail', { id: item.id })}
    >
      <View style={styles.movieContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
        <View style={styles.movieDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>평점: {item.vote_average}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    dispatch(filterMovies({ filter, page: 1 }));
  }, [filter]);

  useEffect(() => {
    if (page > 1) {
      dispatch(filterMovies({ filter, page }));
    }
  }, [page, filter]);

  const loadMoreMovies = () => {
    if (status !== 'loading') {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, filter === 'popular' && styles.activeButton]}
          onPress={() => { setFilter('popular'); setPage(1); }}
        >
          <Text style={styles.buttonText}>인기순</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, filter === 'top_rated' && styles.activeButton]}
          onPress={() => { setFilter('top_rated'); setPage(1); }}
        >
          <Text style={styles.buttonText}>평점순</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, filter === 'now_playing' && styles.activeButton]}
          onPress={() => { setFilter('now_playing'); setPage(1); }}
        >
          <Text style={styles.buttonText}>신규순</Text>
        </TouchableOpacity>
      </View>
      {status === 'loading' && page === 1 ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={movies[filter]}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default MoviesScreen;
