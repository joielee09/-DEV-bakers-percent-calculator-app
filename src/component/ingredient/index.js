import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View`
  background-color: lightgreen;
`;
const Text = styled.Text`
  font-size: 15px;
`;

export default Basic = () => {
  return (
    <Wrapper>
      <Text>This is Basic Ingredient Page</Text>
    </Wrapper>
  )
}