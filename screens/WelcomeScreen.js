import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03a9fa'},
  { text: 'Use this to get a job', color: '#009688'},
  { text: 'set your location then swipe', color: '#03a9fa'}
]

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount(){
    let token = await AsyncStorage.getItem('fb_token');
    if(token){
      this.props.navigation.navigate('map')
      this.setState({ token: true })
    } else {
      this.setState({ token: false })
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  }
  render(){
    if(_.isNull(this.state.token)){
      return <AppLoading />
    }
    return(
      <Slides 
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default WelcomeScreen;