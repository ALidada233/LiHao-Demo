<template>
  <div class="know">
    <div>
      <el-input v-model="title" style="width:280px;" clearable placeholder="请输入内容"></el-input>
      <el-cascader
        style="width:180px;"
        :options="options"
        v-model="id"
        placeholder="请选择文章分类"
        change-on-select
        :props="props"
      ></el-cascader>

      <el-select style="width:150px;" v-model="auditStatus" clearable placeholder="请选择文章状态">
        <el-option label="下架" :value="0"></el-option>
        <el-option label="上架" :value="1"></el-option>
      </el-select>

      <el-select style="width:150px;" v-model="isTop" clearable placeholder="文章是否置顶">
        <el-option label="是" :value="1"></el-option>
        <el-option label="否" :value="0"></el-option>
      </el-select>

      <el-select style="width:150px;" v-model="type" clearable placeholder="请选择文章类型">
        <el-option label="资讯" :value="1"></el-option>
        <el-option label="技术" :value="2"></el-option>
      </el-select>

      <el-button type="primary" @click="getPageList()" icon="el-icon-search"></el-button>
      <el-button @click="refreshHandle()" icon="el-icon-refresh"></el-button>
      <el-button type="primary" @click="detailVisible=true;" icon="el-icon-plus"></el-button>
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
        <!-- <el-table-column type="selection" align="center" width="55"></el-table-column> -->
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                round
                @click="showUpdAeticle(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteArticle(scope.row.id)"
                round
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id" width="80" align="center"></el-table-column>
        <el-table-column label="排序" prop="sortOrder" width="80" align="center"></el-table-column>
        <el-table-column
          label="文章名称"
          :show-overflow-tooltip="true"
          prop="title"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <div style="color:#66b1ff;">
              <a
                style="color:#66b1ff;"
                v-if="scope.row.outLink"
                :href="'http://'+scope.row.outLink"
                target="blank"
              >{{scope.row.title}}</a>
              <a style="color:#66b1ff;" v-else href="/" target="blank">{{scope.row.title}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="文章简介"
          :show-overflow-tooltip="true"
          prop="introduct"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="图片" width="100" align="center">
          <template slot-scope="scope">
            <div style="text-align:center;">
              <img :src="scope.row.thumbUrl" style="width:45px;" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="typeId" label="文章分类"></el-table-column>
        <el-table-column align="center" prop="typeName" label="分类名称" width="110"></el-table-column>
        <el-table-column align="center" prop="ptypeName" label="父分类名称" width="110"></el-table-column>
        <el-table-column align="center" prop="tag" label="标签" width="110"></el-table-column>
        <el-table-column prop="auditStatus" label="上下架" align="center" width="100">
          <template slot-scope="scope">
            <el-switch
              @change="changeHandle(scope.row.id,scope.row.auditStatus)"
              v-model="scope.row.auditStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column prop="isTop" label="是否置顶" align="center" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isTop"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="changeHandle2(scope.row.id,scope.row.isTop)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="类型" prop="type" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">资讯</span>
            <span v-if="scope.row.type==2">技术</span>
          </template>
        </el-table-column>

        <el-table-column label="创建类型" prop="createType" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.createType==0">平台</span>
            <span v-if="scope.row.createType==1">供应商</span>
            <span v-if="scope.row.createType==2">用户</span>
          </template>
        </el-table-column>

        <el-table-column label="创建账户" prop="userName" width="120" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180" align="center"></el-table-column>
      </el-table>
    </div>
    <!-- 添加分类 -->
    <el-dialog
      title="添加分类"
      :visible.sync="typeVisible"
      width="30%"
      v-if="typeVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="分类名称" prop="catName">
          <el-input v-model="form.catName" style="width:190px;"></el-input>
        </el-form-item>
        <el-form-item label="文章排序" prop="sortOrder">
          <el-input v-model="form.sortOrder" style="width:20%"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="ktype">
          <el-select v-model="form.ktype" placeholder="请选择活动区域">
            <el-option label="文章" :value="1"></el-option>
            <el-option label="品牌" :value="2"></el-option>
            <el-option label="百科文库" :value="3"></el-option>
            <el-option label="帮助中心" :value="4"></el-option>
            <el-option label="公告" :value="5"></el-option>
            <el-option label="关于我们" :value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否前台显示">
          <el-radio-group v-model="form.isShow">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </span>
    </el-dialog>
    <!--分页-->
    <div class="clearPa edit">
      <div style="float:left;margin-top:10px;">
        <!-- <el-button type="primary" size="medium" @click="batchOperation(1)">批量置顶</el-button>
        <el-button type="info" size="medium" @click="batchOperation(2)">取消置顶</el-button>
        <el-button type="primary" size="medium" @click="batchOperation(4)">批量上架</el-button>
        <el-button type="primary" size="medium" @click="batchOperation(3)">下架</el-button>-->
      </div>
      <div class="block" style="float: right;margin-top:10px;">
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
    </div>
    <transition name="fade-transform" mode="out-in">
      <detail :editData="editData" :editState="editState" class="detail" v-if="detailVisible"></detail>
    </transition>
  </div>
</template>
<script>
import {
  getPageList,
  deleteArticle,
  upDownArticle,
  showUpdAeticle,
  knowClassifyList,
  startUps,
  getArtList,
  searchGoodList
} from "util/req/articlelist/index";
export default {
  name: "articlelist",
  data() {
    return {
      id: null,
      tableHeight: null,
      multipleSelection: [], //表格多选
      commentsData: [], //评论数据
      dialogVisible: false,
      selId: null, //选中文章id
      editData: null,
      editState: false,
      dataList: [],
      loading: false, //表格数据加载样式
      editButton: true, //编辑按钮状态
      loading: false,
      currentPage: 1,
      pageSize: 15,
      pageCount: null,
      typeVisible: false,
      form: {
        isShow: 1
      },
      props: {
        value: "id",
        label: "name",
        children: "children"
      },
      options: [], //文章分类
      kcIdList: [], //获取文章下级属性列表
      ptId: null, //列表参数
      title: null,
      typeId: null,
      auditStatus: null, //状态
      createType: null,
      type: null, //类型
      isTop: null, //是否置顶 0否1是
      rules: {
        catName: {
          required: true,
          trigger: "blur",
          message: "分类名称不能为空"
        },
        sortOrder: {
          required: true,
          trigger: "blur",
          message: "排序不能为空"
        },
        ktype: {
          required: true,
          trigger: "blur",
          message: "分类不能为空"
        }
      },
      detailVisible: false //新增编辑文章页面
    };
  },
  watch: {
    //获取当前路由的变化 ptId 区分文章类型
    $route(to, from) {
      this.ptId = to.query.ptId;
      this.getPageList(); //文章列表
    },
    id(arr) {
      //获取分类的当前id与父id
      let copyArr = JSON.parse(JSON.stringify(arr));
      console.log("分类当前id和父id", copyArr);
      this.typeId = copyArr.pop();
      this.ptId = copyArr.pop() || this.typeId;
    },
    detailVisible(state) {
      if (state) {
      } else {
      }
    }
  },
  methods: {
    handleClose() {
      this.typeVisible = false;
    },
    //获取文章分类，级联
    knowClassifyList() {
      knowClassifyList({}, res => {
        this.options = res.data;
        console.log("文章分类", this.options);
      });
    },
    commentsHandleClose() {
      this.dialogVisible = false;
      this.selId = null;
      this.commentsData = [];
    },
    refreshHandle() {
      //刷新
      this.title = null;
      this.ptId = null;
      this.typeId = null;
      this.auditStatus = null;
      this.createType = null;
      this.isTop = null;
      this.type = null;
      this.id = null;
      this.getPageList(); //文章列表
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getPageList(); //文章列表
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.getPageList(); //文章列表
      // this.getCatSon();
    },
    getPageList() {
      //查询文章列表
      var parmas = {
        pageSize: this.pageSize,
        page: this.currentPage,
        title: this.title, //搜索条件 标题和简介
        typeId: this.typeId, //分类id
        ptId: this.ptId, //分类id的父id
        auditStatus: this.auditStatus, //是否下架 状态
        isTop: this.isTop, //是否置顶
        type: this.type //文章类型
      };
      this.loading = true;
      console.log("查询参数", parmas);
      getPageList(parmas, res => {
        if (res.msgCode == "200") {
          console.log("文章列表", res);
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
    // getCatSon() {
    //   getCatSon({ pid: this.ptId }, res => {
    //     this.typeIdList = res.data;
    //   });
    // },
    //删除文章
    deleteArticle(id) {
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteArticle({ id }, res => {
            if (res.msgCode == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getPageList();
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消删除"
          });
        });
    },
    //单项数据修改
    changeHandle(id, auditStatus) {
      let params = {
        id: id,
        auditStatus: auditStatus
      };
      this.upDownArticle(params);
    },
    changeHandle2(id, isTop) {
      let params = {
        id: id,
        isTop: isTop
      };
      this.upDownArticle(params);
    },
    upDownArticle(parmas) {
      upDownArticle(parmas, res => {
        if (res.msgCode == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getPageList();
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    //获取回显数据
    showUpdAeticle(id) {
      showUpdAeticle({ id }, res => {
        this.detailVisible = true;
        this.editData = res.data;
        this.editState = true;
      });
    }
  },
  components: {
    detail: () => import("@/page/admin/articleList/detail")
  },
  mounted() {
    this.kcIdList = [];
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 150;
    this.ptId = this.$route.query.ptId;
    this.getPageList();
    this.knowClassifyList();
    // this.getCatSon();
  }
};
</script>
<style lang=scss scoped>
.know /deep/ .is-fixed {
  top: 5px;
}
.know /deep/ ::-webkit-scrollbar {
  height: 10px;
  width: 7px;
}
.know /deep/ ::-webkit-scrollbar {
  height: 9px;
  width: 7px;
}
.know {
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  padding: 20px;
  min-height: 100%;
  box-sizing: border-box;
  position: relative;
}

.knowTable {
  margin-top: 30px;
}

.knowTable /deep/ th {
  background-color: #efedf0 !important;
}
.detail {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 100;
  padding: 20px;
  min-height: 100%;
  box-sizing: border-box;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
