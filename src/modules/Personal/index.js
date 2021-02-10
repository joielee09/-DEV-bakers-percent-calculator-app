import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'Delius';
`;
const Container = styled.View`
  margin: 10px;
  /* background-color: #FFF5EF; */
  border-bottom-color: lightgray;
  border-bottom-width: 0.6px;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 10px;
`;
const TextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  /* background-color: pink; */
  width: ${WIDTH*0.7}px;
  margin: 3px;
  margin-top:10px;
`;
const Title = styled.Text`
  font-size: 17px;
  width: ${WIDTH*0.7}px;
  border-bottom-color: lightgray;
  border-bottom-width: 2px;
  font-family: 'Delius';
`;

let localList =[];

export default Basic = () => {

  // const [loaded, setLoaded] = useState(false);
  const [update, setUpdate] = useState(false);
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
    setUpdate(true);
  }
  const onFinish = () => {}
  const deleteItem = async(key) => {
    try{
      await AsyncStorage.removeItem(key);
      console.log("deleted succesfully");
      
    } catch (e) {
      console.log("error in deleting items: ", e);
    }
    setUpdate(!update);
    console.log("update: ", update);
  }
  const [loaded] = Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  useEffect(() => {
    setUpdate();
  }, [])
  useEffect(() => {
  }, [update])

  if(loaded && update){
    return (
      <ScrollView>
      <Wrapper>
        {localList.map(cur=>
          <Container key={cur[0]}>
          <Title>{cur[0]}</Title>
          
          <Pressable  onPress={()=>deleteItem(cur[0])}>
            <AntDesign 
              name="delete" 
              size={20} 
              color="gray"
              style={{
                  marginLeft: 18
            }}/>
          </Pressable>

          {JSON.parse(cur[1]).tray.map(igd=>
            <TextContainer>
              <Text>{igd.inputName} </Text>
              <Text>{igd.inputGram}(g)  </Text>
              <Text>{igd.percentage}(%)</Text>
            </TextContainer>
          )}

          </Container>
        )}
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