
<script>
// import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
	$_veeValidate: {
		validator: 'new',
	},
	data() {
		return {
			seePassword: false,
			form: {
				password: '',
				password_confirmation: '',
				token: '',
			},
		};
	},
	computed: {
		...mapGetters({
			submitResetPassword: 'submitResetPassword',
			resetPasswordError: 'resetPasswordError',
		}),
	},
	methods: {
		validateForm() {
			const { form } = this;
			form.token = this.$route.params.tokenId;

			this.$validator
				.validateAll()
				.then(result => {
					if (result) {
						this.$store.commit('RESET_PASSWORD', form);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>

<template>
	<v-min-layout class="auth-container">
		<v-flex slot="get-mini-frame" xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="limited-login-pane">
      <v-container>
        <v-card-text class="title3 px-2"> Reset your PremiumEssayWriters password </v-card-text>
        <v-card-text class="title8 px-2 pt-0 pb-1"> Fill in below fields to create a new password </v-card-text>
        <form @submit.prevent="validateForm" class="app-form">
				  <v-container grid-list-md text-xs-center class="no-padding">
				    <v-layout row wrap>
				      <v-flex xs12>
	              <v-text-field
	                name="password"
	                label="Password"
	                data-vv-as="Password"
	                data-vv-delay="2"
	                :error-messages="errors.collect('password')"
	                data-vv-name="password"
	                v-validate="'required'"
	                hint="At least 8 characters"
	                class='password'
	                v-model="form.password"
	                type="password"
	                />
				      </v-flex>
				      <v-flex xs12>
	              <v-text-field
	                name="password_confirmation"
	                label="Password Confirmation"
	                data-vv-as="Password Confirmation"
	                data-vv-delay="2"
	                :error-messages="errors.collect('password_confirmation')"
	                data-vv-name="password_confirmation"
	                v-validate="`required|passwordConfirmation:${form.password}, ${form.password_confirmation} `"
	                hint="At least 8 characters"
	                class='password'
	                v-model="form.password_confirmation"
	                type="password"
	              />
				      </v-flex>
	            <v-flex xs12 login-footer>
	              <div class="xs12 action">
	                 <v-btn
	                 	type="submit"
	                 	:disabled="this.errors.items.length !== 0"
	                 	:loading="submitResetPassword"
	                 	class="btn-blue no-margin app-btn"
	                 	primary
	                 	dark
	                 >Submit</v-btn>
	              </div>
	            </v-flex>
	            <v-flex xs12 login-footer>
	              <div class="xs12 text-xs-center">
	               <router-link :to="{ name: 'login.index' }" class="app-link-dark"> Have an account? Sign in </router-link>
	              </div>
	            </v-flex>
				    </v-layout>
				  </v-container>
        </form>
      </v-container>
    </v-flex>
    <v-card-text slot="secondary-footer" class="pa-0"></v-card-text>
  </v-min-layout>
</template>
