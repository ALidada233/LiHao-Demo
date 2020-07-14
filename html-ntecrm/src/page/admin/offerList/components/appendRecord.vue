<template>
  <el-dialog title="添加跟进记录" :visible="recordVisible" @close="closeVisible" :append-to-body="true" width="50%">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="上传文件类型" style="">
        <el-select v-model="fileType" placeholder="请选择文件类型">
          <el-option label="图片" :value="1"></el-option>
          <el-option label="文件" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片" v-if="fileType==1">
        <el-upload style="display: inline-block;margin-left: 10px;" class="upload-demo" action="/nte-crm/uploadImage"
          :on-preview="handlePreview" :on-remove="handleRemoveFile" :before-remove="beforeRemove" :limit="1" accept="image/*"
          :on-success="successUploadFile" :on-exceed="handleExceed" :file-list="fileList">
          <el-button type="success">上传图片</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="文件" v-if="fileType==2">
        <el-upload style="display: inline-block;margin-left: 10px;" class="upload-demo" action="/nte-crm/uploadFile"
          :on-preview="handlePreview" :on-remove="handleRemoveFile" :before-remove="beforeRemove" :limit="1" accept=".pdf"
          :on-success="successUploadFile" :on-exceed="handleExceed" :file-list="fileList">
          <el-button type="success">上传文件</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="置顶" v-if='isShow'>
        <el-radio-group v-model="isTop">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="跟进记录">
        <el-input type="textarea" v-model="remarkText" style="width:80%;"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisible">取 消</el-button>
      <el-button type="primary" @click="addFollowList">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {
    saveDemandOptLog
  } from "util/req/customer/demand";
  export default {
    name: "appendRecord",
    props: {
      recordVisible: {
        type: Boolean
      },
      followListId: {

      },
      id:{
          type:Number,
          default:null
      }
    },
    watch:{
        fileType(val){
            this.fileList=[]
        }
    },
    data() {
      return {
        remarkText: null, //新增跟进记录文本信息
        form: {},
        fileList: [],
        fileType: 1,
        optFile: null,
        isTop: 0,
        isShow: true,
        rules:{
            remarkText:{required: true,trigger: 'blur',message: "回复信息不能为空"}
        }
      }
    },
    methods: {
      handleRemoveFile(file) {
        this.file = null;
        this.fileList = [];
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
        this.fileList = [{
          name: file.name,
          url: response.data.url
        }]
      },
      closeVisible() {
        this.$emit('closeVisible')
      },
      addFollowList() { //新增跟进记录			
        var params = {
          demandId: this.followListId,
          remark: this.remarkText
        }
        if(this.fileList.length>0){
            params.optFile=this.fileList[0].url;
        }
        if (sessionStorage.getItem("buyer_department")==null && sessionStorage.getItem("technical_department")==null) {
          params.isTop=this.isTop;
        }
        if(this.id){
          params.pId=this.id;
        }
        if(!this.remarkText){
            this.$message({
              type: 'info',
              message: '跟进记录内容不能为空'
            });
            return
        }
        saveDemandOptLog(params, res => {
          if (res.msgCode == '200') {
            this.$emit('closeVisible')
            this.$message({
              type: 'success',
              message: '添加记录成功'
            });
            this.closeHandle();
            this.closeVisible();
          } else {
            this.$message({
              type: 'info',
              message: '添加记录失败'
            });
          }
          
        })
      },
      closeHandle(){
          this.remarkText=null;
          this.isTop=0;
          this.fileList=[];
          this.fileType=1;
      }
    },
    components:{
       
    },
    mounted(){
        if(sessionStorage.getItem("buyer_department")||sessionStorage.getItem("technical_department")){
            this.isShow=false;
        }
    }
  }

</script>
<style scoped>

</style>
