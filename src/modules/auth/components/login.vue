
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
	<v-min-layout>
		<v-flex slot="get-mini-frame" xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="auth-container limited-login-pane">
			<v-container>
				<v-card-text class="xoko-logo px-0 text-xs-center">
					<img src="/static/img/xoko-logo.svg" alt="XOKO" />
				</v-card-text>
				<v-card-text class="title3 signin-title px-2 text-xs-center app-c-primary--text">Sign in to your account </v-card-text>
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
									hint="example@xoko.io"
									solo
									color="app-c-primary"
									class="elevation-0"
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
									v-model="form.password"
									:error-messages="errors.collect('password')"
									type="password"
									solo
									color="app-c-primary"
									class='password elevation-0'
								/></v-text-field>
							</v-flex>
							<v-flex xs12 login-footer>
								<div class="xs12 action">
									 <v-btn
										type="submit"
										:disabled="this.errors.items.length !== 0"
										:loading="submitLogin"
										class="app-c-blue no-margin px-3"
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

<style lang="stylus">
.auth-container
	padding-top 15vh
	.xoko-logo
		img
			max-width 210px
</style>

