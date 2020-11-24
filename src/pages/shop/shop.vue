<template>
	<view class="box">
		<block v-for="item in StoreIntroduction" :key="index">
			<!-- 自营店头部地址和手机号 -->
			<view class="information">
				<!-- 自营店 -->
				<view class="top">
					<image :src="item.store_logo"></image>
					<text>{{item.store_name}}</text>
				</view>
				<!-- 定位地址 -->
				<view class="address gongxiang iconfont icon-location" @click="geToMap">
					<text> {{item.address}}</text>
					<text class="youjiantou iconfont icon-youjiantou">

					</text>
				</view>
				<!-- 电话联系 -->
				<view class="Telephone gongxiang iconfont icon-icon_dianhua" @click="popUps">
					<text> {{item.phone}}</text>
					<text class="youjiantou iconfont icon-youjiantou">
					</text>
				</view>
			</view>
			<!-- 基本信息 -->
			<view class="essentialInformation">
				<view class="essentialGongxiang colors">
					基本信息
				</view>
				<view class="essentialGongxiang">
					门店类型
					<text class="colors youdingwei">
						普通商家
					</text>
				</view>
				<view class="essentialGongxiang eliminateBorder">
					客服微信二维码
				</view>
				<!-- 二维码 -->
				<view class="erweima">
					<image :src="item.service_code" @click="preview"></image>
					<button class="youdingwei">保存到手机</button>
				</view>
				<view class="essentialGongxiang eliminateBorder">
					门店简介
				</view>
				<view class="essentialGongxiang colors ziti">
					{{item.brief}}
				</view>
				<view class="essentialGongxiang eliminateBorder">
					门店图片
				</view>
				<!-- 图片展示 -->
				<view class="pictureBox">
					<!-- 图片 -->
					<block v-for="(i,index) in photos" :key="index">
						<image :src="i.image" @click="previewImage(index)">
						</image>
					</block>
				</view>

			</view>

		</block>
		<n-transition ref="pop" speed="ease-in-out" :height="300" :maskVal="0.5"></n-transition>
	</view>
</template>

<script>
	import {
		merchant
	} from "@/utils/home/merchant.js"
	import nTransition from '@/components/n-transition/n-transition.vue'
	export default {
		data() {
			return {
				StoreIntroduction: "",
				photos: [],
				erweima: ""
			}
		},
		created() {
			// console.log(merchant.datas)
			// console.log(merchant.datas[0].store_img)
			// console.log(merchant.datas[0].service_code)
			this.StoreIntroduction = merchant.datas;
			this.photos = merchant.datas[0].store_img;
			this.erweima = merchant.datas[0].service_code;
			// console.log(this.erweima)
		},
		methods: {
			previewImage(index) {
				let photoList = this.photos.map(item => {
					return item.image;
				});
				// console.log(photoList)
				uni.previewImage({
					current: index,
					urls: photoList
				});
			},
			preview() {
				// console.log(this.erweima)
				var arr = [];
				arr.push(this.erweima);
				uni.previewImage({
					current: 0,
					urls: arr
				});
			},
			popUps() {
				this.$refs['pop'].show()
			},
			geToMap() {
				uni.navigateTo({
					url: '/pages/Map/Map',
				})
			}
		},
		components: {
			nTransition
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #f8f9f9;

		.information {
			background-color: #ffffff;
			padding-top: 10rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 10rpx;

			.top {
				padding-top: 50rpx;
				padding-bottom: 50rpx;

				position: relative;

				image {
					width: 125rpx;
					height: 125rpx;
					border-radius: 50%;
					border: 1rpx solid #eeeeee;
					margin-left: 10rpx;
				}

				text {
					position: absolute;
					top: 50%;
					left: 180rpx;
					transform: translateY(-50%);
					font-size: 50rpx;
					color: #000000;
					font-weight: bold;
				}
			}

			.gongxiang {
				height: 100rpx;
				line-height: 100rpx;
				position: relative;
				border-bottom: 1rpx solid #f8f9fa;

				text {
					margin-left: 30rpx;
					color: #000;
				}

				.youjiantou {
					position: absolute;
					right: 20rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		.essentialInformation {
			background-color: #ffffff;
			padding-top: 10rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 10rpx;
			margin-top: 20rpx;

			.essentialGongxiang {
				height: 100rpx;
				line-height: 100rpx;
				position: relative;
				border-bottom: 1rpx solid #f8f9fa;
				color: #535252;
			}

			// 颜色
			.colors {
				color: #000000;
			}

			// 右边定位
			.youdingwei {
				position: absolute;
				right: 10rpx;
				top: 50%;
				transform: translateY(-50%);
			}

			// 清除下边线
			.eliminateBorder {
				border-bottom: 0rpx;
			}

			// 小字体
			.ziti {
				font-size: 30rpx;
			}

			.erweima {
				height: 200rpx;
				position: relative;
				border-bottom: 1rpx solid #f8f9fa;

				image {
					width: 170rpx;
					height: 170rpx;
					margin-left: 10rpx;
				}

				button {
					width: 250rpx;
					height: 80rpx;
					line-height: 80rxp;
					text-align: center;
					background-color: #FFFFFF;
					border: none;
					border: 1rpx solid #535252;
					font-size: 30rpx;
					color: #535252;
					outline: none;
				}
			}

			.pictureBox {
				// margin-top: 40rpx;
				// width: 100%;
				flex-direction: row;
				display: flex;
				justify-content: space-between;

				image {
					width: 31%;
					height: 240rpx;

				}
			}
		}

	}
</style>
