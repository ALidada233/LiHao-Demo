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
//查询系統配置列表分页
export const querySystemConfigPage=(params,callback)=>{
  axios({
      url:api+"/querySystemConfigPage",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}

//编辑唯一值
export const updateSystemConfig =(params,callback)=>{
  axios({
      url:api+"/updateSystemConfig ",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
