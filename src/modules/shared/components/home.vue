
<script>
// import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters({}),
	},
	watch: {},
	methods: {},
	mounted() {},
};
</script>
<template>
  <v-min-layout>
		<v-flex
			slot="get-mini-frame"
			xs12 
			class="index-home"
		>
			<!-- Welcome View -->
			<v-flex xs12 class="home-section px-5">
				<v-container fluid px-0 pt-3 class="intro elevation-0">
					<v-layout row wrap class="">
						<v-flex xs12 md9 offset-md3>
							<h1 class="px-0 sell-phrase">
								Welcome to Xoko
							</h1>
							<v-card-text class="px-0 slogan">
								Sell more with a bird's view of your shop.
							</v-card-text>
							<v-card-text class="px-0 actions">
								<v-btn class="elevation-10 app-c-proceed" large dark> Order now </v-btn>
								<v-btn class="elevation-10 app-c-info" large dark> Read More </v-btn>
							</v-card-text>
						</v-flex>
					</v-layout>
				</v-container>
			</v-flex>

		</v-flex>
	</v-min-layout>
</template>

<style lang="stylus">
.index-home
  min-height 100vh
  .title1
  	font-weight 500
  	opacity 0.8
	.slogan
		font-size 20px
		line-height 1.4
		font-weight 300
		@media screen and (min-width: 768px)
			font-size 26px
	.intro
		min-height 84vh
		text-align right
		@media screen and (max-width: 768px)
			text-align center
		.sell-phrase
			padding-top 12%
		.slogan
			padding 32px 0 40px
		.actions
			button
				.btn__content
					font-weight 700
					font-size 17px
				&:hover
					background-color #f47c47 !important
			
</style>

