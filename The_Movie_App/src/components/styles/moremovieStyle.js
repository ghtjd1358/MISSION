import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  movieRating: {
    fontSize: 16,
    color: 'gray',
  },
});

export default styles;
