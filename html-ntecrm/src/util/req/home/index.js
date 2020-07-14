import Vue from 'vue'
import axios from 'axios';
import {
  MessageBox
} from 'element-ui';
import Qs from 'qs';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if (process.env.NODE_ENV == "development") {
  api = "/nte-crm"
} else { //测试环境
  api = requestUrl;
}

//获取数据汇总
export const getSummary = (params, callback) => {
  axios({
    url: api + "/indexCount",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//客户区域分布统计
export const getAreaCount = (params, callback) => {
  axios({
    url: api + "/getAreaCount",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//项目报备
export const getReport = (params, callback) => {
  axios({
    url: api + "/getReport",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//消息分类列表
export const queryInformationList = (params, callback) => {
  axios({
    url: api + "/queryInformationPage",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//消息已读
export const updInformationStatus = (params, callback) => {
  axios({
    url: api + "/updInformationStatus",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//获取轮播消息
export const getInformationList = (params, callback) => {
  axios({
    url: api + "/getInformationList",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
