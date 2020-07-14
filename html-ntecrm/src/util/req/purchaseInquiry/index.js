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
//  查询采购订单询价列表（分页）
export const queryInquiryList=(params,callback)=>{
  axios({
      url:api+"/queryInquiryList ",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
//  询价单
export const saveInquiry=(params,callback)=>{
    axios({
        url:api+"/saveInquiry ",
        method:'post',
        data: params
    }).then(res=>{
        callback(res.data)
    })
  }