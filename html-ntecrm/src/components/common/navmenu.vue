<template>
  <div>
      <template v-for="item in resourceList">
            <!-- 此菜单下还有子菜单 -->
            <el-submenu v-if="item.children.length>0"
                        :key="item.id" :index="item.url">
                <template slot="title">
                    <i class="iconfont aside_icon" v-html="item.icoUrl"></i>
                    <span slot="title">{{item.name}}{{roleId}}</span>
                </template>
                <!-- 递归 -->
                <navmenu :resourceList="item.children"></navmenu>
            </el-submenu>
            
            <!-- 最后一级菜单 -->
            <div v-else>
              <el-menu-item :key="item.id" :index="item.url" @click="setAsideChoose(item.url)"  v-if="checkName(item.name)"  :route="{path:item.url}">
                  <i class="iconfont aside_icon" v-html="item.icoUrl"></i>
                  <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </div>
        </template>
  </div>

</template>

<script>
  export default {
    name: 'navmenu',
   props:{
			resourceList:{
				type:Array
			}
		},
    data() {
      return {
       roleId: JSON.parse(sessionStorage.getItem('userDto')).roleId || null
      }
    },
    methods:{
		    setAsideChoose(id){
          sessionStorage.setItem("asideDefaultActive",id);
          var url=window.location.href.split('/').pop();
          if(url==id){
            this.$root.reload();
          }else{
            this.$router.push({path:id})
          }
        },
        checkName(name){
          if(name=="工作台" && (this.roleId==39||this.roleId==36||this.roleId==37)){
            return false
          }else{
            return true
          }
        }
		}
  }
</script>

<style>


</style>
