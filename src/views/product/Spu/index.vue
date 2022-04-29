<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!--三级联动已经是全局组件了-->
      <CategorySelect @getCategoryId="getCategoryId" :isShowTable="scene==0"></CategorySelect>
    </el-card>
    <el-card>
      <!--底部这里将来是有三部分进行切换-->
      <div v-show="scene==0">
        <!--展示Spu列表的结构-->
        <el-button type="primary" icon="el-icon-plus" size="small" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table  :data="records" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
            
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">

          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">

          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!--这里按钮将来用hintButton替换-->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表"></hint-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button slot="reference" type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene==2" ref="sku"></SkuForm>
      <!--分页器-->
      <el-pagination
        style="text-align: center"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        layout="prev, pager, next, jumper,-> , sizes, total"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入子组件
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: "Spu",
  components:{
    SpuForm,
    SkuForm
  },
  data() {
    return {
      // 三级分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,// 分页器当前第几页
      limit: 3,// 每一页展示多少条数据
      records: [],// spu列表的数据
      total: 0,// 分页器一共需要展示数据的条数
      scene: 0,// 0：代表展示spu列表数据 1：添加spu|修改spu 3：添加sku
      flag: ''
    };
  },
  methods: {
    // 三级联动的自定事件，可以把子组件相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      // categoryId：获取到一、二、三级分类id  level：为了区分是几级id
      if (level == 1) {
        this.category1Id = categoryId;
        // 清除2、3级分类的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        // 清除3级分类的id
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 获取spu列表数据进行展示
        this.getSpuList();
      }
    },
    // 获取Spu列表数据的方法
    async getSpuList(pages = 1) {
      this.page = pages;
      const {page, limit, category3Id} = this
      let result = await this.$API.spu.reqSpuList(page,limit,category3Id);
      if(result.code == 200){
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 点击分页器第几页按钮的回调
    handleCurrentChange(page){
      this.getSpuList(page);
    },
    // 当分页器的某一个展示数据条数发生变化的回调
    handleSizeChange(limit){
      this.limit = limit
      this.getSpuList();
    },
    // 添加spu按钮的回调
    addSpu(){
      // 切换为场景1
      this.scene = 1
      // 通知子组件SpuForm发请求----两个
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 修改spu按钮的回调
    updateSpu(row){
      // 获取SpuForm子组件的方法
      this.$refs.spu.initSpuData(row)
      this.scene = 1
    },
    // SpuForm组件自定义事件的回调
    changeScene({scene,flag}){
      // flag这个形参为了区分按钮是添加还是修改
      this.flag = flag
      this.scene = scene
      // 子组件通知父组件切换场景，需要再次获取Spu列表的数据进行展示
      if(flag=='添加'){
        this.getSpuList();
      }else{
        this.getSpuList(this.page);
      }
    },
    // 删除Spu
    async deleteSpu(row){
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code == 200){
        this.$message({
          type: 'success',
          message: '删除成功'
        })

        this.getSpuList(this.records.length>1?this.page:this.page-1)
      }
    },
    // 添加Sku
    addSku(row){
      this.scene = 2
      // 父组件调用子组件的方法，让子组件发请求------三个请求
      this.$refs.sku.getData(this.category1Id,this.category2Id,row)
    }
  },
};
</script>

<style scoped>
</style>