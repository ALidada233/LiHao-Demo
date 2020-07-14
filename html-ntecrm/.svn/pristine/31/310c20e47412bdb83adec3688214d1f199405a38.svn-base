<template>
  <div class="navTitle">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{navName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'navTitle',
    data() {
      return {
        navName: null
      }
    },
    watch: {
      $route(to, from) {
        this.$store.state.asideDefaultActive = to.path.split('/').pop()
        var curpath= to.path.split('/').pop();
        this.currentRouteHandle(curpath);
      }
    },
    methods:{
      currentRouteHandle(path){
        var routerArr=JSON.parse(sessionStorage.getItem('routesArr'));
        var selRoute=routerArr.filter(item=>{
          return item.path==path
        })
        this.navName=selRoute[0].pName;
      }
    },
    mounted() {
      var path = this.$store.state.asideDefaultActive;
      this.currentRouteHandle(path);
    }
  }

</script>
<style lang="scss" scoped>
  .navTitle {
    margin-top: 15px;
    margin-left: 20px;
    color: #999;
  }

</style>
