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
//获取分类多级列表
export const queryCategoryList=(params,callback)=>{
  axios({
      url:api+"/queryCategoryList",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
//验证分类名称
export const checkCategoryName=(params,callback)=>{
  axios({
      url:api+"/checkCategoryName",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
//新增修改分类
export const saveCategory=(params,callback)=>{
  axios({
      url:api+"/saveCategory",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}

