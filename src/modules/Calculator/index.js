import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, TextInput,Modal, Button, View, StyleSheet, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ingredient from '../../component/ingredient';
import { connect } from 'react-redux';
import { store, flourStore } from '../../../Redux/Store.js';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation  } from "@react-navigation/native";
import * as Font from 'expo-font';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;

const InputContainer = styled.View`
  /* width: ${WIDTH*0.45}; */
`;

const AddBtn = styled.View`
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.5*0.3}px;
  /* background-color: #dcdc; */
  background-color: lightgray;
  border-radius: 10px;
  justify-content: center;
`;
const AddText = styled.Text`
  /* margin: auto; */
  font-family: 'Delius';
  font-size: 12px;
  text-align: center;
`;
const NameContainer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color:lightyellow; */
  margin-top: ${WIDTH*0.03}px;
  margin-bottom: ${WIDTH*0.03}px;
`;
const SaveBtn = styled.View`
  width: ${WIDTH*0.25}px;
  height: ${WIDTH*0.25*0.4}px;
  background-color: lightgray;
  border-radius: 5px;
`;
const SaveText = styled.Text`
  margin: auto;
  font-family: 'Delius';
  font-size: 12px;
`;
const DevListBtn = styled.View`
  width: ${WIDTH*0.5}px;
  height: ${WIDTH*0.5*0.2}px;
  background-color: purple;
  margin: 5px auto auto;
`;
const ResetBtn = styled.View`
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.5*0.3}px;
  background-color: lightgray;
  border-radius: 10px;
`;
const ResetText = styled.Text`
  margin: auto;
  font-family: 'Delius';
  font-size: 12px;
`;
const ModalWrapper = styled.View`
  height: ${HEIGHT*0.5}px;
  background-color: #fff;
  margin-top: ${HEIGHT*0.15}px;
`;
const IngredientContainer = styled.View`
  height: ${HEIGHT*0.42}px;
  border: 0.5px lightgray solid;
`;
const FlourContainer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color:lightyellow; */
  margin-top: ${WIDTH*0.05}px;
`;
const Apply = styled.View`
  width: ${WIDTH*0.25}px;
  height: ${WIDTH*0.25*0.6}px;
  background-color: #F4C8AC;
  border-radius: 5px;
`;
const ApplyText = styled.Text`
  margin: auto;
  font-family: 'Delius';
  font-size: 12px;
`;
const ButtomContainer = styled.View`
  /* background-color: lightyellow; */
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: ${HEIGHT*0.01}px;
`;
const TopContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: ${WIDTH}px;
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
const InputFromBR = styled.Text`
  width: ${WIDTH*0.5}px;
  text-align: center;
  /* background-color: lightyellow; */
  font-size: 12px;
  font-family: 'Delius';
`;
const ButtonContainer = styled.View`
  width: ${WIDTH * 0.8}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
  margin: auto;
  margin-bottom: 5px;
`;
const ButtonText = styled.Text`
  color: gray;
  text-align: center;
`;
const InputFlourText = styled.Text`
  width: ${WIDTH * 0.5}px;
  border-bottom-color: lightgray;
  border-bottom-width: 1px ;
  text-align: center;
  font-family : 'Delius';
  font-size : 12px;
  color: gray;
`;


const Calculator = (cur) => {

  const [inputFromBR, setInputFromBR] = useState(flourStore.getState().totalFlour)
  const [inputFlour, setInputFlour] = useState('');
  const [targetFlour, setTargetFlour] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [flourModalVisible, setFlourModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputGram, setInputGram] = useState(0.0);
  const [title, setTitle] = useState('');
  const nameList = '';

  const valid = () => {
    return title && flourStore.getState().totalFlour && (store.getState().tray.length!=0);
  }
  const add = (category) => {
    if (category === 'igd') {
      if (inputFlour || inputFromBR) setModalVisible(true);
      else alert(`PLEASE 'ADD FLOUR' FIRST!`);
    }
    if (category === 'flour') setFlourModalVisible(true)
  }
  const save = async() => {
    if(!title){
      alert('submit name first');
      return;
    }
    if(!valid()){
      alert('list up ingredient first');
      return;
    }
    let list = store.getState();
    if (inputFromBR) setInputFlour(inputFromBR);
    // error 1
    list.tray.push({
      "inputGram": flourStore.getState().totalFlour,
      "inputName": 'flour',
      "percentage": '100.0',
      "targetGram": targetFlour,
      "flag": true,
      "flourInput": false,
    });
    await AsyncStorage.setItem(title,JSON.stringify(list))
      .then((res) => {
        console.log('successfully saved', res);
      })
    .catch(()=>'error in saving')
    alert('saved!')
  }
  const devList = () => {console.log(store.getState());}
  const devstorageList = async() => {
    const keys = await AsyncStorage.getAllKeys();
      const localList = await AsyncStorage.multiGet(keys);
      // console.log(localList);  
  } 
  const apply = () => {
    console.log("apply")
    if (targetFlour === '') setTargetFlour(flourStore.getState().totalFlour);
    store.dispatch({
      type: 'apply',
      totalFlour: flourStore.getState().totalFlour,
      targetFlour: targetFlour
    })
  }
  const reset = () => {
    store.dispatch({ type: 'reset' })
    flourStore.dispatch({ type: 'resetFlour' })
    setInputFlour('');
    setTargetFlour('');
    setTitle('');
  }
  const loadAssets = () => {
    setInputFromBR(flourStore.getState().totalFlour);
  }
  const onFinish = () => {}

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('blur', () => reset())
  }, []);

  const [loaded] = Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  useEffect(() => {
    if(cur.route.params!==undefined)  {
      setInputFromBR(parseInt(cur.route.params.inputFlour));
      setInputFlour(parseInt(cur.route.params.inputFlour));
    }
  }, [])

  if(loaded){
  return (
    <Wrapper>
      <FlourContainer>
        <InputContainer>
        <InputFromBR>{`TOTAL FLOUR:`}</InputFromBR>
        <InputFromBR>{`${flourStore.getState().totalFlour} (g)`}</InputFromBR>
        <InputFromBR />
        <InputFromBR>{`TARGET FLOUR:`}</InputFromBR>
        <TextInput
          placeholder = {`${flourStore.getState().totalFlour.toString()}`}
          label="input Flour"
          value={targetFlour}
          // defaultValue={(flourStore.getState().totalFlour).toString()}
          onChangeText={cur=>setTargetFlour(cur)}
          style={{
            width: WIDTH*0.5, 
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            fontSize: 16,
            textAlign: 'center',
            marginTop: 10,
            fontFamily: 'Delius',
            fontSize: 12
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
      
      <NameContainer>
        <TextInput 
          placeholder="NAME OF RECIPE"
          value={title}
          onChangeText={cur=>setTitle(cur)}
          style={{
            width: WIDTH*0.5, 
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'Delius'
          }}
        />
        <TouchableOpacity onPress={save}><SaveBtn>
        <SaveText>SAVE</SaveText>
        </SaveBtn></TouchableOpacity>
      </NameContainer>

      <IngredientContainer>
      <ScrollView>
        {
          store.getState().tray.map(cur=>
            <Ingredient key={`${cur.inputName}${Date()}`} cur={cur}/>
          )
        }
      </ScrollView>
      </IngredientContainer>
      <ButtomContainer>

        <TouchableOpacity onPress={reset}><ResetBtn>
        <ResetText>RESET</ResetText>
        </ResetBtn></TouchableOpacity>

        <TouchableOpacity onPress={()=>add('igd')}><AddBtn>
        <AddText>ADD INGREDIENT</AddText>
        </AddBtn></TouchableOpacity>

        <TouchableOpacity onPress={()=>add('flour')}><AddBtn>
        <AddText>ADD FLOUR</AddText>
        </AddBtn></TouchableOpacity>

      </ButtomContainer>

      {/* ingredient modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalWrapper>
        <ModalInputContainer>
        <TextInput 
          placeholder="INGREDIENT"
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

        <Pressable
            onPress={() => {
              // validity check: ingredient element identify based
              const res = store.getState().tray.filter(cur=>cur.inputName===inputName);
              console.log("res", res);
              if (res.length !== 0) {
                alert('name already taken');
                setInputName('');
                setInputGram('');
                return;
              }
              if (inputName === '') return;
              if (inputGram === '') return;
            store.dispatch({
              type:'addIgd',
              value:{
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage": 0,
                "targetGram": 0,
                "flag": true,
                "flourInput": false,
              }
            })
            // setModalVisible(!modalVisible);
            setInputName('');
            setInputGram('');
            alert('ingredient added!');
          }}
        ><ButtonContainer><ButtonText>ADD INGREDIENT</ButtonText></ButtonContainer>
            </Pressable>
        <Blank />
          
          <Pressable
            onPress={
              ()=> setModalVisible(!modalVisible)
            }
          >
            <ButtonContainer><ButtonText>GO BACK</ButtonText></ButtonContainer>
        </Pressable>


        </ModalWrapper>
      </Modal>

      

          {/* flour modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={flourModalVisible}
      >
        <ModalWrapper>
        <ModalInputContainer>
        <TextInput 
          placeholder="FLOUR"
          value={inputName}
          onChangeText={ cur => {
            // validity of child name check
            setInputName(cur);
          }}
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

        <Pressable
            onPress={() => {
              // validity check: ingredient element identify based
              const res = store.getState().tray.filter(cur=>cur.inputName===inputName);
              console.log("res", res);
              if (res.length !== 0) {
                alert('name already taken');
                setInputName('');
                setInputGram('');
                return;
              }
              if (inputName === '') return;
              if (inputGram === '') return;
              store.dispatch({
                type:'addIgd',
                value:{
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage": 0,
                "targetGram": 0,
                "flag": true,
                "flourInput": true,
              }
              })
              flourStore.dispatch({
                type:'addFlour',
                value:{
                  "flour":inputGram
                }
              })
            // setModalVisible(!modalVisible);
            setInputName('');
            setInputGram('');
            setInputFromBR(flourStore.getState().totalFlour);
            alert('FLOUR ADDED!');
          }}
        ><ButtonContainer><ButtonText>ADD FLOUR</ButtonText></ButtonContainer>
            </Pressable>
        <Blank />
          
          <Pressable
            onPress={
              ()=> setFlourModalVisible(!flourModalVisible)
            }
          >
            <ButtonContainer><ButtonText>GO BACK</ButtonText></ButtonContainer>
        </Pressable>


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