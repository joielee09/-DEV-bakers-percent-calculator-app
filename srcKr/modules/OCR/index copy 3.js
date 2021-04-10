import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, Button } from 'react-native';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import RNTextDetector from "react-native-text-detector";
// import TesseractOcr, {
//   LANG_ENGLISH,
//   useEventListener,
// } from 'react-native-tesseract-ocr';
import ImagePicker from 'react-native-image-crop-picker';
import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

const Wrapper = styled.View`
`;

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

const OCR = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');

  const recognizeTextFromImage = async (path) => {
    console.log("path in recogText: ", path.slice(0,100));
    try {
      const tesseractOptions = {};
      const res = await TesseractOcr.recognize(
        path,
        LANG_ENGLISH,
        tesseractOptions,
      );
      // setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText('');
    }
    console.log("text from tesseract: ", text.slice(0,100));
  };

  let camera;
  const [status, setStatus] = useState(false);
  const [state, setState] = useState(false);

  const detectText = async () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {
    //   console.log(image);
    // });
    // try {
      
      // const image = await ImagePicker.openCamera({
      //   cropping: true,
      //   height: DEFAULT_HEIGHT,
      //   width: DEFAULT_WITH,
      // });
      // setImgSrc({uri: image.path});
      // const options = {
      //   quality: 0.8,
      //   base64: true,
      //   exif: true,
      //   skipProcessing: true,
      // };
      // const tmp = await camera.takePictureAsync(options);
      // console.log("image.path: ", image.path);
      // recognizeTextFromImage(uri.base64);
    // } catch (e) {
    //   console.warn(e);
    // }
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

  const simpleT = (imageSource) => {
    const src = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/proud-quote-1522094934.png?crop=0.978xw:0.994xh;0.0225xw,0.00636xh&resize=480:*';
    const tessOptions = {};
    const res = TesseractOcr.recognize(src, LANG_ENGLISH, tessOptions);
  };



  return (
    <Wrapper>
      <Text>This is OCR Page</Text>
      <Button
        disabled={isLoading}
        title="Camera"
        onPress={() => simpleT()}
      />

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