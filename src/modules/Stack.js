import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Landing from './Landing'
import BasicRecipe from './Basic Recipes'
import Calculator from './Calculator'
import Personal from './Personal'

const Stack = createStackNavigator();

export default Basic = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="BasicRecipe" component={BasicRecipe} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="Personal" component={Personal} />
    </Stack.Navigator>
  )
}