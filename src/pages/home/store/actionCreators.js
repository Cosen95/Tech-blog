import axios from '../../../util/request';
import * as constants from './constants'

const initHomeInfo = (result) => ({
    type: constants.INIT_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList
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