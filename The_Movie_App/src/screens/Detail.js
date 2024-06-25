import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';
import { movieDetail } from '../../Reducer/slice/detailSlice';
import FavoriteButton from '../components/FavoriteButton';
import styles from '../components/styles/detailStyles';
// import StarRating from 'react-native-star-rating'; 

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
      {movie && ( // movie가 유효한 경우에만 렌더링
        <>
          <View style={styles.movieInfoContainer}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.movieImage}
              resizeMode="cover"
            />
            <View style={styles.movieDetailsContainer}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              {/* <StarRating
                disabled={false}
                maxStars={5}
                value={movie.vote_average}
                starSize={30}
                fullStarColor={'gold'}
                emptyStarColor={'gold'}
              /> */}
              <Text style={styles.movieDetail}>개봉일: {movie.release_date}</Text>
              <Text style={styles.movieDetail}>국가: {movie.production_countries.map(con => con.name).join(', ')}</Text>
              <Text style={styles.movieDetail}>언어: {movie.spoken_languages.map(l => l.name).join(', ')}</Text>
              <Text style={styles.movieDetail}>수익: ${movie.revenue.toLocaleString()}</Text>
              <Text style={styles.movieDetail}>제작회사: {movie.production_companies.map(c => c.name).join(', ')}</Text>
              <Text style={styles.movieDetail}>장르: {movie.genres.map(g => g.name).join(', ')}</Text>

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

export default Detail;
