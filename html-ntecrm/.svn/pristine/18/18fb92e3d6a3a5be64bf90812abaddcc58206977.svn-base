<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item title="订单信息" name="1">
        <div v-if="JSON.stringify(order)!='{}'">
          <div class="list">
            <span class="item">
              <span class="title">订单编号：</span>
              <el-link
                style="width:150px;display:inline-block;"
                type="primary"
                @click="$router.push({path:'/admin/order',query:{orderNo:order.contractCode}})"
              >{{order.contractCode}}</el-link>
            </span>
            <span class="item">
              <span class="title">订单文件：</span>
              <i
                class="el-icon-document"
                style="font-size:20px;color:rgb(64, 158, 255);"
                @click="dialogVisible=true;fileUrl=order.contractFile"
              ></i>
            </span>
          </div>
          <span class="list">
            <span class="item">
              <span class="title">用户合同编号：</span>
              <span class="msg">{{order.customerFileNo?order.customerFileNo:'暂无'}}</span>
            </span>
            <span class="item">
              <span class="title">用户合同文件：</span>

              <i
                v-if="order.customerFile"
                class="el-icon-document"
                style="font-size:20px;color:rgb(64, 158, 255);"
                @click="dialogVisible=true;fileUrl=order.customerFile"
              ></i>
              <span v-else>暂无</span>
            </span>
          </span>
          <div class="list">
            <span class="item">
              <span class="title">订单状态：</span>
              <span class="msg" v-if="order.orderStatus==0">待确认</span>
              <span class="msg" v-if="order.orderStatus==1">已确认</span>
              <span class="msg" v-if="order.orderStatus==2">退货中</span>
              <span class="msg" v-if="order.orderStatus==3">已退货</span>
              <span class="msg" v-if="order.orderStatus==4">退款</span>
              <span class="msg" style="color: red;font-weight: bold;" v-if="order.orderStatus==5">无效</span>
              <span class="msg" v-if="order.orderStatus==6">待申请</span>
            </span>
            <span class="item">
              <span class="title">支付状态：</span>
              <el-tag type="warning" v-if="order.payStatus==0">未支付</el-tag>
              <el-tag v-if="order.payStatus==1">已预付</el-tag>
              <el-tag type="success" v-if="order.payStatus==2">已支付</el-tag>
              <!-- <i class="el-icon-document" style="fotnt-size:25px;color:rgb(64, 158, 255);"></i> -->
            </span>
          </div>
          <div class="list">
            <span class="item">
              <span class="title">付款方式：</span>
              <span class="msg" v-if="order.moneyStatus==1">预付全款</span>
              <span class="msg" v-if="order.moneyStatus==2">30%预付款,70%款到发货</span>
              <span class="msg" v-if="order.moneyStatus==3">50%预付款,50%款到发货</span>
              <span class="msg" v-if="order.moneyStatus==4">货到付款</span>
              <span class="msg" v-if="order.moneyStatus==7">款到发货</span>
              <span class="msg" v-if="order.moneyStatus==5">月结</span>
              <span class="msg" v-if="order.moneyStatus==6">其它</span>
            </span>
            <span class="item">
              <span class="title">业务员：</span>
              <span class="msg">{{order.saleName}}</span>
            </span>
          </div>
          <div class="list">
            <span class="item">
              <span class="title">客户公司：</span>
              <span class="msg">{{order.custCompanyName}}</span>
            </span>
            <span class="item">
              <span class="title">联系人信息：</span>
              <span class="msg">{{order.conName}}-{{order.telePhone}}</span>
            </span>
          </div>
          <div class="list">
            <span class="item">
              <span class="title">总金额：</span>
              <span class="msg">￥{{order.totalMoney}}</span>
            </span>
            <span class="item">
              <span class="title">应付金额：</span>
              <span class="msg">￥{{order.copeMoney}}</span>
            </span>
          </div>
          <div class="list">
            <span class="item">
              <span class="title">尾款金额：</span>
              <span class="msg">￥{{order.waitMoney}}</span>
            </span>
            <span class="item">
              <span class="title">待付金额：</span>
              <span class="msg">￥{{order.totalMoney-(order.preMoney+order.payMoney)}}</span>
            </span>
          </div>
          <div class="list">
            <span class="item">
              <span class="title">创建时间：</span>
              <span class="msg">{{order.createTime}}</span>
            </span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      :append-to-body="true"
      title="合同预览"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleCloseVisible"
    >
      <div style="min-height:400px;">
        <object
          :data="fileUrl"
          v-if="fileUrl&& fileUrl.toLowerCase().indexOf('pdf')>-1"
          width="100%"
          height="550px"
          internalinstanceid="233"
        ></object>
        <img v-else style="width: 100%;" :src="fileUrl" alt />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCloseVisible">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "order",
  data() {
    return {
      dialogVisible: false,
      fileUrl: null
    };
  },
  props: {
    order: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    handleCloseVisible() {
      this.dialogVisible = false;
      this.fileUrl = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  // padding: 10px;
}
.list > span {
}
.item {
  display: inline-block;
  width: 48%;
  margin-bottom: 15px;
  margin-left: 10px;
}
.title {
  color: #999;
  display: inline-block;
  width: 100px;
  vertical-align: top;
}
.msg {
  color: #333;
  display: inline-block;
  width: 150px;
}
</style>
