<template>
  <div class="category">
    <div style="width:65%;">
      <el-input placeholder="输入关键字进行查找" style="margin-bottom:20px;width:90%;" v-model="filterText"></el-input>
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom:20px;"
        @click="dialogVisible = true;pid=0;status=false;"
      ></el-button>
      <el-tree
        v-loading="loading"
        :data="dataList"
        ref="tree"
        node-key="id"
        updateResource
        :props="prop"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label}}</span>
          <div style="display:flex;align-items: center;justify-content: space-between;">
            <div style="margin-right:150px;">
              <!-- <span v-if="data.catNameAlias" style="color:#999;font-size:12px;">【{{data.catNameAlias}}】</span> -->
            </div>
            <el-switch
              v-model="data.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right:10px;"
              v-tip.top.dark="'是否显示'"
              @change="switchHandle(data)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
            <el-tag
              size="medium"
              style="margin-right:10px;"
              @click.native="dialogVisible = true;pid=data.catId;status=false;"
            >新增</el-tag>
            <!-- <el-tag type="warning" style="margin-right:10px;"  size="medium" @click.native="dialogVisible = true;pid=data.parentId;form=JSON.parse(JSON.stringify(data));status=true;"> -->
            <el-tag
              type="warning"
              style="margin-right:10px;"
              size="medium"
              @click="editCat(data)"
            >修改</el-tag>
          </div>
        </span>
      </el-tree>
    </div>
    <!-- 添加树形 -->
    <el-dialog
      :title="status?'编辑分类':'添加分类'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      v-if="dialogVisible"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="名称" prop="catName">
          <el-input v-model="form.catName" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="catNameAlias">
          <el-input type="textarea" v-model="form.catNameAlias" style="width:40%" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="/nte-crm/uploadImage"
            :on-preview="handlePreview"
            :on-remove="handleRemoveImage"
            :before-remove="beforeRemove"
            :limit="1"
            accept=".jpeg, .png, .jpg"
            :on-success="successUploadImage"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary" style="vertical-align: top;">点击上传</el-button>
            <img v-if="fileList.length>0" style="width:20%;" :src="fileList[0].url" />
            <div slot="tip" style="width:20%;" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input v-model="form.sortOrder" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="4"
            style="width:300px;"
            v-model="form.present"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="特点优势">
          <el-input
            type="textarea"
            :rows="4"
            style="width:300px;"
            v-model="form.feature"
            autocomplete="off"
          ></el-input>
          <span style="color:red;font-size:12px">多项逗号隔开</span>
        </el-form-item>
        <el-form-item label="应用领域">
          <el-input
            type="textarea"
            :rows="4"
            style="width:300px;"
            v-model="form.areaField"
            autocomplete="off"
          ></el-input>
          <span style="color:red;font-size:12px">多项逗号隔开</span>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.isShow">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitHandle" :disabled="btnStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryCategoryList,
  checkCategoryName,
  saveCategory
} from "util/req/category/index";
import { formatDateTime } from "util/fn/transTime";
export default {
  name: "category",
  data() {
    return {
      dataList: [],
      filterText: null,
      dialogVisible: false,
      prop: {
        label: "catName",
        id: "pid",
        type: "isShow",
        url: "url",
        children: "children",
        dscribe: "dscribe"
      },
      form: { isShow: 0 },
      rules: {
        catName: {
          required: true,
          trigger: "blur",
          message: "分类名称不能为空"
        },
        sortOrder: [
          { required: true, trigger: "blur", message: "排序不能为空" },
          {
            pattern: /^(0|([1-9]\d{0,2}))$/,
            trigger: "blur",
            message: "排序在0-999之间"
          },
          { pattern: /^[0-9]*$/, message: "请输入数值" }
        ]
      },
      formLabelWidth: "120px",
      fileList: [], //上传图片
      catImg: null,
      status: false,
      pid: null,
      btnStatus: false,
      loading: false
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.form = { isShow: 0 };
      this.fileList = [];
      this.catImg = "";
    },
    queryCategoryList() {
      var parmas = {};
      this.loading = true;
      queryCategoryList(parmas, res => {
        this.dataList = res.data;
        this.loading = false;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.catName.indexOf(value) !== -1;
    },
    editCat(row) {
      console.log(row);
      //编辑商品
      this.pid = row.parentId;
      this.status = true;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
      this.catImg = this.form.catImg;
      if (this.catImg) {
        this.fileList = [
          {
            name: this.catImg,
            url: this.catImg
          }
        ];
      }
    },
    submitHandle() {
      this.btnStatus = true;
      var parmas = {
        parentId: this.pid,
        catName: this.form.catName,
        sortOrder: this.form.sortOrder,
        isShow: this.form.isShow,
        present: this.form.present,
        feature: this.form.feature,
        areaField: this.form.areaField,
        catImg: this.catImg,
        catNameAlias: this.form.catNameAlias
      };
      if (this.status) {
        parmas.catId = this.form.catId;
      }
      console.log(parmas);
      saveCategory(parmas, res => {
        this.btnStatus = false;
        if (res.msgCode == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.handleClose();
          this.queryCategoryList();
        } else {
          this.$message({
            message: res.msg,
            type: "info"
          });
        }
      });
    },
    switchHandle(data) {
      saveCategory({ catId: data.catId, isShow: data.isShow }, res => {
        this.btnStatus = false;
        if (res.msgCode == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.queryCategoryList();
        } else {
          this.$message({
            message: res.msg,
            type: "info"
          });
        }
      });
    },
    handlePreview(file) {},

    handleRemoveImage(file, fileList) {
      this.catImg = null;
    },
    handleExceed(files, fileList) {
      this.$message.warning("当前只允许传输一个文件");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    successUploadImage(response, file, fileList) {
      console.log(response.data);
      this.fileList = [{ name: response.data.url, url: response.data.url }];
      this.catImg = response.data.url;
    }
  },
  mounted() {
    this.queryCategoryList();
  }
};
</script>
<style lang="scss" scoped>
.category {
  background: #fff;
  padding: 20px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.category /deep/ .el-tree-node {
  margin-bottom: 7px;
}
.jurisdiction /deep/ .el-tree-node__content:hover {
  background-color: #ddd;
}
.upload-demo /deep/ .el-upload {
  text-align: left;
}
</style>
