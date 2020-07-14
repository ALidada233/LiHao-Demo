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

//获取商品数据
export const queryBrandList =(params,callback)=>{
    axios({
        url:api+"/queryBrandList ",
        method:'post',
        data: params
    }).then(res=>{
        callback(res.data)
    })
}
//查询全部品牌列表 
export const getBrandList =(params,callback)=>{
  axios({
      url:api+"/getBrandList ",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
//查校验品牌名称 
export const checkBrandName =(params,callback)=>{
  axios({
      url:api+"/checkBrandName ",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
//新增品牌 saveBrand
export const saveBrand =(params,callback)=>{
  axios({
      url:api+"/saveBrand ",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}


