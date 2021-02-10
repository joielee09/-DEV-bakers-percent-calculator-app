import React from 'react';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BasicRecipe from './Basic Recipes'
import Calculator from './Calculator'
import Personal from './Personal'

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;

const Tab = createBottomTabNavigator();

export default Basic = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Calculator" component={Calculator} />
      <Tab.Screen name="BasicRecipe" component={BasicRecipe} />
      <Tab.Screen name="Personal" component={Personal} />
    </Tab.Navigator>
  )
}