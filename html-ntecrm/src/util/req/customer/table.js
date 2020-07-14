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

export const CustomerTable=(params,callback)=>{
  axios({
      url:api+"/queryCustomerList",
      method:'post',
      data: params
  }).then(res=>{
     callback(res)
  })
}
//获取公司名称
export const getCustomerName=(params,callback)=>{
  axios({
      url:api+"/getCustomerList",
      method:'post',
      data: params
  }).then(res=>{
     callback(res)
  })
}
//根据公司custCode 查询联系人
export const getCustomerConList=(params,callback)=>{
  axios({
      url:api+"/getCustomerConList",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
export const CustomerName=(params,callback)=>{
  axios({
      url:api+"/queryCustomerList",
      method:'post',
      data: params
  }).then(res=>{
     callback(res)
  })
}

//获取销售人员列表
export const getSalesList=(callback)=>{
  axios({
      url:api+"/getSalesList",
      method:'get'
  }).then(res=>{
     callback(res)
  })
}
//删除客户
export const deleteCustomer=(params,callback)=>{
  axios({
      url:api+"/deleteCustomer",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
//客户数据置顶
export const checkCustIsTop=(params,callback)=>{
  axios({
      url:api+"/checkCustIsTop",
      method:'post',
      data: params
  }).then(res=>{
     callback(res.data)
  })
}
//获取贸易商列表
export const getTraderList=(callback)=>{
  axios({
      url:api+"/getTraderList",
      method:'get'
  }).then(res=>{
     callback(res.data)
  })
}