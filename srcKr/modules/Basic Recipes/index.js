import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, Image } from 'react-native';
import * as brData from '../../../mockAPI/korean_customAPI.json';
const data = brData;
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { store, flourStore } from '../../../Redux/Store.js';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
const CalBtnContainer = styled.View`
  width: ${WIDTH * 0.8}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
  margin: auto;
  margin-bottom: 5px;
`;
const CalBtnText = styled.Text`
  text-align: center;
`;

const Basic = (cur) => {
  // console.log("cur in br spec: ", cur);
  const d = cur.route.params.currentRecipe;
  let igd = cur.route.params.currentRecipe.ingredient;
  const name = cur.route.params.currentRecipe.name;
  const inputFlour = cur.route.params.currentRecipe.inputFlour;
  const image = cur.route.params.currentRecipe.image;
  const [list, setList] = useState();

  const loadAssets = () => {
    const res = data.custom_list.filter(cur => cur.name === name);
    const flaggedRes = res[0].ingredient.filter(cur => cur.flag !== true)
    igd = flaggedRes;
    setList(flaggedRes);
  }
  const onFinish = () => {}
  
  const Navigation = useNavigation();
  const goToCal = async() => {
    await store.dispatch({
      type: 'brToCal',
      value:{
        list
      }
    })
    // await flourStore.dispatch({
    //   type: 'passFlour',
    //   value:{
    //     "flour": inputFlour
    //   }
    // })
    await flourStore.dispatch({
      type: 'addFlour',
      value: {
        "flour":inputFlour
      }
    })
    Navigation.navigate("Calculator",{inputFlour});
  }
  const [loaded] = Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  useEffect(() => {
  Navigation.addListener('blur', ()=>loadAssets())
  Navigation.addListener('focus', ()=>loadAssets())
  // console.log("leave update status: ", update);
  }, []);

  useEffect(() => {
    loadAssets();
  }, []);

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
        <Title>{name}</Title>
        <Text />
          <TouchableOpacity
            onPress={goToCal}
          >
            <CalBtnContainer><CalBtnText>레시피 계산기로 이동하기</CalBtnText></CalBtnContainer>
          </TouchableOpacity>
        <Text />
        <Flour>총 밀가루: {inputFlour}</Flour>
        {
          list.map((cur, index) => (
            <TextContainer key={index}>
            <IngredientName >{cur.inputName}</IngredientName>
            <IngredientGram >{cur.inputGram} (g)</IngredientGram>
            </TextContainer>
            )
          )
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