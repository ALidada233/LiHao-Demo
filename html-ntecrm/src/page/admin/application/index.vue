<template>
  <div class="advertList">
    <div style="margin-bottom:10px;">
      <el-button
        type="primary"
        @click="dialogVisible=true;editStatus=false;fileList=[]"
        icon="el-icon-plus"
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
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              round
              @click="Edit(scope.row.name);form = scope.row;pic = scope.row.pic;"
            ></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              @click="dialogVisible2=true;editStatus=true;form=scope.row;pic=scope.row.pic;"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              round
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="应用行业名称" :show-overflow-tooltip="true" prop="name" align="center"></el-table-column>
      <el-table-column label="ID" prop="id" align="center"></el-table-column>
      <el-table-column align="center" label="是否显示" width="120">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.isShow==1">是</el-tag>
          <el-tag type="danger" v-if="scope.row.isShow==0">否</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="行业宣传图" prop="pic" align="center" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.pic" style="height:30px;" />
        </template>
      </el-table-column>

      <el-table-column
        label="排序"
        :show-overflow-tooltip="true"
        prop="sort"
        width="120"
        align="center"
      ></el-table-column>

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
      :title="editStatus?'编辑应用行业':'新增应用行业'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      top="5vh"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="rules" style="overflow:hidden;">
        <div style="width:70%;float:left;padding-right:10px;box-sizing:border-box;">
          <el-form-item label="id" prop="id" style="display:none">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>

          <el-form-item label="应用行业名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input
              v-model="form.sort"
              :min="0"
              :max="99"
              type="number"
              @blur="vsSort(form.sort)"
            ></el-input>
          </el-form-item>

          <el-form-item label="是否显示" prop="isShow">
            <el-radio v-model="form.isShow" :label="0">否</el-radio>
            <el-radio v-model="form.isShow" :label="1">是</el-radio>
          </el-form-item>

          <el-form-item label="行业宣传图片" prop="pic">
            <el-upload
              class="avatar-uploader"
              action="/nte-crm/uploadImage"
              :on-preview="handlePreview"
              :on-remove="handleRemoveImage"
              :before-remove="beforeRemove"
              :limit="5"
              accept=".jpg, .png, .JPEG, .PNG"
              :on-success="handleAvatarSuccess"
              :on-exceed="handleExceed"
              :file-list="fileList"
              v-model="form.pic"
            >
              <img v-if="fileList.length>0" style="width:20%;" :src="fileList[0].url" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="optArticleIndustry">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除应用行业"
      :visible.sync="dialogVisible2"
      v-if="dialogVisible2"
      top="20vh"
      width="20%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px" style="overflow:hidden;">
        <div style="width:100%;float:left;padding-right:10px;box-sizing:border-box;">
          <el-form-item label="id" prop="id" style="display:none">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>

          <el-form-item label="应用行业名称:" prop="name">
            <span>{{form.name}}</span>
          </el-form-item>
          <el-form-item label="排序" prop="sort" style="display:none">
            <el-input v-model="form.sort" :min="0" :max="99" type="number"></el-input>
          </el-form-item>
          <el-form-item label="是否显示" prop="isShow" style="display:none">
            <el-radio v-model="form.isShow" :label="0">否</el-radio>
            <el-radio v-model="form.isShow" :label="1">是</el-radio>
          </el-form-item>
          <el-form-item label="行业宣传图片" prop="pic" style="display:none">
            <el-upload
              class="avatar-uploader"
              action="/nte-crm/uploadImage"
              :on-preview="handlePreview"
              :on-remove="handleRemoveImage"
              accept=".jpg, .png, .JPEG, .PNG"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="fileList.length>0"
                style="width:20%;"
                :src="fileList[0].url"
                :alt="fileList[0].url"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="确定要删除吗？" style="display:none" prop="delFlag">
            <el-radio v-model="form.delFlag" :label="0">是</el-radio>
            <el-radio v-model="form.delFlag" :label="1">否</el-radio>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="optArticleIndustry">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryArticleIndustryList,
  optArticleIndustry
} from "util/req/application/index";
export default {
  name: "application",
  data() {
    return {
      tableHeight: null,
      dialogVisible: false,
      dialogVisible2: false, //删除弹框
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
          message: "名称不能为空"
        },
        sort: {
          required: true,
          trigger: "blur",
          message: "排序不能为空"
        },
        isShow: {
          required: true,
          trigger: "blur",
          message: "请选择是否显示"
        }
        // pic: {
        //   required: true,
        //   trigger: "blur",
        //   message: "行业宣传图片不能为空"
        // }
      },
      pic: "",
      fileList: [] //上传图片
    };
  },
  methods: {
    Edit(name) {
      this.dialogVisible = true;
      this.editStatus = true;
      let parmas = {
        name: name
      };
      this.fileList = [];

      queryArticleIndustryList(parmas, res => {
        if (res.data.list[0].pic != "") {
          let aa = {
            name: res.data.list[0].pic,
            url: res.data.list[0].pic
          };
          this.fileList.push(aa);
        }
      });
    },
    vsSort(sort) {
      if (sort > 99) {
        this.form.sort = 99;
      }
    },
    handlePreview(file) {
      //console.log(file);
    },
    handleRemoveImage(file, fileList) {
      this.pic = null;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning("当前只允许传输一个文件");
    },
    handleAvatarSuccess(res, file) {
      this.fileList = [{ name: res.data.url, url: res.data.url }];
      this.pic = res.data.url;
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisible2 = false;
      this.form = {};
      this.imageUrl = "";
      this.imageUrlLittle = "";
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.queryArticleIndustryList();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.queryArticleIndustryList();
    },
    queryArticleIndustryList() {
      var parmas = {
        pageSize: this.pageSize,
        page: this.currentPage,
        sizeType: this.sizeType,
        state: this.state
      };
      this.loading = true;
      queryArticleIndustryList(parmas, res => {
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
    optArticleIndustry() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.editStatus) {
            //编辑
            if (this.dialogVisible2 == true) {
              //删除
              this.form.delFlag = 0;
              optArticleIndustry(this.form, res => {
                if (res.msgCode == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });

                  this.queryArticleIndustryList();
                  this.handleClose();
                } else {
                  this.$message({
                    type: "info",
                    message: res.msg
                  });
                }
              });
              return;
            }
            if (this.fileList.length == 0) {
              this.$message.warning("图片不能为空");
              return;
            }

            this.pic = this.form.pic;
            if (this.pic) {
              this.fileList = [
                {
                  name: this.form.pic,
                  url: this.form.pic
                }
              ];
            }
            optArticleIndustry(this.form, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });

                this.queryArticleIndustryList();
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
            if (this.fileList.length == 0) {
              this.$message.warning("图片不能为空");
              return;
            }
            let parmes = {
              name: this.form.name,
              isShow: this.form.isShow,
              sort: this.form.sort,
              pic: this.fileList[0].name
            };
            console.log("新增数据", parmes);
            optArticleIndustry(parmes, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.queryArticleIndustryList();
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
    deleteArticleIndustry(id) {
      optArticleIndustry(this.form, res => {
        if (res.msgCode == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.queryArticleIndustryList();
          this.handleClose();
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    }
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 150;
    this.queryArticleIndustryList();
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
