<template>
  <div class="orderTrackingDetail">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <h2 style="margin-top:20px;">需求信息</h2>
    <el-alert type="info" :closable="false" style="margin:10px 0;font-size:20px;">
      <div style="margin:10px 0;font-size:13px;color:#999;" class="clist">
        <span>
          公司名称：
          <em>{{orderTrackingRow.demand.companyName}}</em>
        </span>
        <span>
          联系人：
          <em>{{orderTrackingRow.demand.contacts}}</em>
          <el-tooltip class="item" effect="dark" content="联系人信息" placement="top-end">
            <i
              style="font-size:20px;vertical-align: middle;"
              class="el-icon-s-operation"
              @click="drawer=true;"
            ></i>
          </el-tooltip>
        </span>
        <span>
          联系电话：
          <em>{{orderTrackingRow.demand.phone}}</em>
        </span>
      </div>
      <div style="padding:10px 0;font-size:13px;color:#999;" class="clist">
        <span>
          需求：
          <em v-if="orderTrackingRow.demand.type==2">{{orderTrackingRow.demand.demandContent}}</em>
          <em v-if="orderTrackingRow.demand.type==1">{{orderTrackingRow.demand.serviceDemand}}</em>
        </span>
        <span>
          销售员：
          <em>{{orderTrackingRow.demand.saleName}}</em>
        </span>
        <span>
          创建时间：
          <em>{{orderTrackingRow.demand.createTime}}</em>
        </span>
      </div>
    </el-alert>
    <el-tabs type="border-card">
      <el-tab-pane label="商品资料">
        <orderGoodsList
          :dataGoodsList="orderTrackingRow.dataGoodsList"
          @refreshData="$emit('getDetail')"
        ></orderGoodsList>
      </el-tab-pane>
      <el-tab-pane label="订单信息" :disabled="roleId==41">
        <div style="display:flex;flex-wrap:wrap;">
          
          <!-- 订单信息orderTrackingRow.hasOwnProperty('order') -->
          <div class="list">
            <order :order="orderTrackingRow.order"></order>
          </div>
          <!-- 报价信息 -->
          <div class="list">
            <el-collapse value="1">
              <el-collapse-item title="报价信息" name="1">
                <div>
                  <div style="padding:10px 0;">
                    <span style="margin-right:20px;">
                      总报价：
                      <el-link type="success">{{orderTrackingRow.demandOffer.totalOffer}}</el-link>
                    </span>
                    <span style="margin-right:20px;">
                      总标准价：
                      <el-link type="warning">{{orderTrackingRow.demandOffer.goodsOffer}}</el-link>
                    </span>
                    <span style="margin-right:20px;">
                      业务折扣：
                      <el-link type="info">{{orderTrackingRow.demandOffer.discount}}</el-link>
                    </span>
                    <span style="margin-right:20px;">
                      报价折扣：
                      <el-link type="info">{{orderTrackingRow.demandOffer.finalDiscount}}</el-link>
                    </span>
                  </div>
                  <el-table
                    ref="multipleTable"
                    class="offerPrice"
                    :data="orderTrackingRow.demandOffer.offerGoodsList"
                    :header-cell-style="{'background-color':'#EFEDF0'}"
                    style="width: 100%;"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <div
                          v-for="(item,index) in props.row.partsList"
                          :key="index"
                          class="fujian"
                        >
                          <span>名称 ：{{item.title}}</span>
                          <span>报价 ：{{item.offer}}</span>
                          <span>标准价 ：{{item.goodsOffer}}</span>
                          <span>数量 ：{{item.quantity}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="是否含辅件" width="100">
                      <template slot-scope="props">
                        <el-tag type="success" v-if="props.row.partsList.length>0">是</el-tag>
                        <el-tag type="info" v-else>否</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="title" label="商品名称" align="center" width="120">
                      <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="库存" width="80">
                      <template slot-scope="scope">
                        <span style="color:#409EFF;">{{scope.row.stock}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="上次库存报价" width="120">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.hasOwnProperty('recordStock')"
                        >库存： {{scope.row.hasOwnProperty('recordStock')?scope.row.recordStock.yStock:''}}</span>
                        <br />
                        <span
                          v-if="scope.row.hasOwnProperty('recordStock')"
                        >非库存：{{scope.row.hasOwnProperty('recordStock')?scope.row.recordStock.nStock:''}}</span>
                        <br />
                      </template>
                    </el-table-column>
                    <el-table-column label="报价" align="center" width="120">
                      <template slot-scope="scope">
                        <span>￥{{scope.row.offer}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="标准价" align="center" width="120">
                      <template slot-scope="scope">
                        <span>￥{{scope.row.standardPrice}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="总数量" align="center">
                      <template slot-scope="scope">{{scope.row.quantity}}</template>
                    </el-table-column>
                    <el-table-column label="总报价" align="center" width="120">
                      <template slot-scope="scope">￥{{scope.row.quantity*scope.row.offer}}</template>
                    </el-table-column>
                    <el-table-column label="总标准价" align="center" width="120">
                      <template slot-scope="scope">￥{{scope.row.quantity*scope.row.standardPrice}}</template>
                    </el-table-column>
                    <el-table-column prop="goodsImg" label="商品图片" align="center" width="180">
                      <template slot-scope="scope">
                        <img style="height:50px;" :src="scope.row.goodsImg" />
                      </template>
                    </el-table-column>

                    <el-table-column prop="range" label="量程">
                      <template slot-scope="scope">
                        <span @click="editRange(scope.row)">
                          {{scope.row.range}}
                          <i
                            class="el-icon-edit"
                            style="cursor: default;color:#409EFF;"
                          ></i>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="accuracy" label="精度"></el-table-column>
                    <el-table-column prop="outputSignal" label="输出信号"></el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
           <!-- 订单日志 -->
          <div class="list">
            <orderOptLog :orderOptLog="orderTrackingRow.orderOptLog"></orderOptLog>
          </div>
          <!-- 支付记录 -->
          <div class="list">
            <payLog :orderPayLog="orderTrackingRow.orderPayLog"></payLog>
          </div>
          <!-- 发货记录 -->
          <div class="list">
            <orderShipping :orderShipping="orderTrackingRow.orderShipping"></orderShipping>
          </div>
         <!-- 申请开票记录 -->
          <div class="list">
            <orderInvoice :orderInvoice="orderTrackingRow.orderInvoice"></orderInvoice>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="技术支持" :disabled="roleId==41">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="售前" name="1">
            <technicalSupport :technicalSupport="orderTrackingRow.preSaleList"></technicalSupport>
          </el-collapse-item>
          <el-collapse-item title="售后" name="2">
            <technicalSupport :technicalSupport="orderTrackingRow.afterSaleList"></technicalSupport>
          </el-collapse-item>
          <el-collapse-item title="调试" name="3">
            <technicalSupport :technicalSupport="orderTrackingRow.debugList"></technicalSupport>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>

    <!-- 相关联系人 -->
    <el-drawer
      title="联系人"
      class="myDrawer"
      :visible.sync="drawer"
      direction="btt"
      :append-to-body="true"
    >
      <div>
        <el-table
          :data="orderTrackingRow.conList"
          :header-cell-style="{'background-color': '#EFEDF0','height': '30px','padding':'0'}"
          style="width: 100%"
        >
          <el-table-column prop="conName" label="姓名" width="200" align="center"></el-table-column>
          <el-table-column prop="telePhone" label="手机"></el-table-column>
          <el-table-column prop="landLine" label="座机"></el-table-column>
          <el-table-column prop="mailBox" label="邮箱"></el-table-column>
          <el-table-column prop="QQ" label="QQ" width="100"></el-table-column>
          <el-table-column prop="weChat" label="微信"></el-table-column>
          <el-table-column prop="post" label="岗位"></el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.sex==1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "orderTrackingMsg",
  data() {
    return {
      drawer: false,
      activeNames: ["1", "2", "3"],
      roleId: JSON.parse(sessionStorage.getItem("userDto")).roleId || null
    };
  },
  props: {
    orderTrackingRow: {
      type: Object,
      default: function() {
        return {
          demand: {}
        };
      }
    }
  },
  methods: {
    goBack() {
      this.$emit("closeVisible");
    }
  },
  components: {
    order: () => import("./order.vue"),
    payLog: () => import("./payLog"),
    orderInvoice: () => import("./orderInvoice"),
    orderShipping: () => import("./orderShipping"),
    orderOptLog: () => import("./orderOptLog"),
    technicalSupport: () => import("./technicalSupport"),
    orderGoodsList: () => import("./orderGoodsList")
  }
};
</script>
<style lang="scss" scoped>
.orderTrackingDetail {
  padding: 20px;
  box-sizing: border-box;
}
.list {
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 10px;
  box-sizing: border-box;
  width: 50%;
}

.clist > span {
  margin-right: 30px;
}
.clist > span em {
  color: #333;
}
.fujian {
  color: #333;
}
.fujian span {
  margin-right: 20px;
}
.list /deep/ .el-collapse-item__wrap {
  min-height: 300px;
}
.orderTrackingDetail /deep/ .is-fixed {
  top: 5px;
}
.orderTrackingDetail /deep/ ::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
.orderTrackingDetail /deep/ ::-webkit-scrollbar {
  height: 7px;
  width: 7px;
}
/* 滑块颜色 */
.orderTrackingDetail /deep/::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 4px;
  /*border-radius:5px;*/
}
.myDrawer /deep/ .el-drawer__header > span:focus {
  outline-color: #fff;
}
</style>
