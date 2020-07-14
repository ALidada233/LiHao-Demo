<template>
  <div class="customerDetails clearPa">
    <!-- 搜索区域+筛选区域 -->
    <div :class="{areaToggele:isActive}" :style="{opacity:isOpacity}">
      <div class="screen clearPa">
        <el-input
          v-model.trim="alias"
          placeholder="可输入客户名，手机号,公司名称查询"
          size="medium"
          style="width:300px;"
          :clearable="true"
        ></el-input>
        <el-input
          v-model.trim="visitCount"
          placeholder="可输入客户拜访次数"
          type="number"
          size="medium"
          style="width:180px;"
          :clearable="true"
        ></el-input>
        <el-select
          v-model="saleId"
          placeholder="请选择负责人"
          :filterable="true"
          size="medium"
          :clearable="true"
          style="width:130px;margin-right: 15px;margin-top: 10px;"
        >
          <el-option
            v-for="(item,index) in salesList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="regionIds" filterable multiple placeholder="请选择客户区域">
          <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select
          v-model="custState"
          placeholder="请选择客户状态"
          size="medium"
          :clearable="true"
          style="width:150px;margin-right: 15px;margin-top: 10px;"
        >
          <el-option label="新增询价" :value="1"></el-option>
          <el-option label="询价未成交" :value="2"></el-option>
          <el-option label="已成交" :value="3"></el-option>
        </el-select>

        <el-select
          v-model="custSource"
          placeholder="请选择客户來源"
          size="medium"
          :clearable="true"
          style="width:150px;margin-right: 15px;margin-top: 10px;"
        >
          <el-option label="百度" :value="1"></el-option>
          <el-option label="360" :value="2"></el-option>
          <el-option label="华创推广" :value="3"></el-option>
          <el-option label="朋友介绍" :value="4"></el-option>
          <el-option label="自行开发" :value="5"></el-option>
          <el-option label="电话咨询" :value="6"></el-option>
          <el-option label="其它" :value="7"></el-option>
        </el-select>

        <el-select
          v-model="custNature"
          :clearable="true"
          placeholder="请选择客户性质"
          size="medium"
          style="width:150px;margin-right: 15px;margin-top: 10px;"
        >
          <el-option label="OEM" :value="1"></el-option>
          <el-option label="终端" :value="6"></el-option>
          <el-option label="设备配套商" :value="2"></el-option>
          <el-option label="高校科研院所" :value="3"></el-option>
          <el-option label="贸易商" :value="4"></el-option>
          <el-option label="其他" :value="5"></el-option>
        </el-select>

        <el-select
          v-model="custBelongs"
          :clearable="true"
          multiple
          placeholder="请选择客户属性"
          size="medium"
          style="width:150px;margin-right: 15px;margin-top: 10px;"
        >
          <el-option label="必优客户" :value="1"></el-option>
          <el-option label="必优传媒客户" :value="3"></el-option>
          <el-option label="耐特恩客户" :value="2"></el-option>
        </el-select>

        <el-select
          v-model="levels"
          class="levelSty"
          :clearable="true"
          placeholder="请选择客户级别"
          size="medium"
        >
          <el-option label="作废" :value="0">作废</el-option>
          <el-option label="★" :value="1">
            <span style="color:#EEC71A;">★</span>
          </el-option>
          <el-option label="★★" :value="2">
            <span style="color:#EEC71A;">★★</span>
          </el-option>
          <el-option label="★★★" :value="3">
            <span style="color:#EEC71A;">★★★</span>
          </el-option>
          <el-option label="★★★★" :value="4">
            <span style="color:#EEC71A;">★★★★</span>
          </el-option>
          <el-option label="★★★★★" :value="5">
            <span style="color:#EEC71A;">★★★★★</span>
          </el-option>
        </el-select>

        <el-select
          v-model="contactState"
          :clearable="true"
          placeholder="请选择处理状态"
          size="medium"
          style="width:150px;margin-right: 15px;margin-top: 10px;"
        >
          <el-option label="未读" :value="0"></el-option>
          <el-option label="已读" :value="1"></el-option>
        </el-select>

        <el-select
          v-model="orderByInt"
          :clearable="true"
          placeholder="请选择排序"
          size="medium"
          style="width:150px;margin-right: 15px;margin-top: 10px;"
        >
          <el-option label="置顶排序" :value="1"></el-option>
          <el-option label="星级排序" :value="2"></el-option>
          <el-option label="更新排序" :value="3"></el-option>
          <el-option label="创建排序" :value="4"></el-option>
        </el-select>

        <!-- <span style="font-size: 12px;color: #999;">创建时间:</span> -->
        <el-date-picker
          v-model="createTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="新建开始日期"
          end-placeholder="新建结束日期"
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
        <el-tooltip class="item" effect="dark" content="搜索" placement="top">
          <el-button
            type="primary"
            size="medium"
            style="margin-top: 10px;"
            @click="searchData"
            icon="el-icon-search"
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="重置" placement="top">
          <el-button
            size="medium"
            style="margin-top: 10px;margin-left: 0;"
            @click="resetHandle"
            icon="el-icon-refresh"
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="新增" placement="top">
          <el-button
            type="primary"
            size="medium"
            style="margin-top: 10px;margin-left: 0;"
            icon="el-icon-plus"
            @click="centerDialogVisible=true;editState=false"
          ></el-button>
        </el-tooltip>
      </div>
    </div>

    <!--表格信息-->
    <div class="screenTable clearPa">
      <el-table
        ref="table"
        v-loading="loading"
        :data="dataList"
        style="width:100%"
        :height="tableHeight"
        :border="true"
        :row-style="rowStyleHandle"
        :fit="true"
      >
        <el-table-column prop="selected" label="选中" fixed align="center" width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              icon="el-icon-edit"
              @click="changeSelect(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              round
              type="danger"
              icon="el-icon-delete"
              @click="delSelect(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="salesmanName" label="销售人员" align="center" width="78"></el-table-column>
        <el-table-column width="150" align="center" label="客户公司">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title
              width="200"
              trigger="hover"
              :content="scope.row.custCompanyName"
            >
              <span
                slot="reference"
                style="cursor:default;"
                v-html="$root.OmissionText(scope.row.custCompanyName==null?null:scope.row.custCompanyName,8)"
              ></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column width="160" align="center" label="联系人信息">
          <template slot-scope="scope">
            <!-- <span style="color:#409EFF;cursor: default;" @click="watchDetail(scope.row.custId,scope.row.userId)" v-if="scope.row.custId!=0">{{scope.row.custName}}</span> -->
            <!-- <span v-for="(item,index) in scope.row.conList" :key="index">{{item.conName}}-{{item.telePhone}} <br /></span> -->
            <span
              v-for="(item,index) in (scope.row.conInfo==null?null:scope.row.conInfo).split('|')"
              :key="index"
            >
              {{item}}
              <br />
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="需求数" width="64">
          <template slot-scope="scope">
            <span
              style="cursor:pointer;color:#409EFF"
              @click="$router.push({ path: '/admin/offerList', query: { cid:scope.row.custCompanyName,custCode:scope.row.custCode,salesmanId:scope.row.salesmanId,demandNum:scope.row.demandNum,condition:searchCriteria}})"
            >{{scope.row.demandNum}}</span>
          </template>
        </el-table-column>
        <el-table-column width="78" prop="isTop" align="center" label="是否置顶">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isTop"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              @change="istopHandle(scope.row.isTop,scope.row.custId)"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="levels" label="客户级别" align="center" width="84">
          <template slot-scope="scope">
            <span v-if="scope.row.levels==0">作废</span>
            <span style="color:#EEC71A;" v-if="scope.row.levels==1">★</span>
            <span style="color:#EEC71A;" v-if="scope.row.levels==2">★★</span>
            <span style="color:#EEC71A;" v-if="scope.row.levels==3">★★★</span>
            <span style="color:#EEC71A;" v-if="scope.row.levels==4">★★★★</span>
            <span style="color:#EEC71A;" v-if="scope.row.levels==5">★★★★★</span>
          </template>
        </el-table-column>
        <el-table-column prop="custState" label="客户状态" align="center" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.custState==1">新增询价</el-tag>
            <el-tag type="warning" v-if="scope.row.custState==2">未成交</el-tag>
            <el-tag type="success" v-if="scope.row.custState==3">已成交</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="custBelong" width="110" align="center" label="客户属性">
          <template slot-scope="scope">
            <span v-if="scope.row.custBelong==1">必优客户</span>
            <span v-if="scope.row.custBelong==2">耐特恩客户</span>
            <span v-if="scope.row.custBelong==3">必优传媒客户</span>
          </template>
        </el-table-column>
        <el-table-column prop="custSource" align="center" label="客户來源" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.custSource==1">百度</span>
            <span v-if="scope.row.custSource==2">360</span>
            <span v-if="scope.row.custSource==3">华创推广</span>
            <span v-if="scope.row.custSource==4">朋友介绍</span>
            <span v-if="scope.row.custSource==5">自行开发</span>
            <span v-if="scope.row.custSource==6">电话咨询</span>
            <span v-if="scope.row.custSource==7">其它</span>
          </template>
        </el-table-column>
        <el-table-column prop="custNature" width="110" align="center" label="客户性质">
          <template slot-scope="scope">
            <span v-if="scope.row.custNature==1">OEM</span>
            <span v-if="scope.row.custNature==6">终端</span>
            <span v-if="scope.row.custNature==2">设备配套商</span>
            <span v-if="scope.row.custNature==3">高校科研院所</span>
            <span v-if="scope.row.custNature==4">贸易商</span>
            <span v-if="scope.row.custNature==5">其它</span>
          </template>
        </el-table-column>
        <el-table-column prop="visitCount" width="120" align="center" label="拜访记录次数"></el-table-column>
        <el-table-column prop="custAddress" width="220" align="center" label="客户地址"></el-table-column>
        <el-table-column label="客户区域" align="center" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.regionNames}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contactState" align="center" label="处理状态" width="78">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.contactState==0">未读</el-tag>
            <el-tag type="success" v-if="scope.row.contactState==1">已读</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createName" align="center" label="创建人" width="78"></el-table-column>
        <el-table-column prop="updateTime" width="180" align="center" label="更新日期">
          <template slot-scope="scope">
            <span v-if="scope.row.updateTime!=null">{{scope.row.updateTime}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" width="180" align="center" label="创建日期">
          <template slot-scope="scope">
            <span v-if="scope.row.createTime!=null">{{scope.row.createTime}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="clearPa edit">
      <div style="float:left;padding-top: 8px;">
        <!-- <el-button size="small" type="primary" @click="editDialog" :disabled="editButton">编辑</el-button>
        <span style="color: #999;font-size: 11px;"><span v-if="editButton">未选中</span><span v-else>已选</span></span>-->
        <!-- 	<el-button size="small" type="danger" :disabled="editButton" @click="delSelOption">删除</el-button> -->
      </div>

      <div class="block" style="float: right;margin-top:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 15, 30]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next,total"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>

    <!--编辑&详情-->
    <transition name="el-fade-in-linear">
      <new-customers-edit
        v-if="centerDialogVisible"
        :traderList="traderList"
        :center-dialog-visible="centerDialogVisible"
        :editTitle="editTitle"
        :editState="editState"
        :editUserId="currentId.userId"
        :editCustId="currentId.custId"
        @changeCenter="closeEdit"
        @refreshTable="refreshTable"
        :editList="editList"
        :salesList="salesList"
      ></new-customers-edit>
    </transition>
    <transition name="el-fade-in-linear">
      <new-customrs-detail
        v-if="detailDialogVisible"
        @CustomrsDetail="closeDetail"
        :detailList="detailList"
      ></new-customrs-detail>
    </transition>
  </div>
</template>

<script type="text/javascript">
import newCustomersEdit from "@/page/admin/customerDetails/components/newCustomersEdit";
// import newCustomersMain from "@/page/admin/customerDetails/components/newCustomersMain"
import newCustomrsDetail from "@/page/admin/customerDetails/components/newCustomrsDetail";
//import customersDemand from "@/page/admin/customerDetails/components/customersDemand"
import {
  CustomerTable,
  CustomerName,
  getSalesList,
  deleteCustomer,
  checkCustIsTop,
  getTraderList
} from "util/req/customer/table";
import { formatDateTime } from "util/fn/transTime";
import { getCust, getOperator } from "util/req/customer/newUser";
import { queryRegionPage } from "util/req/region/index";
export default {
  name: "customerDetails",
  data() {
    return {
      tableHeight: null,
      isActive: false, //悬浮搜索框
      isOpacity: 1, //悬浮框透明度
      checkState: true, //表格单选框状态
      orderByInt: null, //排序
      value: "",
      createTime: null, //创建时间（用来watch）
      updateTime: null, //更新时间（用来watch）
      contactTime: null, //联系时间（用来watch）
      dataList: null,
      loading: true, //表格数据加载样式
      currentId: [],
      alias: "", //别名查询
      visitCount: null, //拜访次数
      currentPage: 1,
      pageSize: 10,
      pageCount: null,
      custState: null, //客户状态
      custNature: null, //客户性质
      custProgress: null, //客户进程
      contactState: null, //处理状态
      custSource: null, //客户来源
      custBelongs: [], //客户所属
      levels: null, //客户级别
      creationStart: null, //创建时间(开始)
      creationEnd: null, //创建时间（结束）
      contactStart: null, //联系时间（开始）
      contactEnd: null, //联系时间（结束）
      centerDialogVisible: false,
      editTitle: "客户详情",
      editState: false,
      editButton: true, //编辑按钮状态
      newCustomersHgt: "", //新建内容的高度
      editList: null, //编辑列表信息
      detailDialogVisible: false, //查看详情框的状态
      detailList: null, //查看详情的内容
      operatorList: null, //联系人列表
      demandDialogVisible: false, //需求彈窗狀態
      getCustID: null, //传递客户id
      salesList: [], //获取所有销售员列表
      saleId: null,
      searchCriteria: {}, //全部的搜索内容
      traderList: [], //关联贸易商列表
      regionList: [], //区域列表
      regionIds: null //选中区域
    };
  },
  filters: {
    timeFilter(value) {
      if (!value) return "";
      return formatDateTime(value, 1);
    }
  },
  computed: {},
  watch: {
    "currentId.userId"(val) {
      //表格数据选中处理
      if (val != null) {
        this.editButton = false;
      } else {
        this.editButton = true;
      }
    },
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
    },
    contactTime(val) {
      if (val != null) {
        this.contactStart = formatDateTime(val[0]);
        this.contactEnd = formatDateTime(val[0]);
      } else {
        this.contactStart = null;
        this.contactEnd = null;
      }
    },
    dataList() {}
  },
  methods: {
    sortChange: function(column, prop, order) {
      console.log(column, column.order);
    },
    rowStyleHandle(row, rowIndex) {
      if (row.row.custSource == 5) {
        return { background: "#EEF5E1" };
      } else {
        return;
      }
    },
    handleSelectionChange(val) {},
    editDialog() {
      //编辑客户信息
      this.centerDialogVisible = true;
      this.editTitle = "客户编辑";
      this.editState = false;
      if (this.currentId.custId == 0) {
        //判断当前点击编辑判断userId判断是否为编辑或新增（userId为0时默认为新增）
        this.editState = false;
      } else {
        this.editState = true;
        //请求客户id为0时，就开始请求编辑回显的数据
        var params = {
          custId: this.currentId.custId,
          userId: this.currentId.userId
        };
        getCust(params, res => {
          this.editList = res.data;
        });
      }
    },
    closeEdit(state) {
      this.centerDialogVisible = state;
    },
    watchDetail(cid, uid) {
      //点击观看联系人详情
      this.detailDialogVisible = true;
      var params = {
        custId: cid
      };
      getCust(params, res => {
        this.detailList = res.data;
      });
    },
    closeDetail() {
      //关闭查看详情的框
      this.detailDialogVisible = false;
    },
    changeSelect(row) {
      //处理选中项

      this.currentId = row;
      this.editDialog();
    },
    delSelOption() {
      //删除选中项
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    obtainTable(val) {
      //获取表格数据
      if (val == 1) {
        this.currentPage = val;
      }
      var params = {
        pageSize: this.pageSize, //每页数量
        page: this.currentPage, //当前页
        custState: this.custState || {}, //客户状态
        custNature: this.custNature || {}, //客户性质
        custProgress: this.custProgress || {}, //客户进程
        contactState: this.contactState, //处理状态
        custSource: this.custSource || {}, //客户来源
        custBelongs: this.custBelongs ? this.custBelongs.join(",") : {},
        createTimeStart: this.createTimeStart || {}, //创建时间（开始）
        createTimeEnd: this.createTimeEnd || {}, //创建时间（结束）
        updateTimeStart: this.updateTimeStart || {}, //创建时间（开始）
        updateTimeEnd: this.updateTimeEnd || {}, //创建时间（结束）
        contactStart: this.contactStart || {}, //联系时间（开始）
        contactEnd: this.contactEnd || {}, //联系时间（结束）
        levels: this.levels,
        keys: this.alias || {}, //关键词
        regionIds: this.regionIds.join(",") || {},
        salesmanId: this.saleId,
        orderByInt: this.orderByInt || {},
        visitCount: this.visitCount || {}
      };

      this.searchCriteria = params;
      this.loading = true;
      CustomerTable(params, res => {
        res = res.data.data;
        this.dataList = res.list;
        this.pageCount = res.pageCount;
        this.$refs.table.bodyWrapper.scrollTop = 0;
        setTimeout(() => {
          this.loading = false;
        }, 100);
      });
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.currentId = [];
      this.editButton = true;
      this.obtainTable();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.currentId = [];
      this.editButton = true;
      this.currentPage = currentPage;
      this.obtainTable();
    },
    searchData() {
      //点击筛选搜索
      this.loading = true;
      this.obtainTable(1); //参数1为了按条件查询默认回到第一页
    },
    resetHandle() {
      //点击重置
      this.createTime = null;
      this.updateTime = null;
      this.contactTime = null;
      this.loading = true;
      this.alias = "";
      this.pageCount = null;
      this.custState = null;
      this.custNature = null;
      this.custProgress = null;
      this.contactState = null;
      this.custBelongs = [];
      this.createTimeStart = null;
      this.createTimeEnd = null;
      this.updateTimeStart = null;
      this.updateTimeEnd = null;
      this.custSource = null;
      this.levels = null;
      this.creationStart = null;
      this.creationEnd = null;
      this.contactStart = null;
      this.contactEnd = null;
      this.currentId = [];
      this.editButton = true;
      this.saleId = null;
      this.visitCount = null;
      this.regionIds = [];
      this.obtainTable();
    },
    searchName() {
      this.loading = true;
      var params = {
        pageSize: this.pageSize, //每页数量
        page: this.currentPage, //当前页
        custName: this.alias
      };
      CustomerName(params, res => {
        res = res.data;
        this.dataList = res.list;
        this.pageCount = res.pageCount;
        this.loading = false;
      });
    },
    refreshTable() {
      //刷新表格
      //this.resetHandle()
      this.obtainTable();
    },
    openDemandDialog(cid) {
      //打开需求列表
      this.demandDialogVisible = true;
      this.getCustID = cid;
    },
    closeDemandDialog() {
      //关闭需求弹框
      this.demandDialogVisible = false;
      this.getCustID = null;
      this.obtainTable();
    },
    scrollHandle() {
      //监听滚动事件
    },
    removeScroll() {},
    getSalesList() {
      getSalesList(res => {
        this.salesList = res.data.data.list;
        let copyArr = JSON.parse(JSON.stringify(res.data.data.list))[0];
        copyArr.name = "运营专员";
        copyArr.id = 99999;
        this.salesList.push(copyArr);
      });
    },
    getTraderList() {
      getTraderList(res => {
        this.traderList = res.data.traderList;
      });
    },
    delSelect(row) {
      //删除客户信息
      this.$confirm("此操作将删除该条客户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCustomer(
            {
              custCode: row.custCode
            },
            res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.obtainTable(1);
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    resetSearch(params) {
      //由客户带过来的搜索条件
      console.log(params);
      params = JSON.parse(JSON.stringify(params));
      for (var key in params) {
        if (JSON.stringify(params[key]) == "{}") {
          params[key] = null;
        }
      }
      this.pageSize = params.pageSize; //每页数量
      this.currentPage = params.page; //当前页
      this.custState = params.custState; //客户状态
      this.custNature = params.custNature; //客户性质
      this.custProgress = params.custProgress; //客户进程
      this.contactState = params.contactState; //处理状态
      this.custSource = params.custSource; //客户来源
      this.custBelongs = params.custBelongs
        ? params.custBelongs.split(",").map(Number)
        : [];
      this.regionIds = params.regionIds
        ? params.regionIds.split(",").map(Number)
        : [];
      this.createTimeStart = params.createTimeStart; //创建时间（开始）
      this.createTimeEnd = params.createTimeEnd; //创建时间（结束）
      if (params.createTimeStart) {
        this.createTime = [params.createTimeStart, params.createTimeEnd];
      } else {
        this.createTime = null;
      }
      this.updateTimeStart = params.updateTimeStart; //创建时间（开始）
      this.updateTimeEnd = params.updateTimeEnd; //创建时间（结束）
      if (params.updateTimeStart) {
        this.updateTime = [params.updateTimeStart, params.updateTimeEnd];
      } else {
        this.updateTime = null;
      }
      this.contactStart = params.contactStart; //联系时间（开始）
      this.contactEnd = params.contactEnd; //联系时间（结束）
      this.levels = params.levels;
      this.alias = params.keys; //关键词
      this.saleId = params.salesmanId;
      this.visitCount = params.visitCount; //拜访次数
    },
    istopHandle(newVal, id) {
      checkCustIsTop({ id: id, isTop: newVal }, res => {
        if (res.msgCode == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.obtainTable(1);
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    queryRegionPage() {
      queryRegionPage(
        {
          page: 1,
          pageSize: 100
        },
        res => {
          this.regionList = res.data.list;
        }
      );
    }
  },
  components: {
    newCustomersEdit,
    newCustomrsDetail
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 120;
    this.loading = true;
    this.getSalesList();
    this.getTraderList();
    this.queryRegionPage();
    if (this.$route.query.condition) {
      this.resetSearch(this.$route.query.condition);
    }
    if (this.$route.query.name) {
      //需求带名称跳转
      this.alias = this.$route.query.name;
      var params = {
        pageSize: this.pageSize, //每页数量
        page: this.currentPage, //当前页
        keys: this.alias //关键词
      };
      this.loading = true;
      CustomerTable(params, res => {
        res = res.data.data;
        this.dataList = res.list;
        this.pageCount = res.pageCount;

        var newItem = this.dataList.filter(item => {
          return item.custCompanyName == this.alias;
        });
        this.changeSelect(newItem[0]);
        setTimeout(() => {
          this.loading = false;
        }, 100);
      });
    } else if (this.$route.query.createTimeStart) {
      //首页带时间跳转
      this.createTimeStart = this.$route.query.createTimeStart;
      this.createTimeEnd = this.$route.query.createTimeEnd;
      this.loading = true;

      var params = {
        pageSize: this.pageSize, //每页数量
        page: this.currentPage, //当前页
        createTimeStart: this.createTimeStart + " 00:00:00",
        createTimeEnd: this.createTimeEnd + " 23:59:59"
      };
      if (this.$route.query.saleId) {
        this.saleId = this.$route.query.saleId;
        params.salesmanId = this.saleId;
      }
      CustomerTable(params, res => {
        res = res.data.data;
        this.dataList = res.list;
        this.pageCount = res.pageCount;
        this.createTime = [params.createTimeStart, params.createTimeEnd];
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    } else if (this.$route.query.custId) {
      //消息跳转客户
      var params = {
        pageSize: this.pageSize, //每页数量
        page: this.currentPage, //当前页
        custId: this.$route.query.custId
      };
      CustomerTable(params, res => {
        res = res.data.data;
        this.dataList = res.list;
        this.pageCount = res.pageCount;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    } else {
      this.obtainTable();
    }
    //去掉又客户需求跳转进来的需求带公司名称
    var currentUrl = window.location.href;
    var targetUrl = currentUrl.split("?")[0];
    window.location.href = targetUrl;
  }
};
</script>

<style lang="scss" scoped>
.customerDetails {
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  height: 100%;
  position: relative;
}

.details_search {
  float: right;
}

.screen {
  padding: 10px;
}

.screenTable {
  margin-top: 20px;
}

.screenTable /deep/ th {
  background-color: #efedf0 !important;
}

.screenTable /deep/ ::-webkit-scrollbar {
  height: 9px;
  width: 7px;
  // border-radius: 4px;
}

.newCustomers {
  position: absolute;
  right: 0;
  width: 400px;
  background-color: #fff;
  z-index: 2001;
  top: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.customersDemand {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  z-index: 100;
  background-color: #fff;
}

.areaToggele {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 10px 10px 5px #ddd;
}
.levelSty /deep/ .el-input__inner {
  color: #eec71a;
}
</style>
