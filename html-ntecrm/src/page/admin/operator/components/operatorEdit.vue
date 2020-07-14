<template>
  <div class="edit" @click.self="closeDialog">
    <div class="edit-content">
      <div class="edit-header clearPa">
        <h2 class="left">编辑</h2>
        <i @click="closeDialog" class="el-icon-close right"></i>
      </div>

      <el-form
        :model="form"
        ref="operatorEdit"
        :rules="rules"
        style="height:400px;overflow:scroll;"
      >
        <div>
          <!-- <el-form-item label="登录名" prop="code" :label-width="formLabelWidth">
				      <el-input  v-model="form.code" autocomplete="off" maxlength="200" style="width: 80%;"></el-input>
          </el-form-item>-->
          <el-form-item
            label="姓名"
            prop="name"
            :label-width="formLabelWidth"
            style="margin-top:10px;"
          >
            <el-input v-model="form.name" autocomplete="off" maxlength="200" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item
            label="姓名英文缩写"
            prop="nameabbv"
            :label-width="formLabelWidth"
            style="margin-top:10px;"
          >
            <el-input
              v-model="form.nameabbv"
              autocomplete="off"
              maxlength="200"
              style="width: 80%;"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="telphone"
            :label-width="formLabelWidth"
            style="margin-top:10px;"
          >
            <el-input
              v-model="form.telphone"
              autocomplete="off"
              maxlength="200"
              style="width: 80%;"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            :label-width="formLabelWidth"
            style="margin-top:10px;"
          >
            <el-input v-model="form.email" autocomplete="off" maxlength="200" style="width: 80%;"></el-input>
          </el-form-item>
          <!--  <el-form-item label="密码" prop="password"  :label-width="formLabelWidth" style="margin-top:10px;">
				      <el-input v-model="form.password" type="password" placeholder="密码加密后不能回显" autocomplete="off" maxlength="200"  style="width: 80%;"></el-input>
          </el-form-item>-->
          <el-form-item label="角色设置" prop="roleId" :label-width="formLabelWidth" style>
            <el-select v-model="form.roleId" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="区域选择"
            v-if="toggleDiscount"
            prop="operatorRegionStr"
            :label-width="formLabelWidth"
            style
          >
            <el-select v-model="form.operatorRegionStr" multiple placeholder="请选择">
              <el-option
                v-for="item in regionList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣率" prop="operatorDiscount" :label-width="formLabelWidth" style>
            <el-input
              v-model="form.operatorDiscount"
              type="number"
              min="0"
              autocomplete="off"
              max="10"
              style="width: 30%;"
            ></el-input>%
            <span>（如5折则输入5）</span>
          </el-form-item>
          <el-form-item label="提成率" prop="commissionRate" :label-width="formLabelWidth" style>
            <el-input
              v-model.number="form.commissionRate"
              type="number"
              min="0"
              max="100"
              autocomplete="off"
              value="0"
              style="width: 30%;"
            ></el-input>%
          </el-form-item>
          <el-form-item label="协助人员" :label-width="formLabelWidth">
            <el-select v-model="form.aidIds" multiple placeholder="请选协助人员">
              <el-option
                v-for="item in nameList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" style="margin-top:10px;">
            <el-input v-model="form.remark" autocomplete="off" maxlength="200" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="授权验证码" :label-width="formLabelWidth" style>
            <el-input v-model="form.smsCode" autocomplete="off" maxlength="200" style="width: 40%;"></el-input>
            <el-button
              @click="getSMSCode"
              class="codebtn"
              :class="{'disabled-style':getCodeBtnDisable}"
              :disabled="getCodeBtnDisable"
            >{{codeBtnWord}}</el-button>
          </el-form-item>
        </div>
      </el-form>

      <span class="edit-footer clearPa">
        <el-button
          class="right"
          style="margin-right: 10px;margin-top:10px;"
          type="primary"
          @click="submitHandle"
        >确 定</el-button>
        <el-button
          class="right"
          style="margin-right: 15px;margin-top:10px;"
          @click="closeDialog"
        >取 消</el-button>
      </span>
    </div>
  </div>
</template>
<script type="text/javascript">
import { queryRolePage } from "util/req/role/index";
import { getTable, setManage, getSMSCode } from "util/req/operator/index";
import { queryRegionPage, getOperatorById } from "util/req/region/index";
export default {
  name: "operatorEdit",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: Boolean,
    editTitle: {
      type: String,
      default: ""
    },
    editState: {
      type: Boolean,
      default: true
    },
    editList: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      titleName: "基本信息",
      form: {
        //表单信息
        code: null,
        name: null,
        nameabbv: null,
        password: null,
        roleId: null,
        operatorDiscount: 0,
        commissionRate: 0,
        operatorRegionStr: [],
        remark: null,
        aidIds: [],
        smsCode: ""
      },
      codeBtnWord: "获取验证码", // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      getCodeBtnDisable: false, // 控制获取验证码按钮是否可点击
      roleList: null,
      formLabelWidth: "120px",
      rules: {
        code: {
          required: true,
          trigger: "blur",
          message: "登录名不能为空"
        },
        name: {
          required: true,
          trigger: "blur",
          message: "名字不能为空"
        },
        nameabbv: [
          {
            required: true,
            trigger: "blur",
            message: "名字英文缩写不能为空"
          },
          {
            pattern: /^[A-Z]+$/,
            message: "只能输入大写英文字母"
          }
        ],
        password: {
          required: true,
          trigger: "blur",
          message: "密码不能为空"
        },
        roleId: {
          required: true,
          trigger: "select",
          message: "角色不能为空"
        },
        operatorRegionStr: {
          required: true,
          trigger: "select",
          message: "区域不能为空"
        },
        remark: {
          required: true,
          trigger: "blur",
          message: "描述不能为空"
        },
        operatorDiscount: [
          {
            required: true,
            trigger: "blur",
            message: "折扣率不能为空且为数字"
          },
          {
            pattern: /^(?:[1-9]?\d|100)$/,
            message: "只能输入0-100"
          }
        ],
        commissionRate: [
          {
            required: true,
            trigger: "blur",
            message: "提成率不能为空且为数字"
          },
          {
            pattern: /^(?:[1-9]?\d|100)$/,
            message: "只能输入0-100"
          }
        ],
        email: [
          {
            required: false,
            trigger: "blur",
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: "请输入正确的邮箱"
          }
        ],
        telphone: [
          {
            required: true,
            trigger: "blur",
            message: "客户电话不能为空"
          },
          {
            // pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
            message: "请输入正确的格式"
          }
        ]
      },
      toggleDiscount: false,
      regionList: [],
      nameList: []
    };
  },
  watch: {
    editList: {
      handler: function(value) {
        this.form = this.editList;
        this.getOperatorById(value.id);
        this.queryRolePage();
      },
      deep: true //深度监听
    },
    "form.roleId"(id) {
      if (id == 38) {
        //38为销售的选项
        this.toggleDiscount = true;
        this.searchRegion();
      } else {
        this.toggleDiscount = false;
        this.form.operatorDiscount = 0;
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("changeEdit", false);
    },
    queryRolePage() {
      queryRolePage(null, res => {
        res = res.data;
        this.roleList = res.list;
      });
    },
    getTable() {
      getTable(
        {
          pageSize: 1000,
          page: 1
        },
        res => {
          this.nameList = res.data.list;
        }
      );
    },
    getSMSCode() {
      var params = {
        type: 2
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
    submitHandle() {
      this.$refs["operatorEdit"].validate(valid => {
        // var aidIds=null;
        // if(this.form.aidId!=null && this.form.aidId!="" && this.form.aidId.length!=0){
        //    aidIds=this.form.aidId.join(",");
        // }
        if (valid) {
          var params = {
            id: this.form.id,
            name: this.form.name,
            nameabbv: this.form.nameabbv,
            roleId: this.form.roleId,
            telphone: this.form.telphone,
            email: this.form.email,
            operatorRegionList: this.handleArray(this.form.operatorRegionStr),
            remark: this.form.remark,
            operatorDiscount: this.form.operatorDiscount || 0,
            commissionRate: this.form.commissionRate || 0,
            aidIds: this.handleArrayList(this.form.aidIds),
            smsCode: this.form.smsCode
          };
          setManage(params, res => {
            if (res.msgCode == "200") {
              this.$message({
                type: "success",
                message: "修改管理员成功"
              });
              this.closeDialog();
            } else {
              this.$message({
                type: "info",
                message: res.msg
              });
            }
          });
        } else {
        }
      });
    },
    searchRegion() {
      //点击新增查询区域列表
      queryRegionPage(
        {
          page: 1,
          pageSize: 100
        },
        res => {
          res = res.data;
          this.regionList = res.list;
        }
      );
    },
    handleArrayList(arr) {
      var newItem = [];
      for (var i = 0; i < arr.length; i++) {
        newItem.push(arr[i]);
      }
      return newItem;
    },
    handleArray(arr) {
      var newItem = [];
      for (var i = 0; i < arr.length; i++) {
        newItem.push({
          regionId: arr[i]
        });
      }
      return newItem;
    },
    resetArray(arr) {
      var newItem = [];
      for (var i = 0; i < arr.length; i++) {
        newItem.push(arr[i].regionId);
      }
      return newItem;
    },
    getOperatorById(id) {
      getOperatorById(
        {
          id: id
        },
        res => {
          res = res.data;
          this.form = res.operatorDto;
        }
      );
    }
  },
  mounted() {
    this.queryRolePage();
    this.getTable();
  }
};
</script>

<style lang="scss" scoped>
.codebtn {
  margin-top: -13%;
  padding: 2% 2%;
  width: 23%;
  color: white;
  background: #409eff;
  border: #409eff 1px solid;
  border-radius: 5px;
}
.el-button.disabled-style {
  color: white;
  margin-top: -13%;
  padding: 2% 0%;
  width: 23%;
  background: #a0cfff;
  border: #a0cfff 1px solid;
  border-radius: 5px;
}
.edit /deep/ .el-dialog {
  margin-top: 5vh !important;
}

.edit {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background: rgba(0, 0, 0, 0.4);
}

.edit-content {
  background: #fff;
  border-radius: 4px;
  margin: 3% auto 0px;
  width: 50%;
  padding: 20px 25px;
}

.edit-header {
  width: 100%;
  height: 35px;
  line-height: 35px;
}

h2 {
  font-size: 18px;
}

i {
  font-size: 18px;
  line-height: 35px;
}
</style>
