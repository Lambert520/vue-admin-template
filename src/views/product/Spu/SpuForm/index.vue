<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="Spu名称">
        <el-input placeholder="Spu名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" value>
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input type="textarea" rows="4" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="还有3未选择" value>
          <el-option label="label" value="value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" size="small">添加销售属性</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性名称列表" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
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
      spu: {},// 存储Spu信息属性
      tradeMarkList: [],// 存储品牌信息
      spuImageList: [],// 存储spu图片的数据
      saleAttrList: [],// 销售属性的数据
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
        this.spuImageList = spuImageResult.data
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if(saleResult.code == 200){
        this.saleAttrList = saleResult.data
      }
    }

  },
};
</script>

<style>
</style>