<template>
  <div>
    <div style="text-align:right;margin-bottom:21px;">
      <i class="iconfont" style="cursor:default;" @click="$emit('closeVisible');resetHandle();">&#xe633;</i>
    </div>
    <!-- 商品列表 -->
    <div style="padding:10px 0;">
      【发货商品列表】
    </div>
    <div v-if="!editShipping">
      <el-table :data="tableDetailList.invoiceGoodsList" border tooltip-effect="dark" @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="goodsInfo" label="产品型号">
        </el-table-column>
        <el-table-column prop="remark" label="描述备注">
        </el-table-column>
        <el-table-column prop="brandName" label="品牌">
        </el-table-column>
        <el-table-column prop="quantity" label="数量">
        </el-table-column>
        <el-table-column prop="goodsOffer" label="标准价">
        </el-table-column>
        <el-table-column prop="offer" label="报价">
        </el-table-column>
      </el-table>
    </div>
    <div style="padding:10px 0;">
      【发货单】
    </div>

    <!-- 发货单 -->
    <!-- -webkit-transform:scale(0.65); -->
    <div style="margin-top:-200px;" class="scale">
      <div style="border: 1px solid #999;padding: 21px;border-radius:4px;margin:0 auto;min-width: 1000px;">
        <div class="htmlModel" id="subOutputRank-print" ref="print" style="background: #fff;">
          <div class="clear" style="padding-top:50px;">
            <div style="float:left;width:50%;font-size:13px;line-height:25px;">
              <img style="width:90%;" v-if="content.custBelong==2" src="@/assets/contract/image000.jpeg" alt="">
              <img style="width:90%;margin-top: 25px;" v-if="content.custBelong==1" src="@/assets/contract/image002.png"
                alt="">
            </div>
            <div style="float:left;width:50%;line-height: 36px;">
              <p style="font-size:22px;font-weight:500;" v-if="content.custBelong==2">深圳耐特恩科技有限公司</p>
              <p style="font-size:22px;font-weight:500;" v-if="content.custBelong==1">深圳必优传感科技有限公司</p>
              <p style="font-size: 21px;line-height: 28px;margin: 5px 0;" v-if="content.custBelong==1">BUYSENSOR
                TECHNOLOGY CO.,LTD </p>
              <p style="font-size: 21px;line-height: 28px;margin: 5px 0;" v-if="content.custBelong==2">NEW TRANSFORM
                TECHNOLOGY CO.,LTD
              </p>
              <p style="font-size: 21px;line-height: 28px;">深圳市宝安42区兴华一路华创达商务大厦D栋303</p>
              <p style="font-size: 21px;line-height: 28px;" v-if="content.custBelong==1">Address:D303,HuaChuangDa
                Business Center,No.1 Xinghua Road,42th Precinct,Bao'an District, Shenzhen, China. </p>
              <p style="font-size: 21px;line-height: 28px;margin: 5px 0;" v-if="content.custBelong==1">TEL:0755-23320851
                &nbsp;
                FAX:0755-23320851-8018</p>
              <p style="font-size: 21px;line-height: 28px;margin: 5px 0;" v-if="content.custBelong==2">TEL:0755-82908211
                &nbsp;
                FAX:0755-82959939-802</p>
              <p style="font-size: 21px;line-height: 28px;" v-if="content.custBelong==1">邮箱/Email：info@buysensor.com </p>
                <p style="font-size: 21px;line-height: 28px;" v-if="content.custBelong==1">WEBSITE：http://www.buysensor.com</p>
                <p style="font-size: 21px;line-height: 28px;" v-if="content.custBelong==2">WEBSITE：http://www.sensorstech.com</p>
            </div>
          </div>
          <div style="clear:both;"></div>
          <div style="text-align:center;font-weight:600;font-size:30px;color:#FF0000;margin-top:30px;">
            <img src="@/assets/contract/Invoice.png" alt="">
          </div>
          <p style="text-align:right;font-weight:600;font-size:21px;color:#FF0000;margin-top:10px;border-bottom:1px solid #000;"></p>
          <div class="clear" style="font-size:21px;line-height:40px;">
            <div style="display: flex;">
              <div style="width:33.333%;float:left;display:flex;">
                <span style="display:inline-block;min-width:125px;text-indent:15px;text-align:left;padding-right:10px;box-sizing:border-box;">收货单位：</span>
                <span style="flex: 1;">{{content.custCompanyName}}</span>
              </div>
              <div style="width:33.333%;float:left;display:flex;">
                <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">合同编号：</span>
                <input type="text" v-if="status" style="width:100%;text-align:center;font-size:21px;" v-model="content.contractCode">
                <span style="width:100%;" v-else>{{content.contractCode}}</span>
              </div>
              <div style="width:33.333%;float:left;display:flex;">
                  <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">日期：</span>
                  <!-- <input type="text" style="font-size:21px;width:100%" v-if="status" v-model="editDate"> -->
                  <el-date-picker
                    v-if="status"
                    style="font-size:21px;width:100%" 
                    value-format="yyyy-MM-dd"
                    v-model="editDate"
                    type="date"
                    placeholder="选择发货日期">
                  </el-date-picker>
                  <span v-else style="word-break: break-all;flex: 1;">{{editDate}}</span>
              </div>
            </div>
            <div>
              <div style="width:33.333%;float:left;display: flex;">
                <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">联 系 人：</span>
                <input type="text" style="font-size:21px;width:100%;" v-if="status" v-model="content.conName">
                <span v-else>{{content.conName}}</span>
              </div>
              <div style="width:33.333%;float:left;">
                <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">销售人员：</span>
                <span>{{content.saleName}}</span>
              </div>
              <div style="width:33.333%;float:left;display:flex;">
                <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">快递公司：</span>
                <span>
                  <input type="text" style="font-size:21px;width: 91%;" v-if="status" v-model="editServicesCompany">
                  <span style="word-break: break-all;flex: 1;" v-else>{{editServicesCompany}}</span>
                </span>
              </div>
            </div>
            <div>
              <div style="width:33.333%;float:left;display:flex;">
                <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">联系方式：</span>
                <input type="text" style="font-size:21px;width:100%;" v-if="status" v-model="content.telePhone">
                <span v-else style="width:100%;">{{content.telePhone}}</span>
              </div>
              <div style="width:33.333%;float:left;display:flex;">
                <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">销售电话：</span>
                <span style="width:100%;">{{content.salePhone}}</span>
              </div>
              <div style="width:33.333%;float:left;display:flex;">
                <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">快递单号：</span>
                  <input type="text" style="font-size:21px;width:100%;" v-if="status" v-model="editServicesNum">
                  <span style="word-break: break-all;flex: 1;"  v-else>{{editServicesNum}}</span>
              </div>
            </div>

            <div style="width:100%;float:left;">
              <span style="display:inline-block;min-width:125px;text-align:left;text-indent:15px;">收货地址：</span>
              
                <input type="text" style="font-size:21px;width:70%;" v-if="status" v-model="content.contAddress">
                <span v-else>{{content.contAddress}}</span>
             
            </div>
          </div>

          <div style="margin-top:25px;" class="clear">
            <div style="min-height:400px;font-size:21px;">
              <table style="width:100%;">
                <thead>
                  <th>序号</th>
                  <th>产品型号</th>
                  <th>描述备注</th>
                  <th>产品数量</th>
                  <th>单位</th>
                  <th>产品序列号</th>
                  <th>备注</th>
                </thead>

                <tr v-for="(item,index) in selContent" :key="index">
                  <td width="80">{{index+1}}</td>
                  <td width="200">{{item.goodsInfo.split("—")[0]}}</td>
                  <td width="200" style="word-break: break-all;">
                    <input type="text" style="text-align:center;font-size:21px;width:80%;" v-if="status" v-model="item.remark">
                    <span v-else>{{item.remark}}</span> 
                  </td>
                  <td width="120">{{item.quantity}}</td>
                  <td width="120">
                    <input type="text" style="text-align:center;font-size:21px;width:40%;" v-if="status" v-model="item.unit">
                    <span v-else>{{item.unit}}</span>
                  </td>
                  <td width="120">
                    <input type="text" style="text-align:center;font-size:21px;width:60%;" v-if="status" v-model="item.serial">
                    <span v-else>{{item.serial}}</span>
                  </td>
                  <td width="120">
                    <input type="text" style="text-align:center;font-size:21px;width:70%;" v-if="status" v-model="item.editRemark">
                    <span v-else>{{item.editRemark}}</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div>
            <div style="display:flex;padding:15px 0;border-top:1px solid #000;border-bottom:1px solid #000;">
              <p style="width:50%;font-size:21px;display:flex;">
                <span style="display:inline-block;min-width:150px;text-align:right;">数量总计：</span>
                <span style="width:100%;text-align:center;">{{totalQuantity}}</span>
              </p>
              <p style="width:50%;font-size:21px;display:flex;">
                <span style="display:inline-block;min-width:150px;text-align:right;">装箱数总计：</span>
                <span style="width:100%;text-align:center;">
                  <input type="text" style="text-align:center;font-size:21px;width:50%;" v-if="status" v-model="editBox">
                  <span v-else>{{editBox}}</span>
                </span>
              </p>
            </div>
            <div style="display:flex;padding:15px 0;border-bottom:1px solid #000;">
              <p style="width:50%;font-size:21px;display:flex;">
                <span style="display:inline-block;min-width:150px;text-align:right;">签收人：</span>
              </p>
              <p style="width:50%;font-size:21px;display:flex;">
                <span style="display:inline-block;min-width:150px;text-align:right;">签收时间：</span>
              </p>
            </div>
          </div>
          <div style="margin-top:25px;font-size:21px;line-height:33px;" class="clear">
            <p>声明：</p>
            <p>1.收货方验收货物时，仔细核对货品及数量是否正确，包装是否完整；</p>
            <p>2.货品若正确完好，5个工作日内签收回传，否则视为验收合格;</p>
            <p v-if="content.custBelong==2">3.买方未付清货款前，以上所列商品归深圳耐特恩科技有限公司所有;</p>
            <p v-if="content.custBelong==1">3.买方未付清货款前，以上所列商品归深圳必优传感科技有限公司所有;</p>
            <p>4.本单据一式四联具同等法律效力;</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传按钮 -->
    <div style="text-align:center;margin-top: -180px;">
      <el-button @click="status=!status">{{status?'完成':'编辑'}}</el-button>
      <el-button :disabled="this.selContent.length==0" @click="printContent">打印</el-button>
      <el-upload  style="display: inline-block;margin-left: 10px;" class="upload-demo" action="/nte-crm/uploadFile"
        :on-preview="handlePreview" :before-upload="handleBeforeUpload" :on-emove="handleRemoveFile"  :limit="1" accept=".pdf"
        :on-success="successUploadFile" :on-exceed="handleExceed" :file-list="fileList">
        <el-button type="success">上传发货单</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
    </div>
  </div>
</template>

<script type="text/javascript" charset="gb2312">
  import Print from '@/util/fn/print.js'
  import {insertOrderInvoiceFile,saveOrderShipping,getShippingGoods} from "util/req/order/index";
  import {
    queryOrderDetail
  } from "util/req/order/index"
  export default {
    name: 'shippingList',
    props: {
      orderDetailList: { //订单详情
        type: Object
      },
      editShipping:{ //编辑发货单信息
        type: Object
      }
    },
    watch:{
      editShipping(value){
        console.log('value',value)
      }
    },
    data() {
      return {
        content: this.orderDetailList.order || {},
        tableDetailList:this.orderDetailList||{},
        selContent: [],
        totalQuantity: 0,
        editDate: null, //发货日期
        editServicesCompany: "顺丰快递", //快递公司
        editServicesNum: null, //快递编号
        editAddress: null, //快递地址、
        editBox: null, //装箱总数
        status: true, //编辑状态
        fileList:[]
      }
    },
    methods: {
      resetHandle() {

      },
      //图片上传
      handleRemoveFile(file) {
        this.file = null;
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files) {
        this.$message.warning('当前只允许传输一个文件');
      },
      handleBeforeUpload(){
        if(this.selContent.length==0){
          this.$message({
            type: 'info',
            message: "请选中商品再上传发货单"
          });
          return false
        }
      },
      successUploadFile(response, file) {
        var params = {
          name: response.data.url,
          url: response.data.url
        };
        this.fileList.push(params);
        var idArray=this.selContent.map(item=>{
            return item.id
        })
        var shippingParams={
            orderNo:this.content.orderNo,// 订单编号
            contractNo:this.content.contractCode,// 合同编号
            address:this.content.contAddress,// 收货地址
            receiptName:this.content.conName,// 收货人姓名
            receiptPhone:this.content.telePhone,// 收货人手机号
            logBank:this.editServicesCompany,// 发货物流公司
            logNo:this.editServicesNum,// 发货物流单号
            sendTime:this.editDate,// 发货时间
            goodsId:idArray.join(','),// 发货关联订单商品
            file:this.fileList[0].url// 发货单文件
        }
        if(this.editShipping&&this.editShipping!=null){
          shippingParams.id=this.editShipping.id;
          shippingParams.goodsId=this.editShipping.goodsId
        }
        if(!shippingParams.sendTime){
          this.$message({
            type: 'info',
            message: "发货时间不能为空"
          });
          return
        }
        saveOrderShipping(shippingParams, row => {
          if (row.msgCode == 200) {
            this.$message({
              type: 'success', 
              message: row.msg
            });
            this.queryOrderDetail();
          } else {
            this.$message({
              type: 'info',
              message: row.msg
            });
          }
          this.fileList = [];
        })
      },
      handleSelectionChange(sel) { //选中的商品
        var num = 0;
        var newRows = [];
        for (var i = 0; i < sel.length; i++) { //货物总数
          sel[i].unit = null;
          sel[i].serial = null;
          sel[i].editRemark = null;
          num += sel[i]['quantity'];
        }
        this.totalQuantity = num;
        this.selContent = sel;
      },
      printContent() {
        document.title = this.content.contractCode;
        Print(this.$refs.print);
      },
      queryOrderDetail(){   //获取详情列表
        queryOrderDetail({id:this.tableDetailList.order.id},res=>{
          this.content=res.data.order;
          this.tableDetailList=res.data;
        })
      }
    },
    mounted(){

      //当处于编辑的情况下，对数据处理
      if(this.editShipping&&this.editShipping!=null){
         this.content.contractCode= this.editShipping.contractNo, //合同编号
         this.editDate= this.editShipping.sendTime  //发货时间
         this.content.conName= this.editShipping.receiptName   //联系人
         this.content.telePhone= this.editShipping.receiptPhone  //联系电话
         this.editServicesCompany= this.editShipping.logBank||"顺丰快递" //快递公司
         this.editServicesNum= this.editShipping.logNo //快递单号
         this.content.contAddress= this.editShipping.address //快递地址
         console.log(this.content.id,this.editShipping.goodsId)
        getShippingGoods(
          {
            orderId:this.content.id,
            goodsId:this.editShipping.goodsId
          },res=>{
            console.log(res)
            if(res.msgCode!=200){
              this.$message({
                type: 'info',
                message: row.msg
              });
            }else{
              var num=0;
              res.data.forEach(item=>{
                num+=item.quantity
              })
              this.totalQuantity = num;
              this.selContent=res.data;
            }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .htmlModel th {
    padding: 13px 0;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    text-align: center;
  }

  .htmlModel td {
    padding: 13px 0;
    text-align: center;
    word-break: break-all;
    white-space: normal;
  }
  input{
    height: 30px;
    padding: 10px;
    border:1px solid #999;
    border-radius: 3px;
  }
  .scale{
		transform:scale(0.65);
		-ms-transform:scale(0.65);	
		-moz-transform:scale(0.65); 
		-webkit-transform:scale(0.65); 
		-o-transform:scale(0.65); 
	}
</style>
