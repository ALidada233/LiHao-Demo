<template>
	<div class="edit" @click.self="closeDialog">
		<div class="edit-content">
		  	<div class="edit-header clearPa">
		  		<h2 class="left">{{title}}</h2>
		  		<i  @click="closeDialog" class="el-icon-close right"></i>
		  	</div>

			 <slot name="main"></slot>
			<slot name="footer">
				<span class="edit-footer clearPa">
				    <el-button class="right" style="margin-right: 10px;margin-top:10px;" type="primary" @click="closeDialog">确 定</el-button>
				    <el-button class="right" style="margin-right: 15px;margin-top:10px;" @click="closeDialog">取 消</el-button>
				</span>
			</slot>
			
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:"operatorEdit",
		props:{
			title:{
				type:String,
				default: '信息'
			}
		},
		data(){
			return{
			}
		},
		watch:{
			
		},
		methods:{
			closeDialog(){
				this.$emit("closeDialog",false)
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