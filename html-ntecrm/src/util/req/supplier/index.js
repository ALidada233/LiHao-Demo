
import axios from 'axios';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if(process.env.NODE_ENV=="development"){
    api="/nte-crm"
}else{  //测试环境
    api=requestUrl;
}

//获取供应商数据
export const querySupplierList =(params,callback)=>{
    axios({
        url:api+"/querySupplierList",
        method:'post',
        data: params
    }).then(res=>{
        callback(res.data)
    })
}
// 验证供应商名称
export const checkSupplierName =(params,callback)=>{
  axios({
      url:api+"/checkSupplierName",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
// 验证供应商手机
export const checkSupplierConPhone =(params,callback)=>{
  axios({
      url:api+"/checkSupplierConPhone",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
// 删除供应商联系人
export const delSupplierContact =(params,callback)=>{
  axios({
      url:api+"/delSupplierContact",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
// 新增供应商&修改供应商
export const saveSupplier =(params,callback)=>{
  axios({
      url:api+"/saveSupplier",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
// 删除供应商
export const delSupplier =(params,callback)=>{
  axios({
      url:api+"/delSupplier",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
//删除供应商关联品牌
export const delSupplierBrand =(params,callback)=>{
  axios({
      url:api+"/delSupplierBrand",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
//供应商回显数据
export const editSupplier =(params,callback)=>{
  axios({
      url:api+"/editSupplier",
      method:'post',
      data: params
  }).then(res=>{
      callback(res.data)
  })
}
// 是否置頂
export const checkSupplierIsTop =(params,callback)=>{
    axios({
        url:api+"/checkSupplierIsTop",
        method:'post',
        data: params
    }).then(res=>{
        callback(res.data)
    })
  }
//获取全部供应商信息
export const getSupplierList =(callback)=>{
axios({
    url:api+"/getSupplierList",
    method:'get'
}).then(res=>{
    callback(res.data)
})
}
//根据品牌ID查询供应商列表
export const getSupplierBrandById =(params,callback)=>{
    axios({
        url:api+"/getSupplierBrandById",
        method:'post',
        data: params
    }).then(res=>{
        callback(res.data)
    })
}
