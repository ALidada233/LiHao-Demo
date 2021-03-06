  import Vue from 'vue';
  import Vuex from 'vuex';
  Vue.use(Vuex);
  export default new Vuex.Store({
    // localStorage.getItem("headerColor")||
        state:{
        	themeColor:{
        		headerColor:"#CB2A18",
        		asideColor:localStorage.getItem("asideColor")||"rgba(79,89,101,0.9)"
        	},
          isCollapse:false,    //侧边栏伸缩状态
          loginStatu:{          //登录状态
            c_user:null||sessionStorage.getItem("c_user")
          },
          resourceList:null,   //侧边栏数据
          asideDefaultActive:sessionStorage.getItem("asideDefaultActive")||"home",   //侧边栏选中
          noticeStatus:false
        },
        mutations:{
          changeCollapse:function(state,bul){
            state.isCollapse=bul
          },
          userHandle:function(state,user){
            state.loginStatu.c_user=user;
          },
          exitLogin(state){
            state.loginStatu.c_user=null;
            sessionStorage.removeItem("c_user") 
            sessionStorage.removeItem("c_token") 
            sessionStorage.removeItem("asideDefaultActive")
            sessionStorage.removeItem("resourceList")
            sessionStorage.removeItem("userDto")
          }
        }
    });