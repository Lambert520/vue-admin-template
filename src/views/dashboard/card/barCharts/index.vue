<template>
  <!--容器-->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  name: "BarCharts",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      // x轴
      xAxis: {
        // 隐藏X轴
        show: false,
        // 均分
        type: "category",
      },
      // y轴
      yAxis: {
        // 隐藏Y轴
        show: false,
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [10, 7, 33, 12, 55, 88, 100, 102],
          color: 'cyan'
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      // 提示信息
      tooltip:{}
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>