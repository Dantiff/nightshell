
<script>
import Highcharts from 'highcharts';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			chart: null,
		};
	},
	computed: {
		...mapGetters({
			data: 'siteData3',
		}),
	},
	watch: {
		data: {
			handler() {
				this.redraw();
			},
			deep: true,
		},
	},
	methods: {
		redraw() {
			this.chart.redraw();
			this.chart.series[0].update({ data: this.data }, false);
			this.chart.redraw();
		},
	},
	mounted() {
		const { data } = this;

		const options = {
			chart: {
				type: 'column',
				renderTo: 'chartThree',
			},
			title: {
				text: 'Site Metrics',
			},
			subtitle: {
				text: '',
			},
			xAxis: {
				type: 'category',
			},
			yAxis: {
				title: {
					text: 'Total',
				},
			},
			legend: {
				enabled: false,
			},
			credits: {
				enabled: false,
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					dataLabels: {
						enabled: true,
					},
				},
			},
			colors: Highcharts.map(Highcharts.getOptions().colors, color => ({
				radialGradient: {
					cx: 0.5,
					cy: 0.3,
					r: 0.7,
				},
				stops: [
					[0, color],
					[
						1,
						Highcharts.Color(color)
							.brighten(-0.3)
							.get('rgb'),
					], // darken
				],
			})),
			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			},

			series: [
				{
					name: 'Overview',
					colorByPoint: true,
					data,
				},
			],
		};
		this.chart = new Highcharts.Chart(options);
	},
};
</script>

<template>
  <div  class='chart-container'>
    <div id="chartThree"></div>
  </div>
</template>

<style lang="stylus">
#chartThree
  height 35vh
</style>
