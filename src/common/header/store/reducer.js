import * as constants from './constants';

const defaultState = {
    focus: false
};

export default (state = defaultState, action) => {
    if (action.type === constants.SEARCH_FOCUS) {
        return {
            focus: true
        }
    }
    if (action.type === constants.SEARCH_BLUR) {
        return {
            focus: false
        }
    }
    return state;
}