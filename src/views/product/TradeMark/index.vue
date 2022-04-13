<template>
  <div>
    <!--按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin: 0px; padding: 9px" @click="showDialog">添加</el-button>
    <!--
        表格组件
        data：表格组件将来需要展示的数据------数组类型
        border：给表格添加边框
        column属性
          label：显示的属性
          width：对应列的宽度
          align：标题的对齐方式
          prop：对应列内容的字段名
          注意1：elementUI当中的table组件，展示的数据是以一列一列进行展示的
      -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!--row：作用域插槽回传的数据-->
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      分页器
        当前第几页、数据总条数、每页展示条数、连续页码数
        current-page：当前第几页
        total：一共要展示的数据条数
        page-size：每一页要展示多少条数据
        page-sizes：设置每一页要展示多少条数据
        pager-count：按钮的数量 若是9 连续页码数为7
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" 
    -->
    <el-pagination
      style="margin-top: 20px;textAlign: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="9"
      :page-sizes="[3, 5, 10]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper, ->, sizes, total"
    >
    </el-pagination>
    <!--
      对话框
      :visible.sync：控制对话框显示与隐藏用的
    -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!--form表单 :model属性：把表单的数据收集到哪个对象身上，将来表单的验证，也需要这个属性-->
      <el-form style="width: 80%" :model="tmForm"> 
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" label-width="100px">
          <!-- 
            手机数据不能使用v-model，因为不是表单元素
            action：设置你图片上传的地址
            :on-success：可以检测到图片上传是否成功，若成功，会执行
            :before-upload：上传图片之前执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">        
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 代表分页去第几页
      page: 1,
      // 当前页数展示数据的条数
      limit: 3,
      //总共数据条数
      total: 0,
      //列表展示的数据
      list: [],
      //对话框显示与隐藏
      dialogFormVisible: false,
      //收集品牌的信息
      tmForm: {
        logoUrl: '',
        tmName: ''
      }
    }
  },
  // 组件挂载完毕发请求
  mounted() {
    // 获取列表数据方法
    this.getPageList()
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList() {
      // 解构出参数
      const { page, limit } = this
      // 获取品牌列表的接口
      //当你向服务器发请求的时候，这个函数要带参数，因此data中要初始化整两个字段
      let result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if(result.code == 200){
        //分别是 数据总条数与列表展示的数据
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 当前页改变时调用，默认传入当前页
    handleCurrentChange(pager){
      //修改参数
      this.page = pager;
      this.getPageList();
    },
    // pageSize 改变时会触发，默认传入选择的每页展示的条数
    handleSizeChange(limit){
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌的按钮
    showDialog(){
      this.dialogFormVisible = true;
      // 清除数据
      this.tmForm = {logoUrl: '',tmName: ''}
    },
    // 修改某一个品牌
    updateTradeMark(){
      //显示对话框
      this.dialogFormVisible = true;
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      // res：上传成功之后，返回给前端的数据
      // file：也是上传成功之后，返回给前端的数据
      this.tmForm.logoUrl = res.data
      },
    // 上传图片之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 添加按钮（添加品牌|修改品牌）
    async addOrUpdateTradeMark(){
      this.dialogFormVisible = false;
      // 发请求
      let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
      if(result.code == 200){
        // 弹出信息：添加品牌成功、修改品牌成功
        this.$message(this.tmForm.id ? '修改品牌成功' : '添加品牌成功');
        // 添加或者修改品牌成功以后，再次获取品牌列表进行展示
        this.getPageList();
      }
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
