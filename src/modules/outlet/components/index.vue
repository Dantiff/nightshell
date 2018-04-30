
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
				{ text: '', value: 'visit' },
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
	methods: {
		visitOutlet(outlet) {
			this.$router.push({ name: 'categories.index', params: { outlet: outlet.id } });
		},
	},
	mounted() {
		this.$store.commit('FETCH_OUTLETS', { ...this.appTokens });
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
				    class="products-table elevation-1"
				  >
				    <template slot="items" slot-scope="props">
				    	<tr class="product-row" @click="visitOutlet(props.item)">
					      <td>{{ props.item.name }}</td>
					      <td class="text-xs-left">{{ props.item.address }}</td>
					      <td class="text-xs-left">{{ props.item.phone }}</td>
					      <td class="text-xs-left">{{ props.item.email }}</td>
					      <td class="text-xs-left icon-box">
					      	<v-icon
					      		color="app-c-blue"
					      	>remove_red_eye</v-icon>
					      </td>
					    </tr>
				    </template>
				  </v-data-table>
				</v-flex>
			</v-layout>
		</v-container>
	</v-max-layout>
</template>

<style lang="stylus">
app-c-gold = #F29419;

.products-index-container
	padding 12px 20px
	.products-table
		min-height 40vh
		margin 15px
		.product-row
			cursor pointer
			transition all 0.4s ease-in-out
			.icon
				cursor pointer
			&:hover
				.icon
					color app-c-gold !important

</style>
