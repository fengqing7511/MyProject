<template>
	<view class="content">
		<view class="header_title">
			<image :src="shelfspaceobj.image" mode=""></image>
			<view class="txt_title">
				<text>{{shelfspaceobj.name}}</text> <text>{{shelfspaceobj.brief}}</text>
			</view>
		</view>

		<view class="nav_title_bar">
			<view class="title_tab">
				<view :class="index==currentIndex?'active':''" v-for="(item,index) in shelfspaceobj.shelf_class" :key="item.class_id"
				 @tap="handleClick(index,item.class_id)">
					{{item.name}}
				</view>
				<view class="">
					更多
				</view>
			</view>
		</view>

		<view class="content_tab">
			<view class="content_tab_item" v-for="(item,index1) in shelfspaceobj.goods_list" :key="item.shelf_goods_id" v-if="currentIndex==0">
				<view class="image_area">
						<image :src="item.image" mode=""></image>
						<view class="title_item">
							{{item.goods_name}}
						</view>
						<view class="sal_item">
							￥{{item.retail_price}}
						</view>
				</view>		
			</view>
			
			<view class="content_tab_item" v-for="(item,index1) in shelfspaceobj.goods_list" :key="item.shelf_goods_id"  v-if="item.shelf_id==classId">
			<view class="image_area">
					<image :src="item.image" mode=""></image>
					<view class="title_item">
						{{item.goods_name}}
					</view>
					<view class="sal_item">
						￥{{item.retail_price}}
					</view>
			</view>
					<!-- <view class="image_area_item" 			<view class="image_area1" v-if="index1==shelfspaceobj.goods_list.length-1&&index1%2!=0">>
						<view class="">
							探索更多{{shelfspaceobj.goods_list.length}}
						</view>
						<view class="">
							MORE
						</view>
					</view>
			</view> -->
			</view>
			
			
			
		</view>

	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Prop
	} from "vue-property-decorator";

	@Component({
		components: {

		}
	})
	export default class Index extends Vue {
		private currentIndex: number = 0
		private classId:number=0
		private flag:boolean=true
		@Prop({
			type: Object
		}) private shelfspaceobj: any;

		handleClick(index: number,classId:number): void {
			this.currentIndex = index;
			this.classId=classId
		
		}
		
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100%;

		.header_title {
			width: 100%;
			height: 180rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;

			image {
				height: 100rpx;
				width: 100rpx;
			}

			.txt_title {
				text {
					margin-right: 12rpx;
					font-size: 25rpx;
					font-weight: 600;
				}
			}
		}
	}


	.nav_title_bar {
		width: 100%;
		display: flex;
		justify-content: center;
		height: 100rpx;
		// background-color: red;

		.title_tab {
			display: flex;
			width: 90%;
			height: 100rpx;

			view {
				width: 220rpx !important;
				padding: 10rpx;
				text-align: center;
				height: 30rpx;
				line-height: 30rpx;
				font-size: 20rpx;
				cursor: pointer;
			}

			.active {
				color: black;
				font-weight: 600;
				transform: scale();
			}

			&>view:not(:last-child) {
				border-right: 1px solid #ADADAD;
			}
		}
	}
	
	.content_tab {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.content_tab_item{
			.image_area{
				width: 330rpx;
				height: 500rpx;
				image{
					width: 330rpx;
					height: 350rpx;
					border-radius: 16rpx;
				}
				.title_item{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: #ADADAD;
					margin-top: 15rpx;
					width: 330rpx;
				}
				.sal_item{
					margin-top: 20rpx;
					color: #FF8917;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	
	.image_area1{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 330rpx;
		height: 350rpx;
		border-radius: 16rpx;
		background-color: #f5f5f5;
		.image_area_item{
			width: 200rpx;
			height: 200rpx;
			&>view:nth-of-type(1){
				color: #FF8917;
				font-weight: 600;
				text-align: center;
				margin-top: 20rpx;
			}
			&>view:nth-of-type(2){
				margin-top: 24rpx;
					color: #ADADAD;
					font-weight: 600;
					letter-spacing: 6rpx;
					text-align: center;
			}
		}
	}
</style>
