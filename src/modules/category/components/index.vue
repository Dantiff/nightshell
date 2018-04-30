
<script>
// import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			searchCategories: '',
			selectedOutlet: {},
		};
	},
	computed: {
		...mapGetters({
			fetchingCategories: 'fetchingCategories',
			categories: 'categories',
			outlets: 'outlets',
		}),
	},
	watch: {
		searchCategories() {
			this.$store.commit('SEARCH_CATEGORIES', { search: this.searchCategories.toLowerCase() });
		},
	},
	methods: {
		visitCategory(cat) {
			console.log('trying category', cat);
			this.$router.push({
				name: 'products.index',
				params: { outlet: this.selectedOutlet.id, category: cat.id },
			});
		},
	},
	mounted() {
		this.$store.commit('FETCH_CATEGORIES');
		this.selectedOutlet = this.outlets.filter(
			s => s.id.toString() === this.$route.params.outlet.toString()
		)[0];
	},
};
</script>
<template>
	<v-max-layout>
		<v-container fluid grid-list-md class="products-index-container">
			<v-layout row wrap>
				<v-flex
					xs12
					pa-0
				>
					<v-card-text class="pb-0 text-xs-left outlet">
						<div class="title3 name"> {{ selectedOutlet.name }} </div>
						<div class="title5 py-1"> {{ selectedOutlet.address }} </div>
						<div class="title5"> {{ selectedOutlet.email }} </div>
					</v-card-text>
					<v-card-title class="pb-0 pt-1 title3"> 
						<div class="content-title"> Available Categories: {{ categories.length }} </div>
						<v-spacer></v-spacer>
						<div class="search">
							<v-text-field 
								prepend-icon="search" 
								label="Search"
								hide-details 
								single-line 
								solo
								color="app-c-primary"
								class=""
								v-model="searchCategories"
							></v-text-field>
						</div>
					</v-card-title>
				</v-flex>
				<v-flex
					xs12 sm6 md3 xl2
					pa-0
					v-for="(cat, i) in categories"
					:key="i"
				>
					<v-card
						class="products-card"
						@click.prevent="visitCategory(cat)"
					>
						<v-card-title primary-title>
						  {{ cat.name }}
						</v-card-title>
						<v-card-text class="cat-img">
							<img :src="'/static/img/' + cat.name.split(' ').join('').toLowerCase() + '.jpg'" :alt="cat.name" />
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-max-layout>
</template>

<style lang="stylus">
app-c-gold = #F29419;

.products-index-container
	padding 12px 20px
	.outlet
		.name
			font-size 24px
	.products-card
		min-height 27vh
		height 220px !important
		background-color #fffffe
		margin 15px
		box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
		transition all 0.4s ease-in-out
		cursor pointer
		&:hover
			box-shadow 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
			.card__title
				color app-c-gold !important
		.card__title
			font-weight bold
		.cat-img
			img
				max-height 120px

</style>
