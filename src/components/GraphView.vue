<template>
    <div>
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">{{ header }}</h5>
          <div>
            <select class="form-select form-select-sm" v-model="presetIndex">
              <option v-for="(option, oindex) in preset" v-bind:value="oindex" :key="'prkey' + oindex">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <v-chart class="chart" :option="option" autoresize />
      </div>
    </div>
  </template>
      
    <script>
  import { inject, ref } from "@vue/runtime-core";
  import { use } from "echarts/core";
  import { CanvasRenderer } from "echarts/renderers";
  import { LineChart } from "echarts/charts";
  import VChart, { THEME_KEY } from "vue-echarts";
  import {
    GridComponent,
    TooltipComponent,
    MarkLineComponent,
    MarkAreaComponent,
  } from "echarts/components";
  import { provide } from "vue";
  
  use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    MarkLineComponent,
    MarkAreaComponent,
    TooltipComponent,
  ]);
  
const seriesTemplate = {
          showSymbol: false,
          symbol: "emptyCircle", //Set as a solid point
          symbolSize: 5, //Set the size of the solid point
          itemStyle: {
            //Circle style
            borderWidth: 1,
            color: "#f60",
          },
          label: {
            show: false,
            position: "bottom",
            textStyle: {
              fontSize: 10,
            },
          },
          connectNulls: true,
          data: [],
          type: "line",
          smooth: true,
}

const colors = ["#F06","#f60", "#06F"]

  export default {
    components: { VChart },
    props: ["paths", "names", "header"],
    setup() {
      const remote = inject("remote");
      const request = inject('request')
      const data = ref({});
      const presetIndex = ref(5)
      const preset = {
        4: { period: 'now-1h:now', interval: '1m', name: '1 Hour' },
        5: { period: 'now-3h:now', interval: '1m', name: '3 Hours' },
        6: { period: 'now-6h:now', interval: '2m', name: '6 Hours' },
        7: { period: 'now-24h:now', interval: '5m', name: '1 Day' },
        8: { period: 'now-2d:now', interval: '10m', name: '2 Days' },
        9: { period: 'now-7d:now', interval: '30m', name: '7 Days' },
      }
      const option = ref({
        animation: false,
        grid: { top: 20, bottom: 30, right: 10, left: 10 },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" },
        },
        xAxis: {
          type: "time",
          // data: [],
          splitLine: { show: true },
          onZero: false,
        },
        yAxis: { 
          show: false,
          type: "value", 
          min: "dataMin" 
        },
        series: [
          {
            showSymbol: false,
            symbol: "emptyCircle", //Set as a solid point
            symbolSize: 5, //Set the size of the solid point
            itemStyle: {
              //Circle style
              borderWidth: 1,
              color: "#f60",
            },
            label: {
              show: false,
              position: "bottom",
              textStyle: {
                fontSize: 10,
              },
            },
            connectNulls: true,
            data: [],
            type: "line",
            smooth: true,
          },
        ],
      });
      const timer = ref(false)
  
      return { timer, remote, data, option, theme: provide(THEME_KEY, "light"), request, preset, presetIndex };
    },
  
    mounted() {
      this.initSeries()
      this.updateData();
      this.timer = setInterval(this.updateData.bind(this), 5000);
    },
  
    unmounted(){
      if(this.timer) clearInterval(this.timer)
    },
  
    watch:{
      presetIndex: function (){
        this.updateData()
      }
    },

    methods: {
      initSeries(){
        const series = []
        for (let i = 1; i<= this.paths.length; i++){
          const ntp = JSON.parse(JSON.stringify(seriesTemplate))
          ntp.itemStyle.color = colors[i]
          ntp.name = this.names[i-1]
          series.push(ntp)
        }
        this.option.series = series
      },

      async updateData() {
        for (let i = 0; i< this.paths.length; i++){
          this.option.series[i].data = await this.getData(this.paths[i])
        }
      },

      async getData(path){
        try {
          const ps = this.preset[this.presetIndex]
          const result = await this.request('post', '/database/read', {
            path: path,
            period: ps.period,
            precision: ps.interval,
            func: 'avg'
          })
          const tmpData = [];
          for (const row of result.rows) {
            tmpData.push([ new Date(row.time*1000).toISOString(), row.value ])
          }
          return tmpData
        }catch (err){
          return []
        }

      }
    },
  };
  </script>
    <style >
  .chart {
    height: 200px;
  }
  </style>
    