<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="Spu名称">
        海绵宝宝
      </el-form-item>
      <el-form-item label="Sku名称">
        <el-input placeholder="Sku名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
      <el-input type="textarea" placeholder="规格描述"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%">
           <el-table-column type="selection"  width="55">
           </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: 'SkuForm',
    data () {
      return {
        // 存储图片的信息
        spuImageList: [],
        // 存储销售属性的数据
        spuSaleAttrList: [],
        // 存储平台属性的数据
        attrInfoList: [],

      }
    },
    methods: {
      // 获取数据
      async getData(category1Id, category2Id, spu){
        // 获取图片的数据
        let imgList = await this.$API.sku.reqSpuImageList(spu.id)
        if (imgList.code == 200){
          this.spuImageList = imgList.data
        }
        // 获取销售属性的数据
        let saleAttrList = await this.$API.sku.reqSpuSaleAttrList(spu.id)
        if (saleAttrList.code == 200){
          this.spuSaleAttrList = saleAttrList.data
        }
        // 获取平台属性的数据
        let attrInfo = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
        if (attrInfo.code == 200){
          this.attrInfoList = attrInfo.data
        }
      }
    }
}
</script>

<style>

</style>