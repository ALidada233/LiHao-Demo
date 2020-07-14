<template>
  <div class="orderTracking">
    <div style="margin-top:-20px;margin-bottom: 20px;">
      <el-input
        style="width: 15%;margin-top: 20px;"
        placeholder="请输入关键字搜索"
        size="medium"
        v-model="keys"
        clearable
      ></el-input>
      <el-input
        style="width: 15%;margin-top: 20px;"
        placeholder="搜索报价单号"
        size="medium"
        v-model="offerCode"
        clearable
      ></el-input>
      <el-input
        style="width: 15%;margin-top: 20px;"
        placeholder="搜索订单号"
        size="medium"
        v-model="contractCode"
        clearable
      ></el-input>
      <el-select
        v-model="status"
        placeholder="请选择状态"
        :clearable="true"
        style="width:150px;margin-top: 10px;"
        size="medium"
      >
        <el-option :value="0" label="作废">作废</el-option>
        <el-option :value="1" label="有效">有效</el-option>
        <el-option :value="2" label="有效">待处理</el-option>
      </el-select>
      <el-button
        type="primary"
        size="medium"
        style="margin-top: 15px;"
        @click="queryOrderDataList"
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
      :data="orderTracking"
      v-loading="loading"
      ref="table"
      :border="true"
      :height="tableHeight"
      width="100%;"
      :header-cell-style="{'background-color':'#EFEDF0'}"
      style="margin-top:20px;"
    >
      <el-table-column width="80" prop="offerCode" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            round
            @click="handleEdit(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column width="180" prop="contractCode" label="订单编号" align="center">
        <template slot-scope="scope">
          <span
            style="color:#409EFF;cursor:default;"
            @click="$router.push({path:'/admin/order',query:{orderNo:scope.row.contractCode}})"
          >{{scope.row.contractCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" prop="offerCode" label="报价单号" align="center">
        <template slot-scope="scope">
          <span style="cursor:default;">{{scope.row.offerCode}}</span>
        </template>
      </el-table-column>
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
      <el-table-column width="250" label="产品信息" align="center" prop="goodsInfo">
        <template slot-scope="scope">
          <div>
            <el-popover placement="top-start" title width="350" trigger="hover">
              <span v-html="handleInfo(scope.row.goodsInfo)"></span>
              <span
                slot="reference"
                style="cursor:default;"
                v-html="$root.OmissionText(handleInfo(scope.row.goodsInfo),75)"
              ></span>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250" label="辅件信息" align="center" prop="partsInfo">
        <template slot-scope="scope">
          <div>
            <el-popover placement="top-start" title width="350" trigger="hover">
              <span v-html="handleInfo(scope.row.partsInfo)"></span>
              <span
                slot="reference"
                style="cursor:default;"
                v-html="$root.OmissionText(handleInfo(scope.row.partsInfo),75)"
              ></span>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status ==1">作废</span>
          <span v-if="scope.row.status ==2">完成</span>
          <span v-if="scope.row.status ==3">待处理</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="createName" label="创建人" align="center" width="120"></el-table-column>
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
    <transition name="fade-transform" mode="out-in">
      <orderTrackingMsg
        ref="orderTrackingMsg"
        class="detailVisible"
        v-if="detailVisible"
        @closeVisible="detailVisible=false;queryOrderDataList();"
        @getDetail="getOrderDataDetail()"
        :orderTrackingRow="orderTrackingRow"
        :detailVisible="detailVisible"
      ></orderTrackingMsg>
    </transition>
  </div>
</template>
<script>
import {
  queryOrderDataList,
  getOrderDataDetail
} from "@/util/req/orderTracking/index";
export default {
  name: "payLog",
  data() {
    return {
      tableHeight: null,
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageCount: null,
      orderTracking: [],
      createTimeStart: null,
      createTimeEnd: null,
      iptVal: null,
      createTime: null,
      status: null,
      keys: null,
      offerCode: null,
      contractCode: null,
      detailVisible: false,
      orderTrackingRow: {},
      selRow: {}
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
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.queryOrderDataList();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.queryOrderDataList();
    },
    resetSearchCondition() {
      this.createTimeStart = null;
      this.createTimeEnd = null;
      this.contractCode = null;
      this.offerCode = null;
      this.status = null;
      this.keys = null;
      this.queryOrderDataList();
    },
    queryOrderDataList() {
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
      if (this.keys) {
        parmas.keys = this.keys;
      }
      this.loading = true;
      queryOrderDataList(parmas, res => {
        if (res.msgCode == 200) {
          this.orderTracking = res.data.list;
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
    },
    //处理产品信息显示
    handleInfo(info) {
      if (!info) {
        return "";
      } else {
        info = info.replace(/\|/g, "<br>");
        return info;
      }
    },
    //获取编辑数据
    handleEdit(row) {
      this.orderTrackingRow = JSON.parse(JSON.stringify(row));
      this.selRow = JSON.parse(JSON.stringify(row));
      getOrderDataDetail({ id: row.id }, res => {
        if (res.msgCode == 200) {
          this.detailVisible = true;
          this.orderTrackingRow = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    //获取详情数据
    getOrderDataDetail() {
      getOrderDataDetail({ id: this.selRow.id }, res => {
        if (res.msgCode == 200) {
          this.orderTrackingRow = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    }
  },
  components: {
    orderTrackingMsg: () => import("./component/orderTrackingMsg")
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 120;
    if (this.$route.query.orderNo) {
      this.orderNo = this.$route.query.orderNo;
    }
    //去掉又客户需求跳转进来的需求带公司名称
    if (this.$route.query.indexId) {
      //消息跳转客户
      var parmas = {
        pageSize: this.pageSize, //每页数量
        page: this.currentPage, //当前页
        indexId: this.$route.query.indexId
      };
      this.loading = true;
      queryOrderDataList(parmas, res => {
        if (res.msgCode == 200) {
          this.orderTracking = res.data.list;
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
    } else {
      this.queryOrderDataList();
    }
    var currentUrl = window.location.href;
    var targetUrl = currentUrl.split("?")[0];
    window.location.href = targetUrl;
  }
};
</script>
<style lang="scss" scoped>
.orderTracking {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  position: relative;
}
.orderTracking /deep/ ::-webkit-scrollbar {
  height: 9px;
  width: 7px;
}

.detailVisible {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-radius: 4px;
  min-height: 100%;
  background-color: #fff;
  z-index: 1000;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
