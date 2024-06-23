import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';
import { movieDetail } from '../../Reducer/slice/detailSlice';
import FavoriteButton from '../components/FavoriteButton';

const Detail = ({ route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.detail.movie);
  const status = useSelector((state) => state.detail.status);
  const error = useSelector((state) => state.detail.error);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    dispatch(movieDetail(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === 'failed') {
    return <Text>에러: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {movie && (
        <>
         <RatingComponent/>
          <View style={styles.movieInfoContainer}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.movieImage}
              resizeMode="cover"
            />
            <View style={styles.movieDetailsContainer}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieRating}>평점: {movie.vote_average}</Text>
              <Text style={styles.movieDetail}>개봉일: {movie.release_date}</Text>
              <Text style={styles.movieDetail}>국가: {movie.production_countries?.map(c => c.name).join(', ')}</Text>
              <Text style={styles.movieDetail}>언어: {movie.spoken_languages?.map(l => l.name).join(', ')}</Text>
              <Text style={styles.movieDetail}>수익: ${movie.revenue?.toLocaleString()}</Text>
              <Text style={styles.movieDetail}>제작회사: {movie.production_companies?.map(c => c.name).join(', ')}</Text>
              <Text style={styles.movieDetail}>장르: {movie.genres?.map(g => g.name).join(', ')}</Text>

              <FavoriteButton movieId={id} />
            </View>
          </View>

          <Text style={styles.movieDescription}>{movie.overview}</Text>

          {movie.credits && movie.credits.cast && (
            <>
              <Text style={styles.sectionTitle}>출연 배우:</Text>
              <FlatList
                horizontal
                data={movie.credits.cast.slice(0, 10)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.actorContainer}>
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
                      style={styles.actorImage}
                    />
                    <Text style={styles.actorName}>{item.name}</Text>
                    <Text style={styles.actorCharacter}>{item.character}</Text>
                  </View>
                )}
              />
            </>
          )}

          <Text style={styles.sectionTitle}>비디오:</Text>
          {movie.videos && movie.videos.results.length > 0 ? (
            <>
              {videoId && (
                <YoutubePlayer
                  height={200}
                  play={true}
                  videoId={videoId}
                  onChangeState={event => {
                    if (event === 'ended') {
                      setVideoId(null);
                    }
                  }}
                />
              )}
              <FlatList
                horizontal
                data={movie.videos.results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setVideoId(item.key)}>
                    <View style={styles.videoContainer}>
                      <Image
                        source={{ uri: `https://img.youtube.com/vi/${item.key}/0.jpg` }}
                        style={styles.videoThumbnail}
                      />
                      <Text style={styles.videoLink}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            <Text>비디오 없음</Text>
          )}

          <Text style={styles.sectionTitle}>비슷한 영화:</Text>
          {movie.similar && movie.similar.results.length > 0 ? (
            <FlatList
              horizontal
              data={movie.similar.results.slice(0, 10)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.similarMovieContainer}>
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={styles.similarMovie}
                  />
                  <Text style={styles.similarMovieTitle}>{item.title}</Text>
                </View>
              )}
            />
          ) : (
            <Text>비슷한 영화 없음</Text>
          )}

         
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  movieInfoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  movieImage: {
    width: 160,
    height: 250,
    borderRadius: 10,
  },
  movieDetailsContainer: {
    flex: 1,
    marginLeft: 15,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color : '#000'
  },
  movieRating: {
    fontSize: 16,
    marginBottom: 5,
    color : '#000'
  },
  movieDetail: {
    fontSize: 14,
    marginBottom: 3,
    color : '#000'
  },
  movieDescription: {
    fontSize: 16,
    marginBottom: 20,
    color : '#000'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color : '#000'
  },
  actorContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  actorImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  actorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color : '#000'
  },
  actorCharacter: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    color : 'green'
  },
  videoContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  videoThumbnail: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  videoLink: {
    fontSize: 14,
    color : '#000',
    textAlign: 'center',
  },
  similarMovieContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  similarMovie: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  similarMovieTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Detail;