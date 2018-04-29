
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
			data: 'siteData4',
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
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				renderTo: 'chartFour',
			},
			title: {
				text: 'Site Activity by Stakeholder Login',
				x: -20,
			},
			subtitle: {
				text: 'Source: Activity Across the Site',
				x: -20,
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
						},
						connectorColor: 'silver',
					},
				},
			},
			credits: {
				enabled: false,
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
			series: [
				{
					name: 'Activities',
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
    <div id="chartFour"></div>
  </div>
</template>

<style lang="stylus">
#chartFour
  height 35vh
</style>
