<template>
	<view class="contain">
		<view class="contain1">
			<view class="uni-form-item uni-column">
				<input class="uni-input" v-model="value" confirm-type="search" @confirm="search()" placeholder="请输入关键字搜索" />
				<image src="../../static/search/clear.png" v-if="value !=''" @click="cler"></image>
			</view>
		</view>

		<view class="box">
			<view class="content-fs">
				<view class="fs" @click="small" :class="[flag?'thin':'']">
					小图
				</view>
				<view class="ts" @click="lager" :class="[!flag?'thin':'']">
					大图
				</view>
				<van-dropdown-menu active-color="#ccc" close-on-click-outside="true">
					<van-dropdown-item :value="value1" :options="option1 " />
					<van-dropdown-item :value="value2" :options="option2" />
					<van-dropdown-item :value="value3" :options="option3" />
					<van-dropdown-item :value="value4" :options="option4" />
				</van-dropdown-menu>
			</view>

		</view>
		<view class="contain2" v-if="list.length!=0">
			<view class="nav" v-for="item in list" :key="index" :class="{'thin2':!flag,'think':flag}">
				<image :src="item.image"></image>
				<view class="tit">{{item.goods_name}}</view>
				<view class="ft">￥{{item.retail_price}}</view>
				<view class="ts">人气 :{{item.click}}</view>
			</view>

		</view>
		<van-empty image="search" v-else description="暂无商品" />
		<!-- 	<shopp :flag1="flag"></shopp> -->

	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from "vue-property-decorator";

	// import searche from "@/components/searcher/searcher.vue"
	// import shopp from "@/components/shop/shop.vue"
	import {
		myRequest
	} from "@/utils/http.js"


	type option1Type = {
		text: string,
		value: number
	}

	type option2Type = {
		text: string,
		value: string
	}
	type option3Type = {
		text: string,
		value: number
	}
	type option4Type = {
		text: string,
		value: number
	}
	@Component({
		components: {
			// searche,
			// shopp
		}
	})
	export default class Detail extends Vue {
		private value: any = ""
		private flag: boolean = true

		// 1
		// private value: any = ""
		private list: Array < any >= []
		private page: number = 1
		// private text: string = ""
		// private isShow: boolean = false;
		// private length: number = 0







		private option1: option1Type[] = [{
				text: '综合',
				value: 0
			},
			{
				text: '上新',
				value: 1
			},
			{
				text: '人气',
				value: 2
			},
			{
				text: '价格',
				value: 3
			}
		]
		private value1: number = 0
		private option2: option2Type[] = [{
				text: '空间',
				value: 'a'
			},
			{
				text: '客厅',
				value: 'b'
			},
			{
				text: '餐厅',
				value: 'c'
			},
			{
				text: '卧室',
				value: 'd'
			},
			{
				text: '书房',
				value: 'e'
			},
		]
		private value2: string = "a"
		private option3: option3Type[] = [{
				text: '风格',
				value: 0
			},
			{
				text: '轻奢主义',
				value: 1
			},
			{
				text: '现代简约',
				value: 2
			},
			{
				text: '自然北欧',
				value: 3
			},
			{
				text: '现代中式',
				value: 4
			},
			{
				text: '精品实木',
				value: 5
			},
			{
				text: '经典美式',
				value: 6
			},
			{
				text: '奢华欧法',
				value: 7
			},
			{
				text: '乡村田园',
				value: 8
			},


		]
		private value3: number = 0
		private option4: option4Type[] = [
			{
				text: '品类',
				value: 0
			},
			{
				text: '沙发',
				value: 1
			},
			{
				text: '休闲椅',
				value: 2
			},
			{
				text: '茶几',
				value: 3
			},
			{
				text: '电视柜',
				value: 4
			},
			{
				text: '角几/边几',
				value: 5
			},
			{
				text: '鞋柜',
				value: 6
			},
			{
				text: '餐桌',
				value: 7
			},
			{
				text: '餐椅',
				value: 8
			},
			{
				text: '餐边柜',
				value: 9
			},
			{
				text: '床',
				value: 10
			},
			{
				text: '床垫',
				value: 11
			},
			{
				text: '床头柜',
				value: 12
			},
			{
				text: '酒柜',
				value: 13
			},
			{
				text: '斗柜',
				value: 14
			},
			{
				text: '衣柜',
				value: 15
			},
			{
				text: '妆台',
				value: 16
			},
			{
				text: '妆凳',
				value: 17
			},
			{
				text: '书桌',
				value: 18
			},
			{
				text: '书椅',
				value: 19
			},
			{
				text: '窗帘',
				value: 20
			},
			{
				text: '玄关柜/台',
				value: 21
			},
			{
				text: '挂画',
				value: 22
			},
			{
				text: '书柜',
				value: 23
			},
			{
				text: '装饰柜',
				value: 24
			},
			{
				text: '软装包',
				value: 25
			},
			{
				text: '灯具',
				value: 26
			},
			{
				text: '边柜',
				value: 27
			},
			{
				text: '衣帽架',
				value: 28
			},
			{
				text: '妆镜',
				value: 29
			},
			{
				text: '床尾凳',
				value: 30
			},
			{
				text: '书柜/书架',
				value: 31
			},
			{
				text: '穿衣镜/落地镜',
				value: 32
			},
			{
				text: '其他',
				value: 33
			},
			{
				text: '花架',
				value: 34
			}
		]
		private value4: number = 0
		// onLoad(options) {
		// 	this.value = options.tit;
		// 	console.log(this.value,"sssss")
		// }
		created() {
			const tit = uni.getStorageSync('storage_key');
			this.value = tit
			// console.log(this.value)
			this.getData()
		}

		async getData() {
			const result = await myRequest({
				method: "POST",
				url: "/api/Goodslist/GoodsSearchList",
				data: {
					page: this.page,
					keyword: this.value
				}
			})
			this.list = [...this.list, ...result.datas.data]
		}
		cler() {
			this.value = ""
		}
		lager() {
			this.flag = false
			// console.log(this.flag, 2)
		}
		small() {
			this.flag = true
			// console.log(this.flag, 2)
		}
		search(): void {
			// uni.setStorage({
			// 	key: 'storage_key',
			// 	data: this.value,
			// 	success: function() {
			// 		console.log('success');
			// 	}
			// });
			try {
				uni.setStorageSync('storage_key', this.value);
			} catch (e) {
				// error
			}
			uni.redirectTo({
				url: 'detail/detail'
			});
			this.getData()
			uni.redirectTo({
				url: '../detail/detail'
			});
			// console.log(this.value)
		}
		onReachBottom(): void {
			this.page++
			this.getData()
		}





	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		position: relative;
		padding-top: 280rpx;

		.contain1 {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background-color: #fff;

			.uni-form-item {
				padding: 5px 0;
				width: 93%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1.8px solid #000;

				.uni-input {
					width: 100%;
				}
			}

			.uni-form-item image {
				width: 40rpx;
				height: 40rpx;
			}

			.uni-input {
				height: 60rpx;
			}
		}


		.nav-rg {
			width: 35rpx;
			height: 35rpx;

			image {
				width: 100%;
				height: 100%;
			}

		}

		.box {
			width: 100%;
			position: fixed;
			top: 83rpx;
			left: 0;
			border-bottom: 1rpx solid #ebebeb;

			.content-fs {
				display: flex;
				margin-bottom: 50rpx;
				background-color: #fff;
				align-items: center;
				padding: 18rpx 0;
				color: #666;
				width: 93%;
				margin: 0 auto;

				/deep/ .ts,
				.fs {
					width: 70rpx;
					height: 40rpx;
					text-align: center;
					line-height: 40rpx;
					border-radius: 10rpx;
					padding: 4rpx 8rpx;
					font-size: 24rpx;
				}

			}
		}

		.thin {
			background-color: #FAFAFA;
			color: #F7A688;
		}

		/deep/ van-dropdown-menu {
			width: 280px;
			margin-left: 20rpx;
			// margin-right: 35rpx;
			box-sizing: border-box;
			color: red;
			font-size: 20rpx !important;

		}

		/deep/ .van-ellipsis {
			font-size: 26rpx;
			font-weight: 500;
			color: #666;
		}

		.contain2 {
			// margin-top: 50rpx;
			width: 93%;
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.thin2 {
				display: flex;
				width: 100%;
				flex-direction: column;
				align-items: center;
				animation: myfirst 0.3s linear;
				animation: myfirst1 2s linear .5;

				image {
					width: 100%;
					height: 600rpx;
					border-radius: 20rpx;
				}
			}

			.think {
				width: 48.5%;
				// animation: myfirst2 0.3s linear;
				// animation: myfirst3 2s linear .5;

				image {
					width: 100%;
					height: 360rpx;
					border-radius: 20rpx;
				}
			}

			@keyframes myfirst {
				from {
					width: 48.5%;
				}

				to {
					width: 100%;
				}
			}

			@keyframes myfirst1 {
				from {
					height: 570rpx;
				}

				to {
					height: 810rpx;
				}
			}

			// @keyframes myfirst2 {
			// 	from {
			// 		width: 100%;
			// 	}

			// 	to {
			// 		width: 48.5%;
			// 	}
			// }

			// @keyframes myfirst3 {
			// 	from {
			// 		height: 810rpx;
			// 	}

			// 	to {
			// 		height: 570rpx;
			// 	}
			// }

			.nav {
				display: flex;
				// width: 48.5%;
				flex-direction: column;
				align-items: center;

				image {
					width: 100%;
					// height: 360rpx;
					border-radius: 20rpx;
				}

				.tit {
					text-align: center;
					width: 90%;
					margin: 0 auto;
					margin-top: 20rpx;
					padding-left: 20rpx;
					padding-right: 30rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: block;
				}

				.ft {
					margin: 20rpx 0;
					color: #F59B65;
					font-weight: 500;
				}

				.ts {
					margin-bottom: 40rpx;
					font-size: 20rpx;
					color: #C4C4C4;
				}

			}
		}

	}
</style>
