<template>
  <div class="operator">
    <div>
      <el-button type="primary" size="medium" @click="editHandle(false)" icon="el-icon-plus"></el-button>
    </div>
    <div class="operatorTable">
      <el-table
        :data="dataList"
        style="width: 100%"
        :height="tableHeight"
        :border="true"
        v-loading="loading"
        ref="table"
      >
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              icon="el-icon-edit"
              @click="editRole(scope.row,true)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="区域名称" align="center" width="180"></el-table-column>
        <el-table-column prop="dscribe" align="center" label="描述"></el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="clearPa edit">
      <!-- 分页 -->
      <div class="block" style="float: right;margin-top:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 15, 30]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>

    <!--新增&编辑-->
    <transition name="el-fade-in-linear">
      <region-edit
        v-show="editShow"
        :editState="editState"
        :editList="editList"
        @changeEdit="closeEdit"
      ></region-edit>
    </transition>
  </div>
</template>
<script type="text/javascript">
import regionEdit from "@/page/admin/region/components/regionEdit";
import { queryRegionPage } from "util/req/region/index";
export default {
  name: "region",
  data() {
    return {
      tableHeight: null,
      dataList: [
        {
          dscribe: null,
          name: null
        }
      ],
      loading: false, //表格数据加载样式
      currentId: null,
      editButton: true, //编辑按钮状态
      editShow: false,
      editState: false, //编辑&新增状态
      accreditShow: false, //授权状态
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageCount: null,
      editList: null
    };
  },
  watch: {
    currentId(val) {
      //表格数据选中处理
      if (val != null) {
        this.editButton = false;
      } else {
        this.editButton = true;
      }
    }
  },
  methods: {
    changeSelect(id) {
      if (this.currentId != id) {
        this.currentId = id;
        this.dataList.map(item => {
          if (this.currentId != item.id) {
            item.selected = false;
          } else {
            item.selected = true;
          }
          return item;
        });
      } else if (this.currentId == id) {
        this.currentId = null;
        this.dataList.map(item => {
          item.selected = false;
          return item;
        });
      }
    },
    closeEdit(state) {
      this.editShow = state;
      this.queryRolePage();
    },
    editHandle(state) {
      console.log(state);
      this.editShow = true;
      if (state) {
        this.editState = true;
      } else {
        this.editState = false;
      }
    },
    closeAccredit(state) {
      this.accreditShow = state;
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.queryRolePage();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.loading = true;
      this.queryRolePage();
    },
    queryRolePage() {
      //查询角色管理列表
      var parmas = {
        pageSize: this.pageSize,
        page: this.currentPage
      };
      queryRegionPage(parmas, res => {
        this.loading = true;
        if (res.msgCode == 200) {
          console.log(res);
          this.dataList = res.data.list;
          this.pageCount = res.data.pageCount;
          this.$refs.table.bodyWrapper.scrollTop = 0;
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
    editRole(row, state) {
      //编辑角色
      this.editShow = true;
      if (state) {
        this.editState = true;
        this.editList = JSON.parse(JSON.stringify(row));
      } else {
        this.editState = false;
      }
    }
  },
  components: {
    regionEdit
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 150;
    this.queryRolePage();
  }
};
</script>
<style lang=scss scoped>
.operator {
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.operatorTable {
  margin-top: 30px;
}

.operatorTable /deep/ th {
  background-color: #efedf0 !important;
}
</style>
