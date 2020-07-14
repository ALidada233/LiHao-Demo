<template>
    <el-dialog
    :title="title"
    :visible="previewFileVisible"
    width="70%"
    class="previewFile"
    :append-to-body="true"
    :before-close="handleClose">
    <div style="text-align:center;">
        <object v-if="previewFileUrl&&previewFileUrl.toLowerCase().indexOf('pdf') !=-1"  :data="previewFileUrl" width="100%" height="500px" internalinstanceid="233"></object>
        <img v-else :src="previewFileUrl" alt="">
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">关闭</el-button>
    </span>
    </el-dialog>
</template>

<script>
    export default {
        name:"previewFile",
        props:{
            previewFileVisible:{
                type:Boolean
            },
            previewFileUrl:{
                type:String
            },
            title:{
                type:String,
                default:'需求附件'
            }
        },
        data(){
            return{

            }
        },
        methods: {
            handleClose(){
                this.$emit("closePreviewFile")
            }
        },
    }
</script>
<style lang="scss" scoped>
    .previewFile /deep/ .el-dialog{
        margin-top: 5vh!important;
    }
</style>
