<template>
  <div class="advertList">
    <div style="margin-bottom:10px;">
      <el-input v-model="name" style="width:280px;" placeholder="请输入标签名称"></el-input>
      <el-button type="primary" @click="getqueryArticleTagList()" icon="el-icon-search"></el-button>
      <el-button type="primary" @click="dialogVisible=true;editStatus=false;" icon="el-icon-plus"></el-button>
    </div>

    <el-table
      row-key="catId"
      class="advertListTable"
      :data="dataList"
      style="width: 100%"
      :border="true"
      :height="tableHeight"
      v-loading="loading"
      ref="table"
    >
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              round
              @click="dialogVisible=true;editStatus=true;form=scope.row;"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" align="center"></el-table-column>
      <el-table-column
        label="标签名称"
        :show-overflow-tooltip="true"
        prop="name"
        width="240"
        align="center"
      ></el-table-column>

      <el-table-column label="标签类型" :show-overflow-tooltip="true" width="180" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type==1">标签</span>
          <span v-if="scope.row.type==2">特色词</span>
          <span v-if="scope.row.type==3">关键分词</span>
        </template>
      </el-table-column>

      <el-table-column
        label="热度"
        :show-overflow-tooltip="true"
        prop="hotNum"
        width="80"
        align="center"
      ></el-table-column>

      <el-table-column label="内容" :show-overflow-tooltip="true" prop="content" align="center"></el-table-column>

      <el-table-column
        label="创建时间"
        :show-overflow-tooltip="true"
        prop="createTime"
        width="300"
        align="center"
      ></el-table-column>
    </el-table>
    <div style="clear:both;"></div>
    <div class="block" style="text-align: right;margin-top:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[ 10, 15,20, 30]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="pageCount"
      ></el-pagination>
    </div>

    <el-dialog
      :title="editStatus?'编辑':'新增'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      top="5vh"
      width="45%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rules" style="overflow:hidden;">
        <div style="width:85%;float:left;padding-right:10px;box-sizing:border-box;">
          <el-form-item label="id" prop="id" style="display:none">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="标签名称" prop="name" style="width:59%;">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="标签类型" prop="type">
            <el-select v-model="form.type" clearable placeholder="请选择">
              <el-option label="标签" :value="1"></el-option>
              <el-option label="特色词" :value="2"></el-option>
              <el-option label="关键分词" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="form.content"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="optArticleTag">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getqueryArticleTagList,
  optArticleTag
} from "util/req/articletag/index";
export default {
  name: "articletag",
  data() {
    return {
      tableHeight: null,
      dialogVisible: false,
      editStatus: false,
      sizeType: null, //广告位置
      state: null, //广告状态
      form: {},
      dataList: [],
      loading: false, //表格数据加载样式
      currentPage: 1,
      pageSize: 15,
      pageCount: null,
      name: null,
      rules: {
        name: {
          required: true,
          trigger: "blur",
          message: "名称不能为空"
        },
        type: {
          required: true,
          trigger: "blur",
          message: "类型不能为空"
        }
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.pic = res.data.url;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccessLittle(res, file) {
      this.form.littlePic = res.data.url;
      this.imageUrlLittle = URL.createObjectURL(file.raw);
    },
    handleClose() {
      this.dialogVisible = false;
      this.form = {};
      this.imageUrl = "";
      this.imageUrlLittle = "";
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getqueryArticleTagList();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.getqueryArticleTagList();
    },
    getqueryArticleTagList() {
      var parmas = {
        pageSize: this.pageSize,
        page: this.currentPage,
        sizeType: this.sizeType,
        state: this.state,
        name: this.name
      };
      this.loading = true;
      getqueryArticleTagList(parmas, res => {
        if (res.msgCode == "200") {
          console.log("标签页的数据", res);
          res = res.data;

          this.dataList = res.list;
          this.pageCount = res.totalRows;
          setTimeout(() => {
            this.loading = false;
          }, 200);
        } else {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        }
      });
    },
    optArticleTag() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.editStatus) {
            //编辑
            optArticleTag(this.form, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.getqueryArticleTagList();
                this.handleClose();
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          } else {
            //新增
            optArticleTag(this.form, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.getqueryArticleTagList();
                this.handleClose();
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          }
        }
      });
    }
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 150;
    this.getqueryArticleTagList();
  }
};
</script>
<style lang=scss scoped>
.advertList {
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.advertListTable {
  margin-top: 30px;
}

.advertListTable /deep/ th {
  background-color: #efedf0 !important;
}

.advertListTable /deep/ ::-webkit-scrollbar {
  height: 10px;
  width: 7px;
}

.advertListTable /deep/ ::-webkit-scrollbar {
  height: 9px;
  width: 7px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  min-width: 100px;
  height: 100px;
  display: block;
}
</style>

