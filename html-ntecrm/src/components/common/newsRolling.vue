<template>
  <div :class="$route.path=='/admin/home'?'': 'roll'">
    <h2 style="padding: 10px  ;border-bottom: 1px solid #ddd;background:#fff;border-radius: 5px;">
      <i class="iconfont" :style="{color:this.$store.state.themeColor.headerColor}">&#xe6d0;</i>
      <span style="font-size:16px;padding-top:10px;">系统公告</span>
      <i class="right el-icon-plus" style="padding-right: 10px;font-size: 16px;line-height: 25px;cursor:default;" v-if="roleId==36||roleId==37||roleId==39" @click="noticedialogFormVisible=true"></i>
    </h2>
    <div style="background:#fff;padding:10px;border-bottom: 1px solid #eee;height:145px;overflow-y: scroll;">
      <p  class="ellipsis"  v-for="(item,index) in prizeList" :key="index" :style="{'color':(index<5?'#409EFF':''),'line-height':'30px'}">
        <i class="iconfont" v-if="roleId==36||roleId==37||roleId==39" @click="editNotice(item)" style="color:#999;cursor:default;font-size: 12px;">&#xe687;</i>
        <span  style="cursor:default;padding-left: 5px;" @click="viewDetail(item.remark,1,item.createTime)">{{item.remark}}</span> 
      </p>
    </div>
    <!-- <div class="scroll-wrap"  v-if="prizeList.length>5">
       <div class="scroll-content" :style="{ top }" @mouseenter="Stop()" @mouseleave="Up()">
          <p v-for="(item,index) in prizeList" :key="index" class="ellipsis" style="color:#333;padding-left:10px;">
          <i class="iconfont" v-if="roleId==36||roleId==37||roleId==39" @click="editNotice(item)" style="color:#999;cursor:default;font-size: 12px;">&#xe687;</i>
          <span style="cursor:default;padding-left: 5px;" @click="viewDetail(item.remark,1,item.createTime)">{{item.remark}}</span> 
          </p>  
       </div>
    </div> -->
    <!-- 昨日新增客户 -->
    <div style="background:#fff;margin-top:10px;min-height: 300px;margin-bottom: 10px;">
      <div style="margin-top: 10px;padding: 10px;">
        <i class="iconfont" :style="{color:this.$store.state.themeColor.headerColor}">&#xe628;</i>
        <span style="font-size:16px;padding-top:10px;">昨日新增客户</span> 
      </div>
      <div>
        <el-radio-group v-model="selTimeState" 
          style="display:flex;justify-content: space-around;margin-bottom:5px;"
          class="selTime"
          @change="getCycleCustmoer">
          <el-radio :label="1">今日</el-radio>
          <el-radio :label="2">昨日</el-radio>
          <el-radio :label="3">上周</el-radio>
          <el-radio :label="4">本周</el-radio>
        </el-radio-group>
      </div>
      <div v-if="cusLists.length>0">
        <p style="padding:5px 8px;font-size: 12px;color: #999;"
        v-for="(item,index) in cusLists" :key="index">
        {{"• "+item.salesmanName+" : "+item.custCompanyName+'-'+item.conInfo}}
        </p>
      </div>
      <div v-else style="text-align:center;color:#999;">
        <i class="iconfont" style="display: inline-block;margin-top: 50px;">&#xe611;</i><br>
        <i>暂无数据</i>
      </div>
      
    </div>
    <h2 class="clearPa" style="margin-top: 10px;padding:10px;border-bottom: 1px solid #ddd;background:#fff;">
      <i class="iconfont" :style="{color:this.$store.state.themeColor.headerColor}">&#xe65d;</i>
      <span style="font-size:16px;">记录本</span>
      <i class="right el-icon-plus" style="padding-right: 10px;font-size: 16px;line-height: 25px;cursor:default;" @click="editRecord()"></i>
    </h2>
    <div class="aside_two_center moreellipsis" style="">
      <p v-for="(item,index) in recordContent" :key="index" class="ellipsis" style="color:#333;padding-left:10px;">
        <i class="iconfont"  @click="editRecord(item)" style="color:#999;cursor:default;font-size: 12px;">&#xe687;</i>
        <span style="cursor:default;padding-left: 5px;" @click="viewDetail(item.remark,2,item.createTime)">{{item.remark}}</span> 
      </p> 
    </div>
    <h2 class="clearPa" style="margin-top: 10px;padding:10px;border-bottom: 1px solid #ddd;background:#fff;">
      <i class="iconfont" :style="{color:this.$store.state.themeColor.headerColor}">&#xe626;</i>
      <span style="font-size:16px;">分享记事</span>
    </h2>
    <div class="aside_two_center moreellipsis" style="">
      <p v-for="(item,index) in shareList" :key="index" class="ellipsis" style="color:#333;padding-left:10px;">
        <span style="cursor:default;padding-left: 5px;" @click="viewDetail(item.remark,3,item.createTime,item)">{{item.remark}}</span> 
      </p> 
    </div>

    <el-dialog :title="selRecord!=null?'编辑记事本':'新增记事'" :append-to-body="true" :visible.sync="dialogFormVisible">
      <el-form v-model="recordEvent">
        <el-form-item label="">
          <el-input type="textarea" :rows="12" v-model="recordEvent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitShare">报备</el-button>
        <el-button type="primary" @click="submitRecord">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="selNotice!=null?'编辑公告':'新增公告'" :append-to-body="true"  :visible.sync="noticedialogFormVisible">
      <el-form v-model="recordEvent">
        <el-form-item label="">
          <el-input type="textarea" :rows="12" v-model="noticeEvent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noticedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNotice">确 定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog
      :title="viewTitle"
      :visible.sync="detailVisible"
      width="50%"
      :append-to-body="true" 
      >
      <div class="detailSty">
      <el-input type="textarea" :rows="15" v-model="detail" style="color:#000;"  disabled></el-input>
      <div v-if="detailTime" style="text-align:right;margin-top:10px;">
        <span>{{detailTime}}</span>
        <span style="margin-left:10px;" v-if="createName">创建人： {{createName}}</span>
      </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="this.title==2" type="primary" @click="submitShare">报备</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import {getPlacard,getNotebook,saveSystemMsg,getCycleCustmoer} from "util/req/notice/index";

  export default {
    name: 'complexTable',
    data() {
      return {
        prizeList: [
          {remark:null}
        ],
        activeIndex: 0,
        intnum: undefined,
        dialogFormVisible:false,
        noticedialogFormVisible:false,
        detailVisible:false,
        recordEvent:null,
        noticeEvent:null,
        selNotice:null,
        selRecord:null,
        detail:null,
        detailTime:null,
        createName:null,
        title:1,
        viewTitle:'',
        recordContent:[],
        shareList:[],
        roleId:JSON.parse(sessionStorage.getItem('userDto')).roleId||null,
        selTimeState:2,
        cusLists:[] //新增客户列表
      }
    },
    computed: {
      top() {
        return -this.activeIndex * 30 + 'px';
      }
    },
    watch: {
      detailVisible(status){
        if(!status){
          this.detailTime=null;
          this.createName=null;
          this.detail=null;
          this.title=null;
        }
      },
      dialogFormVisible:function(val){
        if(!val){
          this.recordEvent=null;
          this.selRecord=null;
        }
      },
      noticedialogFormVisible:function(val){
        if(!val){
          this.noticeEvent=null;
          this.selNotice=null;
        }
      },
      title:function(num){
        if(num==1){
          this.viewTitle='系统公告';
        }else if(num==2){
          this.viewTitle='记事本'
        }else{
          this.viewTitle='报备'
        }
      }
    },
    created() {
      this.ScrollUp();
    },
    methods: {
      ScrollUp() {
        if(this.prizeList.length>5){
          this.intnum = setInterval(_ => {
              if (this.activeIndex < this.prizeList.length) {
                this.activeIndex += 1;
                //var item=this.prizeList.splice(0,1)
               // this.prizeList.push(this.prizeList[this.activeIndex])
              } else {
                this.activeIndex = 0;
              }
            },
            1000);
          }
      },
      Stop() {
        clearInterval(this.intnum);
      },
      Up() {
        this.ScrollUp();
      },
      getPlacard(){   //获取公告列表
        getPlacard(res=>{
          this.prizeList=res.data;
        })
      },
      getNotebook(){  //获取记事
        getNotebook({},res=>{
          if(!res.data){
            this.recordContent=[];
          }else{
            this.recordContent=res.data;
          }   
        })
      },
      getSharebook(){   //获取分享
          getNotebook({isShare:1},res=>{
          if(!res.data){
            this.shareList=[];
          }else{
            this.shareList=res.data;
          }   
        })
      },
      submitNotice(){
        var params={
          type:1,
          remark:this.noticeEvent
        }
        if(!this.noticeEvent){
          this.$message({
            message: '输入内容不能为空',
            type: 'warning'
          });
          return
        }
        if(this.selNotice){
          params.id=this.selNotice.id;
        }
        saveSystemMsg(params,res=>{
          if(res.msgCode==200){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.noticedialogFormVisible=false;
            this.getPlacard();
          }else{
            this.$message({
              message: res.msg,
              type: 'info'
            });
          }
        }) 
      },
      editNotice(item){
        this.noticedialogFormVisible=true;
        this.noticeEvent=item.remark;
        this.selNotice=item;
      },
      editRecord(item){
        this.dialogFormVisible = true;
        if(item){
          this.recordEvent=item.remark;
          this.selRecord=item;
        }
      },
      submitRecord(){
        var params={
          type :0,
          remark:this.recordEvent
        }
        if(this.selRecord){
          params.id=this.selRecord.id
        }
        if(!this.recordEvent){
          this.$message({
            message: '输入内容不能为空',
            type: 'warning'
          });
          return
        }
        saveSystemMsg(params,res=>{
          if(res.msgCode==200){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.dialogFormVisible=false;
            this.getNotebook();
          }else{
            this.$message({
              message: res.msg,
              type: 'info'
            });
          }
        }) 
      },
      viewDetail(text,status,time,item={}){
        if(!text){return}
        this.title=status;
        this.detail=text;
        this.detailTime=time;
        if(Object.keys(item).length>0){
          this.createName=item.createName;
        } 
        this.detailVisible=true;
      },
      submitShare(){  //分享
        this.$confirm('是否分享此条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           var params={
            type :0,
            remark:this.recordEvent,
            isShare:1
          }
          if(this.title==2){
            params.remark=this.detail;
          }
          if(this.selRecord){
            params.id=this.selRecord.id
          }
          if(!params.remark){
            this.$message({
              message: '内容不能为空',
              type: 'warning'
            });
            return
          }
          console.log(params)
          saveSystemMsg(params,res=>{
            if(res.msgCode==200){
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.dialogFormVisible=false;
              this.detailVisible=false;
              this.getSharebook();
            }else{
              this.$message({
                message: res.msg,
                type: 'info'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消分享'
          });          
        });
      },
      //获取昨日新增客户
      getCycleCustmoer(){
        var now = new Date()
        var lastDay = new Date()
        lastDay.setDate(lastDay.getDate() - 1)
        var nowDayOfWeek = now.getDay()
        var nowDay = now.getDate()
        var nowMonth = now.getMonth()
        var nowYear = now.getYear()
        nowYear += (nowYear < 2000) ? 1900 : 0
        var lastMonthDate = new Date()
        lastMonthDate.setDate(1)
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
        var lastMonth = lastMonthDate.getMonth();
        let params={};
        if(this.selTimeState==1){//今日
          params.startTime=this.formatDate(now)
          params.startEnd=this.formatDate(now)
        }else if(this.selTimeState==2){// 昨日
          params.startTime=this.formatDate(lastDay)
          params.startEnd=this.formatDate(lastDay)
        }else if(this.selTimeState==3){// 上周
          params.startTime=this.formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7))
          params.startEnd=this.formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1))
        }else if(this.selTimeState==4){// 本周
          params.startTime=this.formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek))
          params.startEnd=this.formatDate(new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)))
        }
        getCycleCustmoer(params,res=>{
          this.cusLists=res.data;
        })
      },
      //时间处理
      formatDate(date) {
        var myyear = date.getFullYear()
        var mymonth = date.getMonth() + 1
        var myweekday = date.getDate()
        if (mymonth < 10) {
          mymonth = '0' + mymonth
        }
        if (myweekday < 10) {
          myweekday = '0' + myweekday
        }
        return (myyear + '-' + mymonth + '-' + myweekday)
      }
    },
    mounted(){
      this.getPlacard();
      this.getNotebook();
      this.getSharebook();
      this.getCycleCustmoer();
    }
  }

</script>

<style lang="scss" scoped>
  .scroll-wrap {
    background: #fff;
    height: 200px;
    overflow: hidden;
  }

  .scroll-content {
    background: #fff;
    position: relative;
    transition: top 0.5s;
  }

  .scroll-content p {
    line-height: 30px;
    text-align: left;
  }
  .ellipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .aside_two_center{
    background: #fff;
    height: 250px;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    line-height: 25px;
  }
  .moreellipsis{
   overflow-y: scroll;
  }
  .aside_two_center /deep/ .el-textarea__inner{
    color:#999!important;
  }
  .detailSty /deep/ .el-textarea__inner{
    color:#333!important;
  }
  .roll{
    height: 100vh;
    overflow-y: scroll;
  }
  .roll::-webkit-scrollbar-thumb {
  	  background-color: #ddd;
      border-radius: 4px;
  	  /*border-radius:5px;*/
  }
  .selTime /deep/ .el-radio+.el-radio{
    margin: 0;
  }
</style>
