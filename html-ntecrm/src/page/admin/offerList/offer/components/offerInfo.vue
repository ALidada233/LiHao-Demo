<template>
  <div>
    <el-dialog
      title="报价信息"
      :visible="offerContentVisible"
      v-if="offerContentVisible"
      @close="closeVisible"
      :append-to-body="true"
      class="offerMsg"
    >
      <div style="width:100%">
        <el-form
          ref="detailOfferPriceList"
          :model="detailOfferPriceList"
          :rules="offerRules"
          label-width="150px"
        >
          <el-form-item label="商品编码">
            <span>{{detailOfferPriceList.goodsNo}}</span>
          </el-form-item>
          <el-form-item label="商品型号" prop="goodsInfo">
            <el-autocomplete
              class="inline-input"
              v-model="detailOfferPriceList.goodsInfo"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="true"
              style="width:300px;"
              placeholder="请输入商品型号"
            ></el-autocomplete>
            <br />参考型号：
            <span>{{detailOfferPriceList.title}}-{{detailOfferPriceList.range}}-{{detailOfferPriceList.accuracy}}-{{detailOfferPriceList.outputSignal}}</span>
          </el-form-item>
          <el-form-item label="型号编码">
            <span>{{detailOfferPriceList.modelNo}}</span>
          </el-form-item>
          <el-form-item label="商品报价" prop="offer">
            <span>
              ￥
              <el-input
                placeholder
                type="text"
                style="width:30%"
                v-model="detailOfferPriceList.offer"
                clearable
                @blur="validateOffer"
              ></el-input>
            </span>
          </el-form-item>
          <el-form-item label="标准价格">
            <span>￥{{detailOfferPriceList.standardPrice}}</span>
          </el-form-item>
          <el-form-item label="库存" style="background:#eee;">
            <span>{{detailOfferPriceList.stock}}</span>
            <span v-if="detailOfferPriceList.hasOwnProperty('recordStock')" style="font-size:12px;">
              <span style="margin-left:20px;">[ 上次报价：</span>
              <span>库存：{{detailOfferPriceList.recordStock.yStock}} 个</span>
              <span>非库存：{{detailOfferPriceList.recordStock.nStock}} 个</span>
              ]
            </span>
          </el-form-item>
          <el-form-item label="数量" prop="quantity">
            <el-input
              placeholder
              type="text"
              style="width:20%"
              v-model="detailOfferPriceList.quantity"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="商品折扣率">
            <span>{{detailOfferPriceList.discount||0}}%</span>
          </el-form-item>
          <el-form-item label="最终折扣率">
            <span>{{Number(detailOfferPriceList.finalDiscount)||0}}%</span>
          </el-form-item>
          <el-form-item label="总报价">
            <span>￥{{times(Number(detailOfferPriceList.offer),Number(detailOfferPriceList.quantity))||'0.00'}}</span>
          </el-form-item>
          <el-form-item label="货期" prop="deliveryStart">
            <el-input
              placeholder
              type="number"
              style="width:20%"
              min="0"
              v-model="detailOfferPriceList.deliveryStart"
              clearable
            ></el-input>--
            <el-input
              placeholder
              type="number"
              style="width:20%"
              min="0"
              v-model="detailOfferPriceList.deliveryEnd"
              clearable
            ></el-input>周
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              placeholder
              type="textarea"
              style="width:80%"
              v-model="detailOfferPriceList.remark"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: right;margin-top: 20px;">
        <el-button type="primary" size="small" @click="applicationHandle">申请低折扣</el-button>
        <el-button type="primary" size="small" @click="comfirmOfferPrice">确定</el-button>
        <el-button size="small" @click="$emit('closeOfferInfo');">取消</el-button>
      </div>
    </el-dialog>
    <!-- 申请低折扣 -->
    <discount-application
      :lowVisible="lowVisible"
      :demandId="demandId"
      :discountsApplication="discountsApplication"
      @closeLowHandle="closeLowHandle"
    ></discount-application>
  </div>
</template>
<script>
import { getOptApplyDiscount } from "util/req/customer/demand";
import { getGoodsCompleteModel } from "util/req/offerList/index";
export default {
  name: "offerInfo",
  props: {
    offerContentVisible: {
      type: Boolean
    },
    offerStatus: {
      type: Boolean
    },
    detailOfferPriceList: {
      type: Object
    },
    demandId: {
      type: null
    }
  },
  data() {
    return {
      offerRules: {
        goodsInfo: {
          required: true,
          trigger: "blur",
          message: "商品型号不能为空"
        },
        quantity: [
          {
            required: true,
            trigger: "blur",
            message: "数量不能为空且为数字"
          },
          {
            pattern: /^[1-9]\d*(\.\d+)?$/,
            message: "只能输入大于0的数字"
          }
        ],
        offer: [
          {
            required: true,
            trigger: "blur",
            message: "报价不能为空且为数字"
          },
          {
            pattern: /^[1-9]\d*(\.\d+)?$/,
            message: "只能输入大于0的数字"
          }
        ],
        deliveryStart: [
          {
            required: true,
            trigger: "blur",
            message: "报价不能为空且为数字"
          },
          {
            pattern: /^[1-9]\d*(\.\d+)?$/,
            message: "只能输入大于0的数字"
          }
        ],
        deliveryEnd: [
          {
            required: true,
            trigger: "blur",
            message: "报价不能为空且为数字"
          },
          {
            pattern: /^[1-9]\d*(\.\d+)?$/,
            message: "只能输入大于0的数字"
          }
        ]
      },
      lowVisible: false, //申请折扣弹框
      discountsApplication: {}, //传递·的申请折扣内容
      modelList: [] //此商品的型号列表
    };
  },
  watch: {
    offerContentVisible: function(status) {
      if (status) {
        //点击进来先算一次报价折扣，已报价的情况
        this.validateOffer();
      }
    },
    offerContentVisible(val) {
      console.log(this.detailOfferPriceList);
      //当商品详情打开时操作
      if (val) {
        this.getGoodsCompleteModel();
      }
    }
  },
  methods: {
    //从商品型号里选出匹配的信号
    querySearch(queryString, cb) {
      var restaurants = this.modelList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      console.log(results);
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) == 0
        );
      };
    },
    closeVisible() {
      this.$emit("closeOfferInfo");
    },
    validateOffer() {
      if (this.detailOfferPriceList.offer) {
        var priceDiscount =
          (Number(this.detailOfferPriceList.offer) /
            Number(this.detailOfferPriceList.standardPrice)) *
          100;
        this.$set(
          this.detailOfferPriceList,
          "finalDiscount",
          priceDiscount.toFixed(2)
        );
      } else {
        this.$set(this.detailOfferPriceList, "finalDiscount", 0);
      }
    },
    //获取商品型号
    getGoodsCompleteModel() {
      getGoodsCompleteModel(
        { modelNo: this.detailOfferPriceList.modelNo },
        res => {
          this.modelList = res.data.map(item => {
            item = {
              value: item
            };
            return item;
          });
          console.log(this.modelList);
        }
      );
    },
    comfirmOfferPrice() {
      //确定报价内容,将编辑的内容保存起来
      this.$refs.detailOfferPriceList.validate(valid => {
        if (valid) {
          var priceDiscount =
            (Number(this.detailOfferPriceList.offer) /
              Number(this.detailOfferPriceList.standardPrice)) *
            100;
          this.$set(this.detailOfferPriceList, "finalDiscount", priceDiscount);
          if (priceDiscount < Number(this.detailOfferPriceList.discount)) {
            this.$alert(
              "最终折扣率低于你的权限,请您申请折扣或者修改价格",
              "折扣率提醒",
              {
                confirmButtonText: "确定"
              }
            );
            return;
          }
          if (!this.detailOfferPriceList.deliveryEnd) {
            this.$message({
              message: "货期没有填写完整",
              type: "warning"
            });
            return;
          }
          console.log(this.detailOfferPriceList);
          this.$emit(
            "editOfferInfo",
            JSON.parse(JSON.stringify(this.detailOfferPriceList))
          );
        }
      });
    },
    applicationHandle() {
      //申请低折扣
      this.lowVisible = true;
      this.discountsApplication.goodsName =
        this.detailOfferPriceList.title +
        "-" +
        this.detailOfferPriceList.range +
        "-" +
        this.detailOfferPriceList.accuracy +
        "-" +
        this.detailOfferPriceList.outputSignal;
      this.discountsApplication.modelNo = this.detailOfferPriceList.modelNo;
      this.discountsApplication.goodsNo = this.detailOfferPriceList.goodsNo;
      this.discountsApplication.applyDiscount = this.detailOfferPriceList.finalDiscount;
      this.discountsApplication.orgMoney = this.detailOfferPriceList.standardPrice;
      this.discountsApplication.applyMoney = this.detailOfferPriceList.offer;
      getOptApplyDiscount(
        {
          demandId: this.demandId,
          modelNo: this.detailOfferPriceList.modelNo,
          goodsNo: this.detailOfferPriceList.goodsNo
        },
        res => {
          this.$set(
            this.discountsApplication,
            "orgDiscount",
            res.data.disCount
          );
        }
      );
      console.log(this.detailOfferPriceList);
    },
    closeLowHandle() {
      //申请折扣信息新加了一条记录
      this.lowVisible = false;
      this.discountsApplication = {};
    }
  },
  components: {
    discountApplication: () =>
      import("@/page/admin/offerList/offer/components/discountApplication")
  }
};
</script>
<style lang='scss' scoped>
.offerMsg /deep/ .el-dialog {
  margin-top: 0vh !important;
}

.offerMsg /deep/ .el-dialog__body {
  padding: 10px 20px !important;
}
</style>
