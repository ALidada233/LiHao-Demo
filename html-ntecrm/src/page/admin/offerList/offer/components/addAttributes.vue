<template>
  <!-- 修改商品的量程参数 -->
    <el-dialog title="新增商品属性" :visible="rangeVisible" :before-close="closeHandle" v-if="rangeVisible" :append-to-body="true" width="50%">

      <el-form :model="typeForm" ref="typeFormTwo" :rules="typeFormRules">
        <el-form-item label="量程" label-width="120px" prop="range">
          <el-input v-model="typeForm.range" style="width:50%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="精度" label-width="120px" prop="accuracy">
          <el-input v-model="typeForm.accuracy" style="width:50%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="输出信号" label-width="120px" prop="outputSignal">
          <el-input v-model="typeForm.outputSignal" style="width:50%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeHandle">取 消</el-button>
        <el-button type="primary" @click="rangeComfirm">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import {
  saveGoodsModel
} from "util/req/goods/index";
export default {
  name:'addAttributes',
  data(){
    return{
        typeForm: { //修改量程参数
          range: null,
          accuracy: null,
          outputSignal: null,
          plugPrice: null,
          price: 0
        },
        typeFormRules: {
          range: {
            required: true,
            trigger: 'blur',
            message: "量程不能为空"
          },
          accuracy: {
            required: true,
            trigger: 'blur',
            message: "精度不能为空"
          },
          outputSignal: {
            required: true,
            trigger: 'blur',
            message: "输出信号不能为空"
          },
          price: {
            required: true,
            trigger: 'blur',
            message: "不能为空"
          }
        },
        rangeVisibles:this.rangeVisible
    }
  },
  props:{
    rangeVisible:{
      type:Boolean
    },
    goodsNo:{
      type:String
    }
  },
  watch:{
    rangeVisible(status) {
      if (status == false) {
        this.typeForm = {
          range: null,
          accuracy: null,
          outputSignal: null,
          plugKey: null,
          plugPrice: null,
          sname: null,
          price: 0
        }
      }
    },
  },
  methods:{
    closeHandle(){
      this.$emit('closeRangeHandle')
    },
    rangeComfirm() {
      this.typeForm.delFlag = 2;
      this.typeForm.indexId = 1;
      this.typeForm.goodsNo=this.goodsNo;
      this.$refs.typeFormTwo.validate((valid) => {
        if (valid) {
          saveGoodsModel(this.typeForm, res => {
            if (res.msgCode == 200) {
              this.$message({
                type: 'success',
                message: res.msg
              });
             this.closeHandle();
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
<style>
  
</style>