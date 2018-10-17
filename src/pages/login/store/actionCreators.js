import axios from '../../../util/request';
import * as constants from './constants'

const changeLogin = (isSuccess) => ({
    type: constants.CHANGE_LOGIN,
    loginStatus: isSuccess,
})

export const logout = () => ({
    type: constants.LOG_OUT,
    loginStatus: false
})

export const login = (account, password) => {
    return (dispatch) => {
        axios.ajax({
            url: '/login',
            method: 'post',
            data: {
                params:{ account, password }
            }
       }).then((res) => {
           console.log(res);
           const { isSuccess } = res;
           dispatch(changeLogin(isSuccess));
       })
    }
}