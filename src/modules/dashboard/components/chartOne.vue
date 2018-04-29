
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
			siteData: 'siteData1',
			caseData: 'eventData4',
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
			this.chart.redraw();
			this.chart.series[0].update({ data: this.data }, false);
			this.chart.redraw();
		},
	},
	mounted() {
		const options = {
			chart: {
				renderTo: 'chartOne',
			},
			credits: {
				enabled: false,
			},
			series: [
				{
					type: 'wordcloud',
					data: this.data,
					name: 'Occurrences',
				},
			],
			title: {
				text: 'Tag Popularity Wordcloud',
			},
		};
		this.chart = new Highcharts.Chart(options);
	},
};
</script>

<template>
  <div  class='chart-container'>
    <div id="chartOne"></div>
  </div>
</template>

<style lang="stylus">
#chartOne
  height 35vh
</style>
