
<script>
// import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			searchOutlets: '',
			headers: [
				{
					text: 'Name',
					align: 'left',
					value: 'name',
				},
				{ text: 'Address', value: 'address' },
				{ text: 'Phone Number', value: 'phone' },
				{ text: 'Email', value: 'email' },
			],
		};
	},
	computed: {
		...mapGetters({
			fetchingOutlets: 'fetchingOutlets',
			outlets: 'outlets',
			appTokens: 'appTokens',
		}),
	},
	watch: {
		searchOutlets() {
			this.$store.commit('SEARCH_OUTLETS', { search: this.searchOutlets.toLowerCase() });
		},
	},
	methods: {},
	mounted() {
		this.$store.commit('FETCH_OUTLETS', { ...this.appTokens });
		console.log('Mounted with data', this.outlets);
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
					<v-card-title class="pb-0 title3"> 
						<div class="content-title"> Available Outlets: {{ outlets.length }} </div>
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
								v-model="searchOutlets"
							></v-text-field>
						</div>
					</v-card-title>
				</v-flex>
				<v-flex
					xs12
					pa-0
				>
				  <v-data-table
				    :headers="headers"
				    :items="outlets"
				    hide-actions
				    :loading="fetchingOutlets"
				    class="products-card elevation-1"
				  >
				    <template slot="items" slot-scope="props">
				      <td>{{ props.item.name }}</td>
				      <td class="text-xs-left">{{ props.item.address }}</td>
				      <td class="text-xs-left">{{ props.item.phone }}</td>
				      <td class="text-xs-left">{{ props.item.email }}</td>
				    </template>
				  </v-data-table>
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
