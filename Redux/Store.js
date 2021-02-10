import { createStore } from 'redux';

/*
{
  "inputName":'apple', 
  "inputGram":70,
  "percentage":(70/100*100),
  "targetGram":(70/100*200)
},
{
  "inputName":'orange', 
  "inputGram":70,
  "percentage":(70/100*100),
  "targetGram":(70/100*200)
},
{
  "inputName":'grape', 
  "inputGram":70,
  "percentage":(70/100*100),
  "targetGram":(70/100*200)
}
*/
const initState = {
  tray: []
}

const personalState = {
  userName:'joielee',
  savedRecipe:[]
}

const Reducer = ( state=initState, action ) => {
  switch(action.type){
    case 'deleteIgd':
      console.log("deleted")
      const item = action.value;
      state.tray = state.tray.filter(cur=>cur.inputName!==item)
      return {
        ...state
      }
    case 'addIgd':
      console.log("add")
      state.tray.push(action.value)
      console.log("action value",state.tray);
      return {
        ...state
      }
    case 'brToCal':
      state.tray = action.value.igd;
      console.log("tray state: ",state.tray);
      return {
        ...state
      }
    case 'apply':
      state.tray.map(cur=>{
        cur.targetGram = ((cur.percentage*0.01)*parseInt(action.value)).toFixed(1);
      })
      return {
        ...state
      }
    case 'reset':
      return{
        tray: []
      }
    default:
      return {
        ...state
      }
  }
}

const personalReducer = (state = personalState, action) => {
  switch(action.type){
    case 'save':
      return {
        ...state
      }
    default:
      return {
        ...state
      }
  }
}
export const store = createStore(Reducer);
export const personalStore = createStore(personalReducer);