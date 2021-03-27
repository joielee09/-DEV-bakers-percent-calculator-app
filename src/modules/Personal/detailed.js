import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Pressable, ScrollView, RefreshControl, Button, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
const Title = styled.Text`
  font-size: 17px;
  width: ${WIDTH*0.7}px;
  border-bottom-color: lightgray;
  border-bottom-width: 2px;
  font-family: 'Delius';
`;
const TextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: ${WIDTH*0.9}px;
  margin: 3px;
  margin-top:10px;
`;
const ImageContainer = styled.View`
  margin: auto;
`;
const ReviewContainer = styled.View`
  margin: auto;
`;
const RecipeContainer = styled.View`
  margin: auto;
`;


const detailed = (cur) => {

  const data = cur.route.params.currentRecipe;
  const key = data[0];
  const tray = JSON.parse(data[1])['tray'];
  console.log("key, tray: ", key, tray);

  const [localList, setLocalList] = useState();
  const [update, setUpdate] = useState(false);
  const [imgUri, setImgUri] = useState("https://img.freepik.com/free-photo/various-homemade-bread-on-burlap-with-wheat-high-quality-photo_114579-38042.jpg?size=626&ext=jpg");
  const [value, onChangeText] = useState('How was cooking went? :)');

  Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  const devlist = async () => {
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

  const handleImage = () => {
    // Picker -> get and render image -> save it in localstorage
    console.log("handle image");
  }

  const resetImage = () => {
    setImgUri("https://img.freepik.com/free-photo/various-homemade-bread-on-burlap-with-wheat-high-quality-photo_114579-38042.jpg?size=626&ext=jpg");
  }

  if (update) {
    return (
      <ScrollView>
      <Wrapper>
          <Text>Title</Text>
          {/* Picture */}
          <ImageContainer>
            <Image
              source={{ uri: imgUri }}
              style={{ width: WIDTH*0.9, height: WIDTH*0.9*0.8 }}
            />
          <Button onPress={resetImage} title="초기화" />
          <Button onPress={handleImage} title="이미지넣기" />
          </ImageContainer>

          {/* Recipe */}
          <RecipeContainer>
            {
              tray.map(cur => (
                <TextContainer
                  key={tray.indexOf(cur)}
                >
                  <NameText>{cur.inputName} </NameText>
                    <GramText>{cur.inputGram}(g)  </GramText>
                    <PerText>{cur.percentage}(%)</PerText>
                </TextContainer>
              ))
            }
          </RecipeContainer>
          
          {/* Review */}
          <ReviewContainer>
          <Text> Rating: 3/5 </Text>
          <TextInput
            style={{
              height: 180,
              width: WIDTH*0.9,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10
            }}
            onChangeText={text => onChangeText(text)}
            value={value}
          />
          {/* Save,Back Btn */}
          <Button onPress={() => console.log("nav.goBack")} title="뒤로가기" />
          <Button onPress={()=>console.log("save local storage")} title="저장하기" />
          </ReviewContainer>
      </Wrapper>
      </ScrollView>
    )
  } else {
    return (
      <AppLoading 
        startAsync={loadAssets}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  }
}

export default detailed;