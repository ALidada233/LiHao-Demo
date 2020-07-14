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
//获取角色汇总
export const queryRolePage =(params,callback)=>{
  axios({
      url:api+"/queryRolePage ",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}

//新增编辑角色saveRole
export const saveRole =(params,callback)=>{
  axios({
      url:api+"/saveRole ",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}