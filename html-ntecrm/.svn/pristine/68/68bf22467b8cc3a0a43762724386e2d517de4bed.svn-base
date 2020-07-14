<template>
  <div class="shipping">
    <div style="margin-top:-20px;margin-bottom: 20px;">
      <el-input
        style="width: 15%;margin-top: 20px;"
        placeholder="请输入订单编号"
        size="medium"
        v-model="orderNo"
        clearable
      ></el-input>
      <el-input
        style="width: 15%;margin-top: 20px;"
        placeholder="请输入业务员/客户公司"
        size="medium"
        v-model="keys"
        clearable
      ></el-input>
      <el-select
        v-model="status"
        placeholder="请选择状态"
        :clearable="true"
        style="width:150px;margin-top: 10px;"
        size="medium"
      >
        <el-option value="0" label="未到货">未到货</el-option>
        <el-option value="1" label="到货未发货">到货未发货</el-option>
        <el-option value="2" label="已发货">已发货</el-option>
        <el-option value="3" label="确认收货">确认收货</el-option>
        <el-option value="4" label="作废">作废</el-option>
      </el-select>
      <el-date-picker
        v-model="createTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        start-placeholder="创建开始日期"
        end-placeholder="创建结束日期"
        align="right"
        size="medium"
        style="margin-top: 10px;width:290px;margin-right: 15px;"
      ></el-date-picker>
      <el-date-picker
        v-model="updateTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        start-placeholder="更新开始日期"
        end-placeholder="更新结束日期"
        align="right"
        size="medium"
        style="margin-top: 10px;width:290px;margin-right: 15px;"
      ></el-date-picker>
      <el-button
        type="primary"
        size="medium"
        style="margin-top: 15px;"
        @click="queryOrderShippingList"
        icon="el-icon-search"
      ></el-button>
      <el-button
        v-tip.top.dark="'重置'"
        style="margin-top:10px;"
        size="medium"
        icon="el-icon-refresh"
        @click="resetSearchCondition()"
      ></el-button>
    </div>
    <el-table
      :data="orderShipping"
      ref="table"
      :border="true"
      :height="tableHeight"
      width="100%;"
      :header-cell-style="{'background-color':'#EFEDF0'}"
      style="margin-top:20px;"
    >
      <el-table-column width="150" prop="orderNo" label="订单编号" align="center">
        <template slot-scope="scope">
          <span
            style="color:#409EFF;cursor:default;"
            @click="$router.push({path:'/admin/order',query:{orderNo:scope.row.orderNo}})"
          >{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" prop="contractNo" label="合同编号" align="center"></el-table-column>
      <el-table-column label="业务员" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.saleName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户公司" align="center" width="210">
        <template slot-scope="scope">
          <span>
            <el-popover
              placement="top-start"
              title
              width="210"
              trigger="hover"
              :content="scope.row.custCompanyName"
            >
              <span
                slot="reference"
                style="cursor:default;"
                v-html="$root.OmissionText(scope.row.custCompanyName==null?null:scope.row.custCompanyName,12)"
              ></span>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column width="100" label="客户属性" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.custBelong==1">必优</span>
          <span v-if="scope.row.custBelong==2">耐特恩</span>
          <span v-if="scope.row.custBelong==3">必优传媒</span>
        </template>
      </el-table-column>
      <el-table-column width="110" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0" type="info">未到货</el-tag>
          <el-tag v-if="scope.row.status==1">到货未发货</el-tag>
          <el-tag v-if="scope.row.status==2" type="success">已发货</el-tag>
          <el-tag v-if="scope.row.status==3" type="warning">确认收货</el-tag>
          <el-tag v-if="scope.row.status==4" type="danger">作废</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" prop="receiptName" label="收货人姓名"></el-table-column>
      <el-table-column width="120" prop="receiptPhone" label="收货人手机号" align="center"></el-table-column>
      <el-table-column width="120" prop="address" label="收货地址" align="center"></el-table-column>
      <el-table-column width="100" prop="file" label="发货单文件" align="center">
        <template slot-scope="scope">
          <span
            style="color:#66b1ff;cursor:default;"
            v-if="scope.row.file"
            @click="invoiceFileVisible=true;invoiceFile=scope.row.file;"
          >预览</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="logBank" label="发货物流公司" align="center"></el-table-column>
      <el-table-column width="120" prop="logNo" label="发货物流单号" align="center"></el-table-column>
      <el-table-column width="160" align="center" prop="sendTime" label="发货时间"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column width="160" prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column width="160" prop="updateTime" label="修改时间" align="center"></el-table-column>
    </el-table>
    <div class="clearPa edit">
      <!-- 分页 -->
      <div class="block" style="float: right;margin-top:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 15, 30]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next, total"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
    <!-- 预览发货单文件 -->
    <el-dialog
      title="预览发货单"
      :visible.sync="invoiceFileVisible"
      width="80%"
      class="selFile"
      :before-close="invoiceFileVisibleClose"
      :append-to-body="true"
    >
      <div>
        <object
          v-if="invoiceFile&&invoiceFile.toLowerCase().indexOf('pdf')>-1"
          :data="invoiceFile"
          width="100%"
          height="550px"
          internalinstanceid="130"
        ></object>
        <img v-else :src="invoiceFile" style="width:100%;" alt />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryOrderShippingList } from "@/util/req/shipping/index";
export default {
  name: "shipping",
  data() {
    return {
      tableHeight: null,
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageCount: null,
      invoiceFileVisible: false,
      orderShipping: [],
      invoiceFile: null,
      createTimeStart: null,
      createTimeEnd: null,
      createTime: null,
      updateTimeStart: null,
      updateTimeEnd: null,
      updateTime: null,
      orderNo: null,
      status: null,
      keys: null
    };
  },
  watch: {
    createTime(val) {
      if (val != null) {
        this.createTimeStart = val[0];
        this.createTimeEnd = val[1];
      } else {
        this.createTimeStart = null;
        this.createTimeEnd = null;
      }
    },
    updateTime(val) {
      if (val != null) {
        this.updateTimeStart = val[0];
        this.updateTimeEnd = val[1];
      } else {
        this.updateTimeStart = null;
        this.updateTimeEnd = null;
      }
    }
  },
  methods: {
    invoiceFileVisibleClose() {
      this.invoiceFileVisible = false;
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.queryOrderShippingList();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.queryOrderShippingList();
    },
    resetSearchCondition() {
      this.createTimeStart = null;
      this.createTimeEnd = null;
      this.createTime = null;
      this.updateTimeStart = null;
      this.updateTimeEnd = null;
      this.updateTime = null;
      this.orderNo = null;
      this.status = null;
      this.keys = null;
      this.queryOrderShippingList();
    },
    queryOrderShippingList() {
      //查询列表
      var parmas = {
        pageSize: this.pageSize,
        page: this.currentPage
      };
      if (this.status) {
        parmas.status = this.status;
      }
      if (this.orderNo) {
        parmas.orderNo = this.orderNo;
      }
      if (this.createTimeStart) {
        parmas.createTimeStart = this.createTimeStart;
        parmas.createTimeEnd = this.createTimeEnd;
      }
      if (this.updateTimeStart) {
        parmas.updateTimeStart = this.updateTimeStart;
        parmas.updateTimeEnd = this.updateTimeEnd;
      }
      if (this.keys) {
        parmas.keys = this.keys;
      }
      this.loading = true;
      queryOrderShippingList(parmas, res => {
        if (res.msgCode == 200) {
          this.orderShipping = res.data.list;
          this.pageCount = res.data.pageCount;
          this.$refs.table.bodyWrapper.scrollTop = 0;
          setTimeout(() => {
            this.loading = false;
          }, 200);
        } else {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        }
      });
    }
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 120;
    if (this.$route.query.orderNo) {
      this.orderNo = this.$route.query.orderNo;
    }
    //去掉又客户需求跳转进来的需求带公司名称
    var currentUrl = window.location.href;
    var targetUrl = currentUrl.split("?")[0];
    window.location.href = targetUrl;
    this.queryOrderShippingList();
  }
};
</script>
<style lang="scss" scoped>
.shipping {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}
.selFile /deep/ .el-dialog {
  margin-top: 10px !important;
}
.shipping /deep/ ::-webkit-scrollbar {
  height: 9px;
  width: 7px;
}
</style>
