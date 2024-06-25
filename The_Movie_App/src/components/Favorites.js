import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../Reducer/slice/favoriteSlice';
import { styles } from './styles/favoritesStyle';
import { useNavigation } from '@react-navigation/native';

const Favorites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.movieItem} 
      onPress={() => {
        navigation.navigate('Detail', { id: item.id });
      }}
    >
      <View style={styles.movieContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
        <View style={styles.movieDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>Rating: {item.vote_average}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
          renderItem={renderMovieItem}
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
