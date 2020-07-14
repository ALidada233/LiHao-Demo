<template>
  <div style="height:100vh;">
    <h1
      style="text-align:center;padding:10px 0;border-right:1px solid #f7f7f7;background: #fff;margin-bottom: 10px;"
    >
      <img src="@/assets/base/header.jpg" style="width:50px;height:50px;border-radius:50%" />
      <p style="color:#000;font-size:12px;">CRM客户管理系统</p>
    </h1>

    <!-- this.$store.state.asideDefaultActive -->
    <!-- this.$store.state.themeColor.headerColor -->
    <el-menu
      :default-active="this.$store.state.asideDefaultActive"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#000"
      style="border-radius:5px;"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="isCollapse"
    >
      <template v-for="item in resourceList">
        <el-submenu v-if="item.children.length>0" :key="item.id" :index="item.url">
          <template slot="title">
            <i class="iconfont aside_icon" v-html="item.icoUrl"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <navmenu :resourceList="item.children"></navmenu>
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="item.url" @click="setAsideChoose(item.url)">
          <i class="iconfont aside_icon" v-html="item.icoUrl"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script type="text/javascript">
// {path:item.url}
import navmenu from "./navmenu";
export default {
  name: "Aside",
  data() {
    return {
      //isCollapse: this.$store.state.isCollapse,//侧边栏伸缩状态
      resourceList: JSON.parse(sessionStorage.getItem("resourceList")),
      sameRouter: false,
      firstEnter: true,
      roleId: JSON.parse(sessionStorage.getItem("userDto")).roleId || null
    };
  },
  watch: {
    isCollapse: function(val, oldVal) {
      //使用element ui 的侧边栏出现收缩后有文字溢出，想不到办法，暂定这么处理
      setTimeout(() => {
        for (var i = 0; i < this.$refs.abs.length; i++) {
          var el = this.$refs.abs[i].$el;
          if (val) {
            el.getElementsByTagName("span")[0].style.opacity = 0;
          } else {
            el.getElementsByTagName("span")[0].style.opacity = 1;
          }
        }
      }, 400);
    },
    $route: {
      handler: function(val, oldVal) {
        this.sameRouter = true;
      },
      // 深度观察监听
      deep: true
    }
  },
  components: {
    navmenu
  },
  computed: {
    isCollapse: function() {
      return this.$store.state.isCollapse;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
      //this.$router.push({name:'customerDetails'})
    },
    setAsideChoose(id) {
      sessionStorage.setItem("asideDefaultActive", id);
      var url = window.location.href.split("/").pop();
      if (url == id) {
        this.$root.reload();
      } else {
        this.$router.push({ path: id });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.el-menu {
  left: 1px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
// .el-submenu__title/deep/span{
// 	color:#666;
// }
.aside_icon {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
</style>
