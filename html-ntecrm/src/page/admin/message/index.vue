<template>
	<div class="message">
		<div>
			<i class="iconfont">&#xe616;</i>
			<el-button type="primary" size="small" @click="$router.go(-1);">返回</el-button>
		</div>
		<div style="padding:20px;">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="报价未审核" name="first">
					<span slot="label">
						<el-badge :value="5" class="item" >
					 	折扣申请未审核
			    		</el-badge>
			    	</span>	

			    	<el-table
				      :data="tableData"
				      style="width: 100%"
				      class="msgTable">
				      <el-table-column
				        label="操作"
				        width="180">
				        <template slot-scope="scoped">
				        	<el-button type="primary" round size="mini" @click="agreeHandle">同意</el-button>
				        	<el-button round size="mini" @click="refuseHandle">拒绝</el-button>
				        </template>
				      </el-table-column>
				      <el-table-column
				        prop="id"
				        label="申请ID"
				        width="100">
				      </el-table-column>
				      <el-table-column
				        prop="name"
				        label="申请人"
				        width="150">
				      </el-table-column>
				      <el-table-column
				        prop="status"
				        label="申请状态"
				        width="100">
				        <template slot-scope="scoped">
				        	<span>同意</span>
				        </template>
				      </el-table-column>
				      <el-table-column
				        prop="code"
				        label="需求编码"
				        width="100">
				      </el-table-column>
				      <el-table-column
				        prop="code"
				        label="商品名称"
				        width="150">
				      </el-table-column>
				      <el-table-column
				        prop="code"
				        label="原折扣率"
				        width="50">
				      </el-table-column>
				      <el-table-column
				        prop="code"
				        label="申请折扣"
				        width="50">
				      </el-table-column>
				      <el-table-column
				        prop="code"
				        label="申请原因"
				        >
				      </el-table-column>
				      <el-table-column
				        prop="date"
				        label="日期"
				        width="180">
				      </el-table-column>
				    </el-table>
					<div style="text-align: right;padding:20px 10px;">
						<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage"
					      :page-sizes="[5, 10, 20, 30]"
					      :page-size="10"
					      layout="sizes, prev, pager, next"
					      :total="30">
					    </el-pagination>
					</div>
				    
				</el-tab-pane>
			    <el-tab-pane label="折扣申请已审核" name="second">报价已审核</el-tab-pane>
			    <el-tab-pane label="折扣申请已拒绝" name="third">报价已拒绝</el-tab-pane>
			    <el-tab-pane label="全部申请信息" name="fourth">全部申请信息</el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'message',
		data(){
			return{
				activeName:'first',
				tableData: [{
		            date: '2016-05-02',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1518 弄'
		          }, {
		            date: '2016-05-04',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1517 弄'
		          }, {
		            date: '2016-05-01',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1519 弄'
		          }, {
		            date: '2016-05-03',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1516 弄'
		        }],
		        currentPage:1 		//当前页
			}
		},
		methods:{
			handleClick(){

			},
			handleSizeChange(){

			},
			handleCurrentChange(){

			},
			agreeHandle(){
				this.$prompt('请输入原因(选填)', '同意', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消'
		        }).then(({ value }) => {
		          this.$message({
		            type: 'success',
		            message: '已同意申请'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消输入'
		          });       
		        });
			},
			refuseHandle(){
				this.$prompt('请输入原因(选填)', '拒绝', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消'
		        }).then(({ value }) => {
		          this.$message({
		            type: 'success',
		            message: '已拒绝申请'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消输入'
		          });       
		        });
			}
		}
	}
</script>
<style lang="scss" scoped>
.message{
	position:absolute;
	width:100%;
	height:100%;
	left:0;
	top:0;
	background-color:#fff;
	padding:20px 10px;
}
.item /deep/ .el-badge__content.is-fixed{
	top:7px;
}
.msgTable /deep/ ::-webkit-scrollbar {
  height:9px;
  width: 7px;
}
</style>