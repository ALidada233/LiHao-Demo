import Vue from 'vue'
import axios from 'axios';
import requestUrl from '@/util/http.js'
//本地环境
var api;
if(process.env.NODE_ENV=="development"){
    api="/nte-crm"
}else{  //测试环境
    api=requestUrl;
}
//获取订单汇总
export const queryOrderList=(params,callback)=>{
    axios({
        url:api+"/queryOrderList ",
        method:'post',
        data: params
    }).then(res=>{
        callback(res.data)
    })
}
//编辑订单详情
export const updateOrder=(params,callback)=>{
    axios({
        url:api+"/updateOrder ",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//获取订单详情
export const queryOrderDetail=(params,callback)=>{
    axios({
        url:api+"/getOrderDetail",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}

//修改合同
export const updateContractFile=(params,callback)=>{
    axios({
        url:api+"/updateContractFile ",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//申请订单
export const applyConfirmOrder=(params,callback)=>{
    axios({
        url:api+"/applyConfirmOrder ",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//操作发货单
export const saveOrderShipping=(params,callback)=>{
    axios({
        url:api+"/saveOrderShipping",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}

//确认/无效订单
export const confirmOrder=(params,callback)=>{
    axios({
        url:api+"/confirmOrder",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//財務更改订单
export const updateOrderFinance=(params,callback)=>{
    axios({
        url:api+"/updateOrderFinance",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
// 订单发票操作
export const saveOrderInvoice=(params,callback)=>{
    axios({
        url:api+"/saveOrderInvoice",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
// 获取发货单商品列表
export const getShippingGoods=(params,callback)=>{
    axios({
        url:api+"/getShippingGoods",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//回滚订单
export const rollBackOrder=(params,callback)=>{
    axios({
        url:api+"/rollBackOrder",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//获取订单提成
export const getOrderCommissionList=(params,callback)=>{
    axios({
        url:api+"/getOrderCommissionList",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
//申请商务费用,财务操作
export const saveOrderCommission=(params,callback)=>{
    axios({
        url:api+"/saveOrderCommission",
        method:'post',
        data: params
    }).then(res=>{
       callback(res.data)
    })
}
