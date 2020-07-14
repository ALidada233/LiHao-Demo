<template>
  <div class="advertList">
    <div style="margin-bottom:10px;">
      <el-select v-model="sizeType" clearable placeholder="请选择">
        <el-option :value="1" label="首页banner图"></el-option>
        <el-option :value="2" label="新品推广"></el-option>
        <el-option :value="3" label="友情链接"></el-option>
      </el-select>
      <el-select v-model="state" clearable placeholder="请选择状态">
        <el-option label="有效" :value="1"></el-option>
        <el-option label="无效" :value="0"></el-option>
      </el-select>
      <el-button type="primary" @click="getKindexListPage()" icon="el-icon-search"></el-button>
      <el-button type="primary" @click="dialogVisible=true;editStatus=false;" icon="el-icon-plus"></el-button>
      <el-button
        @click="sizeType=null;state=null;currentPage=1;getKindexListPage();"
        icon="el-icon-refresh"
      ></el-button>
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
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              round
              @click="dialogVisible=true;editStatus=true;form=scope.row;imageUrl=scope.row.pic;imageUrlLittle=scope.row.littlePic;"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteKindex(scope.row.id)"
              round
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="广告名称"
        :show-overflow-tooltip="true"
        prop="name"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="跳转地址"
        :show-overflow-tooltip="true"
        prop="url"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <a :href="scope.row.url" target="blank" style="color:#409EFF;">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column label="图片" prop="content" align="center" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.pic" style="height:30px;" alt />
        </template>
      </el-table-column>
      <el-table-column label="广告类型" :show-overflow-tooltip="true" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.advType==1">纯文字</span>
          <span v-if="scope.row.advType==2">url+图片</span>
        </template>
      </el-table-column>
      <el-table-column label="广告位置" :show-overflow-tooltip="true" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sizeType==1">首页banner图</span>
          <span v-if="scope.row.sizeType==2">新品推广</span>
          <span v-if="scope.row.sizeType==3">友情链接</span>
        </template>
      </el-table-column>
      <el-table-column
        label="排序"
        :show-overflow-tooltip="true"
        prop="advOrder"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="状态" :show-overflow-tooltip="true" width="180" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.state==0">无效</span>
          <span v-if="scope.row.state==1">有效</span>
        </template>
      </el-table-column>
      <el-table-column label="广告内容" :show-overflow-tooltip="true" prop="content" align="center"></el-table-column>
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
      width="80%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rules" style="overflow:hidden;">
        <div style="width:50%;float:left;padding-right:10px;box-sizing:border-box;">
          <el-form-item label="广告名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="位置" prop="sizeType">
            <el-select v-model="form.sizeType" clearable placeholder="请选择">
              <el-option label="首页banner图 " :value="1"></el-option>
              <el-option label="新品推广" :value="2"></el-option>
              <el-option label="友情链接" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告类型 " prop="advType">
            <el-select v-model="form.advType" clearable placeholder="请选择">
              <el-option label="纯文字 " :value="1"></el-option>
              <el-option label="url+图片 " :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告内容">
            <el-input v-model="form.content" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="advOrder">
            <el-input v-model="form.advOrder" :min="0" :max="1000" type="number"></el-input>
          </el-form-item>
          <el-form-item label="状态 " prop="advType">
            <el-select v-model="form.state" clearable placeholder="请选择">
              <el-option label="有效 " :value="1"></el-option>
              <el-option label="无效" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="width:50%;float:left;">
          <el-form-item label="广告跳转url" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="广告图片" prop="pic">
            <el-upload
              class="avatar-uploader"
              action="/nte-crm/uploadImage"
              accept=".jpg, .png, .JPEG, .PNG"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="缩略图跳转url">
            <el-input v-model="form.littleUrl"></el-input>
          </el-form-item>
          <el-form-item label="缩略图图片">
            <el-upload
              class="avatar-uploader"
              action="/nte-crm/uploadImage"
              accept=".jpg, .png, .JPEG, .PNG"
              :show-file-list="false"
              :on-success="handleAvatarSuccessLittle"
            >
              <img v-if="imageUrlLittle" :src="imageUrlLittle" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="关联位置标签" prop="advFlag" v-if="form.advType==4">
            <el-input v-model="form.advFlag" style="width:200px;"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="updateKindex">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getKindexListPage,
  updateKindex,
  deleteKindex,
  addKindex
} from "util/req/kindex/index";
export default {
  name: "advertList",
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
      rules: {
        name: {
          required: true,
          trigger: "blur",
          message: "广告名称不能为空"
        },
        sizeType: {
          required: true,
          trigger: "blur",
          message: "广告位置不能为空"
        },
        advType: {
          required: true,
          trigger: "blur",
          message: "广告类型不能为空"
        },
        state: {
          required: true,
          trigger: "blur",
          message: "广告状态不能为空"
        },
        advOrder: {
          required: true,
          trigger: "blur",
          message: "广告排序不能为空"
        },
        url: {
          required: true,
          trigger: "blur",
          message: "广告跳转地址不能为空"
        },
        pic: {
          required: true,
          trigger: "blur",
          message: "广告图片不能为空"
        },
        littleUrl: {
          required: true,
          trigger: "blur",
          message: "缩略图片不能为空"
        }
        // advFlag: {
        //   required: true,
        //   trigger: "blur",
        //   message: "售卖关联标签不能为空"
        // }
      },
      imageUrl: "",
      imageUrlLittle: ""
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
      this.getKindexListPage();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.getKindexListPage();
    },
    getKindexListPage() {
      var parmas = {
        pageSize: this.pageSize,
        page: this.currentPage,
        sizeType: this.sizeType,
        state: this.state
      };
      this.loading = true;
      getKindexListPage(parmas, res => {
        if (res.msgCode == "200") {
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
    updateKindex() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.editStatus) {
            //编辑
            updateKindex(this.form, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.getKindexListPage();
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
            addKindex(this.form, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.getKindexListPage();
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
    },
    //删除标签
    deleteKindex(id) {
      this.$confirm("此操作将删除该条广告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteKindex(
            {
              id
            },
            res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.getKindexListPage();
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 150;
    this.getKindexListPage();
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
