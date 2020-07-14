import Vue from 'vue'
import axios from 'axios';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if (process.env.NODE_ENV == "development") {
  api = "/nte-crm"
} else { //测试环境
  api = requestUrl;
}

//查询提成
export const queryOrderDataList = (params, callback) => {
  axios({
    url: api + "/queryOrderDataList",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//查询此订单所有的报价信息
export const getOrderDataDetail = (params, callback) => {
  axios({
    url: api + "/getOrderDataDetail",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//上传产品资料文件
export const updOrderDataGoods = (params, callback) => {
  axios({
    url: api + "/updOrderDataGoods",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
