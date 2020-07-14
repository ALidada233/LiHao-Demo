<template>
  <div class="goods">
    <div>
      <!-- 条件查询： -->
      <el-select
        v-model="chooseOpt"
        placeholder="请选择"
        size="medium"
        style="width:120px;margin-top: 15px;"
      >
        <el-option
          v-for="item in optionsSel"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        style="width: 25%;margin-top: 20px;"
        placeholder="请输入商品信息"
        size="medium"
        v-model="searchContent"
        clearable
      ></el-input>
      <span style="color:#999999">库存>=</span>
      <el-input
        type="number"
        min="0"
        style="width: 180px;margin-top: 20px;"
        placeholder="0: 无库存 空：全部 "
        size="medium"
        v-model="stocks"
        clearable
      ></el-input>
      <el-select
        v-model="type"
        :clearable="true"
        placeholder="请选择折扣类型"
        size="medium"
        style="width:150px;margin-top: 10px;"
      >
        <el-option label="面价" value="A">面价</el-option>
        <el-option label="底价" value="B">底价</el-option>
        <el-option label="建议销售价" value="C">建议销售价</el-option>
      </el-select>
      <el-select
        v-model="categoryIdf"
        :clearable="true"
        placeholder="请选择商品类别"
        size="medium"
        style="width:150px;margin-top: 10px;"
      >
        <el-option
          v-for="(item,index) in categoryList"
          :key="index"
          :label="item.catName"
          :value="item.catId"
        ></el-option>
      </el-select>
      <el-select
        v-model="delFlag"
        :clearable="true"
        placeholder="请选择商品状态"
        size="medium"
        style="width:150px;margin-top: 10px;"
      >
        <el-option label="待确认" value="2">待确认</el-option>
        <el-option label="已确认" value="1">已确认</el-option>
      </el-select>
      <el-button
        type="primary"
        size="medium"
        style="margin-top: 10px;"
        @click="searchHandle"
        icon="el-icon-search"
      ></el-button>
      <el-tooltip class="item" effect="dark" content="重置" placement="top">
        <el-button
          size="medium"
          style="margin-top: 10px;margin-left: 0;"
          @click="resetHandle"
          icon="el-icon-refresh"
        ></el-button>
      </el-tooltip>
      <el-button
        type="primary"
        size="medium"
        style="margin-top: 10px;"
        @click="goodsVisible=true"
        icon="el-icon-plus"
      ></el-button>
      <el-button
        type="warning"
        size="medium"
        style="margin-top: 10px;"
        @click="excelVisible=true"
        icon="el-icon-document"
      >导出Excel</el-button>
    </div>
    <div class="goodsTable clearPa">
      <el-table
        :data="dataList"
        style="width: 100%"
        :border="true"
        :height="tableHeight"
        v-loading="loading"
        ref="table"
      >
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              icon="el-icon-edit"
              @click="editGoods(scope.row)"
            ></el-button>
            <el-tooltip class="item" effect="dark" content="添加属性" placement="right">
              <el-button
                size="mini"
                round
                type="primary"
                icon="el-icon-plus"
                @click="typeHandle(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-button
              size="mini"
              round
              type="success"
              v-if="scope.row.modelNo && scope.row.delFlag==2"
              style="margin-top:10px;"
              icon="el-icon-check"
              @click="delHandle(scope.row,'confirm')"
            ></el-button>
            <el-button
              size="mini"
              round
              type="danger"
              v-if="scope.row.modelNo"
              icon="el-icon-delete"
              @click="delHandle(scope.row,'del')"
            ></el-button>
          </template>
        </el-table-column>

        <el-table-column prop="title" label="商品名称" align="center" width="120">
          <template slot-scope="scope">
            <!-- <span style="color:#409EFF;cursor: default;" @click="showDetail(scope.row.goodsNo)">{{scope.row.title}}</span> -->
            <span style="color:#409EFF;cursor: default;">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="brandName" width="100" align="center" label="品牌"></el-table-column>
        <el-table-column prop="remark" label="定制备注" align="center" width="120"></el-table-column>
        <el-table-column prop="describe" label="商品描述" align="center" width="180"></el-table-column>
        <el-table-column prop="categoryIdfName" align="center" width="110" label="类别"></el-table-column>
        <el-table-column prop="goodsImg" label="商品图片" align="center" width="110">
          <template slot-scope="scope">
            <img
              style="height:50px;"
              :src="scope.row.goodsImg"
              @click="showImage(scope.row.goodsImg)"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品资料" width="80">
          <template slot-scope="scope">
            <span
              style="cursor:default;color:#409EFF;"
              v-if="scope.row.file!=''"
              @click="viewPdf(scope.row,1)"
            >查看</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="使用手册" width="80">
          <template slot-scope="scope">
            <span
              style="cursor:default;color:#409EFF;"
              v-if="scope.row.manualFile!=''"
              @click="viewPdf(scope.row,2)"
            >查看</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="3D图纸" width="80">
          <template slot-scope="scope">
            <span
              style="cursor:default;color:#409EFF;"
              v-if="scope.row.thrdFile!=''"
              @click="viewPdf(scope.row,3)"
            >查看</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="standardPrice" align="center" width="90" label="标准价">
          <template slot-scope="scope">
            <span v-if="scope.row.standardPrice!=0">￥{{scope.row.standardPrice}}</span>
            <!-- <span style="color:#E6A23C;cursor: default;"  @click="addStandardPrice(scope.row.id,scope.row.standardPrice)">修改</span> -->
            <!-- 	<span v-else style="color:#409EFF;cursor: default;" @click="addStandardPrice(scope.row.id)">输入标准价</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="discount" align="center" label="折扣">
          <template slot-scope="scope">
            <span v-if="scope.row.discount">{{scope.row.discount+'%'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否新品">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isNew==1">是</el-tag>
            <el-tag type="danger" v-if="scope.row.isNew==0">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否显示">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isShow==1">是</el-tag>
            <el-tag type="danger" v-if="scope.row.isShow==0">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="range" align="center" label="量程"></el-table-column>
        <el-table-column prop="accuracy" align="center" label="精度" width="100"></el-table-column>
        <el-table-column prop="outputSignal" align="center" label="输出信号" width="100"></el-table-column>
        <el-table-column prop="stock" align="center" label="库存" width="80"></el-table-column>
        <el-table-column prop="bePartNoStr" label="关联辅件" align="center" width="320">
          <template slot-scope="scope">
            <div
              v-for="(item,index) in (scope.row.bePartNoStr.split('|'))"
              :key="index"
              style="text-align:left;"
            >
              {{item}}
              <br />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="partNo" label="辅件编码" align="center" width="120"></el-table-column>
        <el-table-column prop="goodsNo" label="商品编码" align="center" width="120"></el-table-column>
        <el-table-column align="center" prop="modelNo" width="120" label="型号编码"></el-table-column>
        <el-table-column align="center" prop="createName" width="78" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="float: right;margin-top:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[50, 100,200]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next,total"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
    <!--商品内容详情-->
    <transition name="el-fade-in-linear">
      <goods-detail v-show="editShow" @changeEdit="closeEdit" :chooseId="chooseId"></goods-detail>
    </transition>

    <!--导出Excel -->

    <el-dialog title="导出Excel" :visible.sync="excelVisible" width="30%">
      <div style="width:100%;">
        <span>授权验证码：</span>
        <el-input v-model="smsCode" autocomplete="off" maxlength="200" style="width: 25%;"></el-input>
        <el-button
          class="codebtn"
          :class="{'disabled-style':getCodeBtnDisable}"
          :disabled="getCodeBtnDisable"
          @click="getSMSCode1"
        >{{codeBtnWord}}</el-button>
        <el-button type="primary" :disabled="btndisabled" @click="exportAllGoods">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="产品大图" :visible.sync="dialogVisible" width="30%">
      <div style="width:100%;text-align: center;">
        <img :src="bigImage" style="width:100%;" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 输入标准价 -->
    <el-dialog title="输入标准价" :visible.sync="standardDialogVisible">
      <el-form>
        <el-form-item label="标准价" :label-width="formLabelWidth">
          <el-input v-model="standardPrice" type="number" autocomplete="off" style="width:50%;"></el-input>
          <span></span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="standardDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStandardPriceHandle">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 上传商品 -->
    <div class>
      <el-dialog :title="editStatus?'编辑商品':'新增商品'" :visible.sync="goodsVisible" width="60%">
        <el-form :model="goodsForm" ref="goodsForm" :rules="goodsRules">
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="title">
            <el-input
              v-model="goodsForm.title"
              autocomplete="off"
              style="width:50%"
              @blur="checkGoodsTitle"
            ></el-input>
            <br />
            <span v-if="editStatus==false" style="color:red">{{checkTitleMsg}}</span>
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth" prop="describe">
            <el-input
              type="textarea"
              v-model="goodsForm.describe"
              style="width:50%"
              :rows="4"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签描述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="goodsForm.tags"
              :rows="2"
              style="width:50%"
              autocomplete="off"
            ></el-input>
            <span style="color:red">多项以逗号分隔</span>
          </el-form-item>
          <el-form-item label="参数补充" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="goodsForm.paramsAdd"
              style="width:50%"
              :rows="2"
              autocomplete="off"
            ></el-input>
            <span style="color:red">多项以逗号分隔</span>
          </el-form-item>
          <!-- <el-form-item label="标准价" :label-width="formLabelWidth" prop="standardPrice">
          <el-input type="number" style="width:40%" min="0" v-model="goodsForm.standardPrice" autocomplete="off"></el-input>￥
          （标准价为数字）
          </el-form-item>-->
          <el-form-item label="类别" :label-width="formLabelWidth" prop="category">
            <el-cascader
              style="width:80%;"
              :options="categoryList"
              @active-item-change="handleItemChange"
              v-model="goodsForm.category"
              :props="categoryProps"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="brandId">
            <el-select v-model="goodsForm.brandId" filterable placeholder="请选择品牌">
              <el-option
                v-for="(item,index) in brandList"
                :key="index"
                :label="item.brandName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣类型" v-if="goodsForm.isParts==0" :label-width="formLabelWidth">
            <el-radio v-model="goodsForm.type" label="A">面价</el-radio>
            <el-radio v-model="goodsForm.type" label="B">底价</el-radio>
            <el-radio v-model="goodsForm.type" label="C">建议销售价</el-radio>
          </el-form-item>
          <el-form-item
            label="商品折扣率"
            :label-width="formLabelWidth"
            prop="discount"
            v-if="goodsForm.type=='A'"
          >
            <el-input
              type="text"
              oninput="value=value.replace(/[^\d.]/g,'')"
              style="width:40%"
              v-model="goodsForm.discount"
              autocomplete="off"
            ></el-input>% （折扣率为数字）
          </el-form-item>

          <el-form-item
            label="商品折扣率"
            prop="discountB"
            :label-width="formLabelWidth"
            v-if="goodsForm.type=='B'"
          >
            <el-input type="number" style="width:40%" v-model="goodsForm.discount"></el-input>% （折扣率为数字不低于100%）
          </el-form-item>
          <el-form-item
            label="商品折扣率"
            prop="discountC"
            :label-width="formLabelWidth"
            v-if="goodsForm.type=='C'"
          >
            <el-input
              type="number"
              style="width:40%"
              v-model="goodsForm.discount"
              autocomplete="off"
            ></el-input>% （折扣率为数字不低于90%）
          </el-form-item>
          <el-form-item label="定制备注" :label-width="formLabelWidth" prop="remark">
            <el-input
              type="textarea"
              v-model="goodsForm.remark"
              style="width:50%"
              :rows="4"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否为辅件" :label-width="formLabelWidth" prop="standardPrice">
            <el-radio v-model="goodsForm.isParts" :label="0">否</el-radio>
            <el-radio v-model="goodsForm.isParts" :label="1">是</el-radio>
          </el-form-item>
          <el-form-item label="是否为新品" :label-width="formLabelWidth" prop="standardPrice">
            <el-radio v-model="goodsForm.isNew" :label="0">否</el-radio>
            <el-radio v-model="goodsForm.isNew" :label="1">是</el-radio>
          </el-form-item>
          <el-form-item label="是否显示" :label-width="formLabelWidth" prop="standardPrice">
            <el-radio v-model="goodsForm.isShow" :label="0">否</el-radio>
            <el-radio v-model="goodsForm.isShow" :label="1">是</el-radio>
          </el-form-item>
          <el-form-item label="应用分类" :label-width="formLabelWidth">
            <el-select v-model="goodsForm.industry">
              <el-option label="请选择分类" :value="0"></el-option>
              <el-option label="汽车测试" :value="1"></el-option>
              <el-option label="航空测试" :value="2"></el-option>
              <el-option label="自动化检测" :value="3"></el-option>
              <el-option label="智能装配" :value="4"></el-option>
              <el-option label="医疗行业" :value="5"></el-option>
              <el-option label="石油化工" :value="6"></el-option>
              <el-option label="其他" :value="7"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品图片" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              action="/nte-crm/uploadImage"
              :on-preview="handlePreview"
              :on-remove="handleRemoveImage"
              :before-remove="beforeRemove"
              :limit="5"
              accept=".jpeg, .png, .jpg"
              :on-success="successUploadImage"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary" style="vertical-align: top;">点击上传</el-button>
              <img v-if="fileList.length>0" style="width:20%;" :src="fileList[0].url" />
              <div slot="tip" style="width:20%;" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>

          <el-form-item label="耐特恩商品资料" :label-width="formLabelWidth" style="position: relative;">
            <el-upload
              class="upload-demo"
              action="/nte-crm/uploadFile"
              :on-preview="handlePreview"
              :on-remove="handleRemoveFile"
              :before-remove="beforeRemove"
              :limit="30"
              accept=".pdf"
              :on-success="successUploadFile"
              :on-exceed="handleExceed"
              :file-list="fileListPdf"
            >
              <el-button size="small" type="primary" style="vertical-align: top;">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="必优商品资料" :label-width="formLabelWidth" style="position: relative;">
            <el-upload
              class="upload-demo"
              action="/nte-crm/uploadFile"
              :on-preview="handlePreview"
              :on-remove="handleRemoveBYFile"
              :before-remove="beforeRemove"
              :limit="30"
              accept=".pdf"
              :on-success="successUploadBYFile"
              :on-exceed="handleExceed"
              :file-list="fileListBYPdf"
            >
              <el-button size="small" type="primary" style="vertical-align: top;">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品使用手册" :label-width="formLabelWidth" style="position: relative;">
            <el-upload
              class="upload-demo"
              action="/nte-crm/uploadFile"
              :on-preview="handlePreview"
              :on-remove="handleRemoveManual"
              :limit="50"
              accept=".pdf"
              :on-success="successUploadManual"
              :file-list="fileListManualFile"
            >
              <el-button size="small" type="primary" style="vertical-align: top;">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="3D图纸" :label-width="formLabelWidth" style="position: relative;">
            <el-upload
              class="upload-demo"
              action="/nte-crm/uploadFile"
              :on-preview="handlePreview"
              :on-remove="handleRemoveThrd"
              :limit="50"
              accept=".pdf"
              :on-success="successUploadThrd"
              :file-list="fileListThrdFile"
            >
              <el-button size="small" type="primary" style="vertical-align: top;">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="产品详情" prop="content" class="detailContent">
            <vue-ueditor-wrap v-model="goodsForm.detailed" :config="myConfig"></vue-ueditor-wrap>
            <div style="clear:both;"></div>
          </el-form-item>
          <div style="clear:both;"></div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="goodsVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirmSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 添加属性 -->
    <el-dialog :title="typeEditStatus?'属性编辑':'属性添加'" :visible.sync="typeVisible" class="attrdialog">
      <div>
        <div
          v-if="typeSelection"
          style="width:110px;text-align:right;display: inline-block;margin-bottom: 20px;margin-right: 10px;"
        >
          <span style>选中操作</span>
        </div>
        <el-radio-group v-if="typeSelection" v-model="typeEditStatus">
          <el-radio :label="true">编辑</el-radio>
          <el-radio :label="false">新增</el-radio>
        </el-radio-group>

        <el-form v-if="typeEditStatus==true" :model="typeForm" ref="typeForm" :rules="typeRules">
          <div>
            <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
              <el-input
                v-model="typeForm.price"
                type="number"
                min="0"
                autocomplete="off"
                style="width:50%"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="selectTypeRow.isParts==0"
              label="量程"
              :label-width="formLabelWidth"
              prop="range"
            >
              <el-input v-model="typeForm.range" style="width:50%" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              v-if="selectTypeRow.isParts==0"
              label="精度"
              :label-width="formLabelWidth"
              prop="accuracy"
            >
              <el-input v-model="typeForm.accuracy" style="width:50%" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              v-if="selectTypeRow.isParts==0"
              label="输出信号"
              :label-width="formLabelWidth"
              prop="outputSignal"
            >
              <el-input v-model="typeForm.outputSignal" style="width:50%" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              v-if="selectTypeRow.isParts==0"
              label="库存"
              :label-width="formLabelWidth"
              prop="stock"
            >
              <el-input v-model="typeForm.stock" style="width:50%" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              v-if="selectTypeRow.isParts==0"
              label="关联辅件"
              :label-width="formLabelWidth"
            >
              <el-select
                v-model="typeForm.sel"
                @remove-tag="removeHandle"
                @change="changeSel"
                filterable
                :automatic-dropdown="true"
                ref="sel"
                placeholder="请选择辅件"
              >
                <el-option
                  v-for="(item,index) in accessoryList"
                  :key="index"
                  :label="item.title+'-'+item.brandName+'-'+item.describe+'-'+item.range+'-'+item.accuracy+'-'+item.outputSignal"
                  :value="item.modelNo"
                ></el-option>
              </el-select>
              <div>
                <p v-for="(item,index) in typeForm.bePartNo" :key="index">
                  <span>{{item.title+'-'+item.brandName+'-'+item.describe+'-'+item.range}}</span>
                  <span
                    class="iconfont"
                    v-if="selIndex==index"
                    style="margin-left:10px;cursor:default;color:#999;font-size:13px;"
                    @click="selIndex=null;"
                  >取消</span>
                  <span v-else>
                    <i
                      class="iconfont"
                      v-if="recordSelPart[index] && item.modelNo==recordSelPart[index].modelNo"
                      style="margin-left:10px;cursor:default;color:#67C23A;"
                      @click="editSelHandle(item);selIndex=index"
                    >&#xe6e5;</i>
                  </span>
                  <i
                    class="iconfont"
                    style="margin-left:10px;cursor:default;color:#F56C6C;"
                    @click="delSelHandle(item)"
                  >&#xe633;</i>
                </p>
              </div>
            </el-form-item>

            <el-form-item
              v-if="selectTypeRow.isParts==1"
              label="辅件编码"
              :label-width="formLabelWidth"
              prop="partNo"
            >
              <el-input v-model="typeForm.partNo" style="width:50%" autocomplete="off"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <el-form v-else :model="typeFormTwo" ref="typeFormTwo" :rules="typeRules">
          <div>
            <div>
              <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
                <el-input
                  v-model="typeFormTwo.price"
                  type="number"
                  min="0"
                  autocomplete="off"
                  style="width:50%"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-if="selectTypeRow.isParts==0"
                label="量程"
                :label-width="formLabelWidth"
                prop="range"
              >
                <el-input v-model="typeFormTwo.range" style="width:50%" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                v-if="selectTypeRow.isParts==0"
                label="精度"
                :label-width="formLabelWidth"
                prop="accuracy"
              >
                <el-input v-model="typeFormTwo.accuracy" style="width:50%" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                v-if="selectTypeRow.isParts==0"
                label="输出信号"
                :label-width="formLabelWidth"
                prop="outputSignal"
              >
                <el-input v-model="typeFormTwo.outputSignal" style="width:50%" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                v-if="selectTypeRow.isParts==0"
                label="库存"
                :label-width="formLabelWidth"
                prop="stock"
              >
                <el-input v-model="typeFormTwo.stock" style="width:50%" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                v-if="selectTypeRow.isParts==0"
                label="关联辅件"
                :label-width="formLabelWidth"
              >
                <el-select
                  v-model="typeFormTwo.bePartNo"
                  :multiple-limit="5"
                  filterable
                  multiple
                  placeholder="请选择辅件"
                >
                  <el-option
                    v-for="(item,index) in accessoryList"
                    :key="index"
                    :label="item.title+'-'+item.brandName+'-'+item.describe+'-'+item.range+'-'+item.accuracy+'-'+item.outputSignal"
                    :value="item.modelNo"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="selectTypeRow.isParts==1"
                label="辅件编码"
                :label-width="formLabelWidth"
                prop="partNo"
              >
                <el-input v-model="typeFormTwo.partNo" style="width:50%" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="typeVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmGoodsType">确 定</el-button>
      </div>
    </el-dialog>

    <!-- pdf 展示 -->
    <el-dialog :title="pdfDetail" :visible.sync="pdfVisible" width="80%" class="pdfVisible">
      <el-select v-model="pdfFile" placeholder="请选择文件">
        <el-option v-for="item in pdfList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <object :data="pdfFile" width="100%" height="550px" internalinstanceid="233"></object>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pdfVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import goodsDetail from "@/page/admin/goods/components/goodsDetail";
import {
  getTable,
  getGoodsCount,
  updateStandardPrice,
  getPublishGoods,
  getGoodsCategory,
  saveGoods,
  checkGoodsTitle,
  saveGoodsModel,
  delGoodsModel,
  optGoodsPart,
  getGoodsList,
  goodsListExport
} from "util/req/goods/index";
import { formatDateTime } from "util/fn/transTime";
import { getSMSCode } from "util/req/operator/index";
export default {
  name: "goods",
  data() {
    // const checkC = (rule, value, callback) => {
    //   console.log(rule, value, callback)
    //   if (!value) {
    //     return callback(new Error('折扣不能为空'));
    //   }

    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字'));
    //     } else {

    //       if (Number(value) < 90) {
    //         callback(new Error('折扣不能低于90%'));
    //       } else {
    //         callback();
    //       }
    //     }

    // }
    return {
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: "85%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: "/nte-crm/ueditor/jsp/controller.jsp",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/static/UEditor/"
      },
      tableHeight: null,
      optionsSel: [
        {
          value: "title",
          label: "商品名称"
        },
        {
          value: "goodsNo",
          label: "商品编码"
        },
        {
          value: "brandName",
          label: "商品品牌"
        }
      ],
      formLabelWidth: "120px",
      chooseOpt: "title", //搜索类型
      searchContent: "", //搜索内容
      dataList: null,
      loading: false,
      editShow: false,
      input10: "",
      currentPage: 1,
      pageSize: 50,
      pageCount: null,
      dialogVisible: false,
      bigImage: null,
      chooseId: null, //选中的商品编号
      standardDialogVisible: false, //标准价弹框
      standardPrice: null, //标准价
      selectId: null, //选中的id
      goodsVisible: false,
      goodsForm: {
        isParts: 0,
        brandId: null,
        discount: null,
        discountB: null,
        discountC: null,
        type: "A",
        detailed: "",
        isNew: 0,
        isShow: 0,
        industry: 0,
        remark: ""
      },
      goodsRules: {
        //商品提交的验证规则
        title: {
          required: true,
          trigger: "blur",
          message: "产品名称不能为空"
        },
        describe: {
          required: true,
          trigger: "blur",
          message: "商品描述不能为空"
        },
        discount: {
          required: true,
          trigger: "blur",
          message: "折扣不能为空"
        },
        // detailed: {
        //   required: true,
        //   trigger: "blur",
        //   message: "请输入产品详情"
        // },
        // discountB: [
        //   {
        //     required: true,
        //     trigger: "blur",
        //     message: "折扣不能为空"
        //   },
        //   {
        //     pattern: /^[1-9]\d{2,}[\.]?\d*/,
        //     trigger: "blur",
        //     message: "折扣不能低于100%"
        //   }
        // ],
        discountB: [
          {
            validator: this.checkB,
            trigger: "blur"
          }
        ],
        discountC: [
          {
            validator: this.checkC,
            trigger: "blur"
          }
        ],
        category: {
          required: true,
          trigger: "blur",
          message: "类别不能为空"
        },
        brandId: {
          required: true,
          trigger: "blur",
          message: "品牌不能为空"
        }
      },
      fileList: [], //上传图片
      fileListPdf: [], //上传耐特恩商品資料pdf多選
      fileListBYPdf: [], //上传必优商品資料pdf多選
      fileListManualFile: [], //商品使用手册
      fileListThrdFile: [], //商品3D图纸
      brandList: [], //品牌列表
      categoryList: [], //类型列表
      categoryProps: {
        //传递类型指定参数类型
        value: "catId",
        label: "catName",
        children: "children"
      },
      checkTitleMsg: null,
      editStatus: false, //处于的状态，（true为编辑）
      updataID: null, //修改商品需要传的ID
      typeForm: {}, //输入类型精度量程输出信号
      typeVisible: false, //类型弹框
      excelVisible: false, //导出表格弹框
      btndisabled: true, //导出表格确认按钮的禁用
      typeRules: {
        price: {
          required: true,
          trigger: "blur",
          message: "价格不能为空"
        },
        range: {
          required: true,
          trigger: "blur",
          message: "量程不能为空"
        },
        accuracy: {
          required: true,
          trigger: "blur",
          message: "精度不能为空"
        },
        outputSignal: {
          required: true,
          trigger: "blur",
          message: "输出信号不能为空"
        },
        stock: {
          required: true,
          trigger: "blur",
          message: "库存不能为空"
        },
        partNo: {
          required: true,
          trigger: "blur",
          message: "附件编号不能为空"
        }
      },
      selectTypeRow: {}, //选中行内容信息
      typeEditStatus: false, //商品信息是否为状态（true为编辑）
      pdfVisible: false,
      file: "", //pdf路径
      goodsImg: "", //图片路径
      pdfFile: null,
      pdfDetail: null,
      pdfList: [],
      typeSelection: false,
      typeFormTwo: {
        price: null,
        range: null,
        accuracy: null,
        outputSignal: null,
        stock: null,
        bePartNo: []
      },
      index_brandId: null,
      index_discount: null,
      stocks: null, //搜索条件库存
      categoryIdf: null, //搜索条件类别
      type: null,
      accessoryList: [], //附件列表
      recordSelPart: [], //记录选中附件，用于删除
      selIndex: null,
      delFlag: null,
      smsCode: "", //授权验证码
      codeBtnWord: "获取验证码", // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      getCodeBtnDisable: false // 控制获取验证码按钮是否可点击
    };
  },
  watch: {
    smsCode(val) {
      if (val.length != 6) {
        this.btndisabled = true;
      } else {
        this.btndisabled = false;
      }
    },
    standardDialogVisible(state) {
      if (state == false) {
        this.standardPrice = null;
      }
    },
    goodsVisible(status) {
      if (status == false) {
        this.goodsForm.brandId = null;
        this.goodsForm.category = [];
        this.goodsForm.describe = null;
        this.goodsForm.standardPrice = null;
        this.goodsForm.title = null;
        this.goodsForm.isParts = 0;
        this.goodsForm.discount = null;
        this.goodsForm.type = "A";
        this.goodsForm.discountB = 100;
        this.goodsForm.discountc = 90;
        this.goodsForm.detailed = "";
        this.goodsForm.isNew = 0;
        this.goodsForm.isShow = 0;
        this.goodsForm.tags = null;
        this.goodsForm.paramsAdd = null;
        this.goodsForm.remark = null;
        this.updataID = null;
        this.editStatus = false;
        this.fileList = [];
        this.fileListPdf = [];
        this.fileListBYPdf = [];
        this.file = null;
        this.goodsImg = null;
        this.fileListManualFile = [];
        this.fileListThrdFile = [];
      }
    },
    typeVisible(status) {
      if (status == false) {
        this.typeForm = {};
        this.selectTypeRow = {};
        this.typeEditStatus = false;
        this.typeFormTwo = {
          price: null,
          range: null,
          accuracy: null,
          outputSignal: null,
          stock: null,
          bePartNo: []
        };
        this.typeSelection = false;
      }
    },
    "goodsForm.brandId"(val) {
      this.$nextTick(() => {
        var item = this.brandList.filter(res => {
          return res.id == val;
        });
        if (item.length == 0) {
          return;
        }
        if (this.index_brandId != null && this.index_brandId == item[0].id) {
          this.$set(this.goodsForm, "discount", this.index_discount);
        } else {
          this.goodsForm.discount = item[0].discount;
        }
      });
    },
    "goodsForm.isParts"(val) {
      if (val == 1) {
        this.goodsForm.type = "A";
      }
    }
  },
  filters: {
    timeFilter(value) {
      if (!value) return "";
      return formatDateTime(value, 1);
    }
  },
  components: {
    goodsDetail
  },
  methods: {
    getSMSCode1() {
      var params = {
        type: 3
      };
      getSMSCode(params, res => {
        if (res.msgCode == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.getCodeBtnDisable = true; //按钮设为禁用
          // 因为下面用到了定时器，需要保存this指向
          let that = this;
          that.waitTime--;
          that.getCodeBtnDisable = true;
          this.codeBtnWord = `${this.waitTime}s`;
          let timer = setInterval(function() {
            if (that.waitTime > 1) {
              that.waitTime--;
              that.codeBtnWord = `${that.waitTime}s`;
            } else {
              clearInterval(timer);
              that.codeBtnWord = "获取验证码";
              that.getCodeBtnDisable = false;
              that.waitTime = 61;
            }
          }, 1000);
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    checkB(rule, value, callback) {
      if (!this.goodsForm.discount) {
        return callback(new Error("折扣不能为空"));
      }
      // if (!Number.isInteger(this.goodsForm.discount)) {
      //   callback(new Error("请输入数字"));
      // } else {
      if (Number(this.goodsForm.discount) < 100) {
        callback(new Error("折扣不能低于100%"));
      } else {
        callback();
      }
      // }
    },
    checkC(rule, value, callback) {
      if (!this.goodsForm.discount) {
        return callback(new Error("折扣不能为空"));
      }
      // if (!Number.isInteger(this.goodsForm.discount)) {
      //   callback(new Error("请输入数字"));
      // } else {
      if (Number(this.goodsForm.discount) < 90) {
        callback(new Error("折扣不能低于90%"));
      } else {
        callback();
      }
      // }
    },
    resetHandle() {
      this.stocks = null;
      this.type = null;
      this.categoryIdf = null;
      this.searchContent = null;
      this.delFlag = null;
      this.obtainTable(1);
    },
    closeEdit(state) {
      this.editShow = state;
    },
    showImage(e) {
      this.dialogVisible = true;
      this.bigImage = e;
    },
    obtainTable(val) {
      //获取表格数据
      if (val == 1) {
        this.currentPage = val;
      }
      var params = {
        pageSize: this.pageSize, //每页数量
        page: this.currentPage //当前页
      };
      params.searchStock = this.stocks;
      if (this.searchContent) {
        params[this.chooseOpt] = this.searchContent;
      }
      if (this.categoryIdf) {
        params.categoryIdf = this.categoryIdf;
      }
      this.loading = true;
      getTable(params, res => {
        this.dataList = res.data.goodsList;
        this.pageCount = res.data.pageCount;
        this.$refs.table.bodyWrapper.scrollTop = 0;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    },
    handleSizeChange(pageSize) {
      //数据条数改变时
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.obtainTable();
    },
    handleCurrentChange(currentPage) {
      //选取分页
      this.currentPage = currentPage;
      this.obtainTable();
    },
    searchHandle() {
      //查询商品
      var searchStock = null;
      var params = {};
      params.pageSize = this.pageSize;
      params.searchStock = this.stocks;
      if (this.chooseOpt == "title" && this.searchContent != "") {
        params.title = this.searchContent;
      } else if (this.chooseOpt == "goodsNo" && this.searchContent != "") {
        params.goodsNo = this.searchContent;
      } else if (this.chooseOpt == "brandName" && this.searchContent != "") {
        params.brandName = this.searchContent;
      }
      if (this.type) {
        params.type = this.type;
      }
      if (this.delFlag) {
        params.delFlag = this.delFlag;
      }
      if (this.categoryIdf) {
        params.categoryIdf = this.categoryIdf;
      }
      if (params != null && params != {}) {
        this.loading = true;
        getTable(params, res => {
          this.dataList = res.data.goodsList;
          console.log("搜索商品数据", res.data);
          this.pageCount = res.data.pageCount;
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
      } else {
        this.obtainTable(1);
      }
    },
    showDetail(id) {
      this.editShow = true;
      this.chooseId = id;
    },
    addStandardPrice(id, price) {
      //添加标准价
      this.standardDialogVisible = true;
      this.selectId = id;
      if (price) {
        this.standardPrice = price;
      }
    },
    addStandardPriceHandle() {
      this.standardDialogVisible = false;
      if (Number(this.standardPrice) <= 0) {
        this.$message({
          type: "info",
          message: "请输入大于0的价格"
        });
        this.standardPrice = null;
        return;
      }
      var params = {
        id: this.selectId,
        standardPrice: this.standardPrice
      };
      updateStandardPrice(params, res => {
        if (res.msgCode == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.obtainTable();
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
        this.standardPrice = null;
      });
    },
    getPublishGoods() {
      //获取上传商品分类和品牌信息
      getPublishGoods(res => {
        res = res.data;
        this.brandList = res.brandList;
        this.categoryList = res.categoryList;
      });
    },
    handleItemChange(value) {
      //商品列表级联选择
      if (value.length == 1) {
        getGoodsCategory(
          {
            id: value[value.length - 1]
          },
          res => {
            res = res.data;
            res.list = res.list.map(item => {
              delete item.children;
              return item;
            });
            for (var i = 0; i < this.categoryList.length; i++) {
              if (this.categoryList[i].catId == value) {
                this.categoryList[i].children = res.list;
              }
            }
          }
        );
      }
      this.$set(this.goodsForm, "category", value);
    },
    //刪除商品資料文件
    handleRemoveFile(file, fileList) {
      this.fileListPdf.forEach((item, index) => {
        if (item.url == file.url) {
          this.fileListPdf.splice(index, 1);
        }
      });
    },
    handleRemoveBYFile(file, fileList) {
      this.fileListBYPdf.forEach((item, index) => {
        if (item.url == file.url) {
          this.fileListBYPdf.splice(index, 1);
        }
      });
    },
    //删除商品使用手册
    handleRemoveManual(file, fileList) {
      this.fileListManualFile.forEach((item, index) => {
        if (item.url == file.url) {
          this.fileListManualFile.splice(index, 1);
        }
      });
    },
    //删除商品3D图纸
    handleRemoveThrd(file, fileList) {
      this.fileListThrdFile.forEach((item, index) => {
        if (item.url == file.url) {
          this.fileListThrdFile.splice(index, 1);
        }
      });
    },
    handleRemoveImage(file, fileList) {
      this.goodsImg = null;
    },
    handlePreview(file) {
      //console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning("当前只允许传输一个文件");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    successUploadImage(response, file, fileList) {
      this.fileList = [{ name: response.data.url, url: response.data.url }];
      this.goodsImg = response.data.url;
    },
    //上传商品文件
    successUploadFile(response, file, fileList) {
      this.fileListPdf.push({
        name: response.data.url,
        url: response.data.url
      });
    },
    //上传商品文件
    successUploadBYFile(response, file, fileList) {
      this.fileListBYPdf.push({
        name: response.data.url,
        url: response.data.url
      });
    },
    //上传商品使用手册
    successUploadManual(response, file, fileList) {
      this.fileListManualFile.push({
        name: response.data.url,
        url: response.data.url
      });
    },
    //上传商品3D图纸
    successUploadThrd(response, file, fileList) {
      this.fileListThrdFile.push({
        name: response.data.url,
        url: response.data.url
      });
    },
    checkGoodsTitle() {
      //检查商品名称是否存在
      if (!this.goodsForm.title) {
        return;
      }
      checkGoodsTitle(
        {
          title: this.goodsForm.title
        },
        res => {
          if (res.msgCode == 302) {
            this.checkTitleMsg = res.msg;
          } else {
            this.checkTitleMsg = "";
          }
        }
      );
    },
    comfirmSubmit() {
      console.log("detailed", this.goodsForm.detailed);
      var parmas = {
        id: this.updataID || {},
        brandId: this.goodsForm.brandId,
        categoryIdf: this.goodsForm.category[0],
        categoryIds: this.goodsForm.category[1],
        categoryIdt: 0,
        describe: this.goodsForm.describe,
        standardPrice: 0,
        type: this.goodsForm.type,
        title: this.goodsForm.title,
        isParts: this.goodsForm.isParts,
        file: this.fileListPdf.map(item => item.url).join(","),
        byFile: this.fileListBYPdf.map(item => item.url).join(","),
        manualFile: this.fileListManualFile.map(item => item.url).join(","),
        thrdFile: this.fileListThrdFile.map(item => item.url).join(","),
        goodsImg: this.goodsImg,
        isNew: this.goodsForm.isNew,
        industry: this.goodsForm.industry,
        isShow: this.goodsForm.isShow,
        detailed: this.goodsForm.detailed,
        discount: this.goodsForm.discount,
        tags: this.goodsForm.tags,
        paramsAdd: this.goodsForm.paramsAdd,
        remark: this.goodsForm.remark
      };
      if (this.goodsForm.type == "B") {
        if (Number(parmas.discount) < 100) {
          this.$message({
            type: "info",
            message: "折扣不能低于100%"
          });
          return;
        }
      } else if (this.goodsForm.type == "C") {
        if (Number(parmas.discount) < 90) {
          this.$message({
            type: "info",
            message: "折扣不能低于90%"
          });
          return;
        }
      }
      if (this.goodsForm.isParts == 1) {
        parmas.type = {};
        parmas.discount = this.goodsForm.discount;
      }
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          saveGoods(parmas, res => {
            if (res.msgCode == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.goodsVisible = false;
              this.obtainTable(1);
            } else {
              this.$message({
                type: "info",
                message: res.msg
              });
            }
          });
        } else {
        }
      });
    },
    editGoods(row) {
      console.log(row);
      //编辑商品
      this.editStatus = true;
      this.goodsVisible = true;
      this.goodsForm = JSON.parse(JSON.stringify(row));
      // console.log(row);
      // this.goodsForm.discount = null;
      // this.goodsForm.discountB = 100;
      // this.goodsForm.discountc = 90;
      // if (row.type == "A") {
      //   this.goodsForm.discount = row.discount;
      // } else if (row.type == "B") {
      //   this.goodsForm.discountB = row.discount;
      // } else if (row.type == "C") {
      //   this.goodsForm.discountc = row.discount;
      // }
      // if (!row.type) {
      //   this.goodsForm.discount = row.discount;
      // }
      // this.goodsForm.discount = row.discount;
      this.index_brandId = this.goodsForm.brandId;
      this.index_discount = this.goodsForm.discount;
      //this.file = this.goodsForm.file;
      this.goodsImg = this.goodsForm.goodsImg;
      if (this.goodsImg) {
        this.fileList = [
          {
            name: this.goodsForm.goodsImg,
            url: this.goodsForm.goodsImg
          }
        ];
      }
      if (this.goodsForm.file) {
        this.fileListPdf = this.goodsForm.file.split(",").map(item => {
          item = {
            name: item,
            url: item
          };
          return item;
        });
      }
      if (this.goodsForm.byFile) {
        this.fileListBYPdf = this.goodsForm.byFile.split(",").map(item => {
          item = {
            name: item,
            url: item
          };
          return item;
        });
      }
      if (this.goodsForm.manualFile) {
        this.fileListManualFile = this.goodsForm.manualFile
          .split(",")
          .map(item => {
            item = {
              name: item,
              url: item
            };
            return item;
          });
      }
      if (this.goodsForm.thrdFile) {
        this.fileListThrdFile = this.goodsForm.thrdFile.split(",").map(item => {
          item = {
            name: item,
            url: item
          };
          return item;
        });
      }
      this.updataID = row.id;
      getGoodsCategory(
        {
          id: this.goodsForm.categoryIdf
        },
        res => {
          res = res.data;
          res.list = res.list.map(item => {
            delete item.children;
            return item;
          });
          for (var i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i].catId == this.goodsForm.categoryIdf) {
              this.categoryList[i].children = res.list;
            }
          }
        }
      );
      this.$set(this.goodsForm, "category", this.goodsForm.categoryIdf);
      this.goodsForm.category = [
        this.goodsForm.categoryIdf,
        this.goodsForm.categoryIds
      ];
    },
    removeHandle(tag) {},
    changeSel(tag) {
      // if(this.typeForm.bePartNo.length>=5){ //选中不能超过5个
      //   this.typeForm.sel=null;
      //   return
      // }
      var recordItem = this.typeForm.bePartNo.filter(item => {
        return tag == item.modelNo;
      });
      if (recordItem.length > 0) {
        this.typeForm.sel = null;
        return;
      }
      var item = this.accessoryList.filter(item => {
        return tag == item.modelNo;
      });
      this.typeForm.sel = null;
      if (this.selIndex != null) {
        //处于编辑的状态
        optGoodsPart(
          {
            modelNo: this.selectTypeRow.modelNo,
            partNo: this.typeForm.bePartNo[this.selIndex].modelNo,
            updPartNo: item[0].modelNo,
            state: "upd"
          },
          res => {
            if (res.msgCode != 200) {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            } else {
              var index = null;
              for (var i = 0; i < this.recordSelPart.length; i++) {
                if (
                  this.typeForm.bePartNo[this.selIndex].modelNo ==
                  this.recordSelPart[i].modelNo
                ) {
                  index = i;
                }
              }
              this.typeForm.bePartNo.splice(this.selIndex, 1, item[0]);
              this.recordSelPart.splice(index, 1, item[0]);
              this.selIndex = null;
            }
          }
        );
      } else {
        this.typeForm.bePartNo.push(item[0]);
      }
    },
    delSelHandle(row) {
      //从返回数据里筛选
      var recIndex = null,
        recordItem = null;
      for (var i = 0; i < this.recordSelPart.length; i++) {
        if (this.recordSelPart[i].modelNo == row.modelNo) {
          recIndex = i;
          recordItem = this.typeForm.bePartNo[i];
        }
      }
      //从总的列表中筛选
      var selIndex = null,
        newItem = null;
      for (var i = 0; i < this.typeForm.bePartNo.length; i++) {
        if (this.typeForm.bePartNo[i].modelNo == row.modelNo) {
          selIndex = i;
          newItem = this.typeForm.bePartNo[i];
        }
      }
      if (recordItem != null) {
        this.recordSelPart.splice(recIndex, 1);
        this.typeForm.bePartNo.splice(recIndex, 1);
        optGoodsPart(
          {
            modelNo: this.selectTypeRow.modelNo,
            partNo: recordItem.modelNo,
            state: "del"
          },
          res => {
            if (res.msgCode != 200) {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          }
        );
      } else {
        //从总的列表中筛选
        if (newItem) {
          this.typeForm.bePartNo.splice(selIndex, 1);
        }
      }
    },
    editSelHandle(row) {
      this.$refs["sel"].focus();
    },
    typeHandle(row) {
      console.log("row", row);
      this.typeVisible = true;
      this.selectTypeRow = JSON.parse(JSON.stringify(row));
      getGoodsList({ isParts: 1 }, res => {
        //附件列表
        this.accessoryList = res.data.goodsList;
        if (row.bePartNo && row.bePartNo != "" && row.bePartNo != null) {
          var bePartNo = row.bePartNo.split(",");
          var newItem = [];
          for (var i = 0; i < bePartNo.length; i++) {
            for (var s = 0; s < this.accessoryList.length; s++) {
              if (bePartNo[i] == this.accessoryList[s].modelNo) {
                newItem.push(this.accessoryList[s]);
              }
            }
          }
          row.bePartNo = newItem;
          this.recordSelPart = row.bePartNo;
        } else {
          row.bePartNo = [];
        }
        this.typeForm = JSON.parse(JSON.stringify(row));
      });
      if (row.range || row.price) {
        this.typeEditStatus = true;

        this.typeSelection = true;
      }
      this.typeForm = JSON.parse(JSON.stringify(row));
    },
    comfirmGoodsType() {
      //提交产品属性
      if (this.typeEditStatus) {
        //编辑
        var params = {
          goodsNo: this.selectTypeRow.goodsNo,
          price: this.typeForm.price,
          stock: this.typeForm.stock
        };
        if (this.typeForm.bePartNo.length > 0) {
          var arr = [];
          for (var i = 0; i < this.typeForm.bePartNo.length; i++) {
            arr.push(this.typeForm.bePartNo[i].modelNo);
          }
          params.bePartNo = arr.join(",");
        }
        //判断是否为附件
        if (this.selectTypeRow.isParts == 0) {
          params.range = this.typeForm.range;
          params.accuracy = this.typeForm.accuracy;
          params.outputSignal = this.typeForm.outputSignal;
          params.indexId = 1;
        } else if (this.selectTypeRow.isParts == 1) {
          params.partNo = this.typeForm.partNo; //附件编码
          params.indexId = 2;
        }
        params.id = this.selectTypeRow.modelId;
        params.modelNo = this.selectTypeRow.modelNo;
        this.$refs.typeForm.validate(valid => {
          if (valid) {
            saveGoodsModel(params, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.typeVisible = false;
                this.obtainTable(1);
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          }
        });
      } else {
        //新增
        //商品
        var params = {
          goodsNo: this.selectTypeRow.goodsNo,
          price: this.typeFormTwo.price,
          stock: this.typeFormTwo.stock
        };
        params.modelNo = this.selectTypeRow.modelNo;
        //判断是否为附件
        if (this.selectTypeRow.isParts == 0) {
          params.range = this.typeFormTwo.range;
          params.accuracy = this.typeFormTwo.accuracy;
          params.outputSignal = this.typeFormTwo.outputSignal;
          params.indexId = 1;
          if (this.typeFormTwo.bePartNo) {
            //是否关联附件
            params.bePartNo = this.typeFormTwo.bePartNo.join(",");
          }
        } else if (this.selectTypeRow.isParts == 1) {
          params.partNo = this.typeFormTwo.partNo; //附件编码
          params.indexId = 2;
        }

        this.$refs.typeFormTwo.validate(valid => {
          if (valid) {
            saveGoodsModel(params, res => {
              if (res.msgCode == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.typeVisible = false;
                this.obtainTable(1);
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          }
        });
      }
    },
    viewPdf(row, type) {
      this.pdfVisible = true;

      if (type == 1) {
        //商品资料
        this.pdfFile = row.file.split(",")[0];
        this.pdfList = row.file.split(",");
        this.pdfDetail = "商品资料--" + row.title;
      } else if (type == 2) {
        //商品使用手册
        this.pdfFile = row.manualFile.split(",")[0];
        this.pdfList = row.manualFile.split(",");
        this.pdfDetail = "商品使用手册--" + row.title;
      } else if (type == 3) {
        //商品3D图纸
        this.pdfFile = row.thrdFile.split(",")[0];
        this.pdfList = row.thrdFile.split(",");
        this.pdfDetail = "商品使用手册--" + row.title;
      }
    },
    delHandle(row, delFlag) {
      var title = "此操作将永久删除该商品, 是否继续?";
      if (delFlag == "confirm") {
        title = "此操作确认该商品有效, 是否继续?";
      }
      if (row.modelNo) {
        this.$confirm(title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delGoodsModel(
              {
                modelNo: row.modelNo,
                state: delFlag
              },
              res => {
                if (res.msgCode == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  this.obtainTable();
                } else {
                  this.$message({
                    type: "info",
                    message: res.msg
                  });
                }
              }
            );
          })
          .catch(err => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      }
    },
    //导出所有的商品数据
    exportAllGoods() {
      if (this.msgCode != "") {
        //查询列表
        var parmas = {
          smsCode: this.smsCode
        };
        goodsListExport(parmas, res => {
          if (res.msgCode == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            const url = res.data.path;
            a.href = url;
            // // 指定下载的文件名
            a.download = "CRM商品数据";
            a.click();
            document.body.removeChild(a);
          } else {
            this.$message({
              type: "info",
              message: res.msg
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "请输入授权验证码"
        });
      }
    }
  },
  mounted() {
    this.tableHeight =
      window.innerHeight - this.$refs.table.$el.offsetTop - 130;
    this.loading = true;
    this.obtainTable();
    this.getPublishGoods();
  },
  components: {
    vueUeditorWrap: () => import("vue-ueditor-wrap")
  }
};
</script>
<style lang="scss" scoped>
.codebtn {
  margin-top: -13%;
  padding: 3% 2%;
  width: 23%;
  color: white;
  background: #409eff;
  border: #409eff 1px solid;
  border-radius: 5px;
}
.el-button.disabled-style {
  color: white;
  margin-top: -13%;
  padding: 3% 0%;
  width: 23%;
  background: #a0cfff;
  border: #a0cfff 1px solid;
  border-radius: 5px;
}
.goods {
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}

.goodsTable {
  margin-top: 30px;
}

.goods /deep/ th {
  background-color: #efedf0 !important;
}

.goodsTable /deep/ th {
  background-color: #efedf0 !important;
}

.goodsTable /deep/ ::-webkit-scrollbar {
  height: 9px;
  width: 7px;
  // border-radius: 4px;
}

.pdfVisible /deep/ .el-dialog {
  margin-top: 0px !important;
}
.goods /deep/ .el-dialog {
  margin-top: 20px !important;
}
.attrdialog /deep/ .el-dialog {
  width: 60%;
}
.upload-demo /deep/ .el-upload {
  text-align: left;
}
.detailContent {
  width: 900px;
}
</style>
