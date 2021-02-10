import React from 'react';
import styled from 'styled-components/native';
import { Button, Dimensions, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { store } from '../../../Redux/Store'

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View`
  height: 50px;
  /* background-color: lightgreen; */
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-around;
`;
const Text = styled.Text`
  font-size: 15px;
`;

const Ingredient = ( cur ) => {
  // console.log("cur: ", cur);

  const deleteItem = () => {
    store.dispatch({
      type: 'deleteIgd',
      value: cur.cur.inputName
    })
  }
  return (
    <Wrapper>
      <Text>{cur.cur.inputName}</Text>
      <Text>{cur.cur.inputGram}(g)</Text>
      <Text>{cur.cur.percentage}(%)</Text>
      <Text>{cur.cur.targetGram}(g)</Text>

      <Pressable  onPress={deleteItem}>
        <AntDesign 
          name="delete" 
          size={20} 
          color="gray"
          style={{
              marginLeft: 18
        }}/>
      </Pressable>

    </Wrapper>
  )
}

const mapStateToProps = ( state ) => {
  return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
  return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);