<template>
	<view class="content">
		<scroll-view scroll-x="true" class="scroll_content" show-scrollbar="true">
			<view :class="swiperIndex==3*index+2?'active':''" v-for="(item,index) in titleArr" :key="item">
				{{item}}
			</view>
		</scroll-view>
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
		//1.响应式属性，对标之前的data函数返回的对象
		private titles: String = '商城';
		@Prop(Number) readonly swiperIndex!: number | undefined;
		@Prop(Array) readonly titleArr!: string[] | undefined;
		setswiperIndex(): String {
			return "active"
		}
	}
</script>

<style lang="less" scoped>
	scroll-view {
		width: 100%;
		height: 100rpx;
		white-space: nowrap;
		display: flex;
		align-items: flex-start;

		view {
			display: inline-block;
			height: 100%;
			margin-left: 50rpx;
			padding-top: 30rpx;
			color: gray;
		}

		.active {
			color: #000;
			font-weight: 600;
			height: 70rpx;

		}
	}

</style>
