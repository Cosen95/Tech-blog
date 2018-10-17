import { fromJS } from 'immutable';
import * as constants from './constants'

const defaultState = fromJS({
   login: false
});




export default (state = defaultState, action) => {
    // immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象
    switch(action.type) {
        case constants.CHANGE_LOGIN:
            return state.set('login', action.loginStatus);
        case constants.LOG_OUT:
            return state.set('login', action.loginStatus);
        default:
            return state  
    }
}