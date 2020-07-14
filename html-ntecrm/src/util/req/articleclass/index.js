import axios from 'axios';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if (process.env.NODE_ENV == "development") {
  api = "/nte-crm"
} else { //测试环境
  api = requestUrl;
}

//查询
export const queryArticleTypeList = (params, callback) => {
  axios({
    url: api + "/queryArticleTypeList.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//新增 //编辑
export const optArticleType = (params, callback) => {
  axios({
    url: api + "/optArticleType.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
//验证分类名称是否已存在
export const checkTypeName = (params, callback) => {
  axios({
    url: api + "/checkTypeName.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
