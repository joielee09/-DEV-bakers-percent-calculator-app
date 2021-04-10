import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import RNTextDetector from "react-native-text-detector";


const Wrapper = styled.View`
`;

const OCR = () => {

  let camera;
  const [status, setStatus] = useState(false);
  const [state, setState] = useState(false);

  const detectText = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: false,
        exif: true,
        skipProcessing: true,
      };
      const tmp = await camera.takePictureAsync(options);
      console.log("tmp: ", tmp.uri);
      const visionResp = await RNTextDetector.detectFromUri(tmp.uri);
      console.log('visionResp', visionResp);
    } catch (e) {
      console.warn(e);
    }
  };



  // const setSnap = async () => {
  //   if (camera) {
  //     const options = { quality: 0.5, base64: true };
  //     let photo = await camera.takePictureAsync(options);
  //     setState({
  //       "photo": photo.base64,
  //       "scanning": false,
  //       "uri": photo.uri
  //     })
  //     console.log("state: ", state['scanning'], state['uri'], state['photo'].slice(0,100));
  //     try {
  //       const visionResp = await RNTextDetector.detectFromUri(uri);
  //       console.log('visionResp', visionResp);
  //     } catch (e){
  //       console.warn(e);
  //     }
  //   }
  // }



  return (
    <Wrapper>
      <Text>This is OCR Page</Text>
      <Camera
        style={{ width: 300, height: 400 }}
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
              flex: 0.5,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={detectText}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }} >
              SNAP
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={{ uri: state.uri }}
      />
    </Wrapper>

  );
};

export default OCR;