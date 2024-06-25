import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Actor from './src/screens/Actor';
import Profile from './src/screens/Profile';
import MoreMovies from './src/screens/MoreMovie';
import { NavigationContainer } from '@react-navigation/native';
import Detail from './src/screens/Detail';
import Ionic from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from './Reducer/store';
import app from './firebase';
import Login from './src/screens/Login';
import { getAuth, signOut } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const auth = getAuth();

const handleLogout = async (navigation) => {
  try {
    await signOut(auth);
    navigation.replace('Login');
  } catch (error) {
    console.log(error);
  }
};

const HomeScreen = ({ navigation }) => {
  return (
    <Home>
      <TouchableOpacity
        style={styles.logOutButton}
        onPress={() => handleLogout(navigation)}
      >
        <Text style={styles.logOutText}>로그아웃</Text>
      </TouchableOpacity>
    </Home>
  );
};

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'film' : 'film-outline';
            size = focused ? size + 8 : size + 2;
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Actor') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionic name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 70,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Actor" component={Actor} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            HomeScreen
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabScreen}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
          />
          <Stack.Screen
            name="MoreMovies"
            component={MoreMovies}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logOutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logOutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
