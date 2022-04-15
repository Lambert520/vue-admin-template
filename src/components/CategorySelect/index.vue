<template>
  <div>
    <!--
        :inline：代表行内表单，代表一行可以放置多个表单元素
    -->
    <el-form :inline="true"  class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择" v-model="cForm.category1Id" @change="handlecg1">
          <el-option :label="cg1.name" :value="cg1.id" v-for="cg1 in category1List" :key="cg1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择" value="">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择" value="">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >查询</el-button>
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
          category2List: [],
          category3List: []
      }
  },
  //组件挂载完毕，向服务器发请求，获取相应的一级分类数据
  mounted () {
      this.getCategory1List()
  },
  methods: {
      // 获取一级分类数据
      async getCategory1List(){
          let result = await this.$API.attr.reqCategory1List()
          if(result.code == 200){
              this.category1List = result.data;
          }
      },
      //一级分类select的事件回调（一级分类的option发生变化的时候获取响应的二级分类的数据）
      async handlecg1(){
          //解构出一级分类的id
          const {category1Id} = this.cForm;
          let result = await this.$API.attr.reqCategory2List(category1Id);
          console.log(result)
      }
  }
};
</script>

<style>
</style>