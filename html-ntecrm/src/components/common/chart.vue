<template>
  <div class="x-bar">
    <div :id="id"
    :option="option"></div>
  </div>
</template>
<script>

//import Highcharts from 'highcharts/highstock';
//import HighchartsMore from 'highcharts/highcharts-more';
//import HighchartsDrilldown from 'highcharts/modules/drilldown';
//import Highcharts3D f rom 'highcharts/highcharts-3d';
//import Highmaps from 'highcharts/modules/map';

//HighchartsMore(Highcharts)
//HighchartsDrilldown(Highcharts);
//Highcharts3D(Highcharts);
//Highmaps(Highcharts);
export default {
  // 验证类型
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    }
  },
  mounted() {
    Highcharts.chart(this.id,this.option);
  }
}
</script>
