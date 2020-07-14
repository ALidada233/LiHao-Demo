<template>
  <!-- 申请低折扣 -->
    <el-dialog title="折扣申请" :visible.sync="lowVisible" :append-to-body="true" :before-close="handleClose">
      <div style="width:100%">
        <el-form ref="discountsApplication" :model="discountsApplication" label-width="150px" :rules="disApplication">
          <div>
            <el-form-item label="商品信息">
              <span v-html="discountsApplication.goodsName"></span>
            </el-form-item>
            <el-form-item label="原折扣率">
              <span>{{discountsApplication.orgDiscount||0}} %</span>
            </el-form-item>
            <el-form-item label="申请折扣">
              <span>{{discountsApplication.applyDiscount}}</span> %
            </el-form-item>
            <el-form-item label="原价">
              <span>￥ {{discountsApplication.orgMoney}}</span> 
            </el-form-item>
            <el-form-item label="申请价格">
              <span>￥ {{discountsApplication.applyMoney}}</span> 
            </el-form-item>
            <el-form-item label="备注（申请原因）" prop="reason">
              <el-input type="textarea" :rows="2" style="width:80%;" placeholder="请输入内容"
                v-model="discountsApplication.reason">
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <div style="border-bottom:1px solid #E4E7ED;"></div>
      </div>
      <div style="text-align: right;margin-top: 20px;">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" @click="disApplicationHandle">确定</el-button>
      </div>
    </el-dialog>
</template>
<script>
  import {
    saveDiscountApply
  } from "util/req/customer/demand";
  export default {
    name: 'discountApplication',
    data() {
      return {
        followAppList: [], //折扣申请日志
        disApplication: {
          applyDiscount: [{
              required: true,
              trigger: 'blur',
              message: "数量不能为空且为数字"
            },
            {
              pattern: /^[1-9]\d*(\.\d+)?$/,
              message: "只能输入大于0的数字"
            },
          ],
          reason:{
            required: true,
            trigger: 'blur',
            message: "申请原因不能为空"
          }
        },
      }
    },
    props:{
      lowVisible:{
        type:Boolean
      },
      discountsApplication:{
        type:Object
      },
      demandId:{
        
      }
    },
    watch: {
      
    },
    methods: {
      handleClose(){
        this.$emit('closeLowHandle')
      },
      disApplicationHandle() { //确认提交申请折扣
        this.discountsApplication.demandId = this.demandId;
        this.discountsApplication.applyDiscount=Math.floor((this.discountsApplication.applyMoney/this.discountsApplication.orgMoney)* 10000)/100;
        this.$refs.discountsApplication.validate(valid => {
          if (valid) {
            saveDiscountApply(this.discountsApplication, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: 'success',
                  message: res.msg
                });
                this.handleClose();
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                });
              }
            })
          }
        })
      },
    }
  }

</script>
