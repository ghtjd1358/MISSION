import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../Reducer/slice/favoriteSlice';
import { styles } from './styles/favoritesStyle';

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector((state) => state.favorites);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchFavorites());
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
      <View style={styles.movieDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>Rating: {item.vote_average}</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList 
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text style={styles.noFavorites}>No favorites found.</Text>
      )}
    </View>
  );
};

export default Favorites;
