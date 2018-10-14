import { fromJS } from 'immutable';
import * as constants from './constants'

const defaultState = fromJS({
   topicList: [],
   articleList: [],
   recommendList: [],
   articlePage: 1,
   showScroll: false
});

const initHomeData = (state, action) => {
    return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
    })
}

const addArticleList = (state, action) => {
    return state.merge({
        articleList: state.get('articleList').concat(action.list),
        articlePage: action.nextPage
    })
}

export default (state = defaultState, action) => {
    // immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象
    switch(action.type) {
        case constants.INIT_HOME_DATA:
            return initHomeData(state, action);
        case constants.ADD_ARTICLE_LIST:
            return addArticleList(state, action);
            // return state.set('articleList', state.get('articleList').concat(action.list));
        case constants.TOGGLE_TOP_SHOW:
            return state.set('showScroll', action.show)
        default:
            return state  
    }
}