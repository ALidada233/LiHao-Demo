<template>
  <div class="editContactsVisible">
    <el-dialog title="修改联系人" :visible="editContactsVisible" @close="closeEditContactsVisible" :append-to-body="true">
      <div style="width:100%">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="选择公司">
              <el-select no-data-text="加载中" v-model="form.demandCustomerId" filterable @change="customerChange(form.demandCustomerId,2)"
                placeholder="选择公司">
                <el-option v-for="(item,index) in customerList" :key="index" :label="item.custCompanyName" :value="item.custCompanyName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人" v-if="form.demandCustomerId">
              <el-select v-model="form.conId" placeholder="选择联系人">
                <el-option v-for="(item,index) in form.demandCustomerRow" :key="index" :label="item.conName"
                  :value="item.conId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" style="width:70%;">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
      </div>
      <div style="text-align: right;margin-top: 20px;">
        <el-button size="small" @click="closeEditContactsVisible">取消</el-button>
        <el-button type="primary" size="small" :disabled="subBtnStatus" @click="submitHandle">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  saveDemand,
  getGoodsCategory
} from "util/req/customer/demand";
import {
  getCustomerConList
} from "util/req/customer/table";
export default {
  name:'editContacts',
  data() {
    return {
      demandCustomerRow: [],
      form: { //非标准内容表格
        demandTypeRemark: null,
        demandCustomerId: null,
        demandCustomerRow: [],
        conId: null,
        createTime: null,
        remark: null
      },
      demandCustomerId: null, //添加需求时客户ID
      conId: null,
      remark: null, //备注
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now() + 8.64e6
        }
      },
      subBtnStatus:false //提交按钮状态
    }
  },
  props: {
    editContactsVisible: {
      type: Boolean,
      default: false
    },
    customerList: {
      type: Array
    },
    demandId:{

    }
  },
  watch: {
    editContactsVisible(status) {
      if (status == false) {
        this.remark = null;
        this.conId = null;
        this.demandCustomerId = null;
        this.demandCustomerRow = [];
        this.form = { //非标准内容表格
          demandTypeRemark: null,
          demandCustomerId: null,
          demandCustomerRow: [],
          conId: null,
          createTime: null,
          remark: null
        }
      }
    }
  },
  methods: {
    customerChange(val, state) { //客户选择公司发生改变
      this.form.conId = null;
      this.conId = null;
      this.searchName = null;
      var item = this.customerList.filter(res => {
        return res.custCompanyName == val
      })
      getCustomerConList({
        custCode: item[0].custCode
      }, data => {
        if (state == 1) {
          this.demandCustomerRow = data.data.list;
        } else {
          this.form.demandCustomerRow = data.data.list
        }
      })
    },
    closeEditContactsVisible() { //关闭需求弹框
      this.$emit("closeEditContactsVisible")
    },
    submitHandle() { //添加需求提交
      var params = {
        id:this.demandId,
        optType:'upd',
        conId: this.form.conId,
        remark: this.form.remark
      }
      if (params.conId == null) {
        this.$message('请填写联系人');
        return false
      }
      this.subBtnStatus=true;
      saveDemand(params, res => { //提交表单
        if (res.msgCode == 200) {
          this.$message({
            type: 'success',
            message: res.msg
          });
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          });
        }
        this.closeEditContactsVisible();
        this.$emit('contactsRefresh')
        this.subBtnStatus=false;
      })
    }
  },
  mounted() {
   
  }
  
}
</script>
<style lang="scss" scoped> 
  
</style>