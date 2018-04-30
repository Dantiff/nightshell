
<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			clipped: false,
			fixed: false,
			primaryLinks: [
				{ path: { name: 'dashboard.index' }, text: 'Dashboard' },
				{ path: { name: 'cases.index' }, text: 'Cases' },
				{ path: { name: 'stakeholders.index' }, text: 'Stakeholders' },
				{ path: { name: 'users.index' }, text: 'Users' },
			],
			profileLinks: [{ path: { name: 'logout.index' }, text: 'Log Out' }],
		};
	},
	computed: {
		...mapGetters({
			appTokens: 'appTokens',
		}),
	},
	methods: {},
	created() {
		console.log('Index created');
	},
	mounted() {
		console.log('Index mounted');
	},
};
</script>

<template>
  <v-app light>
    <v-toolbar
    	fixed
    	app
    	:clipped-left="clipped"
    	class="app-bar elevation-1"
    	color="white"
    >
      <a href="/" class="brand">
      	<img src="/static/img/xoko-logo.svg" alt="XOKO" />
      </a>
      <v-spacer></v-spacer>
      <v-btn
      	color="app-c-blue white--text btn-order"
      	href="https://www.xoko.co.ke/order"
      >Order Now </v-btn>
      <div
      	class="profile"
      >
		    <v-avatar>
		      <img src="/static/img/emptyAvatar.png" alt="Profile">
		    </v-avatar>
	      <v-menu
	      	offset-y
		      origin="center center"
		      transition="scale-transition"
		      bottom
	      >
	        <v-icon slot="activator">arrow_drop_down</v-icon>
	        <v-list class="profile-menu">
			      <router-link
				      v-for="(l, i) in profileLinks"
				      :key="i"
				      :to="l.path"
				      :exact="true"
				      active-class="link-active"
				    >
		          <v-list-tile>
		            <v-list-tile-title>{{ l.text }}</v-list-tile-title>
		          </v-list-tile>
		        </router-link>
	        </v-list>
	      </v-menu>
	    </div>
    </v-toolbar>
    <v-content>
      <!-- Content will be placed here -->
      <slot></slot>
      <router-view></router-view>
    </v-content>
   <!--  <v-footer
    	:fixed="fixed"
    	app
    	class="app-footer"
    >
      <span>&copy; 2018</span>
    </v-footer> -->
  </v-app>
</template>

<style lang="stylus">
app-c-blue = #193340;
app-c-gold = #F29419;

.app-bar
	.toolbar__content
		margin 21px 0 19px 0
		.brand
			img
				width 150px
				height 35px
		.btn-order
			&:hover
				color app-c-blue !important
				background-color app-c-gold !important
.content
	padding 90px 0px 0px !important
</style>

