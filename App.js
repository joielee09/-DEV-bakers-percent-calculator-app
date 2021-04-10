import React from 'react';
import Stack from './srcKr/modules/Stack'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './Redux/Store'

export default Basic = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
    </Provider>
  )
}