<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!--三级联动已经是全局组件了-->
      <CategorySelect @getCategoryId="getCategoryId" :isShowTable="isShowTable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!--底部这里将来是有三部分进行切换-->
      <div>
        
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      // 控制三级联动的可操作性
      isShowTable: true,
      // 三级分类的id
      category1Id: '',
      category2Id: '',
      category3Id: ''
    };
  },
  methods: {
    // 三级联动的自定事件，可以把子组件相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      // categoryId：获取到一、二、三级分类id  level：为了区分是几级id
      if(level == 1){
        this.category1Id = categoryId
        // 清除2、3级分类的id
        this.category2Id = ''
        this.category3Id = ''
      }else if(level == 2){
        this.category2Id = categoryId
        // 清除3级分类的id
        this.category3Id = ''
      }else{
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    // 获取Spu列表数据的方法
    getSpuList(){

    }
  },
};
</script>

<style scoped>
</style>