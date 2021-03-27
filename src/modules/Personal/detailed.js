import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Pressable, ScrollView, Button, TextInput, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

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
const ButtonContainer = styled.View`
  margin: 30px;
`;

const RateEmo = styled.Text`
  font-size: 14px;
  font-family: 'Delius';
  margin: auto;
`;

const Star = styled.Text`'
  margin: 10px;
  font-size: 18px;
`;
const StarContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
`;
const ImageButtonContainer = styled.View`
  width: ${WIDTH}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
`;
const ImageButtonView = styled.View`
  background-color: #2288DD;
  width: ${WIDTH * 0.25}px;
  height: ${WIDTH * 0.4 * 0.4}px;
  justify-content: center;
  border-radius: 10px;
`;
const ImageButtonText = styled.Text`
  color: white;
  text-align: center;
`;
const SnapContainer = styled.View`
  width: 300px;
  height: 200px;
  padding-top: 150px;
`;

const detailed = (cur) => {

  const data = cur.route.params.currentRecipe;
  const key = data[0];
  const tray = JSON.parse(data[1])['tray'];

  const [localList, setLocalList] = useState();
  const [update, setUpdate] = useState(false);
  const [imgUri, setImgUri] = useState("https://img.freepik.com/free-photo/various-homemade-bread-on-burlap-with-wheat-high-quality-photo_114579-38042.jpg?size=626&ext=jpg");
  const [value, onChangeText] = useState();
  const [rate, setRate] = useState();
  const [cameraMode, setCameraMode] = useState(false);
  const [state, setState] = useState();
  let camera;

  const Navigation = useNavigation();

  Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  const updateList = async (key) => {
    try{
      const item = await AsyncStorage.getItem(key);
      console.log("item: ", item);

      await AsyncStorage.setItem(title,JSON.stringify(list))
        .then(()=>console.log('successfully updated'))
        .catch(()=>'error in saving')
        alert('saved!')
    }
    catch(e){
      console.log(e);
    }
  } 
  const loadAssets = async() => {
  }
  const onFinish = () => {
    setUpdate(true);
  }

  const switchCameraMode = () => {
    setCameraMode(true);
  }

  const handleCamera = async () => {
    // Picker -> get and render image -> save it in localstorage
    if (camera) {
      try {
        const options = { quality: 0.5, base64: true };
        let photo = await camera.takePictureAsync(options);
        // photo.base64, uri, 
        setState({
          "photo": photo.base64,
          "scanning": false,
          "uri": photo.uri
        })
        console.log("state: ", photo.uri);
        setImgUri(photo.uri);
      } catch (error) {
        console.log("error in handle camera", error)
      }
    }
    setCameraMode(false);
  }

    const handleCamerapicker = async () => {
    // Picker -> get and render image -> save it in localstorage
    if (camera) {
      try {
        const options = { quality: 0.5, base64: true };
        let photo = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
        console.log("image: ", photo);
        setImgUri(photo.uri);
      } catch (error) {
        console.log("error in handle camera", error)
      }
    }
    setCameraMode(false);
  }

  const handleAlbum = async() => {
    // Picker -> get and render image -> save it in localstorage
    setCameraMode(false);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("result: ", result);
      setImgUri(result.uri);
    } catch (error) {
      console.log("error in handle album", error)
    }
  }

  const resetImage = () => {
    setCameraMode(false);
    setImgUri("https://img.freepik.com/free-photo/various-homemade-bread-on-burlap-with-wheat-high-quality-photo_114579-38042.jpg?size=626&ext=jpg");
  }

  useEffect(() => {
  }, [rate]);

  if (update) {
    return (
      <ScrollView>
      <Wrapper>
          <Text>Title</Text>
          {/* Picture */}
          <ImageContainer>
            {
              cameraMode
                ?
                <Camera
                  style={{ width: WIDTH*0.9, height: WIDTH*0.9*1.2 }}
                  type={Camera.Constants.Type.back}
                  ref={(ref) => {
                    camera = ref;
                  }}
                >
                  <View
                    style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: 'flex-start',
                      }}
                      onPress={handleCamera}
                    >
                      <SnapContainer>
                      <Text style={{
                        fontSize: 24,
                        color: 'white',
                        backgroundColor: "#2288DD",
                        textAlign: 'center',
                      }} >
                        SNAP 📷
                      </Text>
                      </SnapContainer>
                    </TouchableOpacity>
                  </View>
                </Camera>
                :
                <Image
                  source={{ uri: imgUri }}
                  style={{ width: WIDTH * 0.9, height: WIDTH * 0.9 * 0.8 }}
                  type={Camera.Constants.Type.back}
                  ref={(ref) => {
                    camera = ref;
                  }}
                  />
            }
            
          </ImageContainer>

          <ImageButtonContainer>
              
              <TouchableOpacity onPress={handleCamerapicker}>
              <ImageButtonView><ImageButtonText>CAMERA</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={handleAlbum}>
              <ImageButtonView><ImageButtonText>ALBUM</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={resetImage}>
              <ImageButtonView><ImageButtonText>INIT</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
          </ImageButtonContainer>
          
          {/* Recipe */}
          <RecipeContainer>
            {
              tray.map((cur, index) => (
                <TextContainer
                  key={index}
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
            <ButtonContainer>
            <RateEmo>{`Rating: ${rate}/5`}</RateEmo>
              <StarContainer>
              <TouchableOpacity
                onPress={()=>setRate('1')}
                ><Star>❤</Star>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>setRate('2')}
              >{
                  rate >= '2'
                  ? <Star>❤</Star>
                  : <Star>🖤</Star>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>setRate('3')}
              >{
                  rate >= '3'
                  ? <Star>❤</Star>
                  : <Star>🖤</Star>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>setRate('4')}
              >{
                  rate >= '4'
                  ? <Star>❤</Star>
                  : <Star>🖤</Star>
                }
              </TouchableOpacity>
                            <TouchableOpacity
                onPress={()=>setRate('5')}
              >{
                  rate >= '5'
                  ? <Star>❤</Star>
                  : <Star>🖤</Star>
                }
              </TouchableOpacity>
              </StarContainer>
          </ButtonContainer>
          <TextInput
            style={{
              height: 180,
              width: WIDTH*0.9,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
              }}
            placeholder="Recipe Review"
            onChangeText={text => onChangeText(text)}
            value={value}
          />
          {/* Save,Back Btn */}
          <Button onPress={()=>Navigation.goBack()} title="뒤로가기" />
          <Button onPress={()=>updateList(key)} title="저장하기" />
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