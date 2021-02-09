import { createStore } from 'redux';

const initState = {
  tray: [{
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
  }],
  name: 'joielee'
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
  }
}
export const store = createStore(Reducer);