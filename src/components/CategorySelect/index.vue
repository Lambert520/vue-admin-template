<template>
  <div>
    <!--
        :inline：代表行内表单，代表一行可以放置多个表单元素
    -->
    <el-form :inline="true"  class="demo-form-inline" :model="cForm" :disabled="!isShowTable">
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择" v-model="cForm.category1Id" @change="handlecg1">
          <el-option :label="cg1.name" :value="cg1.id" v-for="cg1 in category1List" :key="cg1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择" v-model="cForm.category2Id" @change="handlecg2">
          <el-option :label="cg2.name" :value="cg2.id" v-for="cg2 in category2List" :key="cg2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择" v-model="cForm.category3Id" @change="handlecg3">
          <el-option :label="cg3.name" :value="cg3.id" v-for="cg3 in category3List" :key="cg3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data () {
      return {
          // 一级分类的数据
          category1List: [],
          // 收集相应的一级、二级、三级分类的id
          cForm: {
            category1Id: '',
            category2Id: '',
            category3Id: '',
          },
          // 二级分类的数据
          category2List: [],
          // 三级分类的数据
          category3List: []
      }
  },
  props:['isShowTable'],
  // 组件挂载完毕，向服务器发请求，获取相应的一级分类数据
  mounted () {
      this.getCategory1List()
  },
  methods: {
      // 获取一级分类数据
      async getCategory1List(){
          let result = await this.$API.attr.reqCategory1List()
          if(result.code == 200){
              this.category1List = result.data
          }
      },
      // 一级分类select的事件回调（一级分类的option发生变化的时候获取响应的二级分类的数据）
      async handlecg1(){
        // 清除数据
        this.category2List = []
        this.category3List = []
        this.cForm.category2Id = ''
        this.cForm.category3Id = ''

        // 解构出一级分类的id
        const {category1Id} = this.cForm
        this.$emit('getCategoryId',{categoryId: category1Id,level: 1})
        
        // 通过一级分类的id获取二级分类的数据
        let result = await this.$API.attr.reqCategory2List(category1Id);
        if(result.code == 200){
          this.category2List = result.data
        }
      },
      // 二级分类select事件的回调（二级分类的option发生变化的时候获取响应的三级分类的数据）
      async handlecg2(){
         // 清除数据
        this.category3List = []
        this.cForm.category3Id = ''

        // 解构出二级分类id
        const {category2Id} = this.cForm
        this.$emit('getCategoryId',{categoryId: category2Id,level: 2})
        let result = await this.$API.attr.reqCategory3List(category2Id)
        if(result.code == 200){
          this.category3List = result.data
        }
      },
      // 三级分类select事件的回调
      handlecg3(){
        // 解构出三级分类id
        const {category3Id} = this.cForm
        this.$emit('getCategoryId',{categoryId: category3Id,level: 3})
      }
  },
};
</script>

<style>
</style>