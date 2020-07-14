import axios from 'axios';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if (process.env.NODE_ENV == "development") {
  api = "/nte-crm"
} else { //测试环境
  api = requestUrl;
}

//获取数据汇总
export const knowClassifyList = (params, callback) => {
  axios({
    url: api + "/queryArticleTypeList.do", //查找分类
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//获取文章列表
export const getPageList = (params, callback) => {
  axios({
    url: api + "/queryArticlePageList.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//获取标签，行业，类型(回显)
export const getArtList = (params, callback) => {
  axios({
    url: api + "/showArticle.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//添加文章
export const addArticle = (params, callback) => {
  axios({
    url: api + "/addArticle.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//删除文章
export const deleteArticle = (params, callback) => {
  axios({
    url: api + "/deleteArticle.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//文章审核，上下架，置顶
export const upDownArticle = (params, callback) => {
  axios({
    url: api + "/upDownArticle.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//获取文章数据
export const showUpdAeticle = (params, callback) => {
  axios({
    url: api + "/showArticle.do", //回显数据
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//编辑文章
export const updateArticle = (params, callback) => {
  axios({
    url: api + "/updateArticle.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//搜索商品

export const searchGoodList = (params, callback) => {
  axios({
    url: api + "/getGoodsList.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
