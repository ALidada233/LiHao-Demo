<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item title="支付记录" name="1">
        <el-table
          :data="orderPayLog"
          width="100%;"
          height="300"
          border
          :header-cell-style="{'background-color':'#fff'}"
          style="margin-top:20px;"
        >
          <el-table-column width="100" prop="money" label="支付金额" align="center"></el-table-column>
          <el-table-column width="100" label="支付类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type==1">预付</span>
              <span v-if="scope.row.type==2">尾款</span>
            </template>
          </el-table-column>
          <el-table-column prop="tradeNo" label="流水号" width="180"></el-table-column>
          <el-table-column width="100" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">作废</span>
              <span v-if="scope.row.status==1">有效</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="createName" label="创建人"></el-table-column>
          <el-table-column align="center" prop="remark" label="备注"></el-table-column>
          <el-table-column width="160" prop="payTime" label="支付时间" align="center"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "payLog",
  props: {
    orderPayLog: {
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
