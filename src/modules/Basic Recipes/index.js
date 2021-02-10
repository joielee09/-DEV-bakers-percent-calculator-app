import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, Dimensions, ScrollView, Image } from 'react-native';
import * as brData from '../../../mockAPI/customAPI.json';
const data = brData;
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { store } from '../../../Redux/Store.js';
import * as Font from 'expo-font';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
  font-family: 'Delius';
`;
const TextContainer = styled.View`
  height: ${HEIGHT*0.08}px;
  width: ${WIDTH*0.8}px;
  border-bottom-color: lightgray;
  border-bottom-width: 0.3px;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: ${WIDTH*0.1}px;
  /* background-color: lightyellow; */
  justify-content: space-around;
`;
const Title = styled.Text`
  font-size: 20px;
  margin: 15px auto auto auto;
  font-family: 'Delius';
`;
const IngredientName = styled.Text`
  margin-top: 20px;
  font-family: 'Delius';
`;
const IngredientGram = styled.Text`
  margin-top: 20px;
  font-family: 'Delius';
`;
const Flour = styled.Text`
  margin: 5px auto auto auto;
  font-family: 'Delius';
`;

let cnt=0;
let cnt2=100;
let cnt3=1000;
let cnt4=10000;
const Basic = (cur) => {
  console.log("cur in br spec: ", cur);
  const d = cur.route.params.currentRecipe;
  const igd = cur.route.params.currentRecipe.ingredient;
  const name = cur.route.params.currentRecipe.name;
  const inputFlour = cur.route.params.currentRecipe.inputFlour;
  const image = cur.route.params.currentRecipe.image;

  const loadAssets = () =>{}
  const onFinish = () => {}
  // const [loaded, setLoaded] = useState(false);
  
  const Navigation = useNavigation();
  const goToCal = async() => {
    await store.dispatch({
      type: 'brToCal',
      value:{
        igd
      }
    })
    Navigation.navigate("Calculator",{inputFlour});
  }
  const [loaded] = Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  if(loaded){
    return (
      <ScrollView>
      <Wrapper>
        <Image 
          source={{ uri:image }}
          style={{
            width: 170,
            height: 170,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10
          }}
        />
        <Title>Recipe: {name}</Title>
        <Text />
        <Button title="go to calculator" onPress={goToCal} />
        <Text />
        <Flour>input Flour: {inputFlour}</Flour>
        {
          igd.map(cur=>(
            <TextContainer key={cnt4++}>
            <IngredientName key={cnt++}>{cur.inputName}</IngredientName>
            <IngredientGram key={cnt2++}>{cur.inputGram} (g)</IngredientGram>
            </TextContainer>
          ))
        }
      </Wrapper>
      </ScrollView>
    )
  } else {
    return(
      <AppLoading 
        startAsync={loadAssets}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  }
}

const mapStateToProps = ( state ) => {
  return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
  return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Basic);