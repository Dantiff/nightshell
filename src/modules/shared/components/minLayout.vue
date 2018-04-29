
<script>
/* ============
   * Minimal Layout
   * ============
   *
   * Used for the register and login pages.
   *
   * Layouts are used to store a lot of shared code.
   * This way the app stays clean.
   */
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
	data: () => ({
		offsetTop: 0,
	}),
	computed: {
		...mapGetters({}),
	},
	watch: {},
	methods: {
		onScroll() {
			this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
			console.log('The current offset ', this.offsetTop);
		},
		elOffset(el) {
			const rect = el.getBoundingClientRect();
			const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
		},
		toTop() {
			Vue.nextTick(() => {
				this.$vuetify.goTo(10, {
					duration: 500,
					offset: -100,
					easing: 'easeInOutCubic',
				});
			});
		},
	},
	mounted() {},
};
</script>
<template>
  <v-app id="xoko-mini" class="xoko-mini" standalone v-scroll="onScroll">
    <v-container fluid pa-0>
      <v-layout row wrap class="p-relative">
        
        <!-- All prelogin views come here -->
        <slot name="get-mini-frame"></slot>


        <!-- The Back to top Button -->
        <v-btn
          bottom
          fixed
          floating
          left
          dark
          fab
          color="app-c-red darken-4"
          class="go-top elevation-20"
          @click="toTop"
        >
          <v-icon size="32px">keyboard_arrow_up</v-icon>
        </v-btn>

        <!-- App Footer Slot -->
        <slot name="app-footer"></slot>

      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="stylus"></style>

