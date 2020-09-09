<!--
    @desc     打卡信息 markData组件
    @author   yijie
    @date     2020-09-08
    @logs[0]  yijie 2020-09-08 创建了文件markData.vue
-->
<template>
  <div class="markData-main">
    <div id="myChart" class="calendar-chart"/>
    <div class="content">
      <el-button-group class="option-btns">
        <el-tooltip effect="dark" content="打卡" placement="top">
          <el-button circle disabled icon="el-icon-finished"/>
        </el-tooltip>
        <el-tooltip effect="dark" content="兑换" placement="top">
          <el-button circle disabled icon="el-icon-shopping-cart-1"/>
        </el-tooltip>
        <el-tooltip effect="dark" content="设置" placement="top">
          <el-button circle          icon="el-icon-setting"/>
        </el-tooltip>
      </el-button-group>
      <el-divider content-position="left">最近活跃记录</el-divider>
      <el-timeline class="timeline">
        <el-timeline-item placement="top" timestamp="2020-09-08">
          <h4>登陆自动打卡</h4>
        </el-timeline-item>
        <el-timeline-item placement="top" timestamp="2020-09-07">
          <h4>登陆自动打卡</h4>
        </el-timeline-item>
        <el-timeline-item placement="top" timestamp="2020-09-06">
          <h4>登陆自动打卡</h4>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'markData',
  components: {
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 绘制日历热力图
     */
    drawCalendar () {
      const curYear = 2020
      function getVirtulData (year) {
        year = year || '2017'
        var date = +echarts.number.parseDate(year + '-01-01')
        var end = +echarts.number.parseDate((+year + 1) + '-01-01')
        var dayTime = 3600 * 24 * 1000
        var data = []
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 100)
          ])
        }
        return data
      }

      const myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          top: 10,
          left: 'center',
          text: '本年度活跃记录'
        },
        tooltip: {},
        visualMap: {
          top: 40,
          min: 0,
          max: 100,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          splitNumber: 5,
          inRange: {
            color: [
              '#b8ddf0', '#8dcfef', '#52bff8', '#30b1f6',
              '#00a9ff'
            ]
          },
          outOfRange: {
            color: ['#eee']
          },
          textStyle: {
            color: '#000'
          }
        },
        calendar: {
          top: 100,
          left: 60,
          right: 30,
          cellSize: [10, 10],
          range: curYear,
          yearLabel: { show: true }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getVirtulData(curYear)
        }
      })
    }
  },
  mounted () {
    this.drawCalendar()
  }
}
</script>

<style lang="scss" scoped>
.markData-main {
  width: 100%;
  .calendar-chart {
    width: 100%; height: 200px;
  }
  .content {
    padding: {
      top: 10px; bottom: 10px;
    };
    .option-btns {
      position: relative;
      left: calc(100% - 118px);
    }
    .timeline {
    }
  }
}
</style>
