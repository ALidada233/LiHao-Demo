<template>
  <div>
    <div class="header clearPa">
      <span class="left">新建用户</span>
      <i class="el-icon-close right" @click="changeCustomerState"></i>
    </div>
    <el-form :model="form" style="height:450px;overflow:scroll;" :rules="userRules" ref="loginForm">
      <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="userName">
        <el-input
          v-model="form.userName"
          autocomplete="off"
          maxlength="200"
          size="small"
          style="width: 80%;"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="alias">
        <el-input
          v-model="form.alias"
          autocomplete="off"
          maxlength="200"
          size="small"
          style="width: 80%;"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱账号" :label-width="formLabelWidth" prop="email">
        <el-input
          v-model="form.email"
          autocomplete="off"
          maxlength="200"
          size="small"
          style="width: 80%;"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobilePhone">
        <el-input
          v-model="form.mobilePhone"
          autocomplete="off"
          maxlength="200"
          size="small"
          style="width: 80%;"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          autocomplete="off"
          maxlength="200"
          size="small"
          style="width: 80%;"
        ></el-input>
      </el-form-item>
      <!--    <el-form-item label="添加联系人" :label-width="formLabelWidth">

				<span style="color:#409EFF;cursor:default;font-size:13px;" @click="dialogFormVisible=true">添加</span>
      </el-form-item>-->
    </el-form>
    <div style="text-align:center;margin-top: 20px;">
      <el-button size="mini" @click="cancelHandle">取消</el-button>
      <el-button type="primary" size="mini" @click="submitFrom()">确认</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
import md5 from "js-md5";
import { newUser } from "util/req/customer/newUser";
export default {
  name: "newCustomersMain",
  data() {
    return {
      form: {
        userName: "",
        alias: "",
        email: "",
        mobilePhone: "",
        password: ""
      },
      userRules: {
        userName: [
          { required: true, trigger: "blur", message: "真实姓名不能为空" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],

        alias: [{ required: true, trigger: "blur", message: "用户名不能为空" }],

        email: [
          {
            required: false,
            trigger: "blur",
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: "请输入正确的邮箱"
          }
        ],

        mobilePhone: [
          { required: true, trigger: "blur", message: "手机号不能为空" },
          // {pattern:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/,message:"请输入正确的格式"}],
          {
            pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[6]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
            message: "请输入正确的格式"
          }
        ],

        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符" }
        ]
      },
      formLabelWidth: "120px",
      dialogFormVisible: false
    };
  },
  mounted() {},
  methods: {
    stateDialog(state) {
      this.dialogFormVisible = state;
    },
    changeCustomerState() {
      this.$emit("changeCustomerState", false);
    },
    resetFrom() {
      //清空表单里面数据
      this.form.userName = "";
      this.form.alias = "";
      this.form.email = "";
      this.form.mobilePhone = "";
      this.form.password = "";
    },
    submitFrom() {
      var _this = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.form.password = md5(this.form.password);
          newUser(this.form, res => {
            if (res.msgCode == 200) {
              //登录成功
              this.changeCustomerState();
              this.$emit("refreshTable"); //刷新表格数据
              this.$message({
                message: "用户添加成功",
                type: "success",
                onClose: () => {
                  this.resetFrom();
                }
              });
            } else {
              //登录失败
              this.$alert("注册用户失败，请重新注册", "注册提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.resetFrom();
                }
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelHandle() {
      this.resetFrom();
      this.changeCustomerState();
    }
  },
  components: {
    //	newCustomers
  }
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
span {
  font-size: 15px;
  text-indent: 10px;
}
i {
  font-size: 18px;
  margin-top: 10px;
}
.el-form-item {
}
</style>
