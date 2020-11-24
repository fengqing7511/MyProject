<template>
	<view class="classify"> 
		<view class="top">
			<input class="topinput" type="text" placeholder="搜索您想要的商品" @click="goSearch()"/>
			<image class="inputsearch" src="@/static/classify/search.png"></image>
			<text class="zxj icon icon-chakan" @click="chooseImg"></text>
		</view>
		<view class="white"></view>
		<view class="goodstype">
			<view class="list" v-for="item in space_list" :key="item.space_id">
				<image class="listimg" :src="item.space_logo"></image>
			</view>
		</view>
		<view class="goodss">
			<view class="leftnav">
				<view class="itemnav" :class="[index == activeIndex?'itemnav1':'']" v-for="(item,index) in items" :key="index" @click="xs(index)">
					{{item}}
					<view class="kuai" :class="[index == activeIndex?'kuai1':'']"></view>
				</view>
			</view>
			<view class="rightnav">
				<view class="cateItem Iitem" v-if="activeIndex===0">
					<image class="cateImg" :src="cate.space_image" mode="widthFix"></image>
					<view class="cts" v-for="item in cateList" :key="item.class_id" @click="goDetail()">
						<image class="ctsImg" :src="item.class_image"></image>
						<view class="ctsDes">{{item.class_name}}</view>
					</view>
				</view>
				<view class="styleItem Iitem" v-if="activeIndex===1">
					<image class="styleImg" v-for="item in styleList" :key="item.style_id" :src="item.style_image" @click="goDetail()"></image>
				</view>
				<view class="listItem Iitem" v-if="activeIndex===2">
					<view class="setSingle" v-for="item in setList" :key="item.style_id" @click="goDetail()">
						<text class="setName">{{item.style_name}}</text>
						<view class="rttt">
							<view class="setItem" v-for="value in item.brand_list" :key="value.factory_id">
								<image class="setimgg" :src="value.factory_img"></image>
								<view class="setStyle">{{value.factory_style_sn}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="brandItem Iitem" v-if="activeIndex===3">
					<view class="brands" v-for="item in brandList" :key="item.style_id" @click="goDetail()">
						<view class="brandstyle">{{item.style_name}}</view>
						<view class="brand" v-for="value in item.brand_list" :key="value.factory_id">
							<image class="brandImg" :src="value.factory_img"></image>
							<view class="bname">{{value.factory_name}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="cateItem Iitem" v-if="activeIndex===4">
					<image class="cateImg" :src="liveImg" mode="widthFix"></image>
					<view class="cts" v-for="item in cateList" :key="item.class_id" @click="goDetail()">
						<image class="ctsImg" :src="item.class_image"></image>
						<view class="ctsDes">{{item.class_name}}</view>
					</view>
				</view>
				<view class="cateItem Iitem" v-if="activeIndex===5">
					<image class="cateImg" :src="dinList.space_image" mode="widthFix"></image>
					<view class="cts" v-for="item in dinList.list" :key="item.class_id" @click="goDetail()">
						<image class="ctsImg" :src="item.class_image"></image>
						<view class="ctsDes">{{item.class_name}}</view>
					</view>
				</view>
				<view class="cateItem Iitem" v-if="activeIndex===6">
					<image class="cateImg" :src="bedList.space_image" mode="widthFix"></image>
					<view class="cts" v-for="item in bedList.list" :key="item.class_id" @click="goDetail()">
						<image class="ctsImg" :src="item.class_image"></image>
						<view class="ctsDes">{{item.class_name}}</view>
					</view>
				</view>
				<view class="cateItem Iitem" v-if="activeIndex===7">
					<image class="cateImg" :src="sanList.space_image" mode="widthFix"></image>
					<view class="cts" v-for="item in sanList.list" :key="item.class_id" @click="goDetail()">
						<image class="ctsImg" :src="item.class_image"></image>
						<view class="ctsDes">{{item.class_name}}</view>
					</view>
				</view>
				<view class="cateItem Iitem" v-if="activeIndex===8">
					<image class="cateImg" :src="decList.space_image" mode="widthFix"></image>
					<view class="cts" v-for="item in decList.list" :key="item.class_id" @click="goDetail()">
						<image class="ctsImg" :src="item.class_image"></image>
						<view class="ctsDes">{{item.class_name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="direc" @click="goManual">
			<view class="dirtext">
				选品手册
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from "vue-property-decorator";
	import {
		myRequest
	} from "@/utils/http.js";
	@Component({
		components: {}
	})

	export default class Index extends Vue {
		private iconType: Array < any > = ['search']
		private imgArr: string | string[] = ''
		private space_list: Array < any > = []
		private list: Array < any > = []
		private styleList: Array < any > = []
		private cate: Array < any > = []
		private cateList: Array < any > = []
		private setList: Array < any > = []
		private brandList: Array < any > = []
		private liveImg: string = ""
		private dinList: Array < any > = []
		private bedList: Array < any > = []
		private sanList: Array < any > = []
		private decList: Array < any > = []
		private activeIndex: number = 0
		private items: Array < any > = ['品类', '风格', '系列', '品牌', '客厅', '餐厅', '卧室', '书房', '饰品']

		created() {
			this.getDate()
		}
		goSearch():void{
			uni.navigateTo({
				url:"/pages/search/index"
			})
		}
		goDetail():void{
			uni.navigateTo({
				url:"/pages/detail/detail"
			})
		}
		chooseImg(): void {
			uni.chooseImage({
				count: 9,
				success: res => {
					this.imgArr = res.tempFilePaths
				}
			})
		}
		async getDate(): Promise < any > {
			let res = await myRequest({
				method: "POST",
				url: `/api/Category/CategoryItems`,
				data: {
					store_id: 1
				}
			})
			this.space_list = res.datas.space_list
			this.list = res.datas.list
			// console.log(this.list)
			// 获得 风格 数据
			let styleList = this.list.find(function(element, index) {
				if (index == 1) {
					return element
				}
			})
			this.styleList = styleList.list
			// 获得 品类 数据
			let cate = this.list.find(function(element, index) {
				if (index == 0) {
					return element
				}
			})
			this.cate = cate
			this.cateList = cate.list
			// 获得 系列 数据
			let setList = this.list.find(function(element, index) {
				if (index == 2) {
					return element
				}
			})
			this.setList = setList.list
			// 获得 品牌 数据
			let brandList = this.list.find(function(element, index) {
				if (index == 3) {
					return element
				}
			})
			this.brandList = brandList.list
			// 获得 客厅 数据
			let liveList = this.list.find(function(element, index) {
				if (index == 5) {
					return element
				}
			})
			this.liveImg = liveList.space_image
			// 获得 餐厅 数据
			let dinList = this.list.find(function(element, index) {
				if (index == 6) {
					return element
				}
			})
			this.dinList = dinList
			// 获得 卧室 数据
			let bedList = this.list.find(function(element, index) {
				if (index == 7) {
					return element
				}
			})
			this.bedList = bedList
			// 获得 书房 数据
			let sanList = this.list.find(function(element, index) {
				if (index == 8) {
					return element
				}
			})
			this.sanList = sanList
			// 获得 饰品 数据
			let decList = this.list.find(function(element, index) {
				if (index == 9) {
					return element
				}
			})
			this.decList = decList
		}
		xs(index: number): void {
			this.activeIndex = index
			// let info = uni.createSelectorQuery().selectAll(".itemnav")
			// console.log(info)
		}
		// 停止下拉刷新
		onPullDownRefresh(): void {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	    goManual():void{
			uni.navigateTo({
			    url: '/pages/manual/index'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.classify {
		margin: 0;
		padding: 0;
		margin-bottom: 100rpx;

		.top {
			.topinput {
				height: 56rpx;
				width: 360rpx;
				padding-left: 62rpx;
				border-radius: 56rpx;
				line-height: 56rpx;
				font-size: 26rpx;
				color: #b4b4b4;
				font-weight: 550;
				background-color: #f1f1f1;
				margin-left: 34rpx;
				margin-bottom: 20rpx;
				display: inline-block;
				vertical-align: middle;
				position: relative;
			}

			.inputsearch {
				position: absolute;
				top: 13rpx;
				left: 60rpx;
				height: 30rpx;
				width: 30rpx;
			}

			.zxj {
				margin-left: 50rpx;
				color: #5e5956;
				font-weight: 700;
			}
		}

		.white {
			height: 20rpx;
			width: 100%;
			background-color: #fafafa;
		}

		::-webkit-scrollbar {
			display: none;
		}

		.goodstype {
			width: 750rpx;
			height: 180rpx;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			overflow-x: auto;
			list-style: none;
			white-space: nowrap;
			width: auto;

			.list {
				display: inline-block;
				margin-left: 30rpx;
				height: 160rpx;
				width: 144rpx;
				background-color: #f8f8f8;
				border-radius: 16rpx;

				.listimg {
					width: 144rpx;
					height: 160rpx;
				}
			}

			.list:last-child {
				margin-right: 30rpx;
			}
		}

		.goodss {
			width: 750rpx;
			height: 1000rpx;
			display: flex;

			.leftnav {
				width: 180rpx;
				height: 1000rpx;
				margin-right: 30rpx;
				overflow: auto;
				background-color: #f8f8f8;

				.itemnav {
					width: 180rpx;
					height: 86rpx;
					line-height: 86rpx;
					color: #5c5c5c;
					text-align: center;
					font-size: 28rpx;
					background-color: #f8f8f8;
					position: relative;

					.kuai {
						width: 8rpx;
						height: 45rpx;
						background-color: #f18739;
						position: absolute;
						left: 0;
						top: 22rpx;
						display: none;
					}
				}

				.itemnav1 {
					background-color: #FFFFFF;
					font-size: 32rpx;
					font-weight: 800;

					.kuai1 {
						display: block;
					}
				}
			}

			.rightnav {
				margin-right: 20rpx;
				overflow: auto;

				.Iitem {
					width: 520rpx;
					height: 1000rpx;
				}

				.styleItem {
					.styleImg {
						width: 520rpx;
						height: 236rpx;
						border-radius: 10rpx;
						margin-bottom: 14rpx;
					}
				}

				.cateItem {
					.cateImg {
						width: 520rpx;
						border-radius: 10rpx;
						margin-bottom: 14rpx;
					}

					.cts {
						width: 173rpx;
						height: 180rpx;
						text-align: center;
						margin-bottom: 10rpx;
						display: inline-block;

						.ctsImg {
							width: 110rpx;
							height: 120rpx;
						}

						.ctsDes {
							margin-top: 6rpx;
							font-size: 24rpx;
						}
					}
				}

				.listItem {
					.setSingle {
						.setName {
							display: block;
							font-size: 30rpx;
							font-weight: 800;
							margin-bottom: 20rpx;
						}

						.rttt {
							display: flex;
							flex-wrap: wrap;

							.setItem {
								width: 236rpx;
								height: 144rpx;
								line-height: 144rpx;
								background-color: #f8f8f8;
								border-radius: 14rpx;
								margin-bottom: 20rpx;
								display: flex;

								.setimgg {
									width: 100rpx;
									height: 100rpx;
									margin-top: 22rpx;
									margin-left: 20rpx;
									margin-right: 20rpx;
									border-radius: 10rpx;
								}

								.setStyle {
									display: inline-block;
									width: 80rpx;
									height: 144rpx;
									line-height: 144rpx;
									font-size: 30rpx;
									font-weight: 800;
								}
							}

							.setItem:nth-of-type(2n+1) {
								margin-right: 20rpx;
							}
						}
					}
				}

				.brandItem {
					background-color: #f9f9f9;

					.brands {
						.brandstyle {
							font-size: 30rpx;
							font-weight: 800;
							margin-bottom: 20rpx;
						}

						.brand {
							display: inline-block;
							width: 153rpx;
							height: 210rpx;
							margin-right: 20rpx;
							background-color: #ffffff;
							margin-bottom: 20rpx;
							border-radius: 14rpx;
							text-align: center;

							.brandImg {
								width: 100rpx;
								height: 100rpx;
								border-radius: 14rpx;
								margin-top: 28rpx;
							}

							.bname {
								font-weight: 500;
								width: 148rpx;
								height: 38rpx;
								overflow: hidden;
								font-size: 28rpx;
								margin-top: 14rpx;
							}
						}
					}
				}
			}
		}
	    .direc{
			position: fixed;
			bottom: 40rpx;right: 40rpx;
			width: 100rpx;height: 100rpx;
			background-color: #666666;
			border-radius: 50%;
			
			.dirtext{
				width: 80rpx;height: 80rpx;
				margin-top: 10rpx;margin-left: 10rpx;
				text-align: center;
				color:#ffffff;
				font-size: 28rpx;
				font-weight: 550;
			}
		}
	}
</style>
