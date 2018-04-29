<script>
import Highcharts from 'highcharts';
import { mapGetters } from 'vuex';

export default {
	props: {
		entry: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			chart: null,
		};
	},
	computed: {
		...mapGetters({
			siteData: 'siteData2',
			caseData: 'eventData2',
		}),
		data() {
			return this[this.entry + 'Data'];
		},
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
			const { data } = this;

			this.chart.redraw();
			this.chart.series[0].update(
				{ data: Object.keys(data.phone_call).map(i => data.phone_call[i]) },
				false
			);
			this.chart.series[1].update(
				{ data: Object.keys(data.meeting).map(i => data.meeting[i]) },
				false
			);
			this.chart.series[2].update({ data: Object.keys(data.email).map(i => data.email[i]) }, false);
			this.chart.series[3].update({ data: Object.keys(data.news).map(i => data.news[i]) }, false);
			this.chart.redraw();
		},
	},
	mounted() {
		const { data } = this;

		const options = {
			chart: {
				zoomType: 'x',
				renderTo: 'chartTwo',
			},
			title: {
				text: this.capitalizePhrase(this.entry) + ' Activity',
				x: -20,
			},
			subtitle: {
				text: 'Source: Engagement Across the Site',
				// text: document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
				x: -20,
			},
			symbols: ['circle', 'circle', 'circle', 'circle', 'circle'],
			xAxis: {
				type: 'datetime',
				minRange: 14 * 24 * 3600000,
			},
			yAxis: {
				title: {
					text: 'Engagement',
				},
				plotLines: [
					{
						value: 0,
						width: 1,
						color: '#808080',
					},
				],
			},
			tooltip: {
				valueSuffix: '',
				shared: true,
				xDateFormat: '%A, %b %e %Y',
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0,
			},
			credits: {
				enabled: false,
			},
			plotOptions: {
				area: {
					fillColor: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0, Highcharts.getOptions().colors[0]],
							[
								1,
								Highcharts.Color(Highcharts.getOptions().colors[0])
									.setOpacity(0)
									.get('rgba'),
							],
						],
					},
					marker: {
						radius: 2,
					},
					lineWidth: 1,
					states: {
						hover: {
							lineWidth: 1,
						},
					},
					threshold: null,
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
			series: [
				{
					name: 'Phone Calls',
					pointInterval: 24 * 3600000,
					pointStart: Date.UTC(2018, 1, 11),
					data: data.phone_call,
				},
				{
					name: 'Meetings',
					pointInterval: 24 * 3600000,
					pointStart: Date.UTC(2018, 1, 11),
					data: data.meeting,
				},
				{
					name: 'Emails',
					pointInterval: 24 * 3600000,
					pointStart: Date.UTC(2018, 1, 11),
					data: data.email,
				},
				{
					name: 'News',
					pointInterval: 24 * 3600000,
					pointStart: Date.UTC(2018, 1, 11),
					data: data.news,
				},
			],
		};
		this.chart = new Highcharts.Chart(options);
	},
};
</script>

<template>
  <div  class='chart-container'>
    <div id="chartTwo"></div>
  </div>
</template>

<style lang="stylus">
#chartTwo
  height 35vh
</style>
