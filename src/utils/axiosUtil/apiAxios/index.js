import axios from 'axios'
import settings from './../../../config/settings'
import { Modal } from 'antd'

axios.defaults.withCredentials = true;
export default class Axios {

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = 'http://' + settings.api.ip + ":" + settings.api.port;
        
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: options.method || 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || '',
                responseType: options.responseType || '',
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200') {
                    let res = response;
                    if (res.data.code === 5000) {
                        resolve(res);
                    } else if (res.data.code === 8015) {
                        window.location = '/#/login'
                    }
                    else {
                        if (options.selfHandle) {
                            resolve(res);
                        } else {
                            Modal.info({
                                title: "提示",
                                content: res.data.errorMsg,
                            })
                        }
                    }
                } else {
                    reject(response.data);
                }
            })
        });
    }
}