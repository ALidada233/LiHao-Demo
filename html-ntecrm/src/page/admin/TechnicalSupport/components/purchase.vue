<template>
  <div class="purchase">
    <div>
      <el-input
        style="width: 20%;margin-top: 20px;"
        placeholder="请输入搜索内容"
        size="medium"
        v-model.trim="keys"
        clearable
      ></el-input>
      <el-date-picker
        v-model="createTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        start-placeholder="新建开始日期"
        end-placeholder="新建结束日期"
        align="right"
        size="medium"
        style="width:290px;"
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
        style="width:290px;"
      ></el-date-picker>
      <el-date-picker
        v-model="orderCreateTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        start-placeholder="订单开始日期"
        end-placeholder="订单结束日期"
        align="right"
        size="medium"
        style="width:290px;"
      ></el-date-picker>
      <el-button
        type="primary"
        size="medium"
        @click="queryPurchaseOrderList"
        icon="el-icon-search"
        style="margin-top:10px;"
      ></el-button>
      <el-button
        size="medium"
        @click="keys=null;createTime=null;updateTime=null;queryPurchaseOrderList()"
        icon="el-icon-refresh"
        style="margin-top:10px;"
      ></el-button>
    </div>
    <div class="purchaseTable">
      <el-table
        :data="purchaseList"
        style="width: 100%"
        :border="true"
        :header-cell-style="{'background-color':'#EFEDF0'}"
        :height="tableHeight"
        v-loading="loading"
        ref="table"
        class="screenTable"
      >
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              icon="el-icon-zoom-in"
              @click="editPurchase(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单编号" align="center" width="150"></el-table-column>
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
        <el-table-column prop="goodsBrandName" label="产品品牌" align="center" width="120"></el-table-column>
        <el-table-column prop="goodsInfo" label="我司型号" align="center" width="320"></el-table-column>
        <el-table-column prop="quantity" label="数量" align="center" width="80"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0">处理中</el-tag>
            <el-tag v-if="scope.row.status==1" type="success">完成</el-tag>
            <el-tag v-if="scope.row.status==2" type="danger">作废</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="库存报价" align="center" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type==0" type="danger">非库存</el-tag>
            <el-tag v-if="scope.row.type==1" type="success">库存</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="arrivalTime" label="到货日期" align="center" width="160">
        </el-table-column>-->
        <el-table-column prop="preArrivalTime" label="预到货日期" align="center" width="160"></el-table-column>
        <!-- <el-table-column prop="file" label="附件" align="center" width="60">
          <template slot-scope="scope">
            <span v-if="scope.row.file" style="cursor:default;color:#409EFF;" @click="viewFile=scope.row.file;pdfVisible=true;">预览</span>
            <span v-else>无</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="orderCreateTime" label="订单创建时间" align="center" width="160"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="160"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center" width="160"></el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="clearPa edit">
      <div class="block" style="float: right;margin-top:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 15, 30]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑采购信息 -->
    <el-dialog
      title="采购信息"
      :visible.sync="purchaseVisible"
      v-if="purchaseVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-alert title="客户公司" type="info" :description="selRow.custCompanyName" :closable="false"></el-alert>
        <el-alert
          title="采购型号"
          type="info"
          :description="selRow.goodsInfo+' '+(selRow.offerRemark?' 【型号备注：'+selRow.offerRemark+'】':'')"
          :closable="false"
        ></el-alert>
        <div style="margin-bottom:50px;">
          <el-alert
            v-for="(item,index) in partTypeList"
            :key="index"
            :title="'辅件'+(index+1)"
            :type="item.check?'success':'info'"
            :description="item.goodsInfo"
            :closable="false"
            v-show="item.isTecSupport==1"
            :show-icon="item.check"
          ></el-alert>
        </div>
        <div>
          <span style="margin-left:50px;">采购备注信息 : {{selRow.remark}}</span>
        </div>
        <div style="margin-top:20px">
          <span style="margin-left:50px;">预到货日期 : {{selRow.preArrivalTime}}</span>
        </div>
      </div>
    </el-dialog>
    <!--文件 展示 -->
    <el-dialog title="文件预览" :visible.sync="pdfVisible" width="80%" class="pdfVisible">
      <object
        v-if="viewFile.toLowerCase().indexOf('pdf')>-1"
        :data="viewFile"
        width="80%"
        height="550px"
        internalinstanceid="233"
      ></object>
      <img v-else :src="viewFile" style="width:100%;" alt />
    </el-dialog>
  </div>
</template>
<script>
import {
  queryPurchaseOrderList,
  getPurchaseInfo,
  updatePurchaseOrder
} from "@/util/req/purchase/index";
import { getBrandList } from "@/util/req/goods/index";
import {
  getSupplierList,
  getSupplierBrandById
} from "@/util/req/supplier/index";
export default {
  name: "purchase",
  data() {
    return {
      tableHeight: null,
      currentPage: 1,
      pageSize: 10,
      pageCount: null,
      loading: false,
      keys: null,
      createTime: null,
      updateTime: null,
      orderCreateTime: null,
      purchaseList: [],
      partList: [],
      partTypeList: [],
      purchaseVisible: false, //采购订单弹框
      purchaseInquiryVisible: false, //询价
      selRow: {
        //选中的行
        custCompanyName: null,
        goodsInfo: null,
        supplierId: null,
        brandId: null,
        arrivalTime: null, // 到货日期
        preArrivalTime: null, //  预到货日期
        invoiceTime: null, //  票到日期
        payType: null, //  付款方式
        payInfo: null, //  付款情况
        contractNo: null, //  采购合同号
        file: null, //  文件
        invoiceNo: null, //  发票号
        status: 0, //  0处理中1询价中状态2完成3作废
        currency: null,
        price: null,
        rate: null
      },
      purchaseInquiry: {
        status: 0
      }, //询价表单
      rules: {
        supplierId: {
          required: true,
          trigger: "blur",
          message: "供应商不能为空"
        },
        brandId: {
          required: true,
          trigger: "blur",
          message: "品牌不能为空"
        },
        price: {
          required: true,
          pattern: /^[1-9]\d*(\.\d+)?$/,
          message: "只能输入大于0的价格"
        },
        enquiryTime: {
          required: true,
          trigger: "blur",
          message: "询价日期不能为空"
        },
        expirationTime: {
          required: true,
          trigger: "blur",
          message: "报价日期不能为空"
        },
        deliveryTime: {
          required: true,
          trigger: "blur",
          message: "交期不能为空"
        },
        currency: {
          required: true,
          trigger: "blur",
          message: "币种不能为空"
        },
        rate: {
          required: true,
          trigger: "blur",
          message: "汇率不能为空"
        }
      },
      fileList: [], //上传图片
      fileListPdf: [], //上传pnf
      file: null, //上传成功返回路径
      goodsImg: null, //显示图片路径
      fileStatus: 1, //选择文件类型
      pdfVisible: false,
      viewFile: "", //阅读的文件
      brandList: [], //品牌列表
      supplierList: [], //供应商列表
      selPurchaseInquiry: null, //选中采购单信息
      btnStatus: false
    };
  },
  props: {
    beId: {
      type: Number
    }
  },
  watch: {
    pdfVisible(status) {
      if (!status) {
        this.viewFile = "";
      }
    }
  },
  methods: {
    handleClose() {
      this.purchaseVisible = false;
      this.selRow = {
        supplierId: null,
        brandId: null
      };
      this.file = null;
      this.fileList = [];
      this.fileListPdf = [];
    },
    purchaseInquiryClose() {
      this.purchaseInquiryVisible = false;
      this.selPurchaseInquiry = null;
      this.purchaseInquiry = { status: 0 };
      this.file = null;
      this.fileList = [];
      this.fileListPdf = [];
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.queryPurchaseOrderList();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.queryPurchaseOrderList();
    },
    getPurchaseOrderInfo(id) {
      getPurchaseInfo({ id: id }, res => {
        if (res.msgCode == "200") {
          res = res.data;
          this.partList = res.purchaseOrder.partList;
          var partTypeList = JSON.parse(
            JSON.stringify(res.purchaseOrder.partList)
          );
          this.partTypeList = partTypeList.map(item => {
            if (item.isTecSupport == 1) {
              item.check = true;
            } else {
              item.check = false;
            }
            return item;
          });
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
    queryPurchaseOrderList() {
      //查询列表
      var parmas = {
        pageSize: this.pageSize,
        page: this.currentPage,
        isTecSupport: 1
      };
      //搜索内容
      if (this.keys) {
        parmas.keys = this.keys;
      }
      //创建时间
      if (this.createTime) {
        parmas.createTimeStart = this.createTime[0];
        parmas.createTimeEnd = this.createTime[1];
      }
      //修改时间
      if (this.updateTime) {
        parmas.updateTimeStart = this.updateTime[0];
        parmas.updateTimeEnd = this.updateTime[1];
      }
      if (this.orderCreateTime) {
        parmas.orderCreateTimeStart = this.orderCreateTime[0];
        parmas.orderCreateTimeEnd = this.orderCreateTime[1];
      }
      this.loading = true;
      queryPurchaseOrderList(parmas, res => {
        if (res.msgCode == "200") {
          res = res.data;
          this.purchaseList = res.list;
          this.pageCount = res.pageCount;
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
    editPurchase(row) {
      var newRow = JSON.parse(JSON.stringify(row));
      if (newRow.supplierId == 0) {
        newRow.supplierId = null;
      }
      if (newRow.brandId == 0) {
        newRow.brandId = null;
      } else {
        newRow.brandId = Number(newRow.brandId);
      }
      if (newRow.price == 0) {
        newRow.price = null;
      }
      if (newRow.currency == 0) {
        newRow.currency = null;
      }
      this.selRow = newRow;
      this.purchaseVisible = true;
      if (row.file) {
        if (row.file.indexOf("pdf") > -1) {
          this.fileStatus = 2;
          this.fileListPdf = [{ name: row.file, url: row.file }];
        } else {
          this.fileStatus = 1;
          this.fileList = [{ name: row.file, url: row.file }];
        }
      }
      this.file = row.file;
      this.getPurchaseOrderInfo(row.id);
    }, //图片上传
    handleRemoveFile(file, fileList) {
      this.file = null;
    },
    handleRemoveImage(file, fileList) {
      this.goodsImg = null;
    },
    handlePreview(file) {
      //console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning("当前只允许传输一个文件");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    successUploadImage(response, file, fileList) {
      this.fileList = [{ name: response.data.url, url: response.data.url }];
      this.goodsImg = response.data.url;
      this.file = response.data.url;
    },
    successUploadFile(response, file, fileList) {
      this.fileListPdf = [{ name: response.data.url, url: response.data.url }];
      this.file = response.data.url;
    },
    getBrandList() {
      //获取所有品牌
      getBrandList({ isShow: 1 }, res => {
        this.brandList = res.data.goodsList;
      });
    },
    getSupplierList() {
      //获取所有供应商
      getSupplierList(res => {
        this.supplierList = res.data.list;
      });
    },
    getSupChange(id, status) {
      //根据供应商ID查询品牌列表
      if (!id) {
        return;
      }
      if (status == "brandId") {
        var params = {
          brandId: id
        };
      } else {
        var params = {
          supplierId: id
        };
      }
      getSupplierBrandById(params, res => {
        if (res.msgCode != 200) {
          this.$message({
            type: "info",
            message: res.msg
          });
        } else {
          if (status == "brandId") {
            this.supplierList = res.data.list;
          } else {
            this.brandList = res.data.list;
          }
        }
      });
    }
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 150;
    this.queryPurchaseOrderList();
    this.getBrandList();
    this.getSupplierList();
  }
};
</script>
<style lang="scss" scoped>
.purchase {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
}
.purchaseTable {
  margin-top: 20px;
}
.screenTable /deep/ ::-webkit-scrollbar {
  height: 9px;
  width: 7px;
}
.purchase /deep/ .el-dialog {
  margin-top: 10px !important;
}
.el-alert {
  width: 80%;
  margin-top: 10px;
  margin-left: 50px;
}
</style>
