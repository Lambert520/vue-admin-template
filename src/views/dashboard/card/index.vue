<template>
  <div>
      <el-row :gutter="10">
          <el-col :span="6">
              <el-card>
                  <!--第一个card-->
                  <Detail title="总销售额" count="￥ 126560">
                    <!--作用域插槽-->
                    <template slot="charts">
                        <span>周同比&nbsp;&nbsp;56.67%<svg t="1651564115281" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8048" width="16" height="16"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#d81e06" p-id="8049"></path></svg></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>日同比&nbsp;&nbsp;19.96%<svg t="1651564342303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9348" width="16" height="16"><path d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z" fill="#1afa29" p-id="9349"></path></svg></span>
                    </template>
                    <template slot="footer">
                        <span>日销售额￥ 12423</span>
                    </template>
                  </Detail>
              </el-card>
          </el-col>
          <el-col :span="6">
               <el-card>
                  <!--第二个card-->
                  <Detail title="访问量" count="88460">
                    <template slot="charts"> 
                        <LineCharts></LineCharts>
                    </template>
                    <template slot="footer">
                        <span>日访问量 1234</span>
                    </template>
                  </Detail>
              </el-card>
          </el-col>
          <el-col :span="6">
               <el-card>
                  <!--第三个card-->
                  <Detail title="支付笔数" count="88460">
                    <template slot="charts">
                        <BarCharts></BarCharts>
                    </template>
                    <template slot="footer">
                        <span>转换率 64%</span>
                    </template>
                  </Detail>
              </el-card>
          </el-col>
          <el-col :span="6">
               <el-card>
                  <!--第四个card-->
                  <Detail title="运营活动效果" count="78%">
                    <template slot="charts">
                        <ProgressCharts></ProgressCharts>
                    </template>
                    <template slot="footer">
                        <span>周同比&nbsp;&nbsp;56.67%<svg t="1651564115281" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8048" width="16" height="16"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#d81e06" p-id="8049"></path></svg></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>日同比&nbsp;&nbsp;19.96%<svg t="1651564342303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9348" width="16" height="16"><path d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z" fill="#1afa29" p-id="9349"></path></svg></span>
                    </template>
                  </Detail>
              </el-card>
          </el-col>
      </el-row>
  </div>  
</template>

<script>
import Detail from './detail'
import LineCharts from './lineCharts'
import BarCharts from './barCharts'
import ProgressCharts from './progressCharts'
export default {
    name: 'Card',
    components: {
        Detail,
        LineCharts,
        BarCharts,
        ProgressCharts
    }
}
</script>

<style>

</style>