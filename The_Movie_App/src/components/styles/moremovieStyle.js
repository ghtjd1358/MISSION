import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    movieItem: {
      marginBottom: 20,
      alignItems: 'center',
    },
    poster: {
      width: 200,
      height: 300,
    },
    movieTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
    movieRating: {
      fontSize: 16,
      color: 'gray',
    },
  });

  export default styles;