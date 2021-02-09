import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, Dimensions, ScrollView } from 'react-native';
import * as brData from '../../../mockAPI/customAPI.json';
const data = brData;
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { store } from '../../../Redux/Store.js';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;
const TextContainer = styled.View``;

let cnt=0;
let cnt2=100;
let cnt3=1000;
let cnt4=10000;
const Basic = () => {
  const d = data.custom_list[0];
  const igd = data.custom_list[0].ingredient;
  const name = data.custom_list[0].name;
  const inputFlour = data.custom_list[0].inputFlour;

  const loadAssets = () => setLoaded(true)
  const onFinish = () => {}
  const [loaded, setLoaded] = useState(false);
  
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

  if(loaded){
    return (
      <ScrollView>
      <Wrapper>
        <Button title="go to calculator" onPress={goToCal} />
        <Text>Recipe: {name}</Text>
        <Text>input Flour: {inputFlour}</Text>
        <Text></Text>
        {
          igd.map(cur=>(
            <TextContainer key={cnt4++}>
            <Text key={cnt++}>{cur.inputName}</Text>
            <Text key={cnt2++}>{cur.inputGram}</Text>
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