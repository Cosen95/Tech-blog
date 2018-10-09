import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    focus: false,
    mouseIn: false,
    list: [],
    pageNo: 1,
    totalPage: 1
});

export default (state = defaultState, action) => {
    // immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象
    switch(action.type) {
        case constants.SEARCH_FOCUS:
            return state.set('focus', true);
        case constants.SEARCH_BLUR:
            return state.set('focus', false);
        case constants.CHANGE_LIST:
            // return state.set('list', action.data).set('totalPage', action.totalPage);
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            })
        case constants.MOUSE_ENTER:
            return state.set('mouseIn', true);
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn', false);
        case constants.SEARCH_SWITCH:
            return state.set('pageNo', action.pageNo);
        default:
            return state  
    }
}