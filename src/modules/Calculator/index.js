import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Dimensions, ScrollView, TextInput,Modal, Button, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ingredient from '../../component/ingredient';
import { connect } from 'react-redux';
import { store } from '../../../Redux/Store.js';
import { personalStore } from '../../../Redux/Store.js';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware } from 'redux';
import { useNavigation } from "@react-navigation/native";
import * as Font from 'expo-font';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;
const FlourContainer = styled.View`
  height: ${HEIGHT*0.15};
  /* background-color: lightyellow; */
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;
const InputContainer = styled.View`
  width: ${WIDTH*0.45};
`;
const ButtonContainer = styled.View`
  /* background-color: yellow; */
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
const AddBtn = styled.View`
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.5*0.4}px;
  /* background-color: #dcdc; */
  background-color: lightgray;
  border-radius: 10px;
`;
const AddText = styled.Text`
  margin: auto;
  font-family: 'Delius';
`;
const SaveBtn = styled.View`
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.5*0.4}px;
  background-color: lightgray;
  border-radius: 10px;
`;
const SaveText = styled.Text`
  margin: auto;
  font-family: 'Delius';
`;
const DevListBtn = styled.View`
  width: ${WIDTH*0.5}px;
  height: ${WIDTH*0.5*0.2}px;
  background-color: purple;
  margin: 5px auto auto;
`;
const ResetBtn = styled.View`
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.5*0.4}px;
  background-color: lightgray;
  border-radius: 10px;
`;
const ResetText = styled.Text`
  margin: auto;
  font-family: 'Delius';
`;
const ModalWrapper = styled.View`
  height: ${HEIGHT*0.4}px;
  background-color: #fff;
  margin-top: ${HEIGHT*0.15}px;
`;
const IngredientContainer = styled.View`
  height: ${HEIGHT*0.4}px;
  border: 0.5px lightgray solid;
`;
const Apply = styled.View`
  width: ${WIDTH*0.25}px;
  height: ${WIDTH*0.25}px;
  background-color: #F4C8AC;
  margin-top: 10px;
  border-radius: 10px;
`;
const ApplyText = styled.Text`
  margin: auto;
  font-family: 'Delius';
`;
const TopContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: ${WIDTH}px;
  justify-content: space-around;
  padding: 5px;
`;
const BottomContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: ${WIDTH}px;
  justify-content: space-around;
  padding: 5px;
`;
const AddIgdBtn = styled.View`
  width: ${WIDTH*0.8}px;
  height: ${WIDTH*0.8*0.2}px;
  background-color: #F4C8AC;
`;
const AddIgdText = styled.Text``;
const Blank = styled.View`
  height: 10px;
  font-family: 'Delius';
`;
const ModalInputContainer = styled.View`
  width: ${WIDTH}px;
  height: ${HEIGHT*0.2}px;
  justify-content: center;
  align-items: center;
`;
const igdList = [];

const Calculator = (cur) => {
  console.log("cur in calculator: ", cur);
  let inputFromBR =  (cur.route.params!==undefined)? (cur.route.params.inputFlour).toString() : (13000).toString();
  console.log("inputFromBR: ", inputFromBR);
  const [inputFlour, setInputFlour] = useState(inputFromBR? parseInt(inputFromBR):'');
  const [targetFlour, setTargetFlour] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputGram, setInputGram] = useState(0.0);
  const [title, setTitle] = useState('');

  const valid = () => {
    return title && inputFlour && store.getState().tray;
  }
  const add = () => {
    if(inputFlour)  setModalVisible(true);
    else alert('please insert flour first!')
  }
  const save = async() => {
    if(!title){
      alert('이름을 먼저 입력하세요');
      return;
    }
    if(!valid()){
      alert('레시피를 입력하세요');
      return;
    }
    const list = store.getState();
    await AsyncStorage.setItem(title,JSON.stringify(list))
    .then(()=>console.log('successfully saved'))
    .catch(()=>'error in saving')
    alert('saved!')
  }
  const devlist = () => {console.log(store.getState());}
  // const devlist = async() => {
  //   const keys = await AsyncStorage.getAllKeys();
  //     const localList = await AsyncStorage.multiGet(keys);
  //     console.log(localList);  
  // } 
  const apply = () => {
    console.log("apply")
    store.dispatch({
      type:'apply',
      value: targetFlour
    })
  }
  const reset = () => {
    store.dispatch({type:'reset'})
    setInputFlour('');
    setTargetFlour('');
    setTitle('');
  }
  const loadAssets = () => {}
  const onFinish = () => {}

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('blur', ()=>store.dispatch({type:'reset'}))
    setInputFlour('');
    setTargetFlour('');
  }, []);

  const [loaded] = Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  if(loaded){
  return (
    <Wrapper>
      <FlourContainer>
        <InputContainer>
          <TextInput 
          placeholder = 'Insert Flour (g)'
          label="input Flour"
          defaultValue={inputFromBR}
          value={inputFlour}
          onChangeText={cur=>setInputFlour(cur)}
          style={{
            width: WIDTH*0.5, 
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'Delius'
          }}
          keyboardType={'numeric'}
        />
        <TextInput 
          placeholder = "Target Flour (g)"
          label="input Flour"
          value={targetFlour}
          onChangeText={cur=>setTargetFlour(cur)}
          style={{
            width: WIDTH*0.5, 
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            fontSize: 16,
            textAlign: 'center',
            marginTop: 10,
            fontFamily: 'Delius'
          }}
          keyboardType={'numeric'}
        />
        </InputContainer>
        <TouchableOpacity onPress={apply}>
          <Apply>
          <ApplyText>APPLY</ApplyText>
          </Apply>
        </TouchableOpacity>
      </FlourContainer>
      
      <IngredientContainer>
      <ScrollView>
        {
          store.getState().tray.map(cur=>
            <Ingredient key={cur.inputName} cur={cur}/>
          )
        }
      </ScrollView>
      </IngredientContainer>
      <ButtonContainer>

        <TopContainer>
        <TouchableOpacity onPress={reset}><ResetBtn>
        <ResetText>RESET</ResetText>
        </ResetBtn></TouchableOpacity>

        <TouchableOpacity onPress={add}><AddBtn>
        <AddText>ADD</AddText>
        </AddBtn></TouchableOpacity>
        </TopContainer>

        <BottomContainer>
        <TextInput 
          placeholder="이름을 입력하세요"
          value={title}
          onChangeText={cur=>setTitle(cur)}
          style={{
            fontFamily: 'Delius'
          }}
        />
        <TouchableOpacity onPress={save}><SaveBtn>
        <SaveText>SAVE</SaveText>
        </SaveBtn></TouchableOpacity>
        </BottomContainer>

        {/* <TouchableOpacity onPress={devlist}><DevListBtn /></TouchableOpacity> */}
        
      </ButtonContainer>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalWrapper>
        <ModalInputContainer>
        <TextInput 
          placeholder="Ingredient"
          value={inputName}
          onChangeText={cur=>setInputName(cur)}
          style={{
            width: WIDTH*0.5,
            backgroundColor: "#fff",
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            marginTop: 5,
            marginBottom: 5,
            textAlign: 'center',
            height: HEIGHT*0.07,
            fontFamily: 'Delius'
          }}
        />
        <TextInput 
          placeholder="(g)"
          value={inputGram}
          onChangeText={cur=>setInputGram(cur)}
          style={{
            width: WIDTH*0.5,
            backgroundColor: "#fff",
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            marginTop: 5,
            marginBottom: 5,
            textAlign: 'center',
            height: HEIGHT*0.07,
            fontFamily: 'Delius'
          }}
          keyboardType={'numeric'}
        />
        </ModalInputContainer>

        {/* <TouchableOpacity onPress={()=>{
          setModalVisible(!modalVisible);
          store.dispatch({
            type:'addIgd',
            value:{
              "inputName":inputName, 
              "inputGram":inputGram,
              "percentage":(((inputGram/inputFlour))*100).toFixed(1),
              "targetGram":(((inputGram/inputFlour))*targetFlour).toFixed(0)
            }
          })
          console.log("Why not?")
        }}><AddIgdBtn>
          <AddIgdText>Add Ingredient</AddIgdText>
        </AddIgdBtn></TouchableOpacity> */}


        <Button 
          title="Add Ingredient"
          onPress={()=>{
            store.dispatch({
              type:'addIgd',
              value:{
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage":(((inputGram/inputFlour))*100).toFixed(1),
                "targetGram":(((inputGram/inputFlour))*targetFlour).toFixed(1)
              }
            })
            setModalVisible(!modalVisible);
            setInputName('');
            setInputGram('');
          }}
        />
        <Blank />
        <Button 
          title="Go Back"
          onPress={()=> setModalVisible(!modalVisible)}
        />

        </ModalWrapper>
      </Modal>
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

const mapStateToProps = ( state ) => {
  return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
  return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);