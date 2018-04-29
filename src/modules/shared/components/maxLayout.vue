
<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			clipped: false,
			fixed: false,
			title: 'FIX',
			primaryLinks: [
				{ path: { name: 'dashboard.index' }, text: 'Dashboard', permissions: [] },
				{ path: { name: 'cases.index' }, text: 'Cases', permissions: [] },
				{ path: { name: 'stakeholders.index' }, text: 'Stakeholders', permissions: [] },
				{ path: { name: 'users.index' }, text: 'Users', permissions: ['manage_users'] },
			],
			profileLinks: [
				{ path: { name: 'profile.index' }, text: 'Profile', permissions: [] },
				{ path: { name: 'logout.index' }, text: 'Logout', permissions: [] },
			],
			settingsLinks: [
				{ path: { name: 'tags.index' }, text: 'Tag Management', permissions: ['manage_tags'] },
			],
		};
	},
	computed: {
		...mapGetters({
			authUser: 'authUser',
		}),
	},
	methods: {
		permissionsCheck(required) {
			if (!required.length) {
				return true;
			}
			let check = true;
			required.map(r => {
				if (
					!this.authUser.attributes.permissions
						.map(p => (p.status ? p.slug : null))
						.filter(p => p !== null)
						.includes(r)
				) {
					check = false;
				}
				return null;
			});
			return check;
		},
	},
};
</script>

<template>
  <v-app light>
    <v-toolbar
    	fixed
    	app
    	:clipped-left="clipped"
    	class="app-bar"
    >
      <v-toolbar-title class="brand" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link
	      v-for="(l, i) in primaryLinks"
	      :key="i"
	      v-if="permissionsCheck(l.permissions)"
	      :to="l.path"
	      :exact="false"
	      active-class="link-active"
	    >
	      <div> {{ l.text }} </div>
	    </router-link>
      <v-spacer></v-spacer>
    	<div class="notifications">
		    <v-badge overlap color="red">
		      <span slot="badge">3</span>
		      <v-icon>notifications_none</v-icon>
		    </v-badge>
		  </div>
      <div
      	class="profile"
      >
		    <v-avatar>
		      <img src="/static/img/fixit-bg.png" alt="Profile">
		    </v-avatar>
      	<span class="hidden-lg-and-down"> {{ authUser.attributes.first_name + ' ' + authUser.attributes.last_name }} </span>
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
				      v-if="permissionsCheck(l.permissions)"
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
	    <div 
	    	class="profile settings-menu"
	      v-if="permissionsCheck(['manage_tags'])"
			>
	      <v-menu
	      	offset-y
		      origin="center center"
		      transition="scale-transition"
		      bottom
	      >
	        <v-icon slot="activator">settings</v-icon>
	        <v-list class="profile-menu">
			      <router-link
				      v-for="(l, i) in settingsLinks"
				      :key="i"
				      v-if="permissionsCheck(l.permissions)"
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

