<template>
  <div>
    <div class="disContent" v-for="(item,index) in technicalSupport" :key="index">
      <div class="disHeader">
        <div>
          <span style="color: #BF4243;">{{item.createName}}</span>
          <span v-if="item.department==0">( 有关部门 )</span>
          <span v-if="item.department==1">( 业务部 )</span>
          <span v-if="item.department==2">( 技术部 )</span>
          <span v-if="item.department==3">( 采购部 )</span>
          <span class="rpiTime" v-html="item.createTime" style="margin-left:10px;"></span>
          <p class="rpiHandle" style="float:right;">
            <span v-if="item.status==1" style="font-size:12px;color:#999;margin-right:10px;">状态（已完成）</span>
            <!-- <span
              v-if="item.status!=1"
              style="cursor: default;color: #3194d0;margin-right:10px;"
              class="iconfont"
              @click="completedSupport(item.id)"
            >&#xe687;</span>-->
            <!-- <span v-if="item.children.length>0">
              <i
                class="iconfont"
                v-if="item.foldStatus"
                @click="item.foldStatus=!item.foldStatus;"
                style="cursor:default;margin-right:10px;"
              >&#xe661;</i>
              <i
                class="iconfont"
                v-else
                @click="item.foldStatus=!item.foldStatus;"
                style="cursor:default;margin-right:10px;"
              >&#xe63d;</i>
            </span>-->
            <span class="file" v-if="item.optFile" @click="viewsFile(item.optFile)">文件</span>
            <!-- <span class="reply" @click="replyMsg(item)">回复</span> -->
          </p>
        </div>
        <p style="margin-top: 10px;color:#999;">{{item.remark}}</p>
        <div class="rpitem"></div>
      </div>

      <div class="disMain" v-if="item.children.length>0">
        <div
          style="padding:10px 0;border-bottom:1px solid #eee;"
          v-for="(item,index) in item.children"
          :key="index"
        >
          <div class="disMain_h">
            <span style="color: #BF4243;">{{item.createName}}</span>
            <span v-if="item.department==0">( 有关部门 )</span>
            <span v-if="item.department==1">( 业务部 )</span>
            <span v-if="item.department==2">( 技术部 )</span>
            <span v-if="item.department==3">( 采购部 )</span>
            <!-- <span v-if="item.createName!=item.pName"> -->
            <span style="color:#999;">回复：</span>
            <span>{{item.PName}}</span>
            <span v-if="item.PDepartment==0">( 有关部门 )</span>
            <span v-if="item.PDepartment==1">( 业务部 )</span>
            <span v-if="item.PDepartment==2">( 技术部 )</span>
            <span v-if="item.PDepartment==3">( 采购部 )</span>
            <span v-if="item.PRemark">【 {{item.PRemark.slice(0,10)+'...'}} 】</span>
            <!-- </span> -->
            <span class="rpiTime" style="margin-left:10px;">{{item.createTime}}</span>
            <p class="rpiHandle" style="float:right;">
              <span class="file" v-if="item.optFile" @click="viewsFile(item.optFile)">文件</span>
              <!-- <span class="reply" @click="replyMsg(item)">回复</span> -->
            </p>
          </div>
          <div class="disMain_c">
            <div class="disHeader">
              <p style="padding-left:20px;margin-top: 10px;">{{item.remark}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "technicalSupport",
  props: {
    technicalSupport: {
      type: Array
    }
  }
};
</script>
<style lang="scss" scoped>
.disContent {
  max-width: 900px;
  margin-bottom: 30px;
  margin-left: 100px;
}

.disHeader {
  font-size: 15px;
  line-height: 26px;
  word-wrap: break-word;
  word-break: break-all;
}

.rpitem {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.rpiTime,
.rpiHandle {
  font-size: 13px;
  color: #999;
  line-height: 17px;
}

.file {
  margin-right: 10px;
  cursor: default;
  color: #3194d0;
}

.reply {
  cursor: default;
}

.disMain {
  margin-top: 14px;
  padding: 32px 32px 22px 32px;
  background: #f5f7f9;
  border-radius: 4px;
  max-height: 380px;
  overflow-y: scroll;
}
.disMain_h {
  color: #999;
}
.isDot {
  position: relative;
}
.isDot:after {
  content: "";
  position: absolute;
  left: -8px;
  top: 0;
  height: 8px;
  width: 8px;
  background: red;
  border-radius: 50%;
}
.purchaseInquiry /deep/ .el-dialog {
  margin-top: 10px !important;
}
</style>
