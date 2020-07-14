<template>
	<div class="customerDemand" id="customerDemand" ref="customerDemand">
		<div>
			<i class="iconfont">&#xe616;</i>
			<el-button type="primary" size="small" @click="$emit('closeDemandDialog')">返回</el-button>
		</div>
		<div style="padding:20px;">
			<h2 style="font-size: 16px;">需求列表</h2>
			<div class="right" style="margin-bottom: 10px;">
				<el-button type="primary" size="small" @click="needVisible=true;getTypeList()">新增需求</el-button>
				<el-button type="primary" size="small" @click="contractDialogVisible=true">生成合同</el-button>
			</div>
			<el-table
			    v-loading="loading"
			    :data="dataList"
			    style="width: 100%;">
			    <el-table-column
			      fixed
			      label="操作"
			      width="300"
			      >
			      <template slot-scope="props">
			      	 <el-button type="primary" size="mini" v-if="props.row.status==0" @click="saveDemandStatus(props.row.id,1)">确认</el-button>
			      	 <el-button type="primary" size="mini" @click="offerHandle(props.row.id)" v-if="props.row.status==1">报价</el-button>
			      	 <el-button type="primary" size="mini" @click="getFollowList(props.row.id)">跟进信息</el-button>
			      	 <el-button type="danger" size="mini" @click="cancelId=props.row.id;cancelVisible=true;" v-if="props.row.status!==6">作废</el-button>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="需求 ID"
			      prop="id">
			    </el-table-column>
			    <el-table-column
			      label="状态"
			      prop="status">
			      <template slot-scope="scope">
			      	<span v-if="scope.row.status==0">待确认</span>
			      	<span v-if="scope.row.status==1">已确认</span>
			      	<span v-if="scope.row.status==2">已报价</span>
			      	<span v-if="scope.row.status==3">生成合同</span>
			      	<span v-if="scope.row.status==4">生成订单</span>
			      	<span v-if="scope.row.status==5">完成</span>
			      	<span v-if="scope.row.status==6">已作废</span>
			      </template>
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
			   <!--  <el-table-column
			      label="创建人姓名"
			      prop="createName">
			    </el-table-column> -->
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

		<!-- 跟进记录 -->

		<el-dialog title="跟进记录" :visible.sync="toggleFollowVisible" width="90%" :append-to-body="true">
			<div style="width:100%">
				<el-table
				  v-loading="loadingFllow"
			      :data="getDemandDataList"
			      style="width: 100%;height:400px;overflow-y: scroll;">
			      <el-table-column
			        prop="createName"
			        label="创建人">
			      </el-table-column>
			      <el-table-column
			        prop="status"
			        label="状态"
			        >
			        <!--  1创建2确认3报价4生成合同5生成订单6完成7作废报价 -->
			        <template slot-scope="scope">
			        	<span v-if="scope.row.status==1">创建</span>
			        	<span v-if="scope.row.status==2">确认</span>
			        	<span v-if="scope.row.status==3">报价</span>
			        	<span v-if="scope.row.status==4">生成合同</span>
			        	<span v-if="scope.row.status==5">生成订单</span>
			        	<span v-if="scope.row.status==6">完成</span>
			        	<span v-if="scope.row.status==7">作废报价</span>
			        </template>
			      </el-table-column>
			      <el-table-column
			        prop="createTime"
			        label="时间">
			      </el-table-column>
				  <el-table-column
			        prop="remark"
			        label="记录"
			        >
			      </el-table-column>
			    </el-table>
			   
		    	<div style="text-align:right;">
		    		<span style="color: #409EFF;margin-top: 14px;cursor: default;" @click="followVisible=true">新增跟进记录</span>
          			<i class="el-icon-plus" style="font-weight: bold;color: #409EFF;margin-top: 14px;" @click="followVisible=true"></i>
		    	</div>
	         	
			</div>
			<div style="text-align: right;margin-top: 20px;">
				<el-button type="primary" size="small" @click="toggleFollowVisible=false">关闭</el-button>
			</div>			  	
		</el-dialog>

		<!-- 新增跟进记录 -->
		<el-dialog title="添加跟进记录" :visible.sync="followVisible" :append-to-body="true">
			<div style="width:100%">
				<span style="width:10%;vertical-align:top;margin-right: 10px;">联系情况</span>
			    <el-input
			      style="width:70%"
				  type="textarea"
				  :rows="4"
				  placeholder="请输入内容"
				  v-model="remarkText">
				</el-input>
			</div>
			<div style="text-align: right;margin-top: 20px;">
				<el-button size="small" @click="followVisible=false;remarkText=null">取消</el-button>
				<el-button type="primary" size="small" @click="addFollowList">确定</el-button>
			</div>			  	
		</el-dialog>

		<!-- 作废 -->
		<el-dialog title="作废备注" :visible.sync="cancelVisible" :append-to-body="true">
			<div style="width:100%">
				<span style="width:10%;vertical-align:top;margin-right: 10px;">作废原因</span>
			    <el-input
			      style="width:70%"
				  type="textarea"
				  :rows="4"
				  placeholder="请输入内容"
				  v-model="remarkCancel">
				</el-input>
			</div>
			<div style="text-align: right;margin-top: 20px;">
				<el-button size="small" @click="cancelVisible=false;remarkCancel=null;">取消</el-button>
				<el-button type="primary" size="small" @click="saveDemandStatusCancel(6)">确定</el-button>
			</div>			  	
		</el-dialog>
		
		<!-- 需求新增 -->
		<el-dialog title="新增需求" :visible.sync="needVisible" :append-to-body="true">
			<div style="width:100%">
				<el-form ref="form" :model="form[0]" label-width="80px">
					<div v-for="(item,index) of form" style="margin-bottom:10px;border-bottom:1px solid #eee;" :key="index">
						<el-form-item label="产品类别">
						   <el-select v-model="form[index].goodsType" placeholder="请选择">
							    <el-option
							    	v-for="(item,index) of CatNameList"
							    	:key="index"
							      :label="item.catName"
							      :value="item.catId">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="产品需求">
						    <el-form-item label="品牌" style="display: inline-block; margin-bottom:10px;width:40%;">
						    	<el-input placeholder=""  v-model="form[index].model" clearable></el-input>
						    </el-form-item>
						    <el-form-item label="产品型号" style="display: inline-block;margin-bottom:10px;width:40%;">
						    	<el-input placeholder="" style="" v-model="form[index].productName" clearable></el-input>
						    </el-form-item>	
						    <el-form-item label="数量" style="display: inline-block;margin-bottom:10px;width:40%;">
						    	<el-input placeholder="请填写数字" type="number" style="" v-model="form[index].quantity"clearable></el-input>
						    </el-form-item>		
						    <el-form-item label="预估价格" style="display: inline-block;width:40%;">
						    	<el-input placeholder="请填写数字" type="number"  v-model="form[index].budgetaryPrice"clearable></el-input>
						    </el-form-item>	
						    <el-button type="danger" style="margin-left:10px;" icon="el-icon-delete" circle v-if="index!=0" @click="delDemand(index)"></el-button>
						</el-form-item>

					</div>
					<div @click="addDemand" style="text-align: right;margin-right: 10px;cursor: default;color:#409EFF;">
						再加一条~
					</div>
					<el-form-item label="有效期">
						<el-date-picker
					      v-model="deliveryTime"
					      type="datetime"
					      placeholder="选择日期时间">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="备注" style="width:70%;">
					    <el-input type="textarea" v-model="remark"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div style="text-align: right;margin-top: 20px;">
				<el-button size="small" @click="needVisible=false;">取消</el-button>
				<el-button type="primary" size="small" @click="submitHandle">确定</el-button>
			</div>			  	
		</el-dialog>

		<!-- 报价 -->
		<el-dialog :title="offerStatus?'编辑报价':'新增报价'" :visible.sync="offerVisible" :append-to-body="true" width="90%">
			<div style="width:100%">
				<el-form ref="form" :model="form2">
					<el-form-item label="品牌" style=" margin-bottom:10px;">
					    <el-select
						    v-model="goodsName"
						    multiple
						    filterable
						    remote
						    reserve-keyword
						    placeholder="请输入品牌关键词"
						    :remote-method="remoteMethod"
						    :loading="optLoading">
						    <el-option
						      v-for="item in goodsList"
						      :key="item.id"
						      :label="item.catName+item.title"
						      :value="item.title">
						    </el-option>
						</el-select>
					    <el-button type="primary"  size="small"style="margin-left: 10px;" @click="confirmHandle">确定</el-button>
						<el-button type="primary"  size="small">添加商品</el-button>
						<span>（下架的商品默认不能报价）</span>
					</el-form-item>
					<el-form-item label="">
						<el-table
							ref="multipleTable"
							class="offerPrice"
						    :data="offerList"
						    style="width: 100%;"
							@selection-change="handleSelectionChange"
						    >
						    <el-table-column
						      type="selection"
						      width="55">
						    </el-table-column>

						    <el-table-column
						     label="操作"
							 width="150"
						    >
						      <template slot-scope="props">
						        <el-button size="mini" round type="primary" icon="el-icon-edit" @click="offerContentHandle(props.row.id)"></el-button>
						        <el-button type="danger" icon="el-icon-delete"  size="mini" round @click="delOfferOption(props.row.id)"></el-button>
						      </template>
						    </el-table-column>
						    <el-table-column
						        prop="id"
						        label="ID"
						        align="center"
						        width="100">
						      </el-table-column>
						    <!--   <el-table-column
						        prop="goodsNo"
						        label="商品编码"
						        align="center"
						        width="100">
						      </el-table-column> -->
						      <el-table-column
						        prop="title"
						        label="商品名称"
						        width="120">
							        <template slot-scope="scope">
								      	<span>{{scope.row.title}}</span>
								    </template>
						      </el-table-column>
						      <el-table-column
						      	align="center"
						        label="编辑状态">
						        <template  slot-scope="scope">					        	
						        		<i v-if="scope.row.completeStatus" class="el-icon-check"></i>
						        		<i v-else class="el-icon-close"></i>		
						        </template>
						      </el-table-column>
						      <el-table-column
						        label="报价">
						        <template slot-scope="scope">
						        	<span>
						        		{{scope.row.offer}}
						        	</span>
						        </template>
						      </el-table-column>
							   <el-table-column
							        prop="standardPrice"
							        label="标准价">
							    </el-table-column>
						     <!--  <el-table-column
						        prop="describe"
						        label="商品描述"
						        width="180">
						      </el-table-column> -->
						      <el-table-column
						        prop="status"
						        label="状态"
						        align="center"
						        width="100">
						        <template slot-scope="scope">
						        	<span v-if="scope.row.status=='0'">草稿箱</span>
						        	<span v-if="scope.row.status=='1'">上架</span>
						        	<span v-if="scope.row.status=='2'">下架</span>
						        	<span v-if="scope.row.status=='3'">删除</span>
						        	<span v-if="scope.row.status=='4'">库存审核中</span>
						        </template>
						      </el-table-column>
						       <el-table-column
						        prop="goodsImg"
						        label="商品图片"
						        align="center"
						        width="180">
						        <template slot-scope="scope">
						        	<img style="height:50px;" :src="'http://120.77.155.253:8003'+scope.row.goodsImg">
						        </template>	
						      </el-table-column>
						      
						      <el-table-column
						        prop="goodsType"
						        label="商品类型">

						        	<template slot-scope="scope">
						        		<span v-if="scope.row.goodsType==1">常规</span>
						        		<span v-if="scope.row.goodsType==2">专柜</span>
						        		<span v-if="scope.row.goodsType==3">库存</span>
						        	</template>	
						      </el-table-column>
						      <el-table-column
						        prop="type"
						        label="类型">
						      </el-table-column>
						      <el-table-column
						        prop="range"
						        label="量程">
						      </el-table-column>
						      <el-table-column
						        prop="accuracy"
						        label="精度">
						      </el-table-column>
						      <el-table-column
						        prop="outputSignal"
						        label="输出信号">
						      </el-table-column>
						      <el-table-column
						        prop="catName"
						        label="类别">
						      </el-table-column>
						  </el-table>
					</el-form-item>	
				</el-form>
			</div>
			<div style="text-align: right;margin-top: 20px;">
				<el-button type="primary" size="small" @click="applicationHandle">申请低折扣</el-button>
				<el-button type="primary" size="small" @click="sureHandle">确定</el-button>
				<el-button size="small" @click="offerVisible=false">取消</el-button>
			</div>			  	
		</el-dialog>
		<!-- 编写报价内容 -->
		<el-dialog title="报价信息" :visible.sync="offerContentVisible" :append-to-body="true">
			<div style="width:100%">
				<el-form ref="detailOfferPriceList" :model="detailOfferPriceList" :rules="offerRules" label-width="150px">
					<el-form-item label="商品编号">
					    <span>{{detailOfferPriceList.goodsNo}}</span>
					</el-form-item>
					<el-form-item label="商品信息">
					  <!--   <span>{{detailOfferPriceList.goodsInfo}}</span> -->
					    <span>{{detailOfferPriceList.catName}}-{{detailOfferPriceList.type}}-{{detailOfferPriceList.title}}-{{detailOfferPriceList.range}}-{{detailOfferPriceList.accuracy}}-{{detailOfferPriceList.outputSignal}}</span>
					</el-form-item>
					<el-form-item label="产品编号">
					    <span>{{detailOfferPriceList.productNo}}</span>
					</el-form-item>
					<el-form-item label="商品报价" prop="offer">
					    <el-input placeholder="" type="number" style="width:50%" v-model="detailOfferPriceList.offer" clearable @blur="validateOffer"></el-input>
					</el-form-item>
					<el-form-item label="商品标准价">
					    <span>{{detailOfferPriceList.standardPrice}}</span>
					</el-form-item>
					<el-form-item label="数量" prop="quantity">
					    <el-input placeholder="" type="number" style="width:50%" v-model="detailOfferPriceList.quantity"clearable></el-input>
					</el-form-item>
					<el-form-item label="业务员折扣率">
					    <span>{{detailOfferPriceList.discount}}%</span>
					</el-form-item>
					<el-form-item label="最终折扣率">
					    <span>{{detailOfferPriceList.finalDiscount}}%</span>
					</el-form-item>
					<el-form-item label="货期">
						<el-date-picker
					      v-model="detailOfferPriceList.deliveryTime"
					      type="datetime"
					      placeholder="选择日期时间">
					    </el-date-picker>
				    </el-form-item>
				</el-form>
			</div>
			<div style="text-align: right;margin-top: 20px;">
				<el-button size="small" @click="offerContentVisible=false">取消</el-button>
				<el-button type="primary" size="small" @click="comfirmOfferPrice">确定</el-button>
			</div>			  	
		</el-dialog>

		<!-- 支付方式 -->

		<el-dialog
		  title="支付方式"
		  :visible.sync="paymentVisible"
		  :append-to-body="true"
		  width="30%">
		  
		  	<el-select v-model="payment" placeholder="请选择支付方式">
			    <el-option :value="1" label="支票">支票</el-option>
			    <el-option :value="2" label="电汇">电汇</el-option>
			    <el-option :value="3" label="汇票">汇票</el-option>
			    <el-option :value="4" label="现金">现金</el-option>
			    <el-option :value="5" label="银行卡">银行卡</el-option>
			    <el-option :value="6" label="微信">微信</el-option>
			    <el-option :value="7" label="支付宝">支付宝</el-option>
			    <el-option :value="8" label="其他">其他</el-option>
			</el-select>
	
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="paymentVisible = false;">取 消</el-button>
		    <el-button type="primary" @click="quotedPriceHandle()">确 定</el-button>
		  </span>
		</el-dialog>

		<!-- 申请低折扣 -->
		<el-dialog title="折扣申请" :visible.sync="lowVisible" :append-to-body="true">
			<div style="width:100%">
				<el-form ref="discountsApplication" :model="discountsApplication" label-width="150px" :rules="disApplication">
					<div>
						<el-form-item label="商品信息">
					    <span v-html="discountsApplication.goodsName"></span>
						</el-form-item>
						<el-form-item label="原折扣率">
						    <span>{{discountsApplication.orgDiscount}} %</span>
						</el-form-item>
						<el-form-item label="申请折扣" prop="applyDiscount">
						    <el-input placeholder="" type="number" style="width:40%" v-model="discountsApplication.applyDiscount"clearable></el-input> %
						</el-form-item>
						<el-form-item label="备注（申请原因）">
						    <el-input
							  type="textarea"
							  :rows="2"
							  style="width:80%;"
							  placeholder="请输入内容"
							  v-model="discountsApplication.reason">
							</el-input>  
						</el-form-item>
					</div>
				</el-form>
				<div style="border-bottom:1px solid #E4E7ED;"></div>
				
			</div>
			<div style="text-align: right;margin-top: 20px;">
				<el-button size="small" @click="lowVisible=false">取消</el-button>
				<el-button type="primary" size="small" @click="disApplicationHandle">确定</el-button>
			</div>			  	
		</el-dialog>

		<!-- 生成合同 -->
		<transition name="el-fade-in-linear">
			<customersContract class="customersContract"
				v-show="contractDialogVisible"
				@closeContractDialog="contractDialogVisible=false;"
				:getCustID="getCustID"
			>
			</customersContract>	
		</transition>
	</div>
	
</template>
<script type="text/javascript">
import {saveDemand,saveDemandStatus,getDemand,getGoodsCategory,getDemandOptLogList,saveDemandOptLog,getOptApplyiscount,saveDemandOffer,saveDiscountApply,getOfferInfo} from "util/req/customer/demand";
import {formatDateTime} from "util/fn/transTime";
import customersContract from "@/page/admin/customerDetails/components/customersContract";
import {getTable} from "util/req/goods/index";
	export default{
		name:'customerDemand',
		props:{
			getCustID:{
				type:Number,
				default:null
			}
		},
		filters: {
			 
		},
		watch:{
			getCustID(id){
				this.getDemandList();
				//vm.aaa();
				this.$root.BackToTop();
			},
			needVisible(status){
				if(status==false){
					this.form=[
			        	{
			        		model:null,
			        		productName:null,
			        		goodsType:null,
			        		quantity:null,
			        		budgetaryPrice:null
			        	}
			        ];
			        this.deliveryTime=null;		
			        this.remark=null;			
				}
			},
			offerVisible(status){
				if(status==false){		//关闭清空报价内容 
					this.offerList=[];
					this.goodsList=[];
					this.completedEditList=[] //关闭清空已编辑的产品内容
					this.demandId=null;		//清空需求ID
					this.offerEditId=null;  //清空编辑状态需要传的的id
				}
			},
			paymentVisible(status){			//支付弹框
				if(status==false){		
					this.payment=null;
				}
			},
			lowVisible(status){				//关闭申请低折扣弹框
				if(status==false){		
					this.discountsApplication={};
				}
			}	
		},
		data(){
			
			return {
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
			          updateTime:null, //修改时间

			        }],
			        form2:null,
			        form:[
			        	{
			        		model:null,
			        		productName:null,
			        		goodsType:null,
			        		quantity:null,
			        		budgetaryPrice:null
			        	}
			        ],
			        textarea:"",
			        input1:"",
			        value:"",
			        expands: [],
			        pageCount:null,			//分页总数
			        pageSize:5,			//每页条数
			        currentPage:1,			//当前页
			        cancelVisible:false,   //作废弹框 
			        needVisible:false, 		//新增需求
			        offerVisible:false, 		//报价
			        lowVisible:false, 		//低折扣
			        toggleFollowVisible:false,//跟进记录
			        followVisible:false, 	//新增跟进信息
			        customerId:this.getCustID, 		//客户id
			        loading:false,
			        loadingFllow:false,
			        CatNameList:null, 				//产品类型列表
			        deliveryTime:null,			//有效期
			        remark:null,				//备注
			        followList:null,	  			//跟进信息
			        getDemandDataList:[{			//跟进信息列表
			        	remark:null,
			        	status:null,
			        	createTime:null,
			        	createName:null
			        }],
			        followListId:null, 			//需求ID
			        remarkText:null,			//新增跟进记录文本信息
			        cancelId:null,				//作废选中的需求Id
			        remarkCancel:null, 			//作废原因
			        contractDialogVisible:null, 	//生成合同弹框
			        goodsName:[], 				//品牌名字
			        goodsList:[],
			        optLoading:false,
			        offerList:[],				//报价列表
			        getDiscount:null,            //获取的设定折扣率
			        offerContentVisible:false,		//报价弹框
			        detailOfferPriceList:{		//报价编辑的详情
			        	offer:0

			        },		
			        offerRules:{
			        	quantity:[
					        	{ required: true, trigger: 'blur', message:"数量不能为空且为数字"},
					        	{ pattern:/^[1-9]\d*(\.\d+)?$/, message:"只能输入大于0的数字"},
				        	],
				        offer:[
					        	{ required: true, trigger: 'blur', message:"报价不能为空且为数字"},
					        	{ pattern:/^[1-9]\d*(\.\d+)?$/, message:"只能输入大于0的数字"}
					        	
				        	]	
			        },
			        completedEditList:[], 			//已编辑的列表
			        multipleSelection: [],			//选中要报价的列
			        paymentVisible:false,			//支付方式弹框
			        payment:null, 					//支付方式的值
			        demandId:null, 					//需求ID
			        discountsApplication:{
			        	goodsName:''
			        },			//折扣申请
			        disApplication:{
			        	applyDiscount:[
					        	{ required: true, trigger: 'blur', message:"数量不能为空且为数字"},
					        	{ pattern:/^[1-9]\d*(\.\d+)?$/, message:"只能输入大于0的数字"},
				        	]
			        },
			        offerStatus:false,				//报价的状态（新增为false，true为编辑）
			        offerEditId:null 				//编辑报价需要id
			        
			}
		},
		methods:{
			 handleSizeChange(pageSize){	//数据条数改变时
		      	this.loading=true;
		      	this.pageSize=pageSize;
		      	this.currentPage=1;
		      	this.getDemandList();
	      },
	      handleCurrentChange(currentPage){	//选取分页
		      	this.loading=true;
		      	this.currentId=[];
		      	this.getDemandList();
	      },
			capitalizeHandle(value){
				if(value){
					return value.replace("|","<br>");
				}			
			},
			getDemandList(){
				var params={
					customerId:this.getCustID,
					page:this.currentPage,
					pageSize:this.pageSize
				};
				this.loading=true;
				getDemand(params,res=>{
					if(res.msgCode==200){
						res=res.data;
						this.dataList=res.list;
						this.pageCount=res.pageCount;
						setTimeout(()=>{
							this.loading=false;
						},200)
					}else{
						setTimeout(()=>{
							this.loading=false;
						},200)
					}
					
				})
			},
			getTypeList(){	//查询产品类别
				getGoodsCategory(res=>{	
					this.CatNameList=res.data.list;
				})
			},
			getFollowList(id){	//获取跟进记录
				this.toggleFollowVisible=true;
				var params={
					demandId:id
				}
				this.loadingFllow=true;
				this.followListId=id;
				getDemandOptLogList(params,res=>{
					this.getDemandDataList=res.data.list;
					setTimeout(()=>{
						this.loadingFllow=false;
					},200)
				})
			},
			addFollowList(){	//新增跟进记录			
				var params={
					demandId:this.followListId,
					remark:this.remarkText
				}
				saveDemandOptLog(params,res=>{
					if(res.msgCode=='200'){
						this.followVisible=false;
						this.getFollowList(this.followListId);
						this.$message({
				            type: 'success',
				            message: '添加记录成功'
				        });
					}else{
						this.$message({
				            type: 'info',
				            message: '添加记录失败'
				        });
					}
					this.remarkText=null; 		//清空输入框
				})
			},
			saveDemandStatus(id,status){					//需求列表状态改变（确认）
				var params={
					id:id,
					status:status
				};
				this.$confirm('您确定修改要当前需求的状态！', '修改提醒', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
          		  type: 'warning'
		          }).then(() => {
			            saveDemandStatus(params,res=>{
							if(res.msgCode==200){
								this.$message({
						            type: 'success',
						            message: '需求状态修改成功'
						        }); 
						        this.getDemandList();
							}else{
								this.$message({
						            type: 'info',
						            message: '需求状态修改失败'
						        });
							}
						})
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消修改'
			          });          
			        });
				
			},
			saveDemandStatusCancel(status){			//需求状态改变（作废）
				var params={
					id:this.cancelId,
					status:status,
					remark:this.remarkCancel||{}
				};
				saveDemandStatus(params,res=>{
					if(res.msgCode==200){
						this.$message({
				            type: 'success',
				            message: '需求状态修改成功'
				        }); 
				        this.cancelVisible=false;
				        this.getDemandList();
					}else{
						this.$message({
				            type: 'info',
				            message: '需求状态修改失败'
				        });
					}
				})
			},
			addDemand(){	//添加一条商品
				var params={
						model:null,
		        		productName:null,
		        		goodsType:null,
		        		quantity:null,
		        		budgetaryPrice:null
				}
				this.form.push(params);
			},
			delDemand(index){	//删除一条商品
				this.form.splice(index,1);
			},
			submitHandle(){		//添加需求提交
				var totolPrice=0;
				for(var i=0;i<this.form.length;i++){
					this.form[i].budgetaryPrice=Number(this.form[i].budgetaryPrice)
					totolPrice+=this.form[i].budgetaryPrice;
				}
				var params={
					customerId:this.getCustID,
					deliveryTime:formatDateTime(this.deliveryTime,1),
					remark:this.remark,
					budgetaryPrice:totolPrice,
					demandGoodsList:this.form
				}
				//检验填写内容是否为空
				var subStatus=false;
				for(var i=0;i<this.form.length;i++){
					var item=this.form[i];
					for(var key in item){
						if(item[key]==null ||item[key]==''){
							subStatus=false;
						}else{
							subStatus=true;
						}
					}
				}
				if(this.deliveryTime==null ||this.deliveryTime=="" ||this.remark==null ||this.remark==""){
					subStatus=false;
				}
				if(subStatus==false){
					this.$message('请填写完整的内容');
					return false
				}
				saveDemand(params,res=>{	//提交表单
					if(res.msgCode==200){
						this.$message({
				            type: 'success',
				            message: '添加需求成功'
				        }); 
					}else{
						this.$message({
				            type: 'info',
				            message: '添加需求失败'
				        });
					}
					this.needVisible=false;
					this.getDemandList();
				})
			},
			remoteMethod(query){ 	//搜索关键品牌
				if(query !== ''){
					this.optLoading=true
					getTable({title:query,pageSize:300,page:1},res=>{
						//console.log(res);
						this.goodsList=res.data.goodsList;
						setTimeout(()=>{
							this.optLoading=false
						},0)
						
					})
				}
			},
			confirmHandle(){	//确认选中品牌
				var selectGoodsList=[];
				this.goodsName.forEach(item=>{
					this.goodsList.forEach(res=>{
						if(res.title==item){
							selectGoodsList.push(res)
						}
					})
				})
				selectGoodsList=selectGoodsList.filter(item=>{
					return item.status!=2
				});
				//选中的列表添加到表格数据中
				selectGoodsList=JSON.parse(JSON.stringify(selectGoodsList));
				for(var i=0;i<selectGoodsList.length;i++){				
					this.offerList.push(selectGoodsList[i])
				}
				console.log(this.offerList);
				this.goodsName=[];
				
			},
			offerHandle(id){		//打开报价弹框,获取报价列表,折扣
				 this.offerVisible=true;
				 this.demandId=id;
				 getOfferInfo({demandId:id},res=>{
				 	
				 	if(res.data==null){
				 		this.offerStatus=false;		//offerStatus 为false是处于新增状态

				 	}else{
				 		this.offerStatus=true;
				 		this.offerList=res.data.offerInfo.goodsList;
				 		this.completedEditList=res.data.offerInfo.offerGoodsList;
				 		this.offerEditId=res.data.offerInfo.id;
				 		var colum=res.data.offerInfo;
				 		//此段为编辑状态下缺少的数据
				 		for(var i=0;i<colum.goodsList.length;i++){
				 			colum.offerGoodsList[i].catName=colum.goodsList[i].catName;
				 			colum.offerGoodsList[i].type=colum.goodsList[i].type;
				 			colum.offerGoodsList[i].title=colum.goodsList[i].title;
				 			colum.offerGoodsList[i].range=colum.goodsList[i].range;
				 			colum.offerGoodsList[i].accuracy=colum.goodsList[i].accuracy;
				 			colum.offerGoodsList[i].outputSignal=colum.goodsList[i].outputSignal;
				 			colum.offerGoodsList[i].deliveryTime=(new Date(colum.offerGoodsList[i].deliveryTime)).getTime();
				 			colum.goodsList[i].offer=colum.offerGoodsList[i].offer;//把报价塞回列表
				 			colum.goodsList[i].completeStatus=true;		//每个列表状态都是已编辑
				 		}
				 		console.log(this.completedEditList);

				 	}
				 })
				 getOptApplyiscount({demandId:id},res=>{
				 	this.getDiscount=res.data.disCount;
				 })
			},
			offerContentHandle(id){	//筛选出可编辑内容数据
				this.offerContentVisible=true;			
				var newArr=this.offerList.filter(item=>{
					return item.id==id
				})
				this.detailOfferPriceList=JSON.parse(JSON.stringify(newArr[0]));
				this.detailOfferPriceList.discount=this.getDiscount;
				//this.detailOfferPriceList.goodsOffer=2000;
				//debugger;
				if(this.completedEditList.length!=0){			//如何有保存信息，才进行过滤，查看是否保留过修改
					var editArr=this.completedEditList.filter(item=>{
						return item.id==id
					})
					if(editArr.length!=0){
						this.detailOfferPriceList=JSON.parse(JSON.stringify(editArr[0]));
					}
				}
			},
			comfirmOfferPrice(){	//确定报价内容,将编辑的内容保存起来
				this.$refs.detailOfferPriceList.validate(valid=>{
		    		if(valid){
		    			var priceDiscount=Number(this.detailOfferPriceList.offer)/Number(this.detailOfferPriceList.standardPrice)*100;
						this.$set(this.detailOfferPriceList,"finalDiscount",priceDiscount)
						if(priceDiscount<Number(this.detailOfferPriceList.discount)){
							this.$alert('最终折扣率低于你的权限,请您申请折扣或者修改价格', '折扣率提醒', {
					          confirmButtonText: '确定',
		        			});	
							return 
						}
						var idx;
						if(this.completedEditList.length!=0){			//如何有保存信息，才进行过滤，查看是否保留过修改
							for(var i=0;i<this.completedEditList.length;i++){
								if(this.completedEditList[i].id==this.detailOfferPriceList.id){
									idx=i;
								}
							}
						}

						if(typeof idx =="number"){
							this.completedEditList.splice(idx,1,this.detailOfferPriceList);
						}else{

							this.completedEditList.push(this.detailOfferPriceList);//暂时将编辑好的内容存到一个数组里，等待筛选
							
						}
						for(var s=0;s<this.offerList.length;s++){	//新增的报价商品回返回一个数据状态给this.offerList(已编辑)
							if(this.offerList[s].id==this.detailOfferPriceList.id){
								
								this.$set(this.offerList[s],'completeStatus',true);
								var newItem=this.offerList[s];
									newItem.offer=this.detailOfferPriceList.offer;
								//this.offerList[s]=newItem;
								//this.$set(this.offerList[s],'offer',this.detailOfferPriceList.offer);
								this.offerList.splice(s,1,newItem)
							}
						}
						console.log(this.offerList);
			 
						this.detailOfferPriceList={};
						this.offerContentVisible=false;
		    		}
		    	})	
			},
			delOfferOption(id){
				//根据id删除选中的内容
				
				var s=0;var f=0;
				for(var i=0;i<this.offerList.length;i++){
					if(this.offerList[i].id==id){ 				
							s=i;
					}
				}
				for(var j=0;i<this.completedEditList.length;j++){
					if(this.completedEditList[j].id==id){ 				
							f=j;
					}
				}
				this.offerList.splice(s,1);
				if(f!='' ||f!=null){this.completedEditList.splice(f,1)}
			},
			handleSelectionChange(val) {	//选中报价内容
				this.multipleSelection=val;
		    },
		    sureHandle(){
		    	//this.offerVisible=false;
		    	var j=[];
		    	
		    	for(var i=0;i<this.multipleSelection.length;i++){
		    		for(var s=0;s<this.completedEditList.length;s++){
		    			if(this.multipleSelection[i].id==this.completedEditList[s].id){
		    				j.push(i)
		    			}else{

		    			}
		    		}
		    	}

		    	//没有选中内容提醒
		    	if(j.length==0){
		    		this.$alert('没有可以提交的内容，请勾选完善内容', '报价提醒', {
			          confirmButtonText: '确定',
			        }).catch(() => {

               		});
			        return
		    	}else if(j.length!=0 &&this.multipleSelection.length!=this.completedEditList.length){	//编写内容与勾选对不上
		    		//debugger;
		    		this.$alert('勾选的内容没有完善信息', '报价提醒', {
			          confirmButtonText: '确定',
			        }).catch(() => {
			        	
               		});
			        return
		    	}else{

		    		this.paymentVisible=true;		    		
		    	}
		    },
		     validateOffer(){
		      	var priceDiscount=Number(this.detailOfferPriceList.offer)/Number(this.detailOfferPriceList.standardPrice)*100;
				this.$set(this.detailOfferPriceList,"finalDiscount",priceDiscount)
		    },
		    quotedPriceHandle(){
		    	this.$confirm('您确定申请报价！', '报价提醒', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	var totalOffer=0,discount=0,standardPrice=0,quantity=0,finalDiscount=0,paramsList=[];
			        	var goodsInfo;
			        	for(var i=0;i<this.completedEditList.length;i++){
			        		totalOffer +=Number(this.completedEditList[i].offer);	//总报价
			        		standardPrice+=Number(this.completedEditList[i].standardPrice);//总标准价
			        		discount=Number(this.completedEditList[i].discount);	//折扣率
			        		quantity+=Number(this.completedEditList[i].quantity);	//总数量
			        		paramsList.push({
								supplierId:65,// 供应商ID
								goodsNo:this.completedEditList[i].goodsNo,// 商品编号
								goodsInfo:this.completedEditList[i].catName+"—"+this.completedEditList[i].type+"—"+this.completedEditList[i].title+"—"+this.completedEditList[i].range+"—"+this.completedEditList[i].accuracy+"—"+this.completedEditList[i].outputSignal ,// 商品信息（名称，品牌，类别，型号）
								 productNo:this.completedEditList[i].productNo,// 产品编号
								 offer:Number(this.completedEditList[i].offer),// 商品报价
								 goodsOffer:Number(this.completedEditList[i].standardPrice),// 商品标准价
								 quantity:Number(this.completedEditList[i].quantity),// 数量
								 discount:Number(this.completedEditList[i].discount),// 业务员折扣率
								 finalDiscount:Math.round(this.completedEditList[i].finalDiscount*100)/100,// 最终折扣
								 deliveryTime:formatDateTime(this.completedEditList[i].deliveryTime,1)// 货期
					        })
			        	}
				        
			        	var params={
			        		 id:this.offerEditId ||{},
			        		 demandId:Number(this.demandId),
			        		 totalOffer:totalOffer,//总报价
			        		 goodsOffer:standardPrice,//总标准价
			        		 quantity:quantity,//总数量
			        		 discount:discount,//业务员折扣率
			        		 finalDiscount:Math.round((totalOffer/standardPrice)*100*100)/100, //最终折扣率
			        		 payment:this.payment,		//支付方式
			        		 offerGoodsList:paramsList
			        	}
			        	console.log(params);
			        	
			        	saveDemandOffer(params,res=>{
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
			        	this.paymentVisible = false;
			        	this.offerVisible=false;
			          

			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消报价'
			          });          
			        });

		    },
		    applicationHandle(){	//申请低折扣
		    	
		    	if(this.multipleSelection.length!=0){
					this.lowVisible=true;
					//this.discountsApplication=this.multipleSelection;
					// {{item.catName}}-{{item.type}}-{{item.title}}-{{item.range}}-{{item.accuracy}}-{{item.outputSignal}}
					for(var i=0;i<this.multipleSelection.length;i++){
						this.discountsApplication.goodsName+=this.multipleSelection[i].catName+"-"+this.multipleSelection[i].type+"-"+this.multipleSelection[i].title+"-"+this.multipleSelection[i].range+"-"+this.multipleSelection[i].accuracy+"-"+this.multipleSelection[i].outputSignal+"<br/>"
					}
					this.discountsApplication.orgDiscount=this.getDiscount;				
		    	}else{
		    		this.$message({
			            type: 'info',
			            message: '请勾选内容再进行申请低折扣'
			        });  
		    	}
		    },
		    disApplicationHandle(){					//确认提交申请折扣
		    	console.log(this.discountsApplication);
		    	this.discountsApplication.demandId =this.demandId;
		    	this.$refs.discountsApplication.validate(valid=>{
		    		if(valid){
		    			saveDiscountApply(this.discountsApplication,res=>{
		    				if(res.msgCode==200){
		    					this.$message({
						            type: 'success',
						            message: res.msg
						        });
						        this.lowVisible=false;
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

		},
		components:{
			customersContract
		}
	}
</script>
<style  lang="scss" scoped>
.customerDemand{
	padding:20px;
	box-sizing:border-box;
}
.customerDemand /deep/ th{
	background-color:#EFEDF0!important;
}
.customerDemand /deep/ ::-webkit-scrollbar {
	height:9px;
	width: 7px;
	// border-radius: 4px;
}
.offerPrice /deep/ ::-webkit-scrollbar {
	height:9px;
	width: 7px;
	// border-radius: 4px;
}
.customersContract{
	position:absolute;
	left:0;
	top:0;
	width:100%;
	min-height:100%;
	z-index:100;
	background-color:#fff;
}
</style>