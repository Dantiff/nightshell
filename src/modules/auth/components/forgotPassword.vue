
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
				email: '',
			},
		};
	},
	computed: {
		...mapGetters({
			submitForgotPassword: 'submitForgotPassword',
		}),
	},
	methods: {
		validateForm() {
			const { form } = this;

			this.$validator
				.validateAll()
				.then(result => {
					if (result) {
						this.$store.commit('FORGOT_PASSWORD', { session: form });
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
        <v-card-text class="title8 px-2 pt-0"> Submit your email address and we'll send you a link to reset your password </v-card-text>
        <form @submit.prevent="validateForm" class="app-form">
				  <v-container grid-list-md text-xs-center class="no-padding">
				    <v-layout row wrap>
				      <v-flex xs12>
                <v-text-field
	                name="email"
	                data-vv-as="Email"
	                type="text"
	                label="Email Address"
	                v-model="form.email"
	                data-vv-delay="2"
	                :error-messages="errors.collect('email')"
	                data-vv-name="email"
	                v-validate="'required|email'"
	                hint="example@premiumer.io"
	              />
				      </v-flex>
	            <v-flex xs12 login-footer>
	              <div class="xs12 action">
	                 <v-btn
	                 	type="submit"
	                 	:disabled="this.errors.items.length !== 0"
	                 	:loading="submitForgotPassword"
	                 	class="btn-blue no-margin px-3 app-btn"
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

