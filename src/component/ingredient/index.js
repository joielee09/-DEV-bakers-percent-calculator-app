import React from 'react';
import styled from 'styled-components/native';
import { Button, Dimensions, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { store, flourStore } from '../../../Redux/Store';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View`
  height: 50px;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-around;
`;
const Text = styled.Text`
  font-size: 13px;
  font-family: 'Delius';
  width: ${WIDTH*0.19}px;
`;
const NameText = styled.Text`
  font-size: 13px;
  font-family: 'Delius';
  width: ${WIDTH*0.24}px;
`;

const Ingredient = ( cur ) => {
  // console.log("cur: ", cur);

  const loadAssets = () => {}
  const onFinish = () => {}
  // const [loaded, setLoaded] = useState(false);


  const deleteItem = () => {
    store.dispatch({
      type: 'deleteIgd',
      value: cur.cur.inputName
    })
    if (cur.cur.flourInput && cur.cur.inputGram) {
      flourStore.dispatch({
        type:'removeFlour',
        value:{
          "flour":cur.cur.inputGram
        }
      })
    }
  }
  
  const [loaded] = Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  if(loaded){
  return (
    <Wrapper>
      <NameText>{cur.cur.inputName}</NameText>
      <Text>{cur.cur.inputGram}(g)</Text>
      <Text>{cur.cur.percentage}(%)</Text>
      <Text>{cur.cur.targetGram}(g)</Text>

      <Pressable  onPress={deleteItem}>
        <AntDesign 
          name="delete" 
          size={18} 
          color="gray"
          style={{
        }}/>
      </Pressable>

    </Wrapper>
  )} else {
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

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);