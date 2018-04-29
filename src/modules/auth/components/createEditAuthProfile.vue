
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
	$_veeValidate: {
		validator: 'new',
	},
	data() {
		return {
			open: false,
			edited: false,
		};
	},
	computed: {
		...mapGetters({
			dialog: 'authDialog',
			authUser: 'authUser',
			userForm: 'userForm',
			stakeholderForm: 'stakeholderForm',
			userWatchForm: 'userWatchForm',
			submitUser: 'submitUser',
			selectedUser: 'selectedUser',
			createUserErrors: 'createUserErrors',
			fetchingUser: 'fetchingUser',
			selectedTags: 'selectedTags',
		}),
		form() {
			return this[this.authUser.type.slice(0, -1) + 'Form'];
		},
	},
	watch: {
		dialog: {
			handler() {
				Vue.nextTick(() => {
					this.errors.clear();
				});

				const { dialog } = this;
				if (dialog.open && dialog.event === 'updateUser') {
					this.edited = false;
					this.open = true;
				} else {
					this.open = false;
				}
			},
			deep: true,
		},
		form: {
			handler() {
				const { form, userWatchForm } = this;
				if (JSON.stringify(form) !== JSON.stringify(userWatchForm)) {
					this.edited = true;
				} else {
					this.edited = false;
				}
			},
			deep: true,
		},
	},
	methods: {
		validateForm() {
			const { form } = this;

			this.$validator
				.validateAll()
				.then(result => {
					if (result) {
						const user = { ...form };
						this.$store.commit('UPDATE_USER', {
							user,
							tags: this.selectedTags
								.map(s => (s.selected ? s.name : null))
								.filter(s => s !== null),
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		closeDialog() {
			this.edited = false;
			this.$store.commit('AUTH_DIALOG_EVENT', { open: false, event: '' });
		},
	},
};
</script>

<template>
	<v-dialog
		persistent
		scrollable
		v-model="open"
		max-width="450px"
	>
		<v-card :class="'app-dialog password-dialog profile-page app-dialog-' + open">
			<v-card-text class="card-content">
				<v-card-title>
					<span class="dialog-title"> Edit Profile Details </span>
					<v-spacer></v-spacer>
					</v-btn>
				</v-card-title>
				<v-card-text class="app-form pb-1">
		      <form @submit.prevent="validateForm" class="app-form">
					  <v-container grid-list-md text-xs-center class="no-padding">
					    <v-layout row wrap>
	              <v-flex xs12>
	                <v-text-field
		                name="first_name"
		                data-vv-as="First name"
		                type="text"
		                label="First name"
		                v-model="form.first_name"
		                data-vv-delay="2"
		                :error-messages="errors.collect('first_name')"
		                data-vv-name="first_name"
		                v-validate="'required'"
		                hint="John"
		                required
	                />
	                <span class="form-errors" v-show="createUserErrors.first_name_key"> {{ 'First name ' + createUserErrors.first_name }} </span>
	              </v-flex>
	              <v-flex xs12>
	                <v-text-field
		                name="last_name"
		                data-vv-as="Last name"
		                type="text"
		                label="Last name"
		                v-model="form.last_name"
		                data-vv-delay="2"
		                :error-messages="errors.collect('last_name')"
		                data-vv-name="last_name"
		                v-validate="'required'"
		                hint="Doe"
		                required
	                />
	                <span class="form-errors" v-show="createUserErrors.last_name_key"> {{ 'Last name ' + createUserErrors.last_name }} </span>
	              </v-flex>
	              <v-flex xs12>
	                <v-text-field
	                	mask="(+###) ### - ### - ###"
		                name="user_mobile_number"
		                data-vv-as="Phone Number"
		                type="text"
		                label="Phone Number"
		                v-model="form.mobile_number"
		                data-vv-delay="2"
		                :error-messages="errors.collect('user_mobile_number')"
		                data-vv-name="user_mobile_number"
		                v-validate="'required|numeric|min:9|max:12'"
		                hint="0722777000"
		                required
	                />
	                <span class="form-errors" v-show="createUserErrors.mobile_number_key"> {{ 'Mobile Number ' + createUserErrors.mobile_number }} </span>
	              </v-flex>
	              <v-flex xs12>
									<v-text-field
										name="email"
										data-vv-as="Email"
										type="text"
										label="Email Address"
										v-model="form.email"
										:error-messages="errors.collect('email')"
										data-vv-delay="2"
										v-validate="'required|email'"
										data-vv-name="email"
										hint="example@premiumer.io"
										required
									/>
	                <span class="form-errors" v-show="createUserErrors.email_key"> {{ 'Email ' + createUserErrors.email }} </span>
	              </v-flex>
					    </v-layout>
					  </v-container>
		      </form>
				</v-card-text>
			</v-card-text>
			<v-card-actions class="profile-actions">
				<v-spacer></v-spacer>
          <v-btn
          	color="grey darken-1 cancel"
          	flat
          	@click.native="closeDialog"
          >Cancel</v-btn>
					<v-btn
						color="primary"
						right
						dark
          	:loading="submitUser"
						@click.native="validateForm"
          	:disabled="this.errors.items.length !== 0"
					> Continue </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
