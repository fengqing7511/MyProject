<template>
	<view>
		<view class="commodity">
			<van-tabs>
			  <van-tab v-for="index in 8" :title="'标签 ' + index">
			    内容 {{ index }}
			  </van-tab>
			</van-tabs>
		</view>
		
	</view>
</template>

<script>
	import {
		vanTabs
	} from "@/wxcomponents/vant/dist/tabs/index.js"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components: {
			vanTabs
		}
	}
</script>

<style>

</style>
