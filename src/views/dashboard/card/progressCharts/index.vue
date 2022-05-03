<template>
  <!--容器-->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  name: "ProgressCharts",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      // x轴
      xAxis: {
        // 隐藏X轴
        show: false,
        // 最大值与最小值的设置
        min: 0,
        max: 100
      },
      // y轴
      yAxis: {
        // 隐藏Y轴
        show: false,
        // 均分
        type: "category"
      },
      // 系列
      series: [
        {
          // 图表的类型
          type: "bar",
          // 图表需要展示的数据
          data: [78],
          color: 'yellowGreen',
          // 柱状图宽度的设置
          barWidth: 15,
          // 背景颜色的设置
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          // 文本标签的设置
          label: {
            // 文本是否展示
            show: true,
            // 改变文本内容
            formatter: '|',
            // 文本标签位置的调试
            position: 'right'
          }
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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