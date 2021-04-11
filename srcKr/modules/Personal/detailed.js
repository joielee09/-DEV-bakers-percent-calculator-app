import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { connect } from 'react-redux';
import { store, flourStore } from '../../../Redux/Store';
import Clipboard from 'expo-clipboard';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const RecipeTitle = styled.Text`
  font-size: 18px;
  font-family: 'Delius';
  height: 30px;
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
const Container = styled.View`
  margin: 10px;
  border-bottom-color: lightgray;
  border-bottom-width: 0.6px;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 10px;
`;
const TitleContainer = styled.View`
  width: ${WIDTH*0.9}px;
  padding: 10px;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom-color: lightgray;
  border-bottom-width: 2px;
  border-top-color: lightgray;
  border-top-width: 2px;
`;
const Title = styled.Text`
  font-size: 28px;

  font-family: 'Delius';
  margin: auto;
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
  color: gray;
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
  /* background-color: #2288DD; */
  width: ${WIDTH * 0.25}px;
  height: ${WIDTH * 0.4 * 0.4}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
`;
const ImageButtonText = styled.Text`
  text-align: center;
`;
const DelImageButtonText = styled.Text`
  text-align: center;
  color: tomato;
`;
const CalButtonView = styled.View`
  width: ${WIDTH * 0.8}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
  margin: auto;
  margin-bottom: 5px;
`;
const DelButtonView = styled.View`
  width: ${WIDTH * 0.8}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
  margin: auto;
  margin-bottom: 5px;
  border-color: tomato;
`;
const FlourText = styled.Text`
  color: lightgray;
`;
const SnapContainer = styled.View`
  width: 300px;
  height: 200px;
  padding-top: 150px;
`;
const DetailedContainer = styled.View`
  border-radius: 1px;
  border: 1px lightgray dashed;
  margin: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
`;
const DialogContainer = styled.View`
  width: ${WIDTH * 0.7}px;
  height: ${WIDTH * 0.7 * 0.5}px;
`;
const ConfirmContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const detailed = (cur) => {

  const data = cur.route.params.currentRecipe;
  const key = data[0];
  const tray = JSON.parse(data[1])['tray'];
  const fixedTray = [];
  const flourObject = tray.filter(cur => cur.inputName === 'flour');
  fixedTray.push(flourObject[0]);
  tray.map(cur => (cur.inputName !== 'flour') ? fixedTray.push(cur): '');

  const [localList, setLocalList] = useState();
  const [update, setUpdate] = useState(false);
  const [imgUri, setImgUri] = useState("https://i.stack.imgur.com/y9DpT.jpg");
  const [value, onChangeText] = useState();
  const [rate, setRate] = useState(1);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [changed, setChanged] = useState(true);
  let camera;

  const Navigation = useNavigation();


  const handleCal = async () => {
    const igd = tray;
    const len = tray.length;
    const list = igd.filter(cur => cur.inputName !== 'flour');
    const flourList = igd.filter(cur => cur.inputName === 'flour');
    const inputFlour = flourList[0].inputGram;
    console.log("igd, inputflour: ", igd,inputFlour);

    // todo : exclude flour when sending to calculator
    await store.dispatch({
      type: 'brToCal',
      value:{
        list
      }
    })
    await flourStore.dispatch({
      type: 'passFlour',
      value:{
        "flour": inputFlour
      }
    })
    Navigation.navigate("Calculator",{inputFlour});
  }
  const createTwoButtonAlert = () =>
    Alert.alert(
      "",
      "삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "삭제", onPress: async () => {
            setChanged(false);
            await AsyncStorage.removeItem(key);
            console.log("deleted succesfully");
            alert('삭제되었습니다.');
            Navigation.goBack();
        } }
      ],
    { cancelable: false }
    );
  
  const createConfirmAlert = () =>
    Alert.alert(
      "",
      "저장되었습니다 💾",
      [
        {
          text: "확인",
          onPress: () => console.log("successfully updated"),
          // style: "cancel"
        },
      ],
    { cancelable: false }
  );
  
  const handleDelete = async(key) => {
    try {
      createTwoButtonAlert()
    } catch (e) {
      console.log("error in deleting items: ", e);
    }
  }

  // error : item update error
  const updateList = async (key) => {
    try{
      let item = await AsyncStorage.getItem(key)
      item = JSON.parse(item);
      item.image = imgUri;
      item.rating = rate;
      item.review = value;
      console.log("item: ", item);

      await AsyncStorage.setItem(key,JSON.stringify(item))
        .then((res)=>console.log('successfully updated', res))
        .catch(()=>'error in saving')
        // alert('저장되었습니다. 💾')
        createConfirmAlert()
        setChanged(false);
    }
    catch(e){
      console.log(e);
    }
  }

    const handleUpdate = async (key) => {
    try{
        setChanged(false);
    }
    catch(e){
      console.log(e);
    }
  }
  
  Font.useFonts({
      'Delius': require('../../../assets/fonts/DelaGothicOne-Regular.ttf'),
  });
  
  const loadAssets = async () => {
    let item = await AsyncStorage.getItem(key);
    // console.log("item in load Assets: ", item);
    item = JSON.parse(item);
      if(item.image!==undefined)  setImgUri(item.image);
      if(item.rating!==undefined) setRate(item.rating);
    if (item.review !== undefined) onChangeText(item.review);
  }
  const onFinish = () => {
    setUpdate(true);
  }

  const handleCamera = async () => {
    // Picker -> get and render image -> save it in localstorage
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY)
    if (status === 'granted') {
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
    } else {
      console.log("not granted")
    }
  }

  const handleAlbum = async() => {
    // Picker -> get and render image -> save it in localstorage
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
    setImgUri("https://i.stack.imgur.com/y9DpT.jpg");
  }

  const copyToClipboard = (data) => {
    const title = data[0];
    let tray = JSON.parse(data[1]).tray;
    console.log("data in personal index: ", data);
    let recipe = `${title} \n\n`;
    let flourRecipe=[];
    let restRecipe=[];
    tray.map(cur => {
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

  useEffect(() => {
  }, [rate]);

  React.useEffect(
    () =>
      Navigation.addListener('beforeRemove', (e) => {
        if (!changed) {
          return;
        }

        e.preventDefault();
        Alert.alert(
          '',
        '뒤로 가기 전에 저장해주세요.\n\n(다시 한 번 뒤로가기를 누르면 저장 없이 나갈 수 있습니다.)',
          [
            {
              text: '확인',
              style: 'destructive',
              onPress: () => handleUpdate(key),
            },
          ]
        );
      }),
    [Navigation, changed]
  );

  if (update) {
    return (
      <ScrollView>
      <Wrapper>
          <TitleContainer><Title>{key}</Title></TitleContainer>
          {/* Picture */}
          <ImageContainer>
            <Image
              source={{ uri: imgUri }}
              style={{ width: WIDTH * 0.9, height: WIDTH * 0.9 * 0.8 }}
              />
          </ImageContainer>

          <ImageButtonContainer>
              
              <TouchableOpacity onPress={handleCamera}>
              <ImageButtonView><ImageButtonText>카메라</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={handleAlbum}>
              <ImageButtonView><ImageButtonText>앨범</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={resetImage}>
              <ImageButtonView><ImageButtonText>초기화</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
          </ImageButtonContainer>
          
          <DetailedContainer>
            {/* Recipe */}
            <RateEmo>{`[ 레시피 ]`}</RateEmo>
          <TouchableOpacity
            onLongPress={() => copyToClipboard(data)}
          >
          <RecipeContainer>
            {
              fixedTray.map((cur, index) => (
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
          </TouchableOpacity>
            
            <FlourText>* flour: 밀가루 총량</FlourText>
            <FlourText>* 길게 누르면 레시피 내용이 복사됩니다. </FlourText>
          {/* Review */}
          <ReviewContainer>
            <ButtonContainer>
            <RateEmo>{`[ 점수: ${rate}/5 ]`}</RateEmo>
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
            <RateEmo>[ 상세설명 ]</RateEmo>
          <TextInput
            style={{
              height: 180,
              width: WIDTH*0.9,
              borderColor: 'gray',
              borderWidth: 0.2,
              marginBottom: 10,
              borderColor: 'lightgray',
              fontFamily: 'Delius',
              textAlign: 'center'
              }}
            placeholder="자세한 설명을 입력해주세요"
            onChangeText={text => onChangeText(text)}
            value={value}
            multiline
            />
          </ReviewContainer>
          </DetailedContainer>

          {/* Save,Back Btn */}
          <TouchableOpacity onPress={handleCal}>
            <CalButtonView><ImageButtonText>계산기로 이동하기</ImageButtonText></CalButtonView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateList(key)}>
            <CalButtonView><ImageButtonText>저장하기</ImageButtonText></CalButtonView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(key)}>
            <DelButtonView><DelImageButtonText>삭제하기</DelImageButtonText></DelButtonView>
          </TouchableOpacity>

          {/* dialog popup */}
          <ConfirmDialog
            title="Confirm Dialog"
            message="Do you want to SAVE?"
            visible={dialogVisible}
            onTouchOutside={() => setDialogVisible(false)}
            positiveButton={{
              title: "YES",
              onPress: () => {
                updateList(key);
                Navigation.goBack();
              }
            }}
            negativeButton={{
              title: "NO",
              onPress: () => Navigation.goBack()
            }}
          />

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

const mapStateToProps = ( state ) => {
  return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
  return ({ dispatch: dispatch });
};

// export default detailed;
export default connect(mapStateToProps, mapDispatchToProps)(detailed);