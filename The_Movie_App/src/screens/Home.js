import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlaying, fetchPopular, fetchTopRated, fetchUpcoming } from '../../Reducer/slice/movieSlice';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { 
    nowPlayingMovies, 
    popularMovies, 
    topRatedMovies, 
    upcomingMovies, 
    nowPlayingStatus, 
    popularStatus, 
    topRatedStatus, 
    upcomingStatus 
  } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchNowPlaying());
    dispatch(fetchPopular());
    dispatch(fetchTopRated());
    dispatch(fetchUpcoming());
  }, [dispatch]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.movieItem} 
      
      onPress={() => {
        navigation.navigate('Detail', { id : item.id })}
      }
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
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Now Playing</Text>
        {nowPlayingStatus === 'loading' ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={nowPlayingMovies}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}

        <Text style={styles.sectionTitle}>Popular</Text>
        {popularStatus === 'loading' ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={popularMovies}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}

        <Text style={styles.sectionTitle}>Top Rated</Text>
        {topRatedStatus === 'loading' ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={topRatedMovies}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}

        <Text style={styles.sectionTitle}>Upcoming</Text>
        {upcomingStatus === 'loading' ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={upcomingMovies}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    paddingVertical: 16,
  },
  container: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'left',
  },
  movieItem: {
    marginRight: 16,
    width: 140,
  },
  poster: {
    width: '100%',
    height: 210,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  movieRating: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Home;
