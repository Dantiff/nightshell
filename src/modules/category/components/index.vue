
<script>
// import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			fetchingCategories: 'fetchingCategories',
			categories: 'categories',
		}),
	},
	watch: {},
	methods: {},
	mounted() {
		this.$store.commit('FETCH_CATEGORIES');
	},
};
</script>
<template>
	<v-max-layout>
		<v-container fluid grid-list-md class="products-index-container">
			<v-layout row wrap>
				<v-flex
					xs12 sm6
					pa-0
					v-for="(graph, i) in 4"
					:key="i"
				>
					<v-card
						class="products-card elevation-1"
					>
						<v-card-text class="welcome">
							the products get here
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-max-layout>
</template>

<style lang="stylus">
.products-index-container
	padding 12px 20px
	background-color #ebebe6
	.products-card
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
