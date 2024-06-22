import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlaying, fetchPopular, fetchTopRated, fetchUpcoming } from '../../Reducer/slice/movieSlice';

const Home = () => {
  const dispatch = useDispatch();

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
    <View style={styles.movieItem}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieItem: {
    marginRight: 16,
  },
});

export default Home;
