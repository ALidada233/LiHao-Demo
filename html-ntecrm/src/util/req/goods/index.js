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
//获取表格数据
export const getTable = (params, callback) => {
  axios({
    url: api + "/queryGoods",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//获取商品数据
export const getGoodsCount = (params, callback) => {
  axios({
    url: api + "/getGoodsCount",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//输入标准价
export const updateStandardPrice = (params, callback) => {
  axios({
    url: api + "/updateStandardPrice",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

// 获取上传商品分类和品牌信息
export const getPublishGoods = (callback) => {
  axios({
    url: api + "/getPublishGoods",
    method: 'get'
  }).then(res => {
    callback(res.data)
  })
}
//查询全部品牌列表
export const getBrandList = (params, callback) => {
  axios({
    url: api + "/getBrandList",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//获取商品二、三级分类
export const getGoodsCategory = (params, callback) => {
  axios({
    url: api + "/getGoodsCategory",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

// 上传商品
export const saveGoods = (params, callback) => {
  axios({
    url: api + "/saveGoods",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//检查商品名称是否存在
export const checkGoodsTitle = (params, callback) => {
  axios({
    url: api + "/checkGoodsTitle",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//上传编辑商品类型信息
export const saveGoodsModel = (params, callback) => {
  axios({
    url: api + "/saveGoodsModel",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//删除商品
export const delGoodsModel = (params, callback) => {
  axios({
    url: api + "/delGoodsModel",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//刪除、更换商品辅件
export const optGoodsPart = (params, callback) => {
  axios({
    url: api + "/optGoodsPart",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//查询商品
export const getGoodsList = (params, callback) => {
  axios({
    url: api + "/getGoodsList",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//导出商品数据
export const goodsListExport = (params, callback) => {
  axios({
    url: api + "/goodsListExport",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
