<template>
	<div class="edit" @click.self="closeDialog">
		<div class="edit-content">
		  	<div class="edit-header clearPa">
		  		<h2 class="left">信息重置</h2>
		  		<i  @click="closeDialog" class="el-icon-close right"></i>
		  	</div>

			<el-form :model="form" style="height:400px;overflow:scroll;">
				<div>
					<el-form-item label="修改密码" :label-width="formLabelWidth">
				      <el-input type="password" :disabled="editState" v-model="form.name" autocomplete="off" maxlength="200" style="width: 80%;"></el-input>
				    </el-form-item>
				    <el-form-item label="再次输入密码" :label-width="formLabelWidth" style="margin-top:10px;">
				      <el-input type="password" v-model="form.address" autocomplete="off" maxlength="200" style="width: 80%;"></el-input>
				    </el-form-item>
				</div> 
			</el-form>

			<span class="edit-footer clearPa">
			    <el-button class="right" style="margin-right: 10px;margin-top:10px;" type="primary" @click="closeDialog">确 定</el-button>
			    <el-button class="right" style="margin-right: 15px;margin-top:10px;" @click="closeDialog">取 消</el-button>
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:"operatorEdit",
		props:{
			editTitle:{
				type:String,
				default: ''
			},
			editState:{
				type:Boolean,
				default: true
			}
		},
		data(){
			return{
				titleName:'基本信息',
				form: {
		          name: '',
		          address: '',
		          state: ''
		        },
		        formLabelWidth: '120px'
			}
		},
		watch:{
			
		},
		methods:{
			closeDialog(){
				this.$emit("changeReset",false)
			}
		},
		watch:{

		},
		mounted(){

		}	
	}
</script>

<style lang="scss" scoped>
.edit /deep/ .el-dialog{
	margin-top:5vh!important;
}
.edit{
	position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2001;
    background: rgba(0,0,0,.4);
}
.edit-content{
	background:#fff;
	border-radius:4px;
	margin:3% auto 0px;
	width:50%;
	padding:20px 25px;
}
.edit-header{
	width:100%;
	height:35px;
	line-height:35px;
}
	h2{
		font-size:18px;
	}
	i{
		font-size:18px;
		line-height:35px;
	}
.edit-footer{
}
</style>