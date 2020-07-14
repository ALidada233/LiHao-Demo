<template>
	<div class="edit" @click.self="closeDialog">
		<div class="edit-content">
		  	<div class="edit-header clearPa">
		  		<h2 class="left">授权设置</h2>
		  		<i  @click="closeDialog" class="el-icon-close right"></i>
		  	</div>

			<el-tree
			  :data="data2"
			  show-checkbox
			  node-key="id"
			  :render-after-expand="true"
			  :default-expanded-keys="[2, 3]"
			  :default-checked-keys="[5]"
			  :props="defaultProps">
			</el-tree>

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
			accreditState:{
				type:Boolean,
				default: true
			}
		},
		data(){
			return{
				titleName:'基本信息',
				form: {
		          name: '',
		          address: ''
		        },
		        formLabelWidth: '120px',
		        data2: [{
		          id: 1,
		          label: '一级 1',
		          children: [{
		            id: 4,
		            label: '二级 1-1',
		            children: [{
		              id: 9,
		              label: '三级 1-1-1'
		            }, {
		              id: 10,
		              label: '三级 1-1-2'
		            }]
		          }]
		        }, {
		          id: 2,
		          label: '一级 2',
		          children: [{
		            id: 5,
		            label: '二级 2-1'
		          }, {
		            id: 6,
		            label: '二级 2-2'
		          }]
		        }, {
		          id: 3,
		          label: '一级 3',
		          children: [{
		            id: 7,
		            label: '二级 3-1'
		          }, {
		            id: 8,
		            label: '二级 3-2'
		          }]
		        }],
		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        }
			}
		},
		watch:{
			
		},
		methods:{
			closeDialog(){
				this.$emit("changeAccredit",false)
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