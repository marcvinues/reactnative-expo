import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { 
  createAppContainer, 
  createBottomTabNavigator, 
  createStackNavigator 
} from 'react-navigation';
import { Provider } from 'react-redux';


import store from './store'
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {

  render() {
    // para iphone X en adelante, react navigation 3 this is the way
    const MainNavigation = createAppContainer(createBottomTabNavigator({
      welcome: { 
        screen: WelcomeScreen,
        navigationOptions:{tabBarVisible: false}
      },
      auth: { 
        screen: AuthScreen,
        navigationOptions:{tabBarVisible: false} 
      },
      main:{
        navigationOptions:{tabBarVisible: false},
        screen: createAppContainer(createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review:{
            screen: createStackNavigator({
              review: {screen: ReviewScreen},
              settings: { screen: SettingsScreen}
            })
          }
        }))
      }
    },{
      navigationOptions:{tabBarVisible: false},
      lazy: true
    }))
 
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
