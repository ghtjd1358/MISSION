import { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../../Reducer/slice/searchSlice';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles/searchStyles';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { movies, status } = useSelector(state => state.search)
  const navigation = useNavigation();

  const handleSearch = () => {
    dispatch(searchMovies(query));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="영화 제목을 입력하세요"
        value={query}
        onChangeText={setQuery}
      />
      <Button
        title="검색"
        style={styles.button}
        onPress={handleSearch}
      />
      {status === 'loading' && <Text style={styles.statusText}>검색 중...</Text>}
      {status === 'failed' && <Text style={styles.statusText}>검색 실패</Text>}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieItem}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.movieImage}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Search;
