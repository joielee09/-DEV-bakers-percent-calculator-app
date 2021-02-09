import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;
const Container = styled.View`
  margin: 10px;
  background-color: lightgray;
`;
const TextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

let localList =[];

export default Basic = () => {

  const [loaded, setLoaded] = useState(false);

  const devlist = async() => {
    try{
      const keys = await AsyncStorage.getAllKeys();
      localList = await AsyncStorage.multiGet(keys);
    }
    catch(e){
      console.log(e);
    }
  } 
  const loadAssets = async() => {
    await devlist();
    setLoaded(true);
  }
  const onFinish = () => {}
  const deleteItem = () => {console.log("delete items")}

  if(loaded){
    return (
      <Wrapper>
        {localList.map(cur=>
          <Container key={cur.title}>
          <Text>title: {cur[0]}</Text>
          {JSON.parse(cur[1]).tray.map(igd=>
          <TextContainer>
            <Text>{igd.inputName}:   </Text>
            <Text>{igd.inputGram}(g)  </Text>
            <Text>{igd.percentage}(%)</Text>
          </TextContainer>
          )}
          <Pressable  onPress={deleteItem}>
            <AntDesign 
              name="delete" 
              size={20} 
              color="gray"
              style={{
                  marginLeft: 18
            }}/>
          </Pressable>
          </Container>
        )}
        <Text>This is Basic Patissier Page</Text>
      </Wrapper>
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