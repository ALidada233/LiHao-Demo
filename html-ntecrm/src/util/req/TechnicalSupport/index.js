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
//查询技术支持列表 
export const queryTechnicalSupportList=(params,callback)=>{
  axios({
      url:api+"/queryTechnicalSupportList",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
//获取技术工作台信息 
export const getTechnicalSupportIndex=(callback)=>{
    axios({
        url:api+"/getTechnicalSupportIndex",
        method:'get'
    }).then(res=>{
       callback(res.data)
    })
}
//获取技术支持详情列表 
export const getTechnicalSupportByDto=(params,callback)=>{
    axios({
        url:api+"/getTechnicalSupportByDto",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//新增、回复技术支持 
export const insertTechnicalSupport=(params,callback)=>{
    axios({
        url:api+"/insertTechnicalSupport",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//修改技术支持 
export const updateTechnicalSupport=(params,callback)=>{
    axios({
        url:api+"/updateTechnicalSupport",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}