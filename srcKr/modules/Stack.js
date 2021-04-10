import React from 'react';
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Tab from './Tabs';
import BasicRecipe from './Basic Recipes/index'
import BRList from './Basic Recipes/BRList'
import Calculator from './Calculator'
import Personal from './Personal'
import OCR from './OCR'
import detailed from './Personal/detailed';

const Stack = createStackNavigator();

export default Basic = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle:''
      }}
    >
      <Stack.Screen name="Tab" component={Tab} />
      <Stack.Screen name="BasicRecipe" component={BasicRecipe} />
      <Stack.Screen name="BRList" component={BRList} />
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="OCR" component={OCR} />
      <Stack.Screen name="detailed" component={detailed} />
    </Stack.Navigator>
  )
}