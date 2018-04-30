
<script>
export default {
	data() {
		return {
			clipped: false,
			fixed: false,
			profileLinks: [{ path: { name: 'logout.index' }, text: 'Log Out' }],
		};
	},
};
</script>

<template>
  <v-app light>
    <v-toolbar
    	fixed
    	app
    	:clipped-left="clipped"
    	class="app-bar elevation-1 px-5"
    	color="white"
    >
      <a href="/" class="brand">
      	<img src="/static/img/xoko-logo.svg" alt="XOKO" />
      </a>
      <v-spacer></v-spacer>
      <v-btn
      	color="app-c-blue white--text btn-order mr-3"
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
    <v-content px-5>
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
	padding 90px 48px 0px !important
	background-color #ebebe6
@media screen and (min-width: 960px)
	.app-bar
		.toolbar__content
			margin 15px 0 13px 0 !important
</style>

