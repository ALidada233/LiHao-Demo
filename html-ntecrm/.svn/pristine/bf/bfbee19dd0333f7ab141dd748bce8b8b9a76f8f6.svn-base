<template>
	<div class="edit" @click.self="closeDialog">
		<div class="edit-content">
		  	<div class="edit-header clearPa">
		  		<h2 class="left"><span v-if="editState">编辑</span><span v-else>新增</span></h2>
		  		<i  @click="closeDialog" class="el-icon-close right"></i>
		  	</div>

			<el-form :model="form" ref="roleFrom" :rules="rules" style="height:400px;overflow:scroll;">
				<div>
					<el-form-item label="区域名" prop="name" :label-width="formLabelWidth">
				      <el-input  v-model="form.name" autocomplete="off" maxlength="200" style="width: 80%;"></el-input>
				    </el-form-item>
				    <el-form-item label="描述" prop="describe" :label-width="formLabelWidth" style="margin-top:10px;">
				      <el-input  v-model="form.dscribe" autocomplete="off" maxlength="200" style="width: 80%;"></el-input>
				    </el-form-item>
				</div> 
			</el-form>

			<span class="edit-footer clearPa">
			    <el-button class="right" style="margin-right: 10px;margin-top:10px;" type="primary" @click="submitHandle()">确 定</el-button>
			    <el-button class="right" style="margin-right: 15px;margin-top:10px;" @click="closeDialog">取 消</el-button>
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
import {saveRegion} from "util/req/region/index"
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
			},
			editList:{
				type:Object,
				default:''
			}
		},
		data(){
			return{
				titleName:'基本信息',
				form:this.editList || {
		          name: '',
		          dscribe: ''
		        },
		        formLabelWidth: '120px',
		        rules:{
		        	name:[
						{required: true,message:"名字不能为空",trigger: 'blur'},
						{min:3,max:6,message:"长度要在2-8个字内",trigger: 'blur'}
		        	],
		        	dscribe:{required: true,message:"描述不能为空",trigger: 'blur'}
		        }
			}
		},
		watch:{
			editList(val){
				if(val!=null ||val!=""){					
					 this.form=val;
				}
			}
		},
		methods:{
			closeDialog(){
				this.form.name=null;
				this.form.dscribe=null;
				this.$emit("changeEdit",false)
			},
			submitHandle(){
				this.$refs['roleFrom'].validate(valid=>{
					if(valid){
						var params
						if(this.editState){
							params={
								id:this.editList.id,
								name:this.form.name,
								dscribe:this.form.dscribe
							};
						}else{
							params={
								name:this.form.name,
								dscribe:this.form.dscribe
							};
						}
						console.log(params);
						saveRegion(params,res=>{
							if(res.msgCode=="200"){
								this.$message({
						            type: 'success',
						            message: res.msg
						        });
						        this.closeDialog();
							}else{
								this.$message({
						            type: 'info',
						            message: res.msg
						        });
							}
						})
					}else{
						
					}
				})
			}
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