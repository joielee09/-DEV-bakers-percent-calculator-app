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

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;
const FlourContainer = styled.View`
  height: 100px;
  background-color: lightyellow;
  align-items: center;
  justify-content: center;
`;
const ButtonContainer = styled.View`
  background-color: yellow;
  align-items: center;
`;
const AddBtn = styled.View`
  width: ${WIDTH*0.5}px;
  height: ${WIDTH*0.5*0.2}px;
  background-color: #dcdc;
  margin: 5px auto auto;
`;
const SaveBtn = styled.View`
  width: ${WIDTH*0.5}px;
  height: ${WIDTH*0.5*0.2}px;
  background-color: pink;
  margin: 5px auto auto;
`;
const DevListBtn = styled.View`
  width: ${WIDTH*0.5}px;
  height: ${WIDTH*0.5*0.2}px;
  background-color: purple;
  margin: 5px auto auto;
`;
const ModalWrapper = styled.View`
  height: ${HEIGHT*0.4}px;
  background-color: lightgreen;
  margin-top: ${HEIGHT*0.6}px;
`;
const IngredientContainer = styled.View`
  height: ${HEIGHT*0.4}px;
`;

const igdList = [];

const Calculator = (cur) => {
  // console.log("cur in calculator: ", cur);
  let inputFromBR =  (cur.route.params!==undefined)? (cur.route.params.inputFlour).toString() : '';
  const [inputFlour, setInputFlour] = useState(inputFromBR? parseInt(inputFromBR):'');
  const [targetFlour, setTargetFlour] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputGram, setInputGram] = useState(0.0);
  const [title, setTitle] = useState('');

  const add = () => {
    if(inputFlour)  setModalVisible(true);
    else alert('please insert flour first!')
  }
  const save = async() => {
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
    // update redux: dispatch && apply to every value
    store.dispatch({
      type:'apply',
      value: targetFlour
    })
  }
  const reset = () => {
    store.dispatch({type:'reset'})
  }
  const loadAssets = () => {
    
    setLoaded(true);
  }
  const onFinish = () => {}
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('blur', ()=>store.dispatch({type:'reset'}))
  }, []);

  if(loaded){
  return (
    <Wrapper>
      <FlourContainer>
          <TextInput 
          placeholder = 'Insert Flour(g)}'
          label="input Flour"
          defaultValue={inputFromBR}
          value={inputFlour}
          onChangeText={cur=>setInputFlour(cur)}
          style={{
            width: 100,
            height: 50
          }}
          keyboardType={'numeric'}
        />
        <TextInput 
          placeholder = "Target Flour(g)"
          label="input Flour"
          value={targetFlour}
          onChangeText={cur=>setTargetFlour(cur)}
          style={{
            width: 100,
            height: 50
          }}
          keyboardType={'numeric'}
        />
      </FlourContainer>
      <Button title="APPLY" onPress={apply} />
      <ScrollView>
      <IngredientContainer>
        {
          store.getState().tray.map(cur=>
            <Ingredient key={cur.inputName} cur={cur}/>
          )
        }
      </IngredientContainer>
      </ScrollView>
      
      <ButtonContainer>
        <TouchableOpacity onPress={add}><AddBtn /></TouchableOpacity>
        <TextInput 
          placeholder="이름을 입력하세요"
          value={title}
          onChangeText={cur=>setTitle(cur)}
        />
        <TouchableOpacity onPress={save}><SaveBtn /></TouchableOpacity>
        <TouchableOpacity onPress={devlist}><DevListBtn /></TouchableOpacity>
        <TouchableOpacity onPress={reset}><DevListBtn /></TouchableOpacity>
      </ButtonContainer>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{
          height: 300 }}
      >
        <ModalWrapper>
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
            marginBottom: 5
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
            marginBottom: 5
          }}
          keyboardType={'numeric'}
        />
        <Button 
          title="Add Ingredient"
          onPress={()=>{
            setModalVisible(!modalVisible);
            // igdList.push({
            //     "inputName":inputName, 
            //     "inputGram":inputGram,
            //     "percentage":(((inputGram/inputFlour).toFixed(2))*100).toFixed(2),
            //     "targetGram":(((inputGram/inputFlour).toFixed(2))*targetFlour).toFixed(2)
            // });
            store.dispatch({
              type:'addIgd',
              value:{
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage":(((inputGram/inputFlour))*100).toFixed(1),
                "targetGram":(((inputGram/inputFlour))*targetFlour).toFixed(0)
              }
            })
          }}
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