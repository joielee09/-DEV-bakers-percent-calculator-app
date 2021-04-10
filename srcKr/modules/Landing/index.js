import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;
const ButtonContainer = styled.View`
  width: ${WIDTH*0.5}px;
  height: ${WIDTH*0.5*0.2}px;
  background-color: #abab;
  margin: 20px auto auto;
`;

export default Basic = () => {
  const navigation = useNavigation();
  const goToBR = () => {
    navigation.navigate("BasicRecipe", {});
  }
  const goToCal = () => {
    navigation.navigate("Calculator", {});
  }
  const goToPersonal = () => {
    navigation.navigate("Personal", {});
  }

  return (
    <Wrapper>
      <TouchableOpacity onPress={goToBR}>
        <ButtonContainer />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToCal}>
        <ButtonContainer />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToPersonal}>
        <ButtonContainer />
      </TouchableOpacity>
    </Wrapper>
  )
}