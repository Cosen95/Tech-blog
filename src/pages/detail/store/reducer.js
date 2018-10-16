import { fromJS } from 'immutable';
import * as constants from './constants'

const defaultState = fromJS({
   title: '',
   content: ''
});

const initDetailData = (state, action) => {
    return state.merge({
        title: action.title,
        content: action.content,
    })
}


export default (state = defaultState, action) => {
    // immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象
    switch(action.type) {
        case constants.INIT_DETAIL_DATA:
            return initDetailData(state, action);
        default:
            return state  
    }
}