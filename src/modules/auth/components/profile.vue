
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import AvatarCropper from 'vue-avatar-cropper';

Vue.component('changePwdDialog', require('@/modules/auth/components/changePwdDialog.vue'));
Vue.component('authProfileDialog', require('@/modules/auth/components/createEditAuthProfile.vue'));

export default {
	components: { AvatarCropper },
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			selectedUser: 'selectedUser',
			selectedStakeholder: 'selectedStakeholder',
			authUser: 'authUser',
			allTags: 'allTags',
		}),
		selectedAuthUser() {
			return this['selected' + this.capitalizePhrase(this.authUser.type.slice(0, -1))];
		},
		authProfileTabs() {
			switch (this.authUser.type) {
				case 'users':
					return [
						{ value: 'Task', icon: 'list', color: 'event-green' },
						{ value: 'Issue', icon: 'announcement', color: 'event-red' },
					];
				case 'stakeholders':
					return [
						{ value: 'General', icon: 'people', color: 'event-green' },
						{ value: 'Case', icon: 'card_travel', color: 'event-green' },
						{ value: 'Task', icon: 'list', color: 'event-green' },
						{ value: 'Issue', icon: 'announcement', color: 'event-red' },
						{ value: 'Resolution', icon: 'gavel', color: 'event-green' },
						{ value: 'Engagement', icon: 'speaker_notes', color: 'event-green' },
					];
				default:
					return [];
			}
		},
	},
	methods: {
		getAuthTags(etags) {
			return etags
				.map(t => {
					let r = null;
					this.allTags.forEach(a => {
						if (t.fingerprint === a.fingerprint) {
							r = { ...t, ...a, selected: true };
						}
					});
					return r;
				})
				.filter(t => t !== null);
		},
		dialog(event, fingerprint) {
			if (event !== 'createUser' && event !== 'changePassword') {
				this.$store.commit('FETCH_' + this.authUser.type.slice(0, -1).toUpperCase(), {
					fingerprint,
				});
			}
			setTimeout(() => {
				this.$store.commit('AUTH_DIALOG_EVENT', { open: true, event });
			}, 250);
		},
		handleUploading(cropper) {
			const avatar = cropper.getCroppedCanvas().toDataURL();
			const fingerprint = this.form.fingerprint;
			console.log('upload avatar', fingerprint, avatar);
			this.$store.commit('UPDATE_USER', {
				user: { fingerprint, avatar },
			});
		},
	},
	mounted() {},
};
</script>
<template>
	<v-max-layout>
		<v-container 
			fluid grid-list-md 
			class="auth-container auth-container"
			ref="authProfileContainer"
		>
			<v-layout row wrap>
				<profile-index
					:profileTabs="authProfileTabs"
					:profileScope="authUser.type.slice(0, -1) | capitalizeWord"
					:activeTab="authProfileTabs[0].value"
					:authBased="true"
				>
					<v-flex 
						xs12 
						slot="profile-tags"
			      v-if="selectedAuthUser.attributes ? selectedAuthUser.attributes.tags.length !== 0 : false"
			   	>
						<v-card-text class="ml-0 pl-0 py-2">
			        <v-card-text
			        	grid-list-md
			        	class="selected-tags pa-0"
			        >
			        	<!-- List of selected tags -->
								<tags-list-view-box
									:closableTags="false"
									:isNonSeletedTagsList="true"
									:nonSeletedTagsList="selectedAuthUser.attributes ? getAuthTags(selectedAuthUser.attributes.tags) : []"
								></tags-list-view-box>
			        </v-card-text>
						</v-card-text>
					</v-flex>
					<span slot="profile-default">
						<v-card-title primary class="profile-title">
							<div>
								<div v-if="selectedAuthUser.attributes"> 
									{{ (selectedAuthUser.attributes.first_name + ' ' + selectedAuthUser.attributes.last_name) | capitalizePhrase }}
								</div>
							</div>
							<v-spacer></v-spacer>
					    <v-btn
					    	small
					    	flat
					    	icon
					    	color="grey darken-2"
					    	@click.native.stop="dialog('updateUser', selectedAuthUser.attributes.fingerprint)"
					    >
								<v-icon>edit</v-icon>
							</v-btn>
						</v-card-title>
					  <v-container grid-list-xl class="pa-0">
					    <v-layout class="ma-0">
					      <v-flex  xs12 sm5 class="photo-box px-3 py-2 ">
					        <v-card dark color="white photo">
								    <v-avatar class="hidden-xs-only">
								      <img v-if="selectedAuthUser.attributes ? selectedAuthUser.attributes.avatar ? true : false : false" :src="selectedAuthUser.attributes.avatar" alt="profile photo">
								      <img v-else src="/static/img/fixit-bg.png" alt="profile photo">
								    </v-avatar>
					        </v-card>
					      	<div class="change-pp" id="pick-avatar">
					      		<v-icon color="blue">photo_camera</v-icon>
					      		<span> Change your profile photo </span>
					      	</div>
							    <avatar-cropper
							      :upload-handler="handleUploading"
							      trigger="#pick-avatar"
							      :labels="{ submit: 'Save', cancel: 'Cancel' }"
							    ></avatar-cropper>
					      </v-flex>
		          	<v-flex xs12 sm7 class="pa-0">
									<v-container grid-list-md class="aut-profile-details">
									  <v-layout row wrap v-if="selectedAuthUser.attributes">
								    	<v-flex xs12 sm6>
									    	<div class="gen-title"> First Name </div>
									    	<div class="gen-detail"> {{ selectedAuthUser.attributes.first_name | capitalizePhrase }} </div>
									    </v-flex>
								    	<v-flex xs12 sm6>
									    	<div class="gen-title"> Last Name </div>
									    	<div class="gen-detail"> {{ selectedAuthUser.attributes.last_name | capitalizePhrase }} </div>
									    </v-flex>
								    	<v-flex xs12 sm6>
									    	<div class="gen-title"> Role </div>
									    	<div class="gen-detail"> {{ selectedAuthUser.attributes.role | capitalizePhrase }} </div>
									    </v-flex>
								    	<v-flex xs12 sm6>
									    	<div class="gen-title"> Status </div>
									    	<div class="gen-detail" :class="'status-' + selectedAuthUser.attributes.status"> 
									    		{{ selectedAuthUser.attributes.status | capitalizePhrase }} 
									    	</div>
									    </v-flex>
								    	<v-flex xs12 sm6>
									    	<div class="gen-title"> Phone Number </div>
									    	<div class="gen-detail"> {{ selectedAuthUser.attributes.mobile_number | maskPhoneNumber }} </div>
									    </v-flex>
								    	<v-flex xs12 sm6>
									    	<div class="gen-title"> Email Address </div>
									    	<div class="gen-detail"> {{ selectedAuthUser.attributes.email }} </div>
									    </v-flex>
									  </v-layout>
									</v-container>
					      	<div class="change-pp change-pp-fixed pl-2" @click="dialog('changePassword')">
					      		<v-icon color="blue">edit</v-icon>
					      		<span> Change password </span>
					      	</div>
		          	</v-flex>
		          </v-layout>
		        </v-container>
		        <v-divider></v-divider>
					</span>
					<div slot="profile-add-items"></div>
				</profile-index>
			</v-layout>
		</v-container>

		<!-- The Events dialog -->
		<auth-profile-dialog></auth-profile-dialog>

	  <!-- The change password dialog -->
	  <change-pwd-dialog> </change-pwd-dialog>

	</v-max-layout>
</template>

<style lang="stylus">
.photo-box
	.title-text
		padding-bottom 8px
		font-size 15px
		text-align left
		color #353535
	.photo
		height 170px !important
		width 170px !important
		.avatar
			min-width 100%
			min-height 100%
			border-radius 5px
			margin-right 5px
			img
				min-height 100%
				min-width 100%
				border-radius 5px
.change-pp
	color #4492c3
	padding 8px 0
	font-size 13px
	cursor pointer
	.icon
		font-size 20px
.change-pp-fixed
	position absolute
	bottom 90px
.section
	padding 16px 0 0
	button
		margin-left 0
		.btn__content
			padding-left 0
			text-transform capitalize
			color #4b97c6
			font-size 16px
			font-weight normal
	.title-text
		text-transform capitalize
		color #353535
		font-size 16px
		font-weight normal
.aut-profile-details
	.gen-title
		color #888b87
		font-size 11px
		opacity .8
	.gen-detail
		color #000000
	.status-active
		color #56b91c !important
	.status-deactivated
		color red !important
	.status-pending
		color orange !important
		
.avatar-cropper
	.avatar-cropper-mark
		background rgba(0,0,0,0.3) !important
	.avatar-cropper-container
		border-radius 2px
		-webkit-box-shadow 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12) !important
		box-shadow 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12) !important
	.avatar-cropper-footer
		.avatar-cropper-button
			font-weight 500
			font-size 16px
		:nth-child(2)
			&:hover
				background-color #4492c3 !important
		:first-child
			&:hover
				background-color #f44336 !important

</style>

