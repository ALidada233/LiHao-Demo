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
export const queryRegionPage  =(params,callback)=>{
  axios({
      url:api+"/queryRegionPage",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}

//新增编辑区域名
export const saveRegion =(params,callback)=>{
  axios({
      url:api+"/saveRegion ",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}

export const getOperatorById =(params,callback)=>{
  axios({
      url:api+"/getOperatorById",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}