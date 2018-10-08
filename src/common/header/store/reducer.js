import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    focus: false,
    list: []
});

export default (state = defaultState, action) => {
    // immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象
    if (action.type === constants.SEARCH_FOCUS) {
        return state.set('focus', true);
    }
    if (action.type === constants.SEARCH_BLUR) {
        return state.set('focus', false);
    }
    if (action.type === constants.CHANGE_LIST) {
        // console.log(action);
        return state.set('list', action.data);
    }
    return state;
}