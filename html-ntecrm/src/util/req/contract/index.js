import Vue from 'vue'
import axios from 'axios';
import { MessageBox } from 'element-ui';
import Qs from 'qs';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if(process.env.NODE_ENV=="development"){
    api="/nte-crm"
}else{  //测试环境
    api=requestUrl;
}
//发送合同邮件
export const sendContract=(params,callback)=>{
  axios({
      url:api+"/sendContract",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}


