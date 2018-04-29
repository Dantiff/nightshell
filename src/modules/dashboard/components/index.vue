
<script>
import Vue from 'vue';
// import { mapGetters } from 'vuex';

Vue.component('chartOne', require('@/modules/dashboard/components/chartOne.vue'));
Vue.component('chartTwo', require('@/modules/dashboard/components/chartTwo.vue'));
Vue.component('chartThree', require('@/modules/dashboard/components/chartThree.vue'));
Vue.component('chartFour', require('@/modules/dashboard/components/chartFour.vue'));

export default {
	data() {
		return {};
	},
	computed: {},
	watch: {},
	methods: {},
	mounted() {
		this.$store.commit('FETCH_SITE_DATA');
	},
};
</script>
<template>
	<v-max-layout>
		<v-container fluid grid-list-md class="dashboard-index-container">
			<v-layout row wrap>
				<v-flex
					xs12 sm6
					pa-0
					v-for="(graph, i) in 4"
					:key="i"
				>
					<v-card
						class="dashboard-card elevation-1"
					>
						<v-card-text class="welcome">
							<chart-one entry="site" v-if="i === 0"></chart-one>
							<chart-two entry="site" v-if="i === 1"></chart-two>
							<chart-three v-else-if="i === 2"></chart-three>
							<chart-four v-else-if="i === 3"></chart-four>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-max-layout>
</template>

<style lang="stylus">
.dashboard-index-container
	padding 12px 20px
	background-color #ebebe6
	.dashboard-card
		min-height 40vh
		background-color #fffffe
		margin 15px
		box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
		transition all 0.4s ease-in-out
		&:hover
			box-shadow 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
		.welcome
			color blue

</style>
