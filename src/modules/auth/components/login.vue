
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
				password: '',
				remember_me: false,
			},
		};
	},
	computed: {
		...mapGetters({
			submitLogin: 'submitLogin',
		}),
	},
	methods: {
		validateForm() {
			const { form } = this;

			this.$validator
				.validateAll()
				.then(result => {
					if (result) {
						this.$store.commit('LOGIN', form);
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
				<v-card-text class="title3 signin-title no-padding px-0">Sign in to your account </v-card-text>
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
									:error-messages="errors.collect('email')"
									data-vv-delay="2"
									v-validate="'required|email'"
									data-vv-name="email"
									hint="example@premiumer.io"
								></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field
									name="password"
									label="Password"
									data-vv-as="Password"
									data-vv-delay="2"
									v-validate="'required'"
									data-vv-name="password"
									class='password'
									v-model="form.password"
									:error-messages="errors.collect('password')"
									type="password"
								/></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-checkbox
									label="Keep me signed in"
									v-model="form.remember_me"
									color="primary"
									:value="form.remember_me"
									hide-details
									class="checkbox"
								></v-checkbox>
							</v-flex>
							<v-flex xs12 login-footer>
								<div class="xs12 action">
									 <v-btn
										type="submit"
										:disabled="this.errors.items.length !== 0"
										:loading="submitLogin"
										class="btn-blue no-margin app-btn px-3"
										primary
										dark
									 >Sign In</v-btn>
								</div>
							</v-flex>
							<v-flex xs12 login-footer>
								<div class="xs12 text-xs-center">
								 <router-link :to="{ name: 'forgot.index' }" class="app-link-dark">Forgot Password? </router-link>
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

