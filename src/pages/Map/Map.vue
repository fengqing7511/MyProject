<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 667px;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: '广州琶洲吉盛伟邦6023',
				latitude: 23.097413,
				longitude: 113.367614,
				covers: [{
					latitude: 23.097413,
					longitude: 113.367614,
					iconPath: '../../static/icons/dingwei.png'
				}, {
					latitude: 23.097413,
					longitude: 113.367614,
					iconPath: '../../static/icons/dingwei.png'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page-body {
		width: 100%;
		height: 100%;
	}
</style>
