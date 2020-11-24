<template>
	<view class="box">
		<view class="designerBox" v-for="item in designMembers" :key="index">
			<view class="designerPhoto">
				<image :src="item.image"></image>
				<view class="designerGrade ziti2">
					{{item.code}}
				</view>
			</view>
			<view class="designer">
				<view class="ziti1 designerName zuo">{{item.name}}</view>
				<view class="ziti2 designerStyle zuo ">擅长风格:{{item.style_name}}</view>
				<view class="ziti2 designerWord zuo topic_cont_text">{{item.brief}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		designMember
	} from "@/utils/home/designMember.js"
	export default {
		data() {
			return {
				designMembers: []
			}
		},
		created() {
			console.log(designMember.datas)
			this.designMembers = designMember.datas
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;

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
					top: 30%;
					color: #b7b7b7;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 25rpx;
					line-height: 50rpx;
				}
 
				.designerWord {
					display: block;
					width: 100%;
					// height: 30%;
					position: absolute;
					top: 60%;
					color: #b7b7b7;
					white-space: pre-wrap;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3; //行数需设置
					line-clamp: 3;
					-webkit-box-orient: vertical;
					font-size: 25rpx;


				}

				// view{
				// 	display: block;
				// 	white-space: pre-wrap;
				// 	color: #b7b7b7;
				// 	font-size: 30rpx;
				// 	line-height: 60rpx;
				// 	white-space: nowrap;
				// 	text-overflow: ellipsis;
				// 	overflow: hidden;
				// }
			}

		}
	}
</style>
