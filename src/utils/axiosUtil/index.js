import axios from 'axios';
import settings from './../../config/settings';

axios.defaults.timeout =5000;


let service = axios.create({
    baseURL:'http://'+settings.dataSource.ip+':'+settings.dataSource.port+'/parse',
    timeout:5000
},)

//添加请求拦截器
service.interceptors.request.use(config=>{
    config.headers = {
        'X-Parse-Application-Id':settings.dataSource.appId,
        'X-Parse-REST-API-Key':settings.dataSource.restKey,
        'Content-Type':'application/json'
    }
   return config;
});

//添加相应拦截器
service.interceptors.response.use(response=>{
   return response;
},error =>  {
    console.log('axios response error=>',error);
    return Promise.reject(error);
});



export default {
    //get请求
    get(url,param) {
        return new Promise((resolve, reject) => {
                service({
                    method: 'get',
                    url,
                    params: param
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                    console.log('异常', err);
                })
            }
        )
    },

    //post请求
    post(url,param){
        return new Promise((resolve,reject)=>{
            service({
                method: 'post',
                url,
                data:param
            }).then(res=>{
                resolve(res);
            }).catch(err=>{
              reject(err);
              console.log('异常',err);
            })
        });
    }
};

