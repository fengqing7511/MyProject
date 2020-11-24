<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" name="style_name" :current="current" @change="change"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="item in list" :key="item.case_id">
					
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="order content u-text-center" v-for="(res, index) in newlist" :key="res.case_id" @click="toPath(res)">
							<image :src="res.image"></image>
							<view class="title">
								<b>{{res.case_name}}</b>
							</view>
							<view class="">
								{{res.style_name}} {{res.space}} {{res.square}}㎡
							</view>
						</view>
					</scroll-view>
				</swiper-item>

			</swiper>
		</view>
	</view>
</template>

<script>
	import {myRequest} from "@/utils/http.js";
	export default {
		data() {
			return {
				orderList: [
					[],
					[],
					[],
					[]
				],
				dataList: '',
				list: '',
				newlist:'',
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore'],
			};
		},
		watch:{
			current(){
				console.log(this.current)
				this.getDatees()
			}
		},
		created(){
				this.getDatees()
		},
		methods: {
			async getDatees(){
				let res = await myRequest({
					method:"get",
					url:'/api/Example/CaseList'
				})
				this.dataList = res.datas.list,
				this.list = res.datas.style_list,
				this.newlist = res.datas.list.filter((item) =>{
				 	if(item.style_id===this.current&&this.current<4&&this.current!=0){
						return item
					}else if(this.current===0){
						return item
					}else if(this.current>=4){
						return item
					}
					
				})
				console.log(this.newlist)
			},
			onPullDownRefresh() {
				console.log('下拉刷新', 111111111)
			},
			onReachBottom() {
				console.log('触底加载更多')
			},
			// reachBottom() {
			// 	// 此tab为空数据
			// 	if (this.current != 2) {
			// 		this.loadStatus.splice(this.current, 1, "loading")
			// 		setTimeout(() => {
			// 			this.getOrderList(this.current);
			// 		}, 1200);
			// 	}
			// },
			// 页面数据
			getOrderList(idx) {
				console.log(idx)
				// for (let i = 0; i < 5; i++) {
				// 	let index = this.$u.random(0, this.dataList.length - 1);
				// 	let data = JSON.parse(JSON.stringify(this.dataList[index]));
				// 	data.id = this.$u.guid();
				// 	this.orderList[idx].push(data);
				// }
				// this.loadStatus.splice(this.current, 1, "loadmore")
			},

			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
				this.activeIndex = index ;
				this.getDatees()
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			toPath(res) {
				// console.log(res)
				let item = JSON.stringify(res);
				uni.navigateTo({
					url: `/pages/caseDetails/index?item=${item}`
				})
			}
		}
	}
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.title {
		padding-bottom: 5px;
		font-size: 16px;
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
