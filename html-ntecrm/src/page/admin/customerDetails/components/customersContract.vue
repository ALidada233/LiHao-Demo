<template>
	<div class="customersContract">
		<div>
			<i class="iconfont">&#xe616;</i>
			<el-button type="primary" size="small" @click="$emit('closeContractDialog')">返回</el-button>
		</div>
		<div style="padding:20px;">
			<h2 style="font-size: 16px;">已报价列表</h2>
			<div class="right" style="margin-bottom: 10px;">
				
			</div>
			 <el-table
			    v-loading="loading"
			    :data="dataList"
			    style="width: 100%;margin-top: 30px;">
			    <el-table-column
			      label="操作"
			      width="150"
			      >
			      <template>
			      	 <el-button type="primary" size="mini">生成合同</el-button>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="需求 ID"
			      prop="id">
			    </el-table-column>
			    <el-table-column
			      label="产品信息"
			       width="300"
			      prop="productName">
			      <template slot-scope="scope">
			      	<span v-html="capitalizeHandle(scope.row.productName)"></span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="预算价格"
			      prop="budgetaryPrice">
			    </el-table-column>
			    <el-table-column
			      label="联系人"
			      prop="contacts">
			    </el-table-column>
			    <el-table-column
			      label="电话"
			       width="120"
			      prop="phone">
			    </el-table-column>
			    <el-table-column
			      label="邮箱"
			       width="120"
			      prop="email">
			    </el-table-column>
			    <el-table-column
			      label="备注"
			       width="200"
			      prop="remark">
			    </el-table-column>
			    <el-table-column
			      label="创建人姓名"
			      prop="createName">
			    </el-table-column>
			    <el-table-column
			      label="修改时间"
			      prop="updateTime">
			    </el-table-column>
			    <el-table-column
			      label="创建时间"
			      width="180"
			      prop="createTime">
			    </el-table-column>
			</el-table>

		</div>	
	</div>
</template>

<script type="text/javascript">
import {getDemandList} from "util/req/customer/demand";
	export default{
		name:"customersContract",
		props:{
			getCustID:{
				type:Number,
				default:null
			}
		},
		data(){
			return {
				loading:false,
				dataList: [{
				 	  id:null,           //id
			          goodsCategory:null,	//产品类别
			          productName:null,		//产品名称
			          model:null,			//品牌
			          budgetaryPrice:null, //预算价格
			          contacts:null,    //联系人
			          phone:null,       //电话
			          email:null,		//邮箱
			          status:null,  //状态
			          delFlag:null, //删除状态
			          remark:null,  //备注
			          createName:null, //创建人姓名
			          createTime:null, //创建人时间
			          updateTime:null //修改时间
			    }],
			}
		},
		watch:{
			getCustID(val){
				var params={
					customerId:val
				}
				getDemandList(params,res=>{
					this.dataList=res.list;
				})
			}
		},
		methods:{
			capitalizeHandle(value){
				if(value){
					return value.replace("|","<br>");
				}			
			}
		},
		mounted(){
			
		}
	}
</script>


<style lang="scss" scoped>
	.customersContract{
		padding:20px;
		box-sizing:border-box;
	}  
</style>