<template>
  <div class="know">
    <div>
      <el-button type="primary" @click="addType(null,false)" icon="el-icon-plus">添加类目</el-button>
      <el-button @click="queryArticleTypeList()" icon="el-icon-refresh"></el-button>
    </div>
    <div class="knowTable">
      <el-table
        row-key="id"
        :data="dataList"
        style="width: 100%"
        :border="true"
        :height="tableHeight"
        v-loading="loading"
        ref="table"
      >
        <el-table-column prop="dscribe" align="center" label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="添加子分类" placement="top">
              <el-button
                type="info"
                round
                size="mini"
                @click="addType(scope.row,false);editState=false;"
                icon="el-icon-plus"
              ></el-button>
            </el-tooltip>
            <el-button
              type="primary"
              round
              size="mini"
              @click="addType(scope.row,true);editState=true;vsclassname=false"
              icon="el-icon-edit"
            ></el-button>
            <!-- <el-button type="danger"  @click="deleteKnowClassify(scope.row.id)" round size="mini" icon="el-icon-delete"></el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="分类名称" prop="name" align="center"></el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column prop="isShow" label="是否显示" align="center">
          <!-- <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="isShowHandle(scope.row)"
            ></el-switch>
          </template>-->
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isShow==1">是</el-tag>
            <el-tag type="danger" v-if="scope.row.isShow==0">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="context" label="内容" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      </el-table>
    </div>
    <!-- 添加分类 -->
    <el-dialog
      :title="editState?'编辑分类':'新增分类'"
      :visible.sync="typeVisible"
      width="35%"
      v-if="typeVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" style="width:200px;" @blur="vsclassname=true"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" style="width:200px;" @blur="vsSort(form.sort)"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.isShow">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容" prop="context">
          <el-input type="textarea" v-model="form.context" :rows="8" style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </span>
    </el-dialog>
    <!--分页-->
    <!-- <div class="clearPa edit">
      <div class="block" style="float: right;margin-top:10px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-sizes="[5, 10, 15, 30]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="pageCount">
        </el-pagination>
      </div>
    </div>-->
  </div>
</template>
<script type="text/javascript">
import {
  queryArticleTypeList,
  optArticleType,
  checkTypeName
} from "util/req/articleclass/index";

export default {
  name: "knowType",
  data() {
    return {
      tableHeight: null,
      dataList: [],
      loading: false, //表格数据加载样式
      currentId: null,
      editButton: true, //编辑按钮状态
      editShow: false,
      editState: false, //编辑&新增状态
      accreditShow: false, //授权状态
      loading: false,
      currentPage: 1,
      pageSize: 20,
      pageCount: null,
      typeVisible: false,
      form: {
        isShow: 1
      },
      state: 1, //1.新增父级 2.子级新增 3.修改
      rules: {
        name: {
          required: true,
          trigger: "blur",
          message: "分类名称不能为空"
        },
        sort: {
          required: true,
          trigger: "blur",
          message: "排序不能为空"
        }
      },
      vsclassname: false
    };
  },
  watch: {
    typeVisible(state) {
      if (state) {
      } else {
      }
    }
  },
  methods: {
    vsSort(sort) {
      if (sort > 99) {
        this.form.sort = 99;
      }
    },
    handleClose() {
      this.typeVisible = false;
      this.form = { isShow: 1 };
      this.state = 1;
      this.queryArticleTypeList();
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.queryArticleTypeList();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.queryArticleTypeList();
    },
    queryArticleTypeList() {
      //查询列表
      var parmas = {
        pageSize: this.pageSize,
        page: this.currentPage
      };
      this.loading = true;
      queryArticleTypeList(parmas, res => {
        if (res.msgCode == "200") {
          console.log("分类页的数据", res);
          this.dataList = res.data;
          console.log("分类页的datalist", this.dataList);
          this.pageCount = res.pageCount;
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
    addType(row, state) {
      this.typeVisible = true;
      if (!state) {
        //新增
        if (row) {
          //新增子类
          this.form.parentId = row.id; //父级id
          this.form.grade = ++row.grade; //是子类级别类型+1
          this.form.isParent = 0; //是否是父级 1是 0否
          this.state = 2;
        } else {
          //第一级
          this.form.parentId = 0; //父级id
          this.form.grade = 1; //级别类型
          this.form.isParent = 1; //是否是父级 1是 0否
          this.state = 1;
        }
      } else {
        //修改
        this.form = row;
        this.state = 3;
      }
    },
    //新增修改分类
    submitHandle() {
      var a = {
        id: this.form.id,
        name: this.form.name,
        parentId: this.form.parentId,
        sort: this.form.sort,
        isShow: this.form.isShow,
        isParent: this.form.isParent,
        grade: this.form.grade,
        context: this.form.context
      };
      let parmas = a;

      var b = {
        name: this.form.name
      };

      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.state == 3) {
            //修改
            if (this.vsclassname == false) {
              this.updateKnowClassify(parmas);
              return;
            }
            checkTypeName(b, res => {
              //先验证名称是否存在
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.updateKnowClassify(parmas);
              } else {
                this.$message({
                  type: "error",
                  message: res.msg
                });
              }
            });
          } else {
            checkTypeName(b, res => {
              //先验证名称是否存在
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                optArticleType(parmas, res => {
                  //新增
                  if (res.msgCode == 200) {
                    this.$message({
                      type: "success",
                      message: res.msg
                    });
                    this.handleClose();
                    this.queryArticleTypeList();
                  } else {
                    this.$message({
                      type: "error",
                      message: res.msg
                    });
                  }
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.msg
                });
              }
            });
          }
        }
      });
    },

    //修改
    updateKnowClassify(parmas) {
      // var a = { id: 110, name: "修改修改" };
      // parmas = a;
      optArticleType(parmas, res => {
        if (res.msgCode == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.handleClose();
          this.queryArticleTypeList();
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    //打开关闭显示
    isShowHandle(row) {
      this.updateKnowClassify(row);
    }
  },
  components: {},
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 150;
    this.queryArticleTypeList();
  }
};
</script>
<style lang=scss scoped>
.know {
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.knowTable {
  margin-top: 30px;
}

.knowTable /deep/ th {
  background-color: #efedf0 !important;
}
.knowTable /deep/ .el-table__row--level-1 {
  background: #f7f7f7;
}
.knowTable /deep/ .el-table__row--level-2 {
  background: rgb(238, 245, 225);
}
</style>
