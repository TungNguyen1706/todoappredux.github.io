import * as types from '../constants/ActionTypes';

let initialState = false;

let myReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.TOOGLE_FORM : 
            return !state; 
        case types.OPEN_FORM :
            return state = true;
        case types.CLOSE_FORM :
             return state = false;
        default: return state;
    }
};

export default myReducer;