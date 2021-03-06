
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from './router'
import axios from 'axios'
import '@/util/axios_config';
import store from '@/vuex/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';//element only类的样式

import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
import '@/util/proto/index';
// 注册指令使用
Vue.use(Vtip.directive)
// 工具函数调用
Vue.prototype.$tip = Vtip.tip

// Vue.use(Print) // 打印注册
axios.defaults.withCredentials=true;axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;
process.env.NODE_ENV=="development"?Vue.config.productionTip = true:Vue.config.productionTip =true;
import "util/axios_config";//axios 拦截器

Vue.use(ElementUI);
/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  data(){
    return{
      isRouterAlive:true
    }
  },
  router,
  store,//使用store
  components: { App },
  template: '<App/>',
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
  	BackToTop(){	//返回顶部
  		this.$nextTick(()=>{
  			document.getElementsByClassName("el-main")[0].scrollTo(0,0);
  		})
  	},
    lineFeed(val){
      return val.replace('|','<br />')
    },
    OmissionText(text,digit,state){  //传入文字text,截取个数digit,伸缩张开state
      if(String(text)=="" ||String(text)==null){return}
      if(String(text).length<digit){
          return text
        }
        var catStr=text.slice(0,digit)+"...";
          return catStr
    },
    getMinutes(){     //获取当前时间 时分秒
      var date = new Date(); //实例一个时间对象；
      var year =date.getFullYear();   //获取系统的年；
      var month=date.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
      var day=date.getDate(); // 获取系统日，
      var hour=date.getHours()>=10?date.getHours():'0'+date.getHours(); //获取系统时，
      var minutes=date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes(); //分
      var seconds=date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds(); //秒
      return hour+':'+minutes+':'+seconds
    }
  }
})
