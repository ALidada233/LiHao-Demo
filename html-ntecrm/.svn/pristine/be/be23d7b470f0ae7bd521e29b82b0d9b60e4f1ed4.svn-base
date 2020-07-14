<template>
  <div class="needVisible">
    <el-dialog title="新增需求" top="1vh" :visible="needVisible" @close="closeNeedVisible" :append-to-body="true">
      <div style="width:100%">

        <el-form ref="form" :model="form[0]" label-width="120px">
          <el-form-item label="需求类型" style="display: inline-block; margin-bottom:10px;">
            <el-radio-group v-model="demandType">
              <el-radio :label="1">标准</el-radio>
              <el-radio :label="2">非标准</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-if="demandType==1">
            <el-form-item label="选择公司">
              <el-select no-data-text="加载中" v-model="demandCustomerId" filterable @change="customerChange(demandCustomerId,1)"
                placeholder="选择公司">
                <el-option v-for="(item,index) in customerList" :key="index" :label="item.custCompanyName" :value="item.custCompanyName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人" v-if="demandCustomerId">
              <el-select v-model="conId" placeholder="选择联系人">
                <el-option v-for="(item,index) in demandCustomerRow" :key="index" :label="item.conName" :value="item.conId">
                </el-option>
              </el-select>
            </el-form-item>
            <div v-for="(item,index) in form" :key="index" style="margin-bottom:10px;border-bottom:1px solid #eee;">
              <el-form-item label="产品类别">
                <el-select v-model="form[index].goodsType" placeholder="请选择">
                  <el-option v-for="(item,index) of CatNameList" :key="index" :label="item.catName" :value="item.catId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品需求">
                <el-form-item label="品牌" label-width="80px" style="display: inline-block; margin-bottom:10px;width:40%;">
                  <el-input placeholder="" v-model="form[index].model" clearable></el-input>
                </el-form-item>
                <el-form-item label="产品型号"  label-width="80px" style="display: inline-block;margin-bottom:10px;width:40%;">
                  <el-input placeholder="" style="" v-model="form[index].productName" clearable></el-input>
                </el-form-item>
                <el-form-item label="数量"  label-width="80px" style="display: inline-block;margin-bottom:10px;width:40%;">
                  <el-input placeholder="请填写数字" type="number" style="" v-model="form[index].quantity" clearable></el-input>
                </el-form-item>
                <el-button type="danger" style="margin-left:10px;" icon="el-icon-delete" circle v-if="index!=0" @click="delDemand(index)"></el-button>
              </el-form-item>
            </div>
            <div style="text-align: right;margin-right: 10px;cursor: default;color:#409EFF;">
              <span @click="addDemand">再加一条~</span>
            </div>
            <el-form-item label="上传文件类型" style="">
                <el-select v-model="fileType" placeholder="请选择文件类型">
                  <el-option label="图片" :value="1"></el-option>
                  <el-option label="文件" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片" v-if="fileType==1">
              <el-upload
                style="display: inline-block;margin-left: 10px;"
                class="upload-demo"
                action="/nte-crm/uploadImage"
                :on-preview="handlePreview"
                :on-remove="handleRemoveFile"
                :before-remove="beforeRemove"
                :limit="1"
                accept="image/*"
                :on-success="successUploadFile"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button type="success">上传图片</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
            <el-form-item label="文件" v-if="fileType==2">
              <el-upload
                style="display: inline-block;margin-left: 10px;"
                class="upload-demo"
                action="/nte-crm/uploadFile"
                :on-preview="handlePreview"
                :on-remove="handleRemoveFile"
                :before-remove="beforeRemove"
                :limit="1"
                accept=".pdf"
                :on-success="successUploadFile"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button type="success">上传文件</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
            <el-form-item label="补录时间" style="">
              <el-date-picker v-model="demandCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions" placeholder="补录历史需求">
              </el-date-picker>
              <span style="font-size:11px;color:#e4393c;">不填写默认为新增需求</span>
            </el-form-item>
            <el-form-item label="备注" style="width:70%;">
              <el-input type="textarea" v-model="remark"></el-input>
            </el-form-item>
          </div>
          <div v-if="demandType==2">
            <el-form-item label="选择公司">
              <el-select no-data-text="加载中" v-model="typeTwoFrom.demandCustomerId" filterable @change="customerChange(typeTwoFrom.demandCustomerId,2)"
                placeholder="选择公司">
                <el-option v-for="(item,index) in customerList" :key="index" :label="item.custCompanyName" :value="item.custCompanyName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人" v-if="typeTwoFrom.demandCustomerId">
              <el-select v-model="typeTwoFrom.conId" placeholder="选择联系人">
                <el-option v-for="(item,index) in typeTwoFrom.demandCustomerRow" :key="index" :label="item.conName"
                  :value="item.conId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="需求填写" style="width:90%;">
              <el-input type="textarea" v-model="typeTwoFrom.demandTypeRemark"></el-input>
            </el-form-item>
            <el-form-item label="上传文件类型" style="">
                <el-select v-model="fileType" placeholder="请选择文件类型">
                  <el-option label="图片" :value="1"></el-option>
                  <el-option label="文件" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片" v-if="fileType==1">
              <el-upload
                style="display: inline-block;margin-left: 10px;"
                class="upload-demo"
                action="/nte-crm/uploadImage"
                :on-preview="handlePreview"
                :on-remove="handleRemoveFile"
                :before-remove="beforeRemove"
                :limit="1"
                accept="image/*"
                :on-success="successUploadFile"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button type="success">上传图片</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
            <el-form-item label="文件" v-if="fileType==2">
              <el-upload
                style="display: inline-block;margin-left: 10px;"
                class="upload-demo"
                action="/nte-crm/uploadFile"
                :on-preview="handlePreview"
                :on-remove="handleRemoveFile"
                :before-remove="beforeRemove"
                :limit="1"
                accept=".pdf"
                :on-success="successUploadFile"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button type="success">上传文件</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
            <el-form-item label="补录时间" style="">
              <el-date-picker v-model="typeTwoFrom.createTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions" placeholder="补录历史需求">
              </el-date-picker>
              <span style="font-size:11px;color:#e4393c;">不填写默认为新增需求</span>
            </el-form-item>
            <el-form-item label="备注" style="width:70%;">
              <el-input type="textarea" v-model="typeTwoFrom.remark"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div style="text-align: right;margin-top: 20px;">
        <el-button size="small" @click="closeNeedVisible">取消</el-button>
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
    name: "newDemand",
    data() {
      return {
        form: [{
          model: null,
          productName: null,
          goodsType: null,
          quantity: null
        }],
        demandCustomerRow: [],
        typeTwoFrom: { //非标准内容表格
          demandTypeRemark: null,
          demandCustomerId: null,
          demandCustomerRow: [],
          conId: null,
          createTime: null,
          remark: null
        },
        demandType: 1, //需求类型
        demandCustomerId: null, //添加需求时客户ID
        conId: null,
        remark: null, //备注
        CatNameList: null, //产品类型列表
        demandCreateTime: null,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() >= Date.now() + 8.64e6
          }
        },
        fileType:1,      //上传文件类型
        fileList: [],
        subBtnStatus:false //提交按钮状态
      }
    },
    props: {
      needVisible: {
        type: Boolean,
        default: false
      },
      customerList: { 
        type: Array
      }
    },
    watch: {
      fileType(val){
        this.fileList=[]
      },
      needVisible(status) {
        if (status == false) {
          this.form = [{
            model: null,
            productName: null,
            goodsType: null,
            quantity: null
          }];
          this.demandType = 1;
          this.deliveryTime = null;
          this.remark = null;
          this.conId = null;
          this.demandCustomerId = null;
          this.demandCustomerRow = [];
          this.typeTwoFrom = { //非标准内容表格
            demandTypeRemark: null,
            demandCustomerId: null,
            demandCustomerRow: [],
            conId: null,
            createTime: null,
            remark: null
          }
          this.demandCreateTime = null;
          this.fileList=[];
        }
      }
    },
    methods: {
      handleRemoveFile(file) { 
          this.file=null;
          this.fileList=[];
      },
      handlePreview(file) {
          console.log(file);
      },
      handleExceed(files) {
          this.$message.warning('当前只允许传输一个文件');
      },
      beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
      },
      successUploadFile(response, file) {
          this.fileList=[{name:file.name,url:response.data.url}]
      },
      customerChange(val, state) { //客户选择公司发生改变
        this.typeTwoFrom.conId = null;
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
            this.typeTwoFrom.demandCustomerRow = data.data.list
          }
        })
      },
      getTypeList() { //查询产品类别
        getGoodsCategory(res => {
          this.CatNameList = res.data.list;
        })
      },
      addDemand() { //添加一条商品
        var params = {
          model: null,
          productName: null,
          goodsType: null,
          quantity: null
        }
        this.form.push(params);
      },
      delDemand(index) { //删除一条商品
        this.form.splice(index, 1);
      },
      closeNeedVisible() { //关闭需求弹框
        this.$emit("closeNeedVisible")
      },
      submitHandle() { //添加需求提交
        var params;
        if (this.demandType == 1) {
          //检验填写内容是否为空
          var subStatus = false;
          for (var i = 0; i < this.form.length; i++) {
            var item = this.form[i];
            for (var key in item) {
              if (item[key] == null || item[key] == '') {
                subStatus = false;
              } else {
                subStatus = true;
              }
            }
          }

          if (subStatus == false) {
            this.$message('请填写完整的内容');
            return false
          }
          params = {
            conId: this.conId,
            type: this.demandType,
            remark: this.remark,
            demandGoodsList: this.form,
            createTime: this.demandCreateTime
          }
        } else {
          var typeTwoStatus = false;
          for (var key in this.typeTwoFrom) {
            if (key != 'remark' && key != 'createTime') {
              if (this.typeTwoFrom[key] == null) {
                typeTwoStatus = false
                this.$message('请填写完整的内容');
                return
              } else {
                typeTwoStatus = true
              }
            } else {
              typeTwoStatus = true
            }
          }
          if (typeTwoStatus == false) {
            this.$message('请填写完整的内容');
            return false
          }
          params = {
            conId: this.typeTwoFrom.conId,
            type: this.demandType,
            demandContent: this.typeTwoFrom.demandTypeRemark,
            createTime: this.typeTwoFrom.createTime,
            remark: this.typeTwoFrom.remark
          }
        }
        if (params.conId == null) {
          this.$message('请填写联系人');
          return false
        }
        if(this.fileList.length>0){
          params.demandFile=this.fileList[0].url;
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
          this.closeNeedVisible();
          this.$emit("sucAddDemand");
          this.subBtnStatus=false;
        })
      }
    },
    mounted() {
      this.getTypeList();
      if (this.$route.query.cid) {
        //去掉又客户需求跳转进来的需求带公司名称
        this.demandCustomerId = this.$route.query.cid;
        this.typeTwoFrom.demandCustomerId = this.$route.query.cid;
        var custCode = this.$route.query.custCode;
        getCustomerConList({
          custCode: custCode
        }, data => {
          this.demandCustomerRow = data.data.list;
          this.typeTwoFrom.demandCustomerRow = data.data.list;
        })
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
