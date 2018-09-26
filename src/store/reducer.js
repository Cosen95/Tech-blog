const defaultState = {
    focus: false
};

export default (state = defaultState, action) => {
    if (action.type === 'search_focus') {
        return {
            focus: true
        }
    }
    if (action.type === 'search_blur') {
        return {
            focus: false
        }
    }
    return state;
}