<template>
	<view class="box">
		<v-swiper>
			<swiper indicator-dots="true" indicator-color="#fff" indicator-active-color="#333" autoplay="true" interval="1500"
			 circular="true">
				<!-- 循环轮播图照片 -->
				<swiper-item v-for="item in Swiper" :key="index">
					<image :src="item.image"></image>
				</swiper-item>
			</swiper>
		</v-swiper>
		<view class="shop" v-for="item in StoreIntroduction" :key="index">
			<view class="introduce">
				<!-- 头像 -->
				<image class="headPortrait" :src="item.store_logo"></image>
				<!-- 自营店 -->
				<text class="ziying">{{item.store_name}}</text>
				<!-- 地址 -->
				<text class="address">地址：{{item.address}}</text>
				<!-- 电话 -->
				<image class="telephone" src="../../static/icons/dianhua.png" @click="popUp"></image>
			</view>
			<!-- 图片展示 -->
			<view class="pictureDisplay">
				<text>{{item.brief}}</text>
				<!-- 二次循环，三张图片 -->
				<view class="pictureBox">
					<!-- 图片 -->
					<block v-for="(i,index) in photos" :key="index">
						<image :src="i.image" @click="previewImage(index)">
						</image>
					</block>
				</view>
				<!-- 查看分享盒子 -->
				<view class="seeShare">
					<!-- 查看 -->
					<view class="see iconfont icon-chakan" @click="navToShop">
						查看门店
					</view>
					<!-- 分享 -->
					<button open-type="share" class="share iconfont icon-fenxiang">分享门店</button>
				</view>
			</view>
		</view>
		<!-- 邀请 -->
		<view class="invitationBox">
			<!-- 邀请礼物图片 -->
			<view class="gift">
				<image src="../../static/icons/lihe.png"></image>
			</view>
			<!-- 邀请有礼-->
			<text class="invitation">邀请有礼</text>
			<!-- 邀请好友, 豪礼送不停 -->
			<text class="invitations">邀请好友, 豪礼送不停</text>
			<!-- 立即邀请 -->
			<button open-type="share" class="nowInvite">立即邀请</button>
		</view>
		<!-- 底部弹窗 组件-->
		<n-transition ref="pop" speed="ease-in-out" :height="300" :maskVal="0.5"></n-transition>

		<!-- tabs组件 -->
		<v-tabs v-model="current" :tabs="tabs" @change="changeTab" :name="'自营商品'">

		</v-tabs>
		<!-- tabs - 全部-->
		<view class="tabsCss" v-if="activeIndex==0">
			<view class="tabsPhotos" v-for="item in selfSupport" :key="item.store_goods_id" @click="getToGoodDetail(item.store_goods_id)">   
				<image :src="item.image"></image>
				<text class="photoTitle pingxingjuzhong">{{item.store_goods_name}}</text>
				<text class="photoPrice pingxingjuzhong">￥{{item.retail_price}}</text>
				<text class="photoPopularity pingxingjuzhong">人气: {{item.click}}</text>
			</view>
		</view>
		<!-- 茶几 -->
		<view class="tabsCss" v-if="activeIndex==1">
			<view class="teaTable pingxingjuzhong">
				暂无商品
			</view>
		</view>
		<!-- 沙发 -->
		<view class="tabsCss" v-if="activeIndex==2">
			<view class="tabsPhotos" v-for="item in selfSupport" :key="item.store_goods_id" @click="getToGoodDetail(item.store_goods_id)">
				<image :src="item.image"></image>
				<text class="photoTitle pingxingjuzhong">{{item.store_goods_name}}</text>
				<text class="photoPrice pingxingjuzhong">￥{{item.retail_price}}</text>
				<text class="photoPopularity pingxingjuzhong">人气: {{item.click}}</text>
			</view>
		</view>
		<!-- 设计团队 -->
		<view class="leixings">
			<text class="ziti1">设计团队</text>
			<text class="ziti2" @click="getMore">更多 | MORE</text>
		</view>
		<view>
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view id="demo1" class="scroll-view-item_H uni-bg-red">
					<view class="designerBox" v-for="(item,index) in designMemberOne" :key="item.store_stylist_id" @click="navToIntroduce(item)">
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
				<view id="demo2" class="scroll-view-item_H uni-bg-green">
					<view class="designerBox" v-for="(item,index) in designMemberTwo" :key="item.store_stylist_id" @click="navToIntroduce(item)">
						<view class="designerPhoto">
							<image :src="item.image"></image>
							<view class="designerGrade ziti2">
								{{item.code}}
							</view>
						</view>
						<view class="designer">
							<view class="ziti1 designerName zuo ">{{item.name}}</view>
							<view class="ziti2 designerStyle zuo ">擅长风格:{{item.style_name}}</view>
							<view class="ziti2 designerWord zuo topic_cont_text">{{item.brief}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 优惠套餐 -->
		<view class="tabsCss">
			<view class="leixing">
				<text class="ziti1">优惠套餐</text>
				<text class="ziti2">更多 | MORE</text>
			</view>
			<view class="tabsPhotos shadow" style="width: 100%; height: 900rpx;" v-for="item in discountPackage" :key="item.store_goods_id" 
			 @click="getToGoodDetail(item.store_goods_id)">
				<image :src="item.image"></image>
				<text class="photoTitle pingxingjuzhong">{{item.store_goods_name}}</text>
				<text class="photoPrice pingxingjuzhong">￥{{item.retail_price}}</text>
				<text class="photoPopularity pingxingjuzhong">人气：{{item.click}}</text>
			</view>
		</view>
		<!-- 平台商品 -->
		<v-tabs v-model="current" :tabs="pingtaitabs" @change="pingTaichangeTab" :name="'平台商品'">
		</v-tabs>
		<!-- 平台商品全部 -->
		<view class="tabsCss" v-if="pingtaiIndex==0">
			<view class="tabsPhotos" v-for="item in pingtaiCommodity" :key="item.goods_id" @click="getToGoodDetailTwo(item.goods_id)">
				<image :src="item.image_middle"></image>
				<text class="photoTitle pingxingjuzhong">{{item.goods_name}}</text>
				<text class="photoPrice pingxingjuzhong">￥{{item.retail_price}}</text>
				<text class="photoPopularity pingxingjuzhong">人气: {{item.click}}</text>
			</view>
		</view>
		<!-- 平台商品餐桌 -->
		<view class="tabsCss" v-if="pingtaiIndex==1">
			<view class="tabsPhotos" v-for="item in table" :key="item.goods_id" @click="getToGoodDetailTwo(item.goods_id)">
				<image :src="item.image_middle"></image>
				<text class="photoTitle pingxingjuzhong">{{item.goods_name}}</text>
				<text class="photoPrice pingxingjuzhong">￥{{item.retail_price}}</text>
				<text class="photoPopularity pingxingjuzhong">人气: {{item.click}}</text>
			</view>
		</view>
		<!-- 平台商品沙发 -->
		<view class="tabsCss" v-if="pingtaiIndex==2">
			<view class="tabsPhotos" v-for="item in sofa" :key="item.goods_id" @click="getToGoodDetailTwo(item.goods_id)">
				<image :src="item.image_middle"></image>
				<text class="photoTitle pingxingjuzhong">{{item.goods_name}}</text>
				<text class="photoPrice pingxingjuzhong">￥{{item.retail_price}}</text>
				<text class="photoPopularity pingxingjuzhong">人气: {{item.click}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		homeSwiper
	} from "@/utils/home/homeSwiper.js"
	import {
		merchant
	} from "@/utils/home/merchant.js"
	import {
		opplan
	} from "@/utils/home/opplan.js"
	import {
		ptgoods
	} from "@/utils/home/ptgoods.js"
	import {
		designMember
	} from "@/utils/home/designMember.js"
	import nTransition from '@/components/n-transition/n-transition.vue'
	import {
		myRequest
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				// 轮播图片
				Swiper: [],
				// 自营单的信息
				StoreIntroduction: [],
				// 预览图片
				photos: [],
				// tabs切换
				current: 0,
				// 自营商品tabs
				tabs: ['全部', '茶几', '沙发'],
				// 平台商品tabs
				pingtaitabs: ['全部', '餐桌', '沙发'],
				// 自营商品下标
				activeIndex: 0,
				// 平台商品下标
				pingtaiIndex: 0,
				// 自营商品
				selfSupport: [],
				scrollTop: 0,
				// 优惠商品
				discountPackage: [],
				// 平台商品
				pingtaiCommodity: [],
				// 餐桌
				table: [],
				// 沙发
				sofa: [],
				// 全部设计师
				designMember: [],
				// 设计师前两个
				designMemberOne: [],
				// 设计师后两个
				designMemberTwo: []
			}
		},
		created() {
			// 轮播数据
			this.Swiper = homeSwiper.datas
			// console.log(merchant.datas[0].store_img)
			// 自营店信息
			this.StoreIntroduction = merchant.datas
			// 预览的三张图片
			this.photos = merchant.datas[0].store_img
			console.log(designMember.datas)
			// 自营商品
			this.discountPackage = opplan.datas
			// console.log(this.discountPackage)
			// 平台商品
			this.pingtaiCommodity = ptgoods.datas
			this.designMember = designMember.datas
			this.getDates()
			// 调用平台商品截取
			this.intercept()
			// 调用设计师截取
			this.designMemberIntercept()
		},
		methods: {
			popUp() {
				this.$refs['pop'].show()
			},
			previewImage(index) {
				let photoList = this.photos.map(item => {
					return item.image;
				});
				uni.previewImage({
					current: index,
					urls: photoList
				});
			},
			changeTab(index) {
				this.activeIndex = index
				// console.log('当前选中的项：' + index)
			},
			pingTaichangeTab(index) {
				this.pingtaiIndex = index
			},
			navToShop() {
				uni.navigateTo({
					url: '/pages/shop/shop',
				})
			},
			async getDates() {
				const res = await myRequest({
					method: "get",
					url: "/api/Goods/StoreGoodsList"
				})
				this.selfSupport = res.datas
				console.log(res.datas,"自营" )       
			},  
			// 截取方法
			intercept() {
				this.table = this.pingtaiCommodity.slice(0, 3);
				console.log(this.table, "餐桌")
				this.sofa = this.pingtaiCommodity.slice(3, this.pingtaiCommodity.length);
			},
			// 截取设计师
			designMemberIntercept() {
				this.designMemberOne = this.designMember.slice(0, 2)
				this.designMemberTwo = this.designMember.slice(2, this.designMember.length)
			},
			getMore() {
				uni.navigateTo({
					url: '/pages/MoreDesigners/MoreDesigners',
				})
			},
			getToGoodDetail(id) {
				console.log(id)
				// uni.navigateTo({
				// 	url: `/pages/goodsdetail/goodsdetail?id=${id}`,
				// })
			},
			// 平台商品id不同，平台id的跳转方法
			getToGoodDetailTwo(id) {
				console.log(id)
				// uni.navigateTo({
				// 	url: `/pages/goodsdetail/goodsdetail?id=${id}`,
				// })
			},
			navToIntroduce(item){
							console.log(item)
							let res = JSON.stringify(item) 
							uni.navigateTo({
								url: `/pages/designersIntroduce/designersIntroduce?res=${res}`,
							})
						}
		},
		components: {
			nTransition
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #f6f6f6;

		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			background-color: #FFFFFF;
		}

		.scroll-view-item_H {
			display: inline-block;
			width: 80%;
			height: 650rpx;
			font-size: 36rpx;
			// background-color: #07C160; 
			padding-left: 25rpx;

			.designerBox {
				margin-top: 60rpx;
				width: 100%;
				height: 45%;
				position: relative;

				.designerPhoto {
					width: 40%;
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
						line-height: 50rpx;  
						color: #FFFFFF;
						position: absolute;
						left: 0;
						bottom: 0;
						z-index: 1;
						border-radius: 10rpx 10rpx;
					}
				}

				.designer {
					width: 55%;
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
						font-size: 30rpx;
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


					}
				}

			}
		}

		// 左定位
		.zuo {
			position: absolute;
			left: 0;
		}

		v-swiper {
			swiper {
				width: 100%;
				height: 500rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		// 字体黑色
		.colers {
			color: #000000;
		}

		.shop {
			// width: 100%;
			padding-top: 10rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 10rpx;
			background-color: #fefffe;

			.introduce {
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				position: relative;

				.headPortrait {
					width: 125rpx;
					height: 125rpx;
					border-radius: 50%;
					border: 1rpx solid #eeeeee;
					margin-left: 10rpx;
				}

				.ziying {
					position: absolute;
					top: 30rpx;
					left: 180rpx;
					font-size: 40rpx;
					color: #000000;
					font-weight: bold;
				}

				.address {
					position: absolute;
					bottom: 30rpx;
					left: 180rpx;
					color: #757575;
					font-size: 25rpx;
				}

				.telephone {
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					right: 0rpx;
					top: 50%;
					transform: translateY(-50%);

				}
			}

			.pictureDisplay {
				background-color: #fefffe;
				margin-top: 20rpx;
				position: relative;

				text {
					color: #606265;
				}

				.pictureBox {
					margin-top: 40rpx;
					// width: 100%;
					flex-direction: row;
					display: flex;
					justify-content: space-between;

					image {
						width: 31%;
						height: 240rpx;
						border-radius: 10rpx;
					}
				}
			}

			.seeShare {
				width: 100%;
				height: 200rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				// align-content: center;
				align-items: center;

				view {
					width: 48%;
					background-color: #f8f8f8;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					border-radius: 10rpx 10rpx;
					color: #141414;
				}

				button {
					width: 48%;
					background-color: #f8f8f8;
					height: 100rpx;
					line-height: 100rpx;
					// text-align: center;
					border-radius: 10rpx 10rpx;
					color: #141414;
					// border: 1rpx solid  #f8f8f8 !important;
					// border: 0rpx !important;
					outline: none;
				}

				button::after {
					border: none;
				}
			}

		}

		.invitationBox {
			margin: 30rpx;
			// margin-bottom: 30rpx;
			width: 92%;
			height: 180rpx;
			background-color: #fefffe;
			position: relative;
			border-radius: 10rpx;

			.gift {
				width: 125rpx;
				height: 125rpx;
				background-color: #000000;
				border-radius: 50%;
				margin-left: 10rpx;
				position: absolute;
				left: 10rpx;
				top: 50%;
				transform: translateY(-50%);

				image {
					width: 80rpx;
					height: 80rpx;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.invitation {
				position: absolute;
				top: 30rpx;
				left: 180rpx;
				font-size: 40rpx;
				color: #000000;
			}

			.invitations {
				position: absolute;
				bottom: 30rpx;
				left: 180rpx;
				color: #757575;
				font-size: 25rpx;
			}

			.nowInvite {
				width: 200rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				position: absolute;
				right: 20rpx;
				top: 50%;
				border-radius: 10rpx;
				transform: translateY(-50%);
				background-color: #f8f8f8;

			}

			button::after {
				border: none;
			}


		}

		.ceshi {
			width: 100%;
			height: 500rpx;
			background-color: #FFF7CC;
		}

		.leixings {
			// width: 100%;
			padding-top: 40rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
			padding-bottom: 40rpx;
			line-height: 50rpx;
			background-color: #FFFFFF;
			color: #000000;
			display: flex;
			justify-content: space-between;
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
				height: 500rpx;
				margin-top: 30rpx;
				border-radius: 10rpx 10rpx;

				position: relative;

				image {
					width: 100%;
					height: 65%;
					border-radius: 10rpx;
				}

				// 平行居中


				.photoTitle {
					width: 100%;
					height: 40rpx;
					position: absolute;
					top: 70%;
					color: #2f2f2f;
					font-size: 30rpx;
					text-align: center;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.photoPrice {
					position: absolute;
					top: 80%;
					color: #faa26a;
					font-size: 40rpx;
				}

				.photoPopularity {
					position: absolute;
					top: 93%;
					color: #b7b7b7;
					font-size: 25rpx;
				}

			}
		}

		// 阴影
		.shadow {
			box-shadow: 1px 5px 5px #EEEEEE;
		}

		// 字体一大字体
		.ziti1 {
			font-size: 40rpx;
		}

		// 字体2-小字体
		.ziti2 {
			font-size: 25rpx;
		}

	}
</style>
