<template>
	<view>
		<wee-cart></wee-cart>
	</view>
</template>

<script lang="ts">
	import weeCart from "@/components/wee-cart/wee-cart.vue"
	import {
		Vue,
		Component
	} from 'vue-property-decorator';
	@Component({
		components:{
			weeCart
		}
	})
	export default class Index extends Vue {
	}
</script>

<style>

</style>
