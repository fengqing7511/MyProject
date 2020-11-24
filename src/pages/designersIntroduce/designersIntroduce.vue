<template>
	<view class="box">
		<view class="box-top">
		<view class="designerBox">
			<view class="designerPhoto">
				<image :src="data.image"></image>
				<view class="designerGrade ziti2">
					{{data.code}}
				</view>
			</view>
			<view class="designer">
				<view class="ziti1 designerName zuo">{{data.name}}</view>
				<view class="ziti2 designerStyle zuo ">{{data.style_name}}</view>
				<button class="ziti2 designerWord zuo topic_cont_text iconfont icon-icon_dianhua" @click="popUp">联系TA</button>
			</view>
		</view>
		<view class="gerenjianjie">
			<text class="geren ziti1">
				个人简介
			</text>
			<text class="jianjie ziti2">
				RESUME
			</text>
		</view>
		<view class="geyan ziti2">
			{{data.brief}}
		</view>
		</view>
		<view class="tabsCss">
			<view class="ziti3">
				TA的案例
			</view>
		<view class="tabsPhotos shadow" style="width: 100%; height: 700rpx;" v-for="item in data.case_list">
			<image :src="item.image_middle"></image>
			<text class="photoTitle pingxingjuzhong">{{item.case_name}}</text>
			<text class="photoPrice pingxingjuzhong">
				<text style="margin-right: 40rpx;">{{item.space }}</text>
				<text>{{ item.square }}㎡</text>
			</text>
		</view>
		</view>
		<n-transition ref="pop" speed="ease-in-out" :height="300" :maskVal="0.5"></n-transition>
	</view>
</template>

<script>
	import nTransition from '@/components/n-transition/n-transition.vue'
	export default {
		data() {
			return {
				data:[]
			}
		},
		methods: {
			onLoad: function(options) { //option为object类型，会序列化上个页面传递的参数
			    this.data = JSON.parse(options.res);
				console.log(this.data)
			},
			popUp() {
				this.$refs['pop'].show()
			},
		},
		components: {
			nTransition
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		
		background-color: #f5f5f5;
		.box-top{
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			// background-color: #797778;
		.designerBox {
			
			margin-top: 60rpx;
			width: 100%;
			// height: 45%;
			height: 250rpx;
			position: relative;
			
	
			.designerPhoto {
				width: 30%;
				height: 100%;
				border-radius: 10rpx 10rpx;
				position: relative;
	
				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx 10rpx;
				}
	
				.designerGrade {
					height: 15%;
					width: 100%;
					background-color: #000000;
					text-align: center;
					line-height: 40rpx;
					color: #FFFFFF;
					position: absolute;
					left: 0;
					bottom: 0;
					z-index: 1;
					border-radius: 10rpx 10rpx;
					font-size: 25rpx;
				}
			}
	
			.designer {
				width: 65%;
				height: 100%;
				position: absolute;
				right: 0;
				top: 0;
				// background-color: #1989FA;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
	
				.designerName {
					color: #000000;
				}
	
				.designerName {
					position: absolute;
					top: 5%;
	
				}
	
				.designerStyle {
					position: absolute;
					top: 40%;
					color: #000000;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 25rpx;
					line-height: 50rpx;
				}
	 
				.designerWord {
					width: 45%;
					font-weight: bold;
					height: 60rpx;
					line-height: 60rpx;
					position: absolute;
					top: 75%;
					color: #f99352;
					border: 1rpx solid #f99352;
	
				}
			}
	
		}
		}
		.ziti2{
			font-size: 25rpx;
		}
		.ziti1{
			font-size: 35rpx;
		}
		.ziti3{
			font-size: 50rpx;
			font-weight: bold;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
		.gerenjianjie{
			width: 100%;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			height: 50rpx;
			line-height: 50rpx;
			.geren{
				margin-right:30rpx;
			}
			.jianjie{
				color: #000000;
			}
		}
		.geyan{
			color: #797778;
			width: 100%;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			height: 50rpx;
			line-height: 50rpx;
		}
		.tabsCss {
			background-color: #FFFFFF;
			padding-top: 30rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
			padding-bottom: 30rpx;
			flex-direction: row;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			min-height: 200rpx;
			position: relative;
		
			.leixing {
				width: 100%;
				padding-top: 40rpx;
				padding-left: 25rpx;
				padding-right: 25rpx;
				padding-bottom: 40rpx;
				line-height: 50rpx;
				color: #000000;
				display: flex;
				justify-content: space-between;
			}
		
		
			.teaTable {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
		
			.pingxingjuzhong {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
		
			.tabsPhotos {
		
				width: 47%;
				height: 400rpx;
				margin-top: 30rpx;
				border-radius: 10rpx 10rpx;
				background-color: #f5f5f5;
				position: relative;
		
				image {
					width: 100%;
					height: 75%;
					border-radius: 10rpx;
				}
		
				// 平行居中
		
		
				.photoTitle {
					width: 100%;
					height: 50rpx;
					position: absolute;
					top: 80%;
					color: #2f2f2f;
					font-size: 35rpx;
					font-weight: bold;
					text-align: center;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
		
				.photoPrice {
					position: absolute;
					top: 90%;
					color: #555555;
					font-size: 25rpx;
				}
		
			}
		}
	}
</style>
