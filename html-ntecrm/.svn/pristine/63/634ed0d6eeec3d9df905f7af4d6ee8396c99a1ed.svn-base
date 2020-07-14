<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item title="申请开票记录" name="1">
        <el-table
          :data="orderInvoice"
          width="100%;"
          height="300"
          border
          :header-cell-style="{'background-color':'#fff'}"
          style="margin-top:20px;"
        >
          <el-table-column prop="billMoney" label="价税合计"></el-table-column>
          <el-table-column width="120" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0" style="color:#e4393c;">作废</span>
              <span v-if="scope.row.status==1">申请</span>
              <span v-if="scope.row.status==2">已开票</span>
            </template>
          </el-table-column>
          <el-table-column width="150" prop="billReceiptName" label="收票人姓名"></el-table-column>
          <el-table-column width="120" prop="billReceiptPhone" label="收票人手机号"></el-table-column>
          <el-table-column width="200" prop="billAddress" label="收发票地址"></el-table-column>
          <el-table-column width="120" prop="billPostNo" label="收票人邮政编码"></el-table-column>
          <el-table-column prop="file" label="发票文件">
            <template slot-scope="scope">
              <span
                style="color:#66b1ff;cursor:default;"
                v-if="scope.row.file"
                @click="invoiceFileVisible=true;invoiceFile=scope.row.file;"
              >预览</span>
            </template>
          </el-table-column>
          <el-table-column width="120" prop="billLogBank" label="收票物流公司"></el-table-column>
          <el-table-column width="150" prop="billLogNo" label="收票物流单号"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column width="160" prop="createTime" label="申请时间"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "orderInvoice",
  props: {
    orderInvoice: {
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
