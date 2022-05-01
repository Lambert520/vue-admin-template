<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="Spu名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="Sku名称">
        <el-input placeholder="Sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
      <el-input type="textarea" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange" border>
           <el-table-column type="selection"  width="80">
           </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="height:100px;width:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" v-if="row.isDefault==0" @click="changeDefault(row)">设为默认</el-button>
              <el-button size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
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
        // 收集Sku数据的字段
        skuInfo: {
          // 第一类收集的数据：父组件给的数据
          category3Id: '',
          spuId: '',
          tmId: '',
          // 第二类：需要通过数据双向绑定v-model收集
          skuName: '',
          price: '',
          weight: '',
          skuDesc: '',
          // 第三类：需要书写代码进行收集
          // 默认图片
          skuDefaultImg: '',
          // 平台属性
          skuAttrValueList: [
            // {
            //   attrId: '',
            //   valueId: ''
            // }
          ],
          // 收集图片的字段
          skuImageList: [], 
          // 销售属性       
          skuSaleAttrValueList: [],   
        },
        // 父组件传递的数据
        spu: {},
        // 收集图片数据的字段，【需要加上isDefault字段】
        imageList: []

      }
    },
    methods: {
      // 获取数据
      async getData(category1Id, category2Id, spu){
        // 收集父组件给予的数据
        this.skuInfo.category3Id = spu.category3Id     
        this.skuInfo.spuId = spu.id
        this.skuInfo.tmId = spu.tmId
        this.spu = spu
        // 获取图片的数据
        let imgList = await this.$API.spu.reqSpuImageList(spu.id)
        if (imgList.code == 200){
          let list = imgList.data
          list.forEach(item => {
            item.isDefault = 0
          });
          this.spuImageList = list
        }
        // 获取销售属性的数据
        let saleAttrList = await this.$API.spu.reqSpuSaleAttrList(spu.id)
        if (saleAttrList.code == 200){
          this.spuSaleAttrList = saleAttrList.data
        }
        // 获取平台属性的数据
        let attrInfo = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
        if (attrInfo.code == 200){
          this.attrInfoList = attrInfo.data
        }
      },
      // table表格复选框按钮的事件
      handleSelectionChange(params){
        // 获取到用户选中图片的信息数据，但是需要注意，当前数据缺少isDefault字段
        this.imageList = params
      },
      // 排他操作
      changeDefault(row){
        // 图片列表的数据的isDefault字段变为0
        this.spuImageList.forEach(item=>{
          item.isDefault = 0
        })
        // 点击的那个图片的数据变为1
        row.isDefault = 1
        // 收集默认图片的地址
        this.skuInfo.skuDefaultImg = row.imgUrl
      },
      // 取消按钮的回调
      cancel(){
        // 触发自定义事件，通知父组件切换场景
        this.$emit('changeScenes',0)
        // 清除数据
        Object.assign(this._data,this.$options.data())
      },
      // 保存按钮的回调
      async save(){
        // 整理参数
        // 整理平台属性
        const {attrInfoList, skuInfo, spuSaleAttrList, imageList} = this
        // // 整理平台属性数据的第一种方法
        // // // 把收集到的数据先整理一下
        // // attrInfoList.forEach(item=>{
        // //   // 当前平台属性
        // //   if (item.attrIdAndValueId){
        // //     const [attrId, valueId] = item.attrIdAndValueId.split(':')
        // //     // 携带给服务器参数应该是对象
        // //     let obj = {attrId, valueId}
        // //     skuInfo.skuAttrValueList.push(obj)
        // //   }
        // // })
        // 整理平台属性数据的第二种方法(需要返回prev，给下次循环使用)
        skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item)=>{
          if (item.attrIdAndValueId){
            const [attrId, valueId] = item.attrIdAndValueId.split(':')
            prev.push({attrId, valueId})
          }
          return prev
        },[])
        
        // 整理销售属性的数据
        skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item)=>{
          if (item.attrIdAndValueId){
            const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
            prev.push({saleAttrId, saleAttrValueId})
          }
          return prev
        },[])
        
        // 整理图片的数据(map映射出一个新的数据)
        skuInfo.skuImageList = imageList.map(item=>{
          return{
            imgName: item.imgName,
            imgUrl: item.imgUrl,
            isDefault: item.isDefault,
            spuImgId: item.id
          }
        })
        // 发请求
        let result = await this.$API.spu.reqAddSku(skuInfo)
        if (result.code == 200){
          this.$message({
            type: 'success',
            message: '添加Sku成功'
          })
          this.$emit('changeScenes',0)
          // 清除数据
          Object.assign(this._data,this.$options.data()) 
        }
      }
    }
}
</script>

<style>

</style>