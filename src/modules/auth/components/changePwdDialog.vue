
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

const emptyForm = {
	current_password: '',
	password: '',
	password_confirmation: '',
};

export default {
	$_veeValidate: {
		validator: 'new',
	},
	data() {
		return {
			open: false,
			edited: false,
			emptyForm,
			form: { ...emptyForm },
			seePasswordOne: false,
			seePasswordTwo: false,
			seePasswordThree: false,
		};
	},
	computed: {
		...mapGetters({
			dialog: 'authDialog',
			authUser: 'authUser',
			submitChangePassword: 'submitChangePassword',
			createUserErrors: 'createUserErrors',
		}),
	},
	watch: {
		dialog: {
			handler() {
				Vue.nextTick(() => {
					this.errors.clear();
				});

				const { dialog } = this;
				if (dialog.open && dialog.event === 'changePassword') {
					this.edited = false;
					this.open = true;
				} else {
					this.open = false;
					this.form = { ...this.emptyForm };
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
						this.$store.commit('CHANGE_PASSWORD', {
							id: this.authUser.attributes.fingerprint,
							user,
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
	mounted() {},
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
					<span class="dialog-title"> Change your password </span>
					<v-spacer></v-spacer>
					</v-btn>
				</v-card-title>
				<v-card-text class="app-form tags-container">
		      <form @submit.prevent="validateForm" class="app-form">
					  <v-container grid-list-md text-xs-center class="no-padding">
					    <v-layout row wrap>
					      <v-flex xs12>
		              <v-text-field
		                name="current_password"
		                label="Current Password"
		                data-vv-as="Current Password"
		                data-vv-delay="2"
		                :error-messages="errors.collect('current_password')"
		                data-vv-name="current_password"
		                v-validate="'required'"
		                hint="At least 8 characters"
		                class='password'
		                v-model="form.current_password"
					          :append-icon="seePasswordOne ? 'visibility' : 'visibility_off'"
					          :append-icon-cb="() => (seePasswordOne = !seePasswordOne)"
					          :type="seePasswordOne ? 'text' : 'password'"
		                />
					      </v-flex>
					      <v-flex xs12>
		              <v-text-field
		                name="password"
		                label="New Password"
		                data-vv-as="New Password"
		                data-vv-delay="2"
		                :error-messages="errors.collect('password')"
		                data-vv-name="password"
		                v-validate="'required'"
		                hint="At least 8 characters"
		                class='password'
		                v-model="form.password"
					          :append-icon="seePasswordTwo ? 'visibility' : 'visibility_off'"
					          :append-icon-cb="() => (seePasswordTwo = !seePasswordTwo)"
					          :type="seePasswordTwo ? 'text' : 'password'"
		              />
					      </v-flex>
					      <v-flex xs12>
		              <v-text-field
		                name="password_confirmation"
		                label="Confirm Password"
		                data-vv-as="Confirm Password"
		                data-vv-delay="2"
		                :error-messages="errors.collect('password_confirmation')"
		                data-vv-name="password_confirmation"
		                v-validate="`required|passwordConfirmation:${form.password}, ${form.password_confirmation} `"
		                hint="At least 8 characters"
		                class='password'
		                v-model="form.password_confirmation"
					          :append-icon="seePasswordThree ? 'visibility' : 'visibility_off'"
					          :append-icon-cb="() => (seePasswordThree = !seePasswordThree)"
					          :type="seePasswordThree ? 'text' : 'password'"
		              />
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
          	:loading="submitChangePassword"
						@click.native="validateForm"
          	:disabled="this.errors.items.length !== 0"
					> Continue </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<style lang="stylus">
	.password-dialog
		.card-content
			padding-bottom 0 !important
		.card__actions
			.btn
				margin 6px 8px !important
</style>

