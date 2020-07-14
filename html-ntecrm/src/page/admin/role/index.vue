<template>
  <div class="operator">
    <div>
      <el-button type="primary" size="medium" @click="editHandle(false)" icon="el-icon-plus"></el-button>
    </div>
    <div class="operatorTable">
      <el-table
        :data="dataList"
        style="width: 100%"
        :border="true"
        :height="tableHeight"
        v-loading="loading"
        ref="table"
      >
        <el-table-column label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              icon="el-icon-edit"
              @click="editRole(scope.row,true)"
            ></el-button>
            <el-button
              v-tip.top.dark="'权限设置'"
              type="info"
              icon="el-icon-setting"
              size="mini"
              round
              @click="getRoleResourceList(scope.row.id);"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="角色名" align="center" width="180"></el-table-column>
        <el-table-column prop="dscribe" align="center" label="描述"></el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="clearPa edit">
      <!-- <div style="float:left;padding-top: 8px;">
				<span style="color: #999;font-size: 11px;"><span v-if="editButton">未选中</span><span v-else> 已选</span></span>
				<el-button size="small" type="primary"  :disabled="editButton" @click="editHandle(true)"><i class="el-icon-edit-outline"></i>编辑</el-button>

				<el-button size="small" type="primary"  :disabled="editButton" @click="accreditShow=true"><i class="iconfont" style="font-size: 11px;">&#xe62a;</i> 授权</el-button>
      </div>-->

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
      <role-edit
        v-show="editShow"
        :editState="editState"
        :editList="editList"
        @changeEdit="closeEdit"
      ></role-edit>
    </transition>
    <!-- 权限设置 -->
    <el-dialog
      title="权限设置"
      :visible.sync="permissionVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-tree
        :data="treeList"
        ref="tree"
        v-loading="Vloading"
        node-key="id"
        show-checkbox
        check-strictly
        :default-expand-all="true"
        :default-checked-keys="checkedKeys"
        :props="prop"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <div style="float:left">
          <span>授权验证码：</span>
          <el-input v-model="smsCode" autocomplete="off" maxlength="200" style="width: 40%;"></el-input>
          <el-button
            @click="getSMSCode1"
            class="codebtn"
            :class="{'disabled-style':getCodeBtnDisable}"
            :disabled="getCodeBtnDisable"
          >{{codeBtnWord}}</el-button>
        </div>
        <el-button @click="permissionVisible = false">取 消</el-button>

        <el-button :disabled="btndisabled" type="primary" @click="getCheckedKeys()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import roleEdit from "@/page/admin/role/components/roleEdit";
import accredit from "@/page/admin/role/components/accredit";
import { queryRolePage } from "util/req/role/index";
import {
  getRoleResourceList,
  addRoleResource
} from "util/req/jurisdiction/index";
import { getSMSCode } from "util/req/operator/index";
export default {
  name: "role",
  data() {
    return {
      codeBtnWord: "获取验证码", // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      getCodeBtnDisable: false, // 控制获取验证码按钮是否可点击
      tableHeight: null,
      value: "",
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
      editList: null,
      permissionVisible: false,
      prop: {
        label: "name",
        id: "pid",
        type: "type",
        url: "url",
        children: "children",
        dscribe: "dscribe"
      },
      treeList: [],
      Vloading: false,
      checkedKeys: [],
      keyRow: [],
      roleId: null, //选中的roleId
      smsCode: "", //验证码
      btndisabled: true //控制确定按钮是否能点击
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
    },
    smsCode(val) {
      if (val.length != 6) {
        this.btndisabled = true;
      } else {
        this.btndisabled = false;
      }
    }
  },
  methods: {
    getSMSCode1() {
      //获取验证码
      var params = {
        type: 4
      };
      getSMSCode(params, res => {
        if (res.msgCode == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.getCodeBtnDisable = true; //按钮设为禁用
          // 因为下面用到了定时器，需要保存this指向
          let that = this;
          that.waitTime--;
          that.getCodeBtnDisable = true;
          this.codeBtnWord = `${this.waitTime}s`;
          let timer = setInterval(function() {
            if (that.waitTime > 1) {
              that.waitTime--;
              that.codeBtnWord = `${that.waitTime}s`;
            } else {
              clearInterval(timer);
              that.codeBtnWord = "获取验证码";
              that.getCodeBtnDisable = false;
              that.waitTime = 61;
            }
          }, 1000);
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    handleClose() {
      this.permissionVisible = false;
      this.treeList = [];
      this.roleId = null;
      this.checkedKeys = [];
    },
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
      queryRolePage(parmas, res => {
        this.loading = true;
        if (res.msgCode == "200") {
          console.log(res);
          res = res.data;
          this.dataList = res.list;
          this.pageCount = res.pageCount;
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
    },
    getRoleResourceList(id) {
      this.roleId = id;
      this.permissionVisible = true;
      this.Vloading = true;
      getRoleResourceList(
        {
          roleId: id
        },
        res => {
          this.treeList = res.data.resourceList;
          this.checkedKeys = res.data.roleResouceList;
          setTimeout(() => {
            this.Vloading = false;
          }, 200);
        }
      );
    },
    getCheckedKeys() {
      if (this.msgCode != "") {
        var params = {
          resIds: this.$refs.tree.getCheckedKeys().join(","),
          roleId: this.roleId,
          smsCode: this.smsCode
        };
        addRoleResource(params, res => {
          if (res.msgCode == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.handleClose();
          } else {
            this.$message({
              type: "info",
              message: res.msg
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "请输入授权验证码"
        });
      }
    }
  },
  components: {
    roleEdit,
    accredit
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 150;
    this.queryRolePage();
  }
};
</script>
<style lang=scss scoped>
.codebtn {
  margin-top: -13%;
  padding: 3.5% 2%;
  width: 23%;
  color: white;
  background: #409eff;
  border: #409eff 1px solid;
  border-radius: 5px;
}
.el-button.disabled-style {
  color: white;
  margin-top: -13%;
  padding: 3.5% 0%;
  width: 23%;
  background: #a0cfff;
  border: #a0cfff 1px solid;
  border-radius: 5px;
}
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
