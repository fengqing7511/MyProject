<template>
	<view class="content">
		<view class="left_title">
			<slot name="main_title">
			</slot>
			<slot name="subtitle">
			</slot>
		</view>
		<slot name="right_title">
		</slot>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch,
		Prop
	} from "vue-property-decorator";

	@Component({
		components: {

		}
	})

	export default class Index extends Vue {

	}
</script>

<style lang="less" scoped>
	.content {
		padding: 15rpx;
		width: 94%;
		display: flex;
		height: 190rpx;
		justify-content: space-between;
		.left_title {
			display: flex;
			justify-content: space-evenly;
			flex-direction: column;
			padding-left: 20rpx;

		}

	}
</style>
