import axios from '../../../util/request';
import * as constants from './constants'

const initDetail = (result) => ({
    type: constants.INIT_DETAIL_DATA,
    title: result.title,
    content: result.content,
})

export const getDetail = (id) => {
    return (dispatch) => {
        axios.ajax({
            url: '/getDetail',
            method: 'get',
            data: {
                params:{ id }
            }
       }).then((res) => {
           console.log(res);
           const result = res.data;
           dispatch(initDetail(result));
       })
    }
}