import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Dimensions, ScrollView, TextInput,Modal, Button, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ingredient from '../../component/ingredient';
import { connect } from 'react-redux';
import { store } from '../../../Redux/Store.js';

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

const igdList = [{
  "inputName":'apple', 
  "inputGram":70,
  "percentage":(70/100*100),
  "targetGram":(70/100*200)
}];

const Calculator = () => {
  const [inputFlour, setInputFlour] = useState(100);
  const [targetFlour, setTargetFlour] = useState(200);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputGram, setInputGram] = useState(0.0);

  const add = () => {setModalVisible(true)}
  const save = () => {console.log("save")}
  const devlist = () => {console.log(store.getState());}
  
  return (
    <Wrapper>

      <FlourContainer>
        <TextInput 
          placeholder = "Insert Flour(g)"
          label="input Flour"
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

      <ScrollView>
        {
          igdList.map(cur=>
            <Ingredient key={igdList.indexOf(cur)+1} cur={cur}/>
          )
        }
      </ScrollView>
      
      <ButtonContainer>
        <TouchableOpacity onPress={add}><AddBtn /></TouchableOpacity>
        <TouchableOpacity onPress={save}><SaveBtn /></TouchableOpacity>
        <TouchableOpacity onPress={devlist}><DevListBtn /></TouchableOpacity>
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
            igdList.push({
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage":(inputGram/inputFlour*100),
                "targetGram":(inputGram/inputFlour*targetFlour)
            });
            store.dispatch({
              type:'addIgd',
              value:{
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage":(inputGram/inputFlour*100),
                "targetGram":(inputGram/inputFlour*targetFlour)
              }
            })
          }}
        />
        </ModalWrapper>
      </Modal>
    </Wrapper>
  )
}

const mapStateToProps = ( state ) => {
  return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
  return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);