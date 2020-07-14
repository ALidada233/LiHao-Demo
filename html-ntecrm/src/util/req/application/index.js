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
export const queryArticleIndustryList = (params, callback) => {
  axios({
    url: api + "/queryArticleIndustryList.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}

//新增 //编辑 //删除
export const optArticleIndustry = (params, callback) => {
  axios({
    url: api + "/optArticleIndustry.do",
    method: 'post',
    data: params
  }).then(res => {
    callback(res.data)
  })
}
