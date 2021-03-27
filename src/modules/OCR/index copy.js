import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styled from 'styled-components/native';
// import { Camera, Permissions, Constants } from 'expo';
import { Camera } from 'expo-camera';
// import vision from '@google-cloud/vision';


const Wrapper = styled.View`
`;

const OCR = () => {

  const APIKey = '';
  const [status, setStatus] = useState(false);
  const [state, setState] = useState(false);
  const getGrant = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setStatus(true);
  }
  
  // useEffect(() => {
  //   getGrant()
  // }, [])

  const googleFetch = async (base64) => {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(base64);
    const detections = result.textAnnotations;
    console.log('Text: ');
    detections.forEach(text => console(text));
  }
  
  
  const setSnap = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      let photo = await camera.takePictureAsync(options);
      setState({
        "photo": photo.base64,
        "scanning": false,
        "uri": photo.uri
      })
      console.log("state: ", state['scanning'], state['uri'], state['photo']);
      // googleFetch(state['photo'])
    }
  }

  const callGoogleVisionAPI = async (base64) => {
    console.log("call google vision api")
    // let url = `https://vision.googleapis.com/v1/images:annotate?key=${APIKey}`;
    let url = `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAmamJoabEWzKhn4YhTC0Vr1kERJDzzGQI`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              { type: 'WEB_DETECTION', maxResults: 5 },
            ]
          }
        ]
      })
    })
      .then((res) => {
        console.log("res: ", res);
        res.json();
      })
      .then((data) => {
        console.log("fullTextAnnotation: ", data.responses[0].fullTextAnnotation.text)
        setState({
          fullTextAnnotation: data.responses[0].fullTextAnnotation.text,
        })
      })
      .catch((err) => console.log('error: ', err));
  }
  
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
            onPress={()=>setSnap()}
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