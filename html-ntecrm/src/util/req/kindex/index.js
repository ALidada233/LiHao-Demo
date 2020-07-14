import axios from 'axios';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if (process.env.NODE_ENV == "development") {
  api = "/nte-crm"
} else { //测试环境
  api = requestUrl;
}


/* 首页管理 */
//分页
export const getKindexListPage = (params, callback) => {
  axios({
    url: api + "/queryAdvertList.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//新增
export const addKindex = (params, callback) => {
  axios({
    url: api + "/addAdvert.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//编辑
export const updateKindex = (params, callback) => {
  axios({
    url: api + "/updAdvert.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//删除
export const deleteKindex = (params, callback) => {
  axios({
    url: api + "/delAdvert.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
