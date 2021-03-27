import { createStore } from 'redux';

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
      // console.log("action value",state.tray);
      return {
        ...state
      }
    case 'brToCal':
      state.tray = action.value.igd;
      // console.log("tray state: ",state.tray);
      return {
        ...state
      }
    case 'apply':
      if(action.value===''||action.value===0) 
        return{
          ...state
        }
      state.tray.map(cur=>{
        // console.log("cur: ", cur)
        cur.targetGram = ( cur.percentage*action.value*0.01 ).toFixed(1)
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