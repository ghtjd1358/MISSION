import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 8,
      marginBottom: 16,
    },
    button: {
      marginBottom: 16,
    },
    statusText: {
      textAlign: 'center',
      marginVertical: 16,
    },
    movieItem: {
      flex: 1,
      margin: 8,
      alignItems: 'center',
    },
    movieImage: {
      width: 150,
      height: 225,
      borderRadius: 5,
    },
    movieTitle: {
      fontSize: 14,
      marginTop: 8,
      textAlign: 'center',
    },
  });

  export default styles;