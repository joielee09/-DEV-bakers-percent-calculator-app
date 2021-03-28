import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Pressable, ScrollView, RefreshControl, Image, Button } from 'react-native';
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
const AlbumWrapper = styled.View`
  flex-wrap:wrap;
  flex-direction: row;
  margin-bottom: 30px;
`;
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
const AlbumContainer = styled.View`
  /* margin: 10px; */
  flex-direction: row;
  flex-wrap: wrap;
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
  width: ${WIDTH*0.9}px;
  border-bottom-color: lightgray;
  border-bottom-width: 2px;
  font-family: 'Delius';
`;
const FlourText = styled.Text``;
const Ingredient = styled.View``;
const Mode = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const ModeContainer = styled.View`
  width: ${WIDTH * 0.3}px;
  height: ${WIDTH * 0.3 * 0.4}px;
  border: 1px lightgray solid;
  margin:10px;
  justify-content: space-evenly;
`;
const ModeText = styled.Text`
  font-size: 13px;
  font-family: 'Delius';
  margin: auto;
`;

export default Basic = () => {
  
  const [localList, setLocalList] = useState();
  const [update, setUpdate] = useState(false);
  const [input1, setInput1] = useState('hello snehal');
  const [copiedText, setCopiedText] = useState('');
  const [inputFlour, setInputFlour] = useState(0);
  const [mode, setMode] = useState('listMode');

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

  const Navigation = useNavigation();
  useEffect(() => {
    Navigation.addListener('blur', ()=>devlist())
    Navigation.addListener('focus', ()=>devlist())
    // console.log("leave update status: ", update);
  }, []);
  const goToDetail = (currentRecipe) => { 
    Navigation.navigate("detailed",{currentRecipe})
  }

  const copyToClipboard = (cur) => {
    const title = cur[0];
    let data = JSON.parse(cur[1]).tray;
    console.log("data in personal index: ", data);
    let recipe = `${title} \n\n`;
    let flourRecipe=[];
    let restRecipe=[];
    data.map(cur => {
      if (cur.inputName === 'flour') {
        flourRecipe.push(cur);
      }
      else restRecipe.push(cur);
    })
    recipe += `${flourRecipe[0].inputName}: ${flourRecipe[0].inputGram} (${flourRecipe[0].percentage} %)\n`;
    restRecipe.map(cur=>{
      recipe += `${cur.inputName}: ${cur.inputGram} (${cur.percentage} %)\n`
    })
    // console.log(recipe);
    Clipboard.setString(recipe);
    alert(`[${title}] recipe copied !`)
  };

  // console.log("localList: ", localList);
  if(update){
    // ALBUM형
    if (mode === 'albumMode') {
      return (
      <ScrollView>
          <AlbumWrapper>
            <Mode>
            <TouchableOpacity
              onPress={() => setMode('albumMode')}
            >
              <ModeContainer><ModeText>ALBUM TYPE</ModeText></ModeContainer>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode('listMode')}
            >
                <ModeContainer><ModeText>LIST TYPE</ModeText></ModeContainer>
              </TouchableOpacity>
            </Mode>
        {localList.map((cur, index)=>
          <TouchableOpacity
            onLongPress={() => copyToClipboard(cur)}
            onPress={() => goToDetail(cur)}
            key={index}
          >
          <AlbumContainer key={cur[0]} >
            <Image
                source={{
                  uri: (JSON.parse(cur[1]).image === undefined)
                    ? "https://i.stack.imgur.com/y9DpT.jpg"
                    : JSON.parse(cur[1]).image
                }}
                style={{
                  width: WIDTH*0.3,
                  height: WIDTH*0.3,
                  margin: 2,
                }}
            />

          </AlbumContainer>
          </TouchableOpacity>
          )}
          </AlbumWrapper>
        <Text>Press for detailed Page</Text>
        <Text>Press LONG for copy recipe in text!</Text>
      </ScrollView>
    ) 
    }

    // list형
    if (mode === 'listMode') {
      return (
      <ScrollView>
          <Wrapper>
            <Mode>
        <TouchableOpacity
              onPress={() => setMode('albumMode')}
            >
              <ModeContainer><ModeText>ALBUM TYPE</ModeText></ModeContainer>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode('listMode')}
            >
                <ModeContainer><ModeText>LIST TYPE</ModeText></ModeContainer>
              </TouchableOpacity>
              </Mode>
        {localList.map(cur=>
          <TouchableOpacity
            onLongPress={() => copyToClipboard(cur)}
            onPress={() => goToDetail(cur)}
            key={parseInt(localList.indexOf(cur))+parseInt(100)}
          >
          <Container key={cur[0]} >
          <Title>{cur[0]}</Title>

            <Image
                source={{
                  uri: (JSON.parse(cur[1]).image === undefined)
                    ? "https://i.stack.imgur.com/y9DpT.jpg"
                    : JSON.parse(cur[1]).image
                }}
                style={{
                  width: WIDTH*0.85,
                  height: WIDTH*0.85*0.7,
                  marginTop: 20,
                  marginBottom: 20,
                  borderRadius: 10,
                }}
            />

          <Ingredient>
          {
            JSON.parse(cur[1]).tray.map((igd, index) => {
            // console.log("tray: ", JSON.parse(cur[1]).tray)
            return(
              <TextContainer
                key={index}
              >
                <NameText>{igd.inputName} </NameText>
                <GramText>{igd.inputGram}(g)  </GramText>
                <PerText>{igd.percentage}(%)</PerText>
              </TextContainer>
            )
              }
            )}
            </Ingredient>

          </Container>
          </TouchableOpacity>
          )}
        <Text>Press for detailed Page</Text>
        <Text>Press LONG for copy recipe in text!</Text>
      </Wrapper>
      </ScrollView>
    ) 
    }//set mode
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