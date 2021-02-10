import React from 'react';
import styled from 'styled-components/native';
import { Button, Dimensions, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { store } from '../../../Redux/Store';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

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
  font-family: 'Delius';
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
  }
  
  const [loaded] = Font.useFonts({
    'Delius': require('../../../assets/fonts/Delius-Regular.ttf'),
  });

  if(loaded){
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