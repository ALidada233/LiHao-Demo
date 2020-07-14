<template>
	<div class="operator">
		<div>
			<!-- 角色名
			<el-input
			  style="width: 20%;"
			  placeholder="请输入姓名"
			  size="medium"
			  v-model="input10"
			  clearable>
			</el-input>
			
			<el-button type="primary" size="medium">查询</el-button> -->
			<!-- <el-button type="primary" size="medium" @click="editHandle(false)">新增</el-button> -->
		</div>
		<div class="msgTable">
			<el-table
			    v-loading="loading"
			    :data="dataList"
			    style="width: 100%;margin-top: 30px;">
			    <el-table-column
			      label="操作"
			      width="220"
			      >
			      <template slot-scope="props">
			      	 <el-button type="primary" icon="el-icon-message" size="mini" @click="comfirmContract(props.row)" round>发送邮件</el-button>
			      	 <el-button type="primary" size="mini" @click="comfirmPdf(props.row)" icon="el-icon-view" round></el-button>
			      </template>
			    </el-table-column>
		<!-- 	    <el-table-column
			      label="需求 ID"
			      prop="demandId">
			    </el-table-column> -->
			    <el-table-column
			      label="需求编码"
			      prop="demandCode">
			    </el-table-column>
			    <el-table-column
			      label="产品信息"
			       width="400"
			      prop="goods_info">
			      <template slot-scope="scope">
			      	<p v-for="(item,index) in scope.row.offerGoodsList" :key="index">{{item.goodsInfo}}</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="总标准价"
			      prop="goodsOffer">
			    </el-table-column>
			    <el-table-column
			      label="总报价"
			      prop="totalOffer">
			    </el-table-column>
			    <el-table-column
			      label="个人折扣"
			      prop="discount">
			    </el-table-column>
			    <el-table-column
			      label="总折扣率"
			      prop="finalDiscount">
			    </el-table-column>
			    <el-table-column
			      label="联系人"
			      prop="contacts">
			    </el-table-column>
			    <el-table-column
			      label="客户公司"
			      prop="companyName">
			    </el-table-column>
			    <el-table-column
			      label="电话"
			       width="150"
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
			      label="创建时间"
			      width="180"
			      prop="createTime">
			    </el-table-column>
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
			      :total="pageCount">
			    </el-pagination>
			</div>
		</div>
		<el-dialog
		  title="选择发送人"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <el-select v-model="selectRecipients" placeholder="请选择" multiple>
		    <el-option v-for="(item,index) in contactsList" :key="index" :label="item.conName" :value="item.mailbox" >
		    </el-option>
		  </el-select>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitLink()">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 预览合同 -->
		<el-dialog title="合同预览"  width="80%" :visible.sync="heTongVisible" :append-to-body="true">
			<div style="width:100%">
				
				<object :data="'http://120.79.27.251:8008'+pdfFile" width="100%" height="550px" internalinstanceid="233"></object>
			</div>
			<div style="text-align: right;margin-top: 20px;">
				<el-button type="primary" size="small" @click="heTongVisible=false">确定</el-button>
			</div>			  	
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import {queryContractList} from "util/req/customer/demand";
import {sendContract} from "util/req/contract/index";
	export default{
		name:'contract',
		data(){
			return{
				input10:'',
		        value: '',
		        dataList: [{
		        	dscribe:null,
		        	name:null
		          }],
		        loading: false,		//表格数据加载样式
		        currentId:null,
		        editButton:true,	 //编辑按钮状态
		        editShow:false,
		        editState:false,	//编辑&新增状态
		        accreditShow:false,	//授权状态
		        loading:false,
		        currentPage:1,
		        pageSize:10,
		        pageCount:null,
		        editList:null,
		        dialogVisible:false,
		        contactsList:[],
		        selectRecipients:[],
		        insertObj:{},
		        heTongVisible:false,
		        pdfFile:null
			}
		},
		watch: {
			currentId(val){     //表格数据选中处理
				if(val!=null){
					this.editButton=false
				}else{
					this.editButton=true
				}
			},
			dialogVisible(status){
				if(status==false){
					this. contactsList=[]
		      		this.selectRecipients=[]
		      		this.insertObj={}
				}
			}
		},
		methods:{
			handleClose(){
				this.dialogVisible=false;
			},
			changeSelect(id){
				if(this.currentId!=id){
		      		this.currentId=id;
			      	this.dataList.map((item)=>{
			      		if(this.currentId!=item.id){
			      			item.selected=false;
			      		}else{
			      			item.selected=true;
			      		}
			      		return item
			      	})
			    }else if(this.currentId==id){
			      	this.currentId=null;
			      	this.dataList.map((item)=>{		      		
			      		item.selected=false;
			      		return item
			      	})
			    }
			},
			closeEdit(state){
				this.editShow=state;
				this.queryContractList();
			},
			editHandle(state){
				console.log(state);
				this.editShow=true;
				if(state){
					this.editState=true
				}else{
					this.editState=false
				}
			},
			closeAccredit(state){
				this.accreditShow=state;
			},
			handleSizeChange(pageSize){	//数据条数改变时
		      	this.loading=true;
		      	this.pageSize=pageSize;
		      	this.currentPage=1;
		      	this.queryContractList();
		    },
		    handleCurrentChange(currentPage){	//选取分页
		      	this.loading=true;
		      	this.queryContractList();
		    },
			queryContractList(){				//获取报价列表
					var params={
						status:2,
						pageSize:this.pageSize,
						page:this.currentPage
					}
					this.loading=true;
					queryContractList(params,res=>{
						this.loading=false;
						this.dataList=res.data.list;
						this.pageCount=res.data.pageCount;
					})
			},
			editRole(row,state){			//编辑角色
				this.editShow=true;
				if(state){
					this.editState=true;
					this.editList=JSON.parse(JSON.stringify(row));
				}else{
					this.editState=false
				}				
			},
			comfirmContract(row){
				
				var params={
					status:2,
					offerCode:row.offerCode,
					contractCode:row.contractCode,
				}
				if(!row.email){
					this.$message({
			            type: 'info',
			            message: '客户没有添加邮件'
			        });
					return
				}
				console.log(row)
				this.$confirm('此操作发送合同到'+row.contacts+'邮箱, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	sendContract(params,res=>{
			            if(res.msgCode==200){
							this.$message({
					            type: 'success',
					            message: res.msg
					        });
						}else{
							this.$message({
					            type: 'info',
					            message: res.msg
					        });
						}
					})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			submitLink(){
				sendContract(this.insertObj,res=>{
					if(res.msgCode==200){
						this.$message({
				            type: 'success',
				            message: res.msg
				        });
				        this.dialogVisible=false;
					}else{
						this.$message({
				            type: 'info',
				            message: res.msg
				        });
					}
				})
			},
			comfirmPdf(row){
				this.heTongVisible=true;
				this.pdfFile=row.file;
				console.log(row);
			}
		},
		components:{

		},
		mounted(){
			this.queryContractList();
		}
	}
</script>
<style lang=scss scoped>
.operator{
	background-color:#fff;
	border-radius:4px;
	width:100%;
	padding:20px;
	box-sizing:border-box;
}
.operatorTable{
	margin-top:30px;
}
.msgTable  /deep/ th{
	background-color:#EFEDF0!important;
}
.msgTable /deep/ ::-webkit-scrollbar {
  height:9px;
  width: 7px;
}
</style>