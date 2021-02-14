import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Pressable, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Clipboard from '@react-native-community/clipboard';
// import { useClipboard } from '@react-native-community/clipboard';
import Clipboard from 'expo-clipboard';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'Delius';
`;
const NameText = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'Delius';
  width: ${WIDTH*0.4}px;
`;
const GramText = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'Delius';
  width: ${WIDTH*0.2}px;
`;
const PerText = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'Delius';
  width: ${WIDTH*0.2}px;
`;
const Container = styled.View`
  margin: 10px;
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
  width: ${WIDTH*0.9}px;
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
const FlourText = styled.Text``;

export default Basic = () => {
  
  const [localList, setLocalList] = useState();
  const [update, setUpdate] = useState(false);
  const [input1, setInput1] = useState('hello snehal');
  const [copiedText, setCopiedText] = useState('');
  const [inputFlour, setInputFlour] =  useState(0);

  Font.useFonts({
      'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });
  const devlist = async() => {
    try{
      const keys = await AsyncStorage.getAllKeys();
      const ll = await AsyncStorage.multiGet(keys);
      setLocalList(ll);
    }
    catch(e){
      console.log(e);
    }
  } 
  const loadAssets = async() => {
    await devlist();
  }
  const onFinish = () => {
    setUpdate(true);
  }

  const deleteItem = async(key) => {
    try{
      await AsyncStorage.removeItem(key);
      console.log("deleted succesfully");
      await devlist();
    } catch (e) {
      console.log("error in deleting items: ", e);
    }
  }

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('blur', ()=>devlist())
    navigation.addListener('focus', ()=>devlist())
    // console.log("leave update status: ", update);
  }, []);

  const copyToClipboard = (cur) => {
    // console.log("cur: ", cur);
    const title = cur[0];
    let data = JSON.parse(cur[1]).tray;
    let recipe=`${title} \n\n`;
    data.map(cur=>{
      cur.inputName? recipe+=`${cur.inputName}: ${cur.inputGram} (${cur.percentage} %)\n` : recipe+=`Flour : ${cur.inputFlour} (100 %)`
      
    })
    // console.log(recipe);
    Clipboard.setString(recipe);
    alert(`[${title}] recipe copied !`)
  };

  if(update){
    return (
      <ScrollView>
      <Wrapper>
        <Text>Personal Recipes</Text>
        {localList.map(cur=>
          <TouchableOpacity onLongPress={()=>copyToClipboard(cur)}>
          <Container key={cur[0]} >
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

          {JSON.parse(cur[1]).tray.map(igd=>{
            if(!igd.inputName){
              return (
                <TextContainer>
                  <NameText>Flour</NameText>
                  <GramText>{igd.inputFlour}(g)  </GramText>
                  <PerText>100 (%)</PerText>
                </TextContainer>
              )
            }
            else{
              return(
                <TextContainer>
                  <NameText>{igd.inputName} </NameText>
                  <GramText>{igd.inputGram}(g)  </GramText>
                  <PerText>{igd.percentage}(%)</PerText>
                </TextContainer>
              )
            }
          }
          )}

          </Container>
          </TouchableOpacity>
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