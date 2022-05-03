<template>
  <!--容器-->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  name: "LineCharts",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      // x轴
      xAxis: {
        // 隐藏X轴
        show: false,
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
          type: "line",
          data: [10, 7, 33, 12, 55, 88, 100, 102],
          // 拐点样式的设置
          itemStyle: {
            opacity: 0, // 透明度
          },
          // 线条的样式
          lineStyle: {
            color: "purple",
          },
          // 填充颜色的设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100%处的颜色
                },
              ],
              global: false, // 缺省为false
            },
          },
          smooth: true
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