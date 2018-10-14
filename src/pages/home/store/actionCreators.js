import axios from '../../../util/request';
import * as constants from './constants'
import { fromJS} from 'immutable';

const initHomeInfo = (result) => ({
    type: constants.INIT_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList
})

const addArticleList = (list, nextPage) => ({
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage
})


export const getHomeInfo = () => {
    return (dispatch) => {
        axios.ajax({
            url: '/home_list',
            method: 'get',
            data: {
                params:{ id:333}
            }
       }).then((res) => {
           console.log(res);
           const result = res.data;
           dispatch(initHomeInfo(result));
       })
    }
}

export const getMoreList = (pageNo) => {
    return (dispatch) => {
        axios.ajax({
            url: '/getMoreList',
            method: 'get',
            data: {
                params:{ pageNo }
            }
       }).then((res) => {
           const result = res.data.articleList;
           dispatch(addArticleList(result, pageNo+1));
       })
    }
}

export const toggleTopShow = (show) => ({
    type: constants.TOGGLE_TOP_SHOW,
    show
})