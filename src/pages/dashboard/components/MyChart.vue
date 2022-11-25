<template>
  <div class="q-mb-lg">
    <apexchart
      style="background-color: white"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <!-- <div>
      <button @click="updateChart">Update!</button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueApexCharts from "vue3-apexcharts";
// Vue.use(VueApexCharts);
// Vue.component("apexchart", VueApexCharts);

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
  // name: "ColumnExample",
  data() {
    return {
      chartOptions: {
        label: {
          borderColor: "#775DD0",
          offsetY: 0,
          style: {
            color: "#fff",
            background: "#775DD0",
          },
          text: "Bananas are good",
        },
        chart: {
          type: "bar",
          height: 250,
        },
        xaxis: {
          categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "Juli",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        title: {
          text: "Sale History",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "center", // top, center, bottom
            },
          },
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 81, 0, 0, 0, 0],
        },
      ],
    };
  },
  methods: {
    updateChart() {
      const max = 90;
      const min = 20;
      const newData = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });

      const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        colors: [colors[Math.floor(Math.random() * colors.length)]],
      };
      // In the same way, update the series option
      this.series = [{ data: newData }];
    },
  },
});
</script>
