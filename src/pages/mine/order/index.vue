<template>
	<view>
		<v-tabs v-model="current" :tabs="tabs" @change="changeTab" :scroll="false"></v-tabs>
	</view>
</template>

<script lang="ts">
	import {
		Vue,
		Component,
	} from 'vue-property-decorator';
	@Component({
	})
	export default class Index extends Vue {
		private current:number=0
		onLoad(options:any){
			this.current=++options.id
		}
		private tabs:any=['全部','待付款','待发货','待收货','已完成']
		
	}
</script>

<style>

</style>
