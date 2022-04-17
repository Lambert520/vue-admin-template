<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :isShowTable="isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" size="small" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row}">
              <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin:0px 5px">{{attrValue.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加属性或修改属性的结构-->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form"  label-width="80px">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性</el-button>
        <el-button @click="isShowTable = !isShowTable">取消</el-button>
        <el-table style="width: 100%;margin:20px 0px" border :data="attrInfo.attrValueList"> 
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row}">
               <!--这里的结构需要用到span与input进行切换-->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" ref="edit" v-if="row.flag" @keyup.native.enter="toLook(row)" @blur="toLook(row)"></el-input>
              <span v-else @click="toEdit(row)" style="display:block">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"></el-button>
              </el-popconfirm>     
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttrInfo" :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
        <el-button @click="isShowTable = !isShowTable">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收平台属性的数据
      attrList: [],
      // 这个属性是控制table的显示与隐藏
      isShowTable: true,
      // 收集新增属性|修改属性使用
      attrInfo: {
        attrName: '',// 属性名
        attrValueList: [
          // 属性值，因为属性值可以有多个，所以用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: 0,// 三级分类的id
        categoryLevel: 3// 因为服务器也需要区分几级id
      }
    };
  },
  methods: {
    // 自定义事件的回调
    getCategoryId({ categoryId, level }) {
      // 区分三级分类相应的id
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;
        // 发请求获取平台属性数据
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    // 当用户确定三级分类的数据时，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      //获取分类的id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 第二个table的添加属性值回调
    addAttrValue(){
      // 向属性值的数组里面添加元素
      // attrId：是你相应的属性的id，目前而言我们是添加属性的操作，还没有相应的属性的id，暂时赋值undefined
      // valueName：相应属性值的名称

      this.attrInfo.attrValueList.push({
        // 对于修改某一个属性的时候，可以在已有的属性值基础上新增新的属性值(新增的属性值，需要把已有的id带上)
        attrId: this.attrInfo.id, 
        valueName: '',
        // flag属性(响应式属性)：给每个属性值添加一个标记flag，用户切换查看|编辑模式（每一个属性值可以控制自己的模式切换）
        flag: true
      })
      this.$nextTick(()=>{
        this.$refs.edit.focus()
      })
    },
    // 第一个table 添加属性按钮的回调
    addAttr(){
      // 切换table显示与隐藏
      this.isShowTable = false
      // 清除数据
      this.attrInfo = {
        attrName: '',// 属性名
        attrValueList: [
          // 属性值，因为属性值可以有多个，所以用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: this.category3Id,// 三级分类的id
        categoryLevel: 3// 因为服务器也需要区分几级id
      }
    },
    // 修改某一个属性
    updateAttr(row){
      this.isShowTable = false;
      // 将选中的属性赋值给attrInfo
      // 由于数据结构当中存在对象里面套数组，数组里面又套对象，浅拷贝不起作用
      // 需要使用深拷贝（浅拷贝只能拷贝浅层次的对象，不能拷贝深层次的对象）
      this.attrInfo = cloneDeep(row);
      // 在修改某一个属性的时候，将相应的属性值元素添加上flag这个属性
      this.attrInfo.attrValueList.forEach(item=>{
        // 需要添加响应式的数据，保证视图跟着数据变化
        // 1：对象  2：添加新的响应式属性 3：新的属性的属性值
        this.$set(item,'flag',false)
      })
    },
    // 失去焦点的事件----切换为查看模式，展示span
    toLook(row){
      // row：是当前用户添加的最新属性值
      // 如果属性值为空，是不能作为新的属性，给用户提示输入一个其他的属性值
      if(row.valueName.trim()==''){
        this.$message('属性值不能为空')
        return
      }
      // 新增的属性值不能与已有的属性值相同 
      let isRepeat = this.attrInfo.attrValueList.some(item=>{
        // 将row从数组里面判断的时候去除【最后一个数据】
        if(row!==item){
          return row.valueName == item.valueName
        }
      })
      if(isRepeat){
        this.$message('属性值不能重复')
        return
      }
      // 将当前编辑模式变为查看模式【input消失、span出现】
      row.flag = false
    },
    // 点击span的回调，变为编辑模式
    toEdit(row){
      row.flag = true
      // 获取input节点，实现自动聚焦效果
      // 注意：点击span的时候，切换为编辑模式(input)，对于浏览器而言，页面的重绘与重排是耗时间的，不能立马获取到input
      this.$nextTick(()=>{
        // 获取相应的input表单元素实现聚焦
        this.$refs.edit.focus()
      })
    },
    // 气泡确认框 确定按钮的回调
    // 最新版本elementUI----2.15.6 目前模板中的2.13.2，气泡确认触发的事件是onConfirm
    deleteAttrValue(index){
      // 当前删除属性的操作是不需要发请求的
      this.attrInfo.attrValueList.splice(index,1);
    },
    // 保存按钮，进行添加属性或者修改属性的操作
    async addOrUpdateAttrInfo(){
      // 整理参数：1.如果用户添加很多属性值，且属性值为空，不应该提交给服务器
      // 2.提交给服务器的数据当中不应该出现flag字段
      this.attrInfo.attrValueList  = this.attrInfo.attrValueList.filter((item)=>{
        // 过滤掉属性值不是空的
        if(item.valueName != ''){
          // 删除掉flag属性
          delete item.flag
          return true
        }
      })
      try {
        // 发请求
        await this.$API.attr.reqAddOrUpdateAttrInfo(this.attrInfo)
        // 展示平台属性的信号量进行切换
        this.isShowTable = true;
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        // 保存成功以后 需要再次获取平台属性进行展示
        this.getAttrList();
      } catch (error) {
        this.$message('保存失败')
      }    
    }
  },
};
</script>

<style scoped>
</style>