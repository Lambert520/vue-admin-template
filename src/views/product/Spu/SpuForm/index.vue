<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="Spu名称">
        <el-input placeholder="Spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="tm in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <!--
          上传图片：
          action：图片上传的地址 list-type：文件列表的类型 on-preview：图片预览的时候会触发
          on-remove：当删除图片的时候会触发 file-list：上传的文件列表
          -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectedSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unSelectedSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" size="small" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <!--展示的是当前Spu属于自己的销售属性-->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性名称列表" width="width">          
             <!--属性值列表-->
            <template slot-scope="{row}">
              <!--el-tag：展示已有的属性值-->
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" 
                @close="handleClose(row,index)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <!--下面的结构是input与button切换-->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="handleInputConfirm(row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)" >添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSaleAttr(row,$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item> 
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 初始化的时候是一个空的对象，
      // 在修改Spu的时候，会向服务器发请求，返回Spu信息（对象），在修改的时候可以利用服务器返回的这个对象收集最新的数据交给服务器 
      // 添加Spu，如果是添加Spu的时候并没有向服务器发请求，数据收集到哪里，收集数据的时候有哪些字段
      spu: {
        // 三级分类的id
        category3Id: 0,
        // 品牌的id
        tmId: 0,
        // 描述
        description: "string",
        // Spu名称
        spuName: "string",
        // 收集Spu图片的信息
        spuImageList: [
          // {
          //   "id": 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0
          // }
        ],
        // 平台属性与属性值收集   
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            "id": 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                "id": 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0
              }
            ]
          }
        ]
      },// 存储Spu信息属性
      tradeMarkList: [],// 存储品牌信息
      spuImageList: [],// 存储spu图片的数据
      saleAttrList: [],// 销售属性的数据
      attrIdAndAttrName: '',// 收集未选择销售属性的id
    };
  },
  methods: {
    // 照片墙删除某一个图片的时候触发 
    handleRemove(file, fileList) {
      // file：当前删除的图片；fileList：删除图片后剩余的图片
      // 收集照片墙的数据
      // 已有的图片【有name与url字段】，照片墙显示需要有这两个属性，而服务器不需要，上传服务器时需要删掉
      this.spuImageList = fileList
    },
    // 照片墙预览功能的回调
    handlePictureCardPreview(file) {
      // 将图片地址赋值给属性
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 照片上传成功的回调
    handleSuccess(response, file, fileList){
      this.spuImageList = fileList
    },
    // 初始化SpuForm数据
    async initSpuData(spu){
      // 获取Spu信息的数据
      let spuResult = await this.$API.spu.reqSpuBaseInfo(spu.id)
      if(spuResult.code == 200){
        this.spu = spuResult.data

      }
      // 获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if(tradeMarkResult.code == 200){
        this.tradeMarkList = tradeMarkResult.data
      }
      // 获取Spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if(spuImageResult.code == 200){
        let imgArr = spuImageResult.data
        // 由于照片墙显示图片的数据需要数组，要有name与url字段(照片墙组件文档要求)
        // 需要把服务器返回的数据进行修改
        imgArr.forEach(item => {
            item.name = item.imgName
            item.url = item.imgUrl
        })
        // 整理好的数据赋值给spuImageList
        this.spuImageList = imgArr
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if(saleResult.code == 200){
        this.saleAttrList = saleResult.data
      }
    },
    // 添加新的销售属性
    addSaleAttr(){
      // 已经收集到 需要添加销售属性的消息
      // 把收集到的销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      // 向Spu对象的spuSaleAttrValueList属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      // 添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr)
      // 
      this.attrIdAndAttrName = ''
    },
    // 添加按钮的回调
    addSaleAttrValue(row){
      // 点击销售属性值当中添加按钮的时候，需要由button变为input，通过当前销售属性的inputVisible控制
      // 挂载在销售属性身上的响应式数据inputVisible，控制button与input切换
      this.$set(row,'inputVisible',true)
      // 通过响应式数据inputValue字段收集新增的
      this.$set(row,'inputValue','')
    },
    // 失去焦点事件
    handleInputConfirm(row){
      // 解构出销售属性当中收集的数据 
      const {baseSaleAttrId, inputValue} = row
      // 新增的销售属性值名称不为空
      if(inputValue.trim()==''){
        this.$message({
          type: 'warning',
          message: '属性值不能为空'
        })
        return
      }
      // 新增的属性值不能重复
      let result = row.spuSaleAttrValueList.some((item)=>{
        return item.saleAttrValueName==inputValue.trim()
      })
      if(result){
        this.$message({
          type: 'warning',
          message: '属性值重复'
        })
        return
      }
      // 新增销售属性值的数据
      let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue
      }
      // 添加到属性值数组中
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      // 修改inputVisible为false，显示button
      row.inputVisible = false
      
    },
    // enter键事件(与blur事件一样)
    handleInputConfirm(row){
      // 解构出销售属性当中收集的数据 
      const {baseSaleAttrId, inputValue} = row
      // 新增的销售属性值名称不为空
      if(inputValue.trim()==''){
        this.$message({
          type: 'warning',
          message: '属性值不能为空'
        })
        return
      }
      // 新增的属性值不能重复
      let result = row.spuSaleAttrValueList.some((item)=>{
        return item.saleAttrValueName==inputValue.trim()
      })
      if(result){
        this.$message({
          type: 'warning',
          message: '属性值重复'
        })
        return
      }
      // 新增销售属性值的数据
      let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue
      }
      // 添加到属性值数组中
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      // 修改inputVisible为false，显示button
      row.inputVisible = false
    },
    // 删除属性值标签的事件回调
    handleClose(row,index){
      row.spuSaleAttrValueList.splice(index,1)
    },
    // 删除属性的事件回调
    deleteSaleAttr(row,index){
      this.spu.spuSaleAttrList.splice(index,1)
    },
  },
  computed: {
    // 计算出还没选择的销售属性
    unSelectedSaleAttr(){
      // 当前Spu拥有的销售属性spu.spuSaleAttrList
      // 数组过滤的方法：可以从已有的数组当中，过滤出用户想要的元素
      return this.saleAttrList.filter((item)=>{
        // every是数组的方法，返回一个布尔值,，此处不能用some方法
        return this.spu.spuSaleAttrList.every((item1)=>{
          return item.name!=item1.saleAttrName
        })
      })
    }
  }
};
</script>

<style scoped> 
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>