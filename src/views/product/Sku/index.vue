<template>
  <div>
    <!--表格-->
    <el-table :data="skuList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" style="width:80px;height:80px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row}">
          <el-button type="success" icon="el-icon-top" size="mini" v-if="row.isSale==0" @click="sale(row)"></el-button>
          <el-button icon="el-icon-bottom" size="mini" v-else @click="cancel(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button> 
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      layout="prev, pager, next, jumper, -> , sizes,total"
      :total="total"
      style="text-align: center"
    >
    </el-pagination>
    
    <!--抽屉效果-->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id">{{attr.attrId}}-{{attr.valueId}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="width:100%;height:150px" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, // 当前第几页
      limit: 10, // 当前页面展示几条数据
      total: 0, // 数据的总数,
      skuList: [],
      skuInfo: {}, // 存储Sku详情信息
      drawer: false,
    };
  },
  mounted() {
    // 获取Sku列表数据
    this.getSkuList();
  },
  methods: {
    // 获取Sku列表数据的方法
    async getSkuList(pages = 1) {
      this.page = pages
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200){
        this.skuList = result.data.records
        this.total = result.data.total
      }
    },
    // 当前页发生改变调用
    handleCurrentChange(page){
      this.getSkuList(page)
    },
    // 页面展示数据个数发生改变调用 
    handleSizeChange(limit){
      // 修改参数
      this.limit = limit
      this.getSkuList()
    },
    // 上架业务
    async sale(row){
      let result = await this.$API.sku.reqOnSale(row.id)
      if (result.code == 200){
        this.$message({
          type: 'success',
          message: '上架成功'
        })
        this.getSkuList(this.page);
      }
    },
     // 下架业务
    async cancel(row){
      let result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code == 200){
        this.$message({
          type: 'success',
          message: '下架成功'
        })
        this.getSkuList(this.page);
      }
    },
    // 编辑按钮回调
    edit(){
      this.$message('正在开发中')
    },
    // 获取Sku详情的方法
    async getSkuInfo(row){
      // 展示抽屉
      this.drawer = true
      // 获取
      let result = await this.$API.sku.reqSkuById(row.id)
      if (result.code == 200){
        this.skuInfo = result.data
      }
    }
  },
};
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>

<style scoped>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
  }
  .el-col{
    margin: 10px 10px;
  }
  /* 深度选择器 >>>*/
  >>>.el-carousel__button{
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }
</style>