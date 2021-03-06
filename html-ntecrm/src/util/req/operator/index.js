import Vue from 'vue'
import axios from 'axios';
import {
  MessageBox
} from 'element-ui';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if (process.env.NODE_ENV == "development") {
  api = "/nte-crm"
} else { //测试环境
  api = requestUrl;
}
//获取表格数据
export const getTable = (params, callback) => {
  axios({
    url: api + "/queryOperatorPage",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//新增管理员
export const setManage = (params, callback) => {
  axios({
    url: api + "/saveOperator",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//检查登录名是否存在
export const checkOperatorCode = (params, callback) => {
  axios({
    url: api + "/checkOperatorCode",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//修改管理员updateOperator
export const updateOperator = (params, callback) => {
  axios({
    url: api + "/updateOperator",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//customerMigrate转移客户
export const customerMigrate = (params, callback) => {
  axios({
    url: api + "/customerMigrate",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//returnOperPwd 重置管理员密码
export const returnOperPwd = (params, callback) => {
  axios({
    url: api + "/returnOperPwd",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//getASDSMS 获取授权验证码
export const getSMSCode = (params, callback) => {
  axios({
    url: api + "/asdSendSMS.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
