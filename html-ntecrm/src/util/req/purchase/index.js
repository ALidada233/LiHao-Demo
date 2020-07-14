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
// 查询采购订单列表（分页）
export const queryPurchaseOrderList = (params, callback) => {
  axios({
    url: api + "/queryPurchaseOrderList ",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
// 查询采购详情
export const getPurchaseInfo = (params, callback) => {
  axios({
    url: api + "/getPurchaseOrderInfo ",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//  更改采购订单
export const updatePurchaseOrder = (params, callback) => {
  axios({
    url: api + "/updatePurchaseOrder ",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
// 获取导出数据
export const purchaseListExport = (params, callback) => {
  axios({
    url: api + "/purchaseListExport.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
