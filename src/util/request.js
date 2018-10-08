import axios from 'axios';
import 'antd/dist/antd.css';
import { Modal } from 'antd';

export default class Axios{
    static ajax(options) {
        let baseUrl = 'https://www.easy-mock.com/mock/5ba5aa9b489c246a8645c633/jianshu';
        return new Promise((resolve,reject) => {
            axios({
                url: options.url,
                method: options.method,
                baseURL: baseUrl,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if(response.status == '200') {
                    let { data:res } = response;
                    if(res.code == '0') {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: '服务繁忙，请稍后重试'
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
}