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

//获取申请折扣数据
export const queryDiscountList=(params,callback)=>{
  axios({
      url:api+"/queryDiscountList",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
//改变折扣数据状态
export const saveDiscountApply=(params,callback)=>{
  axios({
      url:api+"/saveDiscountApply",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}