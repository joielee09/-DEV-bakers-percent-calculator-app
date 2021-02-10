import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions,Image, ScrollView } from 'react-native';
import * as brData from '../../../mockAPI/customAPI.json';
let data = brData;
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;
const RecipeContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  margin: 10px;
  padding: 10px;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: space-evenly;
`;
const Title = styled.Text`
  font-size: 17px;
  font-family: 'Delius';
`;

export default Basic = () => {
  
  const list = data.custom_list;
  console.log("data in basic list: ", list);

  Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });
  const loadAssets = () => {
    setLoaded(true)
  }
  const onFinish = () => {}
  const [loaded, setLoaded] = useState(false);

  const Navigation = useNavigation();
  const goToRecipe = (currentRecipe) => {
    Navigation.navigate("BasicRecipe",{currentRecipe})
  }

  if(loaded){
  return (
    <ScrollView>
    <Wrapper>
      {
        list.map(cur=>(
          <TouchableOpacity onPress={()=>goToRecipe(cur)}>
          <RecipeContainer  key={cur.name}>
            <Image 
              source={{ uri:cur.image }}
              style={{
                width: 100,
                height: 100
              }}
            />
            <Title>{cur.name}</Title>
          </RecipeContainer>
          </TouchableOpacity>
        ))
      }
    </Wrapper>
    </ScrollView>
  )} else {
    return(
      <AppLoading 
        startAsync={loadAssets}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  }
}