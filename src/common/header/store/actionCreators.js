import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from '../../../util/request'

export const searchFocus = ()=> ({
    type: constants.SEARCH_FOCUS
});

export const searchBlur = ()=> ({
    type: constants.SEARCH_BLUR
});

const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data: fromJS(data)
})

export const getList = ()=> {
    return (dispatch)=> {
       axios.ajax({
            url: '/hotSearchList',
            method: 'get',
            data: {
                params:{ id:333}
            }
       }).then((res) => {
        //    console.log(res);
           dispatch(changeList(res.data.keyword));
       })
    }
}

