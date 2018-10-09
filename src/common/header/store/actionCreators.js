import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from '../../../util/request'

const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
});

export const searchFocus = ()=> ({
    type: constants.SEARCH_FOCUS
});

export const searchBlur = ()=> ({
    type: constants.SEARCH_BLUR
});

export const handleMouseEnter = ()=> ({
    type: constants.MOUSE_ENTER
});

export const handleMouseLeave = ()=> ({
    type: constants.MOUSE_LEAVE
});

export const handleSwitch = (pageNo)=> ({
    type: constants.SEARCH_SWITCH,
    pageNo
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

