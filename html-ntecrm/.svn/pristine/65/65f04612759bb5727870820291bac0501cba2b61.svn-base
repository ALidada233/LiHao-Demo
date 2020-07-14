import Vue from 'vue'
import axios from 'axios';
import { MessageBox } from 'element-ui';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if(process.env.NODE_ENV=="development"){
    api="/nte-crm"
}else{  //测试环境
    api=requestUrl;
}
//获取权限列表
export const getRoleResourceList=(params,callback)=>{
  axios({
      url:api+"/getRoleResourceList",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
//添加权限
export const addResource=(params,callback)=>{
    axios({
        url:api+"/addResource",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//删除权限
export const delResource=(params,callback)=>{
    axios({
        url:api+"/delResource",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//修改权限
export const updateResource=(params,callback)=>{
    axios({
        url:api+"/updateResource",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//角色授权
export const addRoleResource=(params,callback)=>{
    axios({
        url:api+"/addRoleResource",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}