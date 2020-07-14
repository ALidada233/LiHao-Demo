<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item title="发货记录" name="1">
        <el-table
          :data="orderShipping"
          height="300"
          width="100%;"
          border
          :header-cell-style="{'background-color':'#fff'}"
          style="margin-top:20px;"
        >
          <el-table-column prop="contractNo" width="160" label="合同编号"></el-table-column>
          <el-table-column width="120" label="发货状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">未到货</span>
              <span v-if="scope.row.status==1">到货未发货</span>
              <span v-if="scope.row.status==2">已发货</span>
              <span v-if="scope.row.status==3">确认收货</span>
              <span v-if="scope.row.status==4">作废</span>
            </template>
          </el-table-column>
          <el-table-column width="150" prop="receiptName" label="收货人姓名"></el-table-column>
          <el-table-column width="120" prop="receiptPhone" label="收货人手机号"></el-table-column>
          <el-table-column width="120" prop="address" label="收货地址"></el-table-column>
          <el-table-column width="120" prop="postNo" label="收货邮编"></el-table-column>
          <el-table-column width="150" prop="file" label="发货单文件">
            <template slot-scope="scope">
              <span
                style="color:#66b1ff;cursor:default;"
                v-if="scope.row.file"
                @click="invoiceFileVisible=true;invoiceFile=scope.row.file;"
              >预览</span>
            </template>
          </el-table-column>
          <el-table-column width="120" prop="logBank" label="发货物流公司"></el-table-column>
          <el-table-column width="120" prop="logNo" label="发货物流单号"></el-table-column>
          <el-table-column width="160" prop="sendTime" label="发货时间"></el-table-column>
          <el-table-column width="160" prop="createTime" label="创建时间"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "orderShipping",
  data() {
    return {};
  },
  props: {
    orderShipping: {
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
