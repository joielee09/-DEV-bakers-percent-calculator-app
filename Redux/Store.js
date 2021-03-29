import { createStore } from 'redux';

const initState = {
  tray: []
}

const personalState = {
  userName:'joielee',
  savedRecipe:[]
}

const initFlour = {
  totalFlour: 0
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
      // console.log("action value",state.tray);
      return {
        ...state
      }
    case 'brToCal':
      state.tray = action.value.list;
      console.log("tray state: ",state.tray);
      return {
        ...state
      }
    case 'apply':
      const totalFlour = action.totalFlour;
      const targetFlour = action.targetFlour;
      if( targetFlour==='' || targetFlour===0 ) 
        return{
          ...state
        }
      state.tray.map(cur=>{
        cur.percentage = ((cur.inputGram / totalFlour).toFixed(3))*100;
        cur.targetGram = ((cur.inputGram / totalFlour) * targetFlour).toFixed(1);
      })
      return {
        ...state
      }
    case 'reset':
      return{
        tray: []
      }
    case 'validity':
      const result = state.tray.indexOf(action.value);
      console.log("action value",action.value);
      if (result === -1) return false;
      else return true;
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

const FlourReducer = (state = initFlour, action) => {
  switch (action.type) {
    case 'addFlour':
      state.totalFlour += parseInt(action.value.flour);
      console.log('flour added', action.value, state.totalFlour);
      return { ...state }
    case 'removeFlour':
      state.totalFlour -= parseInt(action.value.flour);
      if (state.totalFlour < 0) state.totalFlour = 0;
      console.log('flour removed', action.value, state.totalFlour);
      return { ...state }
    case 'passFlour':
      state.totalFlour = parseInt(action.value.flour);
      console.log('flour passing', action.value, state.totalFlour);
      return { ...state }
    case 'resetFlour':
      state.totalFlour = 0;
      console.log('flour passing', action.value, state.totalFlour);
      return { ...state }
    default:
      return { ...state }
  }
}

export const store = createStore(Reducer);
export const personalStore = createStore(personalReducer);
export const flourStore = createStore(FlourReducer);