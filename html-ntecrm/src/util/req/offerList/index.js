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
//获取合同编号及本地时间
export const getContractCode = (params, callback) => {
  axios({
    url: api + "/getContractCode",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//生成合同
export const saveOfferFile = (params, callback) => {
  axios({
    url: api + "/saveOfferFile",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//获取申请折扣列表信息
export const getDemadDiscountList = (params, callback) => {
  axios({
    url: api + "/getDemadDiscountList",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//查询商品
export const getGoodsList = (params, callback) => {
  axios({
    url: api + "/getGoodsList ",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//技术协助
export const demandAssistance = (params, callback) => {
  axios({
    url: api + "/demandAssistance ",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//获取技术采购列表
export const getBuyerTechnical = (callback) => {
  axios({
    url: api + "/getBuyerTechnical ",
    method: 'get'
  }).then(res => {
    callback(res.data)
  })
}
//获取报价商品完整信号
export const getGoodsCompleteModel = (params, callback) => {
  axios({
    url: api + "/getGoodsCompleteModel ",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
