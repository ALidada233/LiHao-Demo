<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item title="订单日志" name="1">
        <el-table
          :data="orderOptLog"
          width="100%;"
          height="300"
          border
          :header-cell-style="{'background-color':'#fff'}"
        >
          <el-table-column width="60" prop="id" label="ID" align="center"></el-table-column>
          <el-table-column width="100" prop="createName" label="姓名" align="center"></el-table-column>
          <el-table-column width="60" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">无效</span>
              <span v-if="scope.row.status==1">创建</span>
              <span v-if="scope.row.status==2">确认</span>
              <span v-if="scope.row.status==3">合同更换</span>
              <span v-if="scope.row.status==4">修改</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column width="160" prop="createTime" label="操作时间" align="center"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "orderOptLog",
  props: {
    orderOptLog: {
      type: Array
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  padding: 10px;
}
.list > span {
}
.item {
  display: inline-block;
  width: 32%;
}
.title {
  color: #999;
  display: inline-block;
  width: 70px;
  vertical-align: top;
}
.msg {
  color: #333;
  display: inline-block;
  width: 100px;
}
</style>
