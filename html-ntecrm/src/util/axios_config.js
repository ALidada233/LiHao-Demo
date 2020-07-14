import axios from 'axios'
import router from '@/router/index'
import Qs from 'qs'
import ElementUI from 'element-ui';
import { MessageBox,Message} from 'element-ui';
///返回状态判断(添加响应拦截器)

axios.interceptors.request.use( 
   config=> {
        config.headers={'Content-type': 'application/x-www-form-urlencoded'};
        config.data=Qs.stringify(config.data, { arrayFormat: 'indices',allowDots: true });
    　　// 在发送请求之前做些什么
        if(sessionStorage.getItem('c_token')==null){
            router.replace({
                 path: '/'
            })
        }   　　
        return config
    },
    error=>{
    　　// 对请求错误做些什么
     return Promise.reject(error)
    }
);

 axios.interceptors.response.use(function (response) {
    // token 已过期，重定向到登录页面
   if(response.data.msgCode==500){
        MessageBox.alert(response.data.msg, '使用提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
    }else if(response.data.msgCode==601){
        MessageBox.alert('会话已失效，请重新登录', '使用提示', {
            confirmButtonText: '确定 ',
            callback: action => {
            //   router.replace({
            //        path: '/'
            //   })
            location.replace(process.env.NODE_ENV=="development"?'/':"/nte-crm/index.html#/")
            }
        });
    }else if(response.data.msgCode==602){
        MessageBox.alert('无操作权限,请重新登录或者联系管理员', '使用提示', {
            confirmButtonText: '确定 ',
            callback: action => {
            //   router.replace({
            //        path: '/'
            //   })
            location.replace(process.env.NODE_ENV=="development"?'/':"/nte-crm/index.html#/")
            }
        });
    }
    return response
}, function (error) {
    if(error.response.status==601){
        MessageBox.alert('会话已失效，请重新登录', '使用提示', {
          confirmButtonText: '确定',
          callback: action => {
            // router.replace({
            //      path: '/'
            // })
            location.replace(process.env.NODE_ENV=="development"?'/':"/nte-crm/index.html#/")
          }
        });
    }else if(error.response.status==602){
        Message({
            message: '无操作权限,请重新登录或者联系管理员',
            type: 'warning'
        });
    }
    return Promise.reject(error)
})
