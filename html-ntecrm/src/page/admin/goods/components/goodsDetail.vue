<template>
	<div class="edit" @click.self="closeDialog">
		<div class="edit-content">
		  	<div class="edit-header clearPa">
		  		<h2 class="left">信息</h2>
		  		<!-- <datetime-pick style="margin-left: 25px;"></datetime-pick> -->
		  		<i  @click="closeDialog" class="el-icon-close right"></i>
		  	</div>

			<el-form style="height:500px;overflow:scroll;">
				<div>
					<div style="width:100%;text-align: center;margin-top: 10px;">
						<el-date-picker
					      v-model="chooseTime"
					      type="daterange"
					      @change="changeTime"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期"
					      size="mini">
					    </el-date-picker>
					</div>
				    
					<p style="text-indent: 10px;margin-top: 10px;"><span>询价统计：</span><span style="font-size: 18px;color:#409EFF;cursor: default;">{{sheetCount}}</span></p>
				    <p style="text-indent: 10px;margin-top: 20px;"><span>报价统计：</span><span style="font-size: 18px;color:#409EFF;cursor: default;">{{offerCount}}</span></p>
				    <p style="text-indent: 10px;margin-top: 20px;"><span>已支付统计：</span><span style="font-size: 18px;color:#409EFF;cursor: default;">{{alreadyPaidCount}}</span></p>
				    <p style="text-indent: 10px;margin-top: 20px;"><span>未支付统计：</span><span style="font-size: 18px;color:#409EFF;cursor: default;">{{unPaidCount}}</span></p>
				</div> 
				<el-tabs v-model="activeName" @tab-click="handleClick" style="padding:10px;box-sizing: border-box;">
				    <el-tab-pane label="累计询价数" name="first" class="goodsTable">
				    	<el-table
					      :data="sheetList"
					      style="width: 100%">
					      <el-table-column
					        prop="enquiryId"
					        label="询价编号">
					      </el-table-column>
					      <el-table-column
					        prop="goodsTitle"
					        label="产品名称">
					      </el-table-column>
					      <el-table-column
					        prop="userName"
					        label="用户名">
					      </el-table-column>
					      <el-table-column
					        prop="enquiryTime"
					        label="询价时间">
					        <template slot-scope="scope">
					        	<span>{{scope.row.enquiryTime.time|timeFilter}}</span>
					        </template>
					      </el-table-column>
					      <el-table-column
					        prop="expirationTime"
					        label="截止时间">
					        <template slot-scope="scope">
					        	<span>{{scope.row.expirationTime.time|timeFilter}}</span>
					        </template>
					      </el-table-column>
					    </el-table>

				    </el-tab-pane>
				    <el-tab-pane label="累计报价数" name="second">
				    	<el-table
					      :data="offerList"
					      style="width: 100%">
					      <el-table-column
					        prop="enquiryId"
					        label="询价编号">
					      </el-table-column>
					      <el-table-column
					        prop="goodsTitle"
					        label="产品名称">
					      </el-table-column>
					      <el-table-column
					        prop="userName"
					        label="用户名">
					      </el-table-column>
					      <el-table-column
					        prop="enquiryTime"
					        label="询价时间">
					        <template slot-scope="scope">
					        	<span>{{scope.row.enquiryTime.time|timeFilter}}</span>
					        </template>
					      </el-table-column>
					      <el-table-column
					        prop="expirationTime"
					        label="截止时间">
					        <template slot-scope="scope">
					        	<span>{{scope.row.expirationTime.time|timeFilter}}</span>
					        </template>
					      </el-table-column>
					    </el-table>
				    </el-tab-pane>
				</el-tabs>
			</el-form>

			<span v-show="this.currentTabs=='first'" class="edit-footer clearPa">
			    <div class="block" style="float:right;margin-top:10px;">
				    <el-pagination
					    layout="prev, pager, next"
					    @current-change="sheetCurrentChange"
					    :page-size='pageSize'
					    :current-page="sheetCurrentPage"
					    :total="sheetCount">
					</el-pagination>
				</div>
			</span>
			<span v-show="this.currentTabs=='second'"  class="edit-footer clearPa">
			    <div class="block" style="float:right;margin-top:10px;">
				    <el-pagination
					    layout="prev, pager, next"
					    @current-change="offerCurrentChange"
					    :current-page="offerCurrentPage"
					    :page-size='pageSize'
					    :total="offerCount">
					</el-pagination>
				</div>
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
//import datetimePick from "@/components/common/datetimePick";
import {getGoodsCount} from "util/req/goods/index";
import {formatDateTime} from "util/fn/transTime"
	export default{
		name:"goodsDetail",
		props:{
			editTitle:{
				type:String,
				default: ''
			},
			editState:{
				type:Boolean,
				default: true
			},
			chooseId:{
				type:String,
				default: null
			}
		},
		filters:{
			timeFilter(value){
				 if (!value) return '';
				 return formatDateTime(value,1)
			}
		},
		data(){
			return{
				titleName:'基本信息',
		        formLabelWidth: '120px',
		        activeName: 'first',
		        sheetList:null,		//询价列表
		        offerList:null,		//报价列表
		        sheetCount:null,	//询价统计
		        sheetAll:null,		//获取了所有数据，要求在前端分页（询价）
		        offerAll:null,		//报价分页的内容
		        offerCount:null,	//报价统计
		        alreadyPaidCount:null, //已支付统计
		        unPaidCount:null, 		//未支付统计
		        chooseTime:null, 		//选择时间
		        chooseTimeStart:null,	//筛选时间
		        chooseTimeEnd:null, 	//筛选时间
		        sheetCount:null, 		//询价总数
		        offerCount:null,		//报价总数
		        currentTabs:'first',	//当前选中的切换栏
		        pageSize:5, 			//分页的数量
		        sheetCurrentPage:1, 	//当前询价选中页
		        offerCurrentPage:1		//当前报价选中页
			}
		},
		methods:{
			closeDialog(){
				this.$emit("changeEdit",false)
			},
			handleClick(tab, event) {
		        this.currentTabs=tab.name;
		    },
		    getDetailList(){
		    	var params={
		    		goodsNo:this.chooseId
		    	}
		    	getGoodsCount(params,res=>{
		    		console.log(res);
		    		res=res.data;
		    		this.sheetCount=res.sheetCount;
		    		this.offerCount=res.offerCount;
		    		this.alreadyPaidCount=res.alreadyPaidCount;
		    		this.unPaidCount=res.unPaidCount;		
		    		this.sheetCount=res.sheetCount;
		    		this.offerCount=res.offerCount;
		    		this.sheetAll=res.sheetList;
		    		this.offerAll=res.offerList;
		    		this.sheetList=this.pagination(this.sheetCurrentPage, this.pageSize, this.sheetAll);
		    		this.offerList=this.pagination(this.offerCurrentPage, this.pageSize, this.offerAll);	
		    	})
		    },
		    changeTime(){		//时间筛选
		    	if(this.chooseTime==null){	//当时间清空时调用默认的数据
		    		this.getDetailList();
		    		return false;
		    	}
		    	this.chooseTimeStart=formatDateTime(this.chooseTime[0]);
		    	this.chooseTimeEnd=formatDateTime(this.chooseTime[1]);
		    	var params={
		    		goodsNo:this.chooseId,
		    		enquiryTimeStart:this.chooseTimeStart,
		    		enquiryTimeEnd:this.chooseTimeEnd
		    	}
		    	getGoodsCount(params,res=>{
		    		console.log(res);
		    		res=res.data;
		    		this.sheetCount=res.sheetCount;
		    		this.offerCount=res.offerCount;
		    		this.alreadyPaidCount=res.alreadyPaidCount;
		    		this.unPaidCount=res.unPaidCount;
		    		this.sheetCount=res.sheetCount;
		    		this.offerCount=res.offerCount;
		    		this.sheetAll=res.sheetList;
		    		this.offerAll=res.offerList;
		    		this.sheetList=this.pagination(this.sheetCurrentPage, this.pageSize, this.sheetAll);
		    		this.offerList=this.pagination(this.offerCurrentPage, this.pageSize, this.offerAll);
		    	})
		    },
		    pagination(pageNo, pageSize, array) {		//数组模拟分页
				var offset = (pageNo - 1) * pageSize;
				return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
			},
			sheetCurrentChange(page){
				this.sheetCurrentPage=page;
				this.sheetList=this.pagination(this.sheetCurrentPage, this.pageSize, this.sheetAll);
			},
			offerCurrentChange(page){
				this.offerCurrentPage=page;
				this.offerList=this.pagination(this.offerCurrentPage, this.pageSize, this.offerAll);
			}
		},
		watch:{
			chooseId(val){
				this.getDetailList();
			}
		},
		mounted(){

		},
		components:{
			
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
	width:70%;
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
.goodsTable /deep/ ::-webkit-scrollbar {
  height:9px;
  width: 7px;
  // border-radius: 4px;
}

</style>