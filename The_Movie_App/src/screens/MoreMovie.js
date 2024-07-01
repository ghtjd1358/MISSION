import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlaying, fetchPopular, fetchTopRated, fetchUpcoming } from '../../Reducer/slice/movieSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../components/styles/moremovieStyle';

const MoreMovies = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { title, movies } = route.params || {};
  const { popularMovies, popularStatus } = useSelector(state => state.movies); 
  const [page, setPage] = useState(1);

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
      <Text style={styles.movieRating}>평점: {item.vote_average}</Text>
    </TouchableOpacity>
  );

  const loadMoreMovies = () => {
    if (popularStatus !== 'loading') {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchNowPlaying({ page }));
      dispatch(fetchPopular({ page }));
      dispatch(fetchTopRated({ page }));
      dispatch(fetchUpcoming({ page }));
    }
  }, [page, dispatch]);

  const renderSection = (title, movies, status) => {
    return (
      <View>
        <View>
          <Text style={styles.sectionTitle}>{title || "Popular Movies"}</Text>
        </View>
        {status === 'loading' && (!movies || movies.length === 0) ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={movies || popularMovies}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}  
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.5}
            extraData={movies || popularMovies}
            initialNumToRender={20}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSection(title, movies, popularStatus)}
    </View>
  );
};

export default MoreMovies;
