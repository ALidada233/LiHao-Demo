<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-12 15:56:07
 * @LastEditTime: 2019-08-09 14:59:55
 * @LastEditors: Please set LastEditor3

 -->
<template>
  <div>
    <div style="text-align:right;">
      <i class="el-icon-close" style="font-size:20px;" @click="closeHandle()"></i>
    </div>
    <!-- 文章编辑项 -->
    <div>
      <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <el-form-item label="选择文章分类" style>
          <el-cascader
            style="width:42%;"
            :options="options"
            v-model="id"
            placeholder="请选择文章分类"
            @change="handleItemChange"
            change-on-select
            :props="props"
          ></el-cascader>
        </el-form-item>
        <div v-if="id&&id.length>0">
          <div style="width:50%;float:left;">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduct">
              <el-input type="textarea" :rows="4" v-model="form.introduct"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sortOrder">
              <el-input
                v-model="form.sortOrder"
                type="number"
                min="0"
                max="1000"
                style="width:100px;"
                @blur="vsSort(form.sortOrder)"
              ></el-input>
            </el-form-item>
            <el-form-item label="文章类型">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">资讯</el-radio>
                <el-radio :label="2">技术</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否上架">
              <el-radio-group v-model="form.auditStatus">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="0">下架</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否置顶">
              <el-radio-group v-model="form.isTop">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

          <div style="width:50%;float:left;">
            <el-form-item label="SEO标题" prop="seoTitle">
              <el-input v-model="form.seoTitle"></el-input>
            </el-form-item>
            <el-form-item label="SEO关键字" prop="seoKey">
              <el-input v-model="form.seoKey"></el-input>
            </el-form-item>
            <el-form-item label="SEO描述" prop="seoDescript">
              <el-input v-model="form.seoDescript"></el-input>
            </el-form-item>
            <el-form-item label="文章图片" prop="thumbUrl">
              <el-upload
                class="avatar-uploader"
                action="/nte-crm/uploadImage"
                :on-preview="handlePreview"
                :on-remove="handleRemoveImage"
                :before-remove="beforeRemove"
                :limit="5"
                accept=".jpg, .png, .JPEG, .PNG"
                :on-success="handleAvatarSuccess"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <img v-if="fileList.length>0" style="width:20%;" :src="fileList[0].url" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
          </div>
          <div style="clear:both"></div>
          <el-form-item label="文章阅读数">
            <el-input v-model="form.readNum" style="width:100px;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="跳转链接" v-if="pidLevel==66" prop="outLink">
            <el-input v-model="form.outLink" style="width:50%;"></el-input>
          </el-form-item>-->

          <el-form-item label="商品分类">
            <el-select v-model="form.catId" clearable placeholder="请选择" filterable>
              <el-option
                v-for="(item,index) in categoryList"
                :key="index"
                :label="item.catName"
                :value="item.catId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="应用行业">
            <el-select v-model="industryId" multiple clearable placeholder="请选择" filterable>
              <el-option
                v-for="(item,index) in industryList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关联商品">
            <el-select
              v-model="goodsModelId"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width:250px"
            >
              <el-option
                v-for="(item,index) in Goodsoptions"
                :key="index"
                :label="item.title"
                :value="item.modelId"
              >{{item.title}}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标签" v-if="tagList.length">
            <!-- 可选择的标签 -->
            <div>
              <el-tag
                v-for="(item,index) in tagList"
                :key="index"
                style="margin-right:5px;cursor:default;"
                @click="selTagHandle(item)"
              >{{item.name}}</el-tag>
            </div>

            <div
              style="padding:10px;box-sizing:border-box;border: 1px dashed #d9d9d9;border-radius:5px;margin:10px 0;"
            >
              <el-tag
                v-for="(item,index) in selTagList"
                :key="index"
                style="margin-right:5px;cursor:default;"
                type="success"
                closable
                @close="delTagHandle(item)"
              >{{item.name}}</el-tag>
            </div>
            <el-input v-model="newTag" style="width:120px;" clearable></el-input>
            <el-button size="small" type="primary" @click="addNewTag()">新增标签</el-button>
            <el-button size="small" type="danger" @click="selTagList=[];">清除所有标签</el-button>
          </el-form-item>
          <el-form-item label="内容" prop="introduct" class="detailContent">
            <!-- <editor ref="editor" v-model="form.content"/> -->
            <vue-ueditor-wrap v-model="form.content" :config="myConfig"></vue-ueditor-wrap>
            <div style="clear:both;"></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="closeHandle()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  getArtList,
  knowClassifyList,
  addArticle,
  updateArticle,
  searchGoodList
} from "util/req/articlelist/index";
//import Uediter from '@/components/ueditor.vue';
export default {
  name: "articleList",
  props: {
    editData: {
      type: Object
    },
    editState: {
      type: Boolean
    }
  },
  data() {
    return {
      msg: "",
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: "/nte-crm/ueditor/jsp/controller.jsp",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/static/UEditor/"
      },
      form: {
        activityId: 0,
        type: 1,
        auditStatus: 1,
        isTop: 0
      },
      rules: {
        id: {
          required: true,
          trigger: "blur",
          message: "文章类型不能为空 "
        },
        title: {
          required: true,
          trigger: "blur",
          message: "标题不能为空"
        },
        introduct: {
          required: true,
          trigger: "blur",
          message: "简介不能为空"
        },
        sortOrder: {
          required: true,
          trigger: "blur",
          message: "排序不能为空"
        },
        seoTitle: {
          required: true,
          trigger: "blur",
          message: "SEO标题不能为空"
        },
        seoKey: {
          required: true,
          trigger: "blur",
          message: "SEO关键字不能为空"
        },
        seoDescript: {
          required: true,
          trigger: "blur",
          message: "SEO描述不能为空"
        },
        // thumbUrl: {
        //   required: true,
        //   trigger: "blur",
        //   message: "文章图片不能为空"
        // },
        selTagList: {
          required: true,
          trigger: "blur",
          message: ""
        },
        topPage: {
          required: true,
          trigger: "blur",
          message: "可查看的页数不能为空"
        },
        totalPage: {
          required: true,
          trigger: "blur",
          message: "总页数不能为空"
        },
        content: {
          required: true,
          trigger: "blur",
          message: "文章内容不能为空"
        },
        videoUrl: {
          required: true,
          trigger: "blur",
          message: "视频地址不能为空"
        },
        industryId: {
          required: true,
          trigger: "blur",
          message: "应用行业不能为空"
        },
        cmsCategoryId: {
          required: true,
          trigger: "blur",
          message: "传感器类别不能为空"
        },
        platformScore: {
          required: true,
          trigger: "blur",
          message: "平台评分不能为空"
        },
        brandId: {
          required: true,
          trigger: "blur",
          message: "商品品牌不能为空"
        },
        outLink: {
          required: true,
          trigger: "blur",
          message: "外部链接不能为空"
        }
      },
      props: {
        value: "id",
        label: "name",
        children: "children"
      },
      options: [],
      newTag: null, //新增标签里面的内容
      id: null, //文章分类的数组集合
      ptId: null, //当前级的父id
      typeId: null, //当前级id
      imageUrl: "",
      tagList: [], //标签列表
      selTagList: [], //选中标签
      fileListEnclosure: [],
      categoryList: [], //商品分类列表
      industryId: null, //应用行业
      industryList: [], //应用行业列表
      thumbUrl: "", //图片
      fileList: [], //上传图片
      //
      Goodsoptions: [], //下拉框数据
      goodsModelId: [], //搜索的商品
      modelId: [],
      loading: false,
      states: [] //请求到的数据
    };
  },
  watch: {
    id(arr) {
      //获取分类的当前id与父id
      let copyArr = JSON.parse(JSON.stringify(arr));
      this.typeId = copyArr.pop();
      this.ptId = copyArr.pop() || this.typeId;
    }
  },
  mounted() {
    this.knowClassifyList();
    this.editDataHandle();
  },
  methods: {
    remoteMethod(query) {
      //当输入值发生改变时
      if (query !== "") {
        if (query.length > 2) {
          this.loading = true;
          searchGoodList({ title: query, indexStr: "A" }, res => {
            if (res.msgCode == "200") {
              res = res.data;
              this.states = res.goodsList;
              console.log("res", this.states);
              if (this.states.length == 0) {
                this.Goodsoptions = [];
                this.loading = false;
              } else {
                this.Goodsoptions = this.states;
                this.loading = false;
              }
            }
          });
        }
      } else {
        this.Goodsoptions = [];
      }
    },
    searchGoodList1(query) {
      //根据商品名搜索商品
      searchGoodList({ title: query }, res => {
        if (res.msgCode == "200") {
          res = res.data;
          this.states = res.goodsList;
          console.log("模糊搜索的商品列表states", this.states);
        }
      });
    },
    vsSort(sort) {
      if (sort > 99) {
        this.form.sortOrder = 99;
      }
    },
    handlePreview(file) {
      //console.log(file);
    },
    handleRemoveImage(file, fileList) {
      this.thumbUrl = null;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning("当前只允许传输一个文件");
    },
    handleAvatarSuccess(res, file) {
      this.fileList = [{ name: res.data.url, url: res.data.url }];
      this.thumbUrl = res.data.url;
    },
    //回显数据处理
    editDataHandle() {
      let goodsList = [];
      if (this.editData) {
        console.log("获得数据", this.editData);
        let kcmsDto = this.editData.article;
        let goodsList = this.editData.goodsList;
        this.getArtList(kcmsDto.typeId);

        this.form = {
          activityId: kcmsDto.activityId,
          auditStatus: kcmsDto.auditStatus, //状态
          content: kcmsDto.content, //内容
          id: kcmsDto.id, //id
          introduct: kcmsDto.introduct, //简介
          isTop: kcmsDto.isTop, //置顶
          typeId: kcmsDto.typeId, //分类id
          ptId: kcmsDto.ptId, //分类id父id
          readNum: kcmsDto.readNum, //阅读数
          seoDescript: kcmsDto.seoDescript, //seo描述
          seoKey: kcmsDto.seoKey, //seo关键字
          seoTitle: kcmsDto.seoTitle, //seo标题
          sortOrder: kcmsDto.sortOrder, //排序
          thumbUrl: kcmsDto.thumbUrl, //图片
          title: kcmsDto.title, //标题
          type: kcmsDto.type, //文章类型
          catId: kcmsDto.catId, //商品分类
          industryId: kcmsDto.industryId, //
          goodsModelId: null //关联商品
        };
        this.id =
          kcmsDto.ptId == kcmsDto.typeId
            ? [kcmsDto.typeId]
            : [kcmsDto.ptId, kcmsDto.typeId];
        this.thumbUrl = kcmsDto.thumbUrl;
        this.industryId = kcmsDto.industryId.split("|").map(Number);
        this.Goodsoptions = goodsList;
        for (let index = 0; index < goodsList.length; index++) {
          this.goodsModelId.push(goodsList[index].modelId);
        }
        console.log("goodsModelId=========", this.goodsModelId);

        let tag = kcmsDto.tag.split("|");
        this.selTagList = [];
        let otherTag = JSON.parse(JSON.stringify(tag));
        setTimeout(() => {
          tag.forEach(row => {
            this.tagList.forEach((item, index) => {
              if (!this.editState && item.name == row) {
                this.selTagList.push(item);
                otherTag.splice(otherTag.indexOf(row), 1);
              } else if (this.editState && item == row) {
                this.selTagList.push(item);
                otherTag.splice(otherTag.indexOf(row), 1);
              }
            });
          });
          otherTag.forEach(item => {
            if (item) {
              this.selTagList.push({
                hotNum: null,
                id: parseInt(Math.random() * (10000 - 1000 + 1) + 1000, 10),
                name: item,
                type: 1
              });
            }
          });
        }, 2000);
        this.fileList = kcmsDto.thumbUrl
          ? [{ name: kcmsDto.thumbUrl, url: kcmsDto.thumbUrl }]
          : [];
      }
    },
    closeHandle() {
      this.$parent.detailVisible = false;
      this.$parent.getPageList();
      this.$parent.editState = false;
      this.$parent.editData = null;
    },
    submitUploadEnclosure(res, file) {
      this.form.absfileOne = res.data.url;
      this.form.fileName = res.data.orgName;
      this.form.extName = res.data.extName;
    },
    handleRemoveEnclosure() {
      this.form.absfileOne = null;
      this.form.fileName = null;
      this.form.extName = null;
    },
    //获取标签，传感说行业，类型
    getArtList(id) {
      getArtList({ id: id }, res => {
        // console.log("获取标签行业类型", res);
        this.tagList = res.data.tagList;
        this.categoryList = res.data.cateList;

        // this.brandList = res.data.brandList;
        this.industryList = res.data.industryList; //应用行业列表
        console.log("商品分类列表", this.categoryList);
        console.log("应用行业列表", this.industryList);
        // this.cmsCategoryList = res.data.cmsCategoryList; //传感器类别列表
      });
    },
    //获取文章分类，级联
    knowClassifyList() {
      knowClassifyList({}, res => {
        this.options = res.data;
        console.log("文章分类", this.options);
      });
    },
    //选中标签
    selTagHandle(item) {
      console.log("标签item", item);
      let sameTag = this.selTagList.filter(row => {
        return row.id == item.id;
      });
      if (sameTag.length == 0) {
        this.selTagList.push(item);
      }
    },
    //删除标签
    delTagHandle(item) {
      let sameTag = this.selTagList.forEach((row, index) => {
        if (row.id == item.id) {
          this.selTagList.splice(index, 1);
        }
      });
    },
    //文章类型选择(切换清除数据)
    handleItemChange(val) {
      let id = val[val.length - 1];
      this.getArtList(id);
      // this.removeDataHandle();
    },
    removeDataHandle() {
      //清除数据
      this.imageUrl = null;
      this.newTag = null;
      this.selTagList = []; //选中标签
      this.fileList = [];
      this.industryId = null; //应用行业
      this.goodsModelId = []; //关联商品型号ID
      this.cmsCategoryId = null; //传感器类别
      this.fileListEnclosure = [];
      this.form = {
        cmsType: 1,
        needVip: 0,
        activityId: 0,
        videoUrl: null
      };
    },

    addNewTag() {
      if (this.newTag) {
        let sameTagName = this.selTagList.filter(item => {
          return item.name == this.newTag;
        });
        if (sameTagName && sameTagName.length > 0) return;
        this.selTagList.push({
          hotNum: null,
          id: parseInt(Math.random() * (10000 - 1000 + 1) + 1000, 10),
          name: this.newTag,
          type: 1
        });
        console.log("新增后的标签", this.selTagList);
        this.newTag = null;
      }
    },

    onSubmit() {
      if (this.fileList.length == 0) {
        this.$message.warning("图片不能为空");
        return;
      }
      let params = JSON.parse(JSON.stringify(this.form));
      params.typeId = this.typeId;
      params.ptId = this.ptId;
      params.tag = this.selTagList
        .reduce((prev, item, index) => {
          prev.push(item.name);
          return prev;
        }, [])
        .join("|");
      params.thumbUrl = this.thumbUrl;

      params.industryId = this.industryId.join("|"); //应用行业
      params.goodsId = this.goodsModelId.join(","); //关联商品
      console.log("goodsModelId", this.goodsModelId.join(","));
      console.log("关联商品", params.goodsId);
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.id) {
            this.$message({
              message: "分类不能为空",
              type: "warning"
            });
            return;
          }
          if (this.industryId && this.industryId.length == 0) {
            this.$message({
              message: "应用行业不能为空",
              type: "warning"
            });
            return;
          }
          this.$confirm("此操作将新增该文章, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              if (this.editState) {
                updateArticle(params, res => {
                  if (res.msgCode == 200) {
                    this.$message({
                      type: "success",
                      message: res.msg
                    });
                    this.closeHandle();
                  } else {
                    this.$message({
                      type: "error",
                      message: res.msg
                    });
                  }
                });
              } else {
                console.log("参数", params);
                addArticle(params, res => {
                  if (res.msgCode == 200) {
                    this.$message({
                      type: "success",
                      message: res.msg
                    });
                    this.removeDataHandle();
                  } else {
                    this.$message({
                      type: "error",
                      message: res.msg
                    });
                  }
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "已取消"
              });
            });
        }
      });
    }
  },
  components: {
    //  editor:()=>import('@/components/common/editor'),
    vueUeditorWrap: () => import("vue-ueditor-wrap")
  }
};
</script>
<style lang=scss scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px !important;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
