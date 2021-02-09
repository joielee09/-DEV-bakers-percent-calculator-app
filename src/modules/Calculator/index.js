import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ingredient from '../../component/ingredient'

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

const igdList = ['apple', 'sugar', 'milk'];

export default Basic = () => {
  const [inputFlour, setInputFlour] = useState()
  const [targetFlour, setTargetFlour] = useState()

  const add = () => {
    console.log("add");
  }
  const save = () => {
    console.log("save")
  }
  const devlist = () => {
    console.log("devlist")
  }
  return (
    <Wrapper>

      <FlourContainer>
        <TextInput 
          placeholder = "Insert Flour(g)"
          label="input Flour"
          value={inputFlour}
          onChangeText={cur=>setInputFlour(cur)}
          style={{
            widht: 100,
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
            widht: 100,
            height: 50
          }}
          keyboardType={'numeric'}
        />
      </FlourContainer>

      <ScrollView>
        {
          igdList.map(cur=><Ingredient />)
        }
      </ScrollView>
      
      <ButtonContainer>
        <TouchableOpacity onPress={add}><AddBtn /></TouchableOpacity>
        <TouchableOpacity onPress={save}><SaveBtn /></TouchableOpacity>
        <TouchableOpacity onPress={devlist}><DevListBtn /></TouchableOpacity>
      </ButtonContainer>
    </Wrapper>
  )
}