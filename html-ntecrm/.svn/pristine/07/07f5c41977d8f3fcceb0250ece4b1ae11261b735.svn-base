import Vue from 'vue'
import axios from 'axios';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if(process.env.NODE_ENV=="development"){
    api="/nte-crm"
}else{  //测试环境
    api=requestUrl;
}

//查询提成
export const queryOrderCommissionList=(params,callback)=>{
    axios({
        url:api+"/queryOrderCommissionList",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}