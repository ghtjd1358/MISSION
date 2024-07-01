import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlaying, fetchPopular, fetchTopRated, fetchUpcoming } from '../../Reducer/slice/movieSlice';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles/homestyles'; 
import Ionic from 'react-native-vector-icons/Ionicons'


const STATUS_LOADING = 'loading';
const STATUS_FAILED = 'failed';

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
        navigation.navigate('Detail', { id: item.id })
      }}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieRating}>평점: {item.vote_average.toFixed(1)}
      </Text>
    </TouchableOpacity>
  );

  const renderSection = (title, movies, status) => (
    <View>
      <View style = {styles.buttonContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity 
        onPress={() => navigation.navigate('MoreMovies', { title, movies })}
      >
        <Text style={styles.moreButtonText}>더보기</Text>
      </TouchableOpacity>
      </View>
      
      {status === STATUS_LOADING ? (
        <ActivityIndicator size="large" />
      ) : status === STATUS_FAILED ? (
        <Text>Failed to load data</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {renderSection('Now Playing', nowPlayingMovies, nowPlayingStatus)}
        {renderSection('Popular', popularMovies, popularStatus)}
        {renderSection('Top Rated', topRatedMovies, topRatedStatus)}
        {renderSection('Upcoming', upcomingMovies, upcomingStatus)}
      </View>
    </ScrollView>
  );
};

export default Home;
