<template>
  
	<div>{{msg}}</div>
</template>
	
<script>
export default {
  name: 'HelloWorld',
   data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        msg:'msg'
      }
  },
  mounted(){//http://www.huatran.com:8080/nte-crm/toLogin.do?name=kddb&pwd=e10adc3949ba59abbe56e057f20f883e
    this.$http.get("/apic/nte-crm/toLogin.do?name=kddb&pwd=e10adc3949ba59abbe56e057f20f883e").then((res)=>{
      console.log(res);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
