<template>
  <div>
    <el-input style="width:200px;margin-bottom:10px;" placeholder="请输入商品名称" v-model="title" clearable></el-input>
    <el-input style="width:200px;margin-bottom:10px;" placeholder="请输入量程" v-model="range" clearable></el-input>
    <el-input style="width:200px;margin-bottom:10px;" placeholder="请输入精度" v-model="accuracy" clearable></el-input>
    <el-input style="width:200px;margin-bottom:10px;" placeholder="请输入输出信号" v-model="outputSignal" clearable></el-input>
    <el-select v-model="bePartNo" v-show="bePartNoOptions.length>0" :popper-append-to-body="false" multiple clearable  placeholder="请选择辅件编码">
      <el-option
        v-for="item in bePartNoOptions"
        :key="item.modelNo"
        :label="item.title+'-'+item.describe+'-'+'价格'+'￥：'+item.price"
        :value="item.modelNo">
      </el-option>
    </el-select>
  <el-button type="primary" style="margin-bottom:10px;" icon="el-icon-search" @click="getGoodsList"></el-button>
  <el-button icon="el-icon-refresh" style="margin-bottom:10px;"  @click="refreshHandle"></el-button>
    <el-table :data="dataList" :header-cell-style="{background:'#ffffff!important'}" style="width: 100%;margin-bottom:10px;"
      :border="true" v-loading="loading" ref="table" @selection-change="handleSelectionChange">
    <el-table-column
      label="选中" 
      align="center"
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column prop="title" label="商品名称" align="center" width="120">
        <template slot-scope="scope">
          <span style="color:#409EFF;cursor: default;">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="brandName" width="100" align="center" label="品牌">
      </el-table-column>
      <el-table-column prop="describe" label="商品描述" align="center" width="180">
      </el-table-column>
      <el-table-column prop="categoryIdfName" align="center" width="110" label="类别">
      </el-table-column>
      <el-table-column prop="goodsImg" label="商品图片" align="center" width="110">
        <template slot-scope="scope">
          <img style="height:50px;" :src="scope.row.goodsImg" @click="showImage(scope.row.goodsImg)">
        </template>
      </el-table-column>
      <el-table-column prop="range" align="center" label="量程">
      </el-table-column>
      <el-table-column prop="accuracy" align="center" label="精度" width="100">
      </el-table-column>
      <el-table-column prop="outputSignal" align="center" label="输出信号" width="100">
      </el-table-column>
      <el-table-column prop="stock" align="center" label="库存" width="80">
      </el-table-column>
      <el-table-column prop="bePartNoStr" label="关联辅件" align="center" width="320">
        <template slot-scope="scope">
          <div v-for="(item,index) in (scope.row.bePartNoStr.split('|'))" :key="index" style="text-align:left;">
            {{item}}<br>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="goodsNo" label="商品编码" align="center" width="120">
      </el-table-column>
      <el-table-column align="center" prop="modelNo" width="120" label="型号编码">
      </el-table-column>
      <el-table-column align="center" prop="createName" width="78" label="创建人">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" style="margin-bottom:10px;" icon="el-icon-check" @click="selGoodsArr">确认选中</el-button>
  </div>

</template>
<script>
  import {
    getGoodsList
  } from "util/req/offerList/index";
  export default {
    name: 'selGoods',
    data(){
      return {
        dataList: [],
        loading: false,
        title:null,// 商品名称
        range:null,//  量程
        accuracy:null,//  精度
        outputSignal:null,//  输出信号
        bePartNo:[],//选中的辅件
        bePartNoOptions:[],// 辅件编码
        multipleSelection:[]  //选中的商品
      }
    },
    methods: {
      getGoodsList(){ //查询商品
        var params={
          isParts:0
        }
        if(this.title){
          params.title=this.title;
        }
        if(this.range){
          params.range=this.range;
        }
        if(this.accuracy){
          params.accuracy=this.accuracy;
        }
        if(this.bePartNo.length>0){
          params.bePartNo=this.bePartNo.join(',')
        }
        this.loading=true;
        
        getGoodsList(params,res=>{
          this.loading=false;
          if(res.msgCode==200){
            this.dataList=res.data.goodsList;
            if(this.bePartNo.length>0){return}
            var allBePartNo=[];
            res.data.goodsList.forEach((item,index)=>{
              if(item.partList.length>0){
                allBePartNo=allBePartNo.concat(item.partList)
              }
            })
           if(allBePartNo){
              var obj = {};
              allBePartNo = allBePartNo.reduce(function(item, next) {
                obj[next.modelId] ? '' : obj[next.modelId] = true && item.push(next);
                return item;
              }, []);
              this.bePartNoOptions=allBePartNo;
           }
          }
        })
      },
      refreshHandle(){  //重置条件
        this.title=null// 商品名称
        this.range=null//  量程
        this.accuracy=null//  精度
        this.outputSignal=null//输出信号
        this.bePartNo=[]//选中的辅件
        this.bePartNoOptions=[]//辅件编码
        this.dataList=[];
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      selGoodsArr(){  //选中商品
        var selGoodsArr=this.multipleSelection.filter(item=>{
          return item.delFlag==1
        })
        var unconfirmedArr=this.multipleSelection.filter(item=>{
          return item.delFlag==2
        })
        if(unconfirmedArr.length>0){
          unconfirmedArr.forEach(row=>{
            this.$alert('商品：'+row.title+'，商品编码：'+row.modelNo+' 状态未确认，不加入报价列表', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          })
        }
        this.$emit("emitGoodsList",JSON.parse(JSON.stringify(selGoodsArr)))
        this.multipleSelection=[];
        this.refreshHandle();
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>
