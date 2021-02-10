import React from 'react';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BRList from './Basic Recipes/BRList';
import BasicRecipe from './Basic Recipes';
import Calculator from './Calculator';
import Personal from './Personal';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;

const Tab = createBottomTabNavigator();

export default Basic = () => {
  return (
    <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon:({focused, color})=>{
          if(route.name==='Calculator'){
            return (
              <FontAwesome5 name="calculator" size={20} color={color} />
            )
          }
          else if(route.name==='Recipes'){
            return(
              <Feather name="list" size={24} color={color} />
            )
          }
          else{
            return(
              <AntDesign name="star" size={24} color={color} />
            )
          }
        }
      })}
      tabBarOptions={{
        activeTintColor: '#F4C8AC',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name="Calculator" component={Calculator}/>
      <Tab.Screen name="Recipes" component={BRList} />
      <Tab.Screen name="Personal" component={Personal} />
    </Tab.Navigator>
  )
}