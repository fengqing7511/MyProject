<template>
	<view class="content">
		<view class="contain">
			<view class="uni-form-item uni-column">
				<input class="uni-input" v-model="tit" confirm-type="search" @confirm="search()" focus placeholder="请输入关键字搜索" />
				<image src="../../static/search/camera.png" @click="chooseImg" type="primary"></image>
			</view>
		</view>

		<view class="nav" v-if="histoy.length!==0">
			<view class="nav-fs">
				<text>历史</text>
				<image src="../../static/search/del.png" @click="del"></image>
			</view>
			<keep-alive>
				<view class="header">
					<view v-for="item in histoy" :key="index">
						<view class="header-ts" @click="gotodetail(item)">{{item}}</view>
					</view>
				</view>
			</keep-alive>
		</view>

		<view class="nav">
			<view class="nav-fs">
				<text>发现</text>
			</view>
			<view class="header">
				<view v-for="item in list" :key="item">
					<view class="header-ts" @click="todetail(item)">{{item}}</view>
				</view>
			</view>
		</view>


		<view class="hot">
			<view class="hot-hd">
				<image src="../../static/search/resou.png"></image>
				<text>热搜榜</text>
			</view>

			<view class="hot-fs">
				<view class="hot-ts" v-for="(item,index) in hot" :key="item" @click="godetail(item)">
					<text v-if="index!=0&&index!=1&&index!=2" class="ps">{{index+1}}</text>
					<text v-if="index==0" class="hs">{{index+1}}</text>
					<text v-if="index==1" class="twoo">{{index+1}}</text>
					<text v-if="index==2" class="thr">{{index+1}}</text>
					<text>{{item.keyword}}</text>
					<text>人气 {{item.sum}}</text>
				</view>
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
	} from "@/utils/http.js"


	@Component({
		components: {

		}
	})
	export default class Index extends Vue {
		private imgArr: Array < any > = []
		private list: Array < any > = []
		private hot: Array < any > = []
		private histoy: Array < any > = []
		private tit: any = "";
		chooseImg() {
			uni.chooseImage({
				// count: 9,
				// success: res => {
				// 	this.imgArr = res.tempFilePaths
				// }
			})
		}
		created() {
			try {
				const value = uni.getStorageSync('histoy_key');
				if (value) {
					this.histoy = value
				}
			} catch (e) {
				// error
			}
			this.getData()
		}
		onShow() {

		}
		async getData() {
			const result = await myRequest({
				method: "GET",
				url: "/api/Goods/StoreGoodsChange"
			})
			this.list = result.datas.discovery_list
			this.hot = result.datas.ranking_list
		}

		search(e:any): void {
			uni.setStorage({
				key: 'storage_key',
				data: this.tit,
				success: function() {
					console.log('success');
				}
			});
			uni.navigateTo({
				url: `../detail/detail?tit=${this.tit}`
			});
			if (this.tit == "") {
				console.log(this.tit)
			} else {
				// let i = this.histoy.indexOf(this.tit);
				// this.histoy.splice(i, 1);
				this.histoy.unshift(this.tit)
				try {
					uni.setStorageSync('histoy_key', this.histoy);
				} catch (e) {
					// error
				}
			}
		}

		todetail(item: any): void {
			// this.histoy.unshift(this.tit)
			// try {
			// 	uni.setStorageSync('histoy_key', this.histoy);
			// } catch (e) {
			// 	// error
			// }
			this.tit = item
			console.log("xxx", this.tit)
			uni.setStorage({
				key: 'storage_key',
				data: this.tit,
				success: function() {
					console.log('success');
				}
			});

			uni.navigateTo({
				url: `../detail/detail?tit=${this.tit}`
			});
		}

		godetail(item: any): void {
			this.tit = item.keyword
			// this.histoy.unshift(this.tit)
			// try {
			// 	uni.setStorageSync('histoy_key', this.histoy);
			// } catch (e) {
			// 	// error
			// }
			uni.setStorage({
				key: 'storage_key',
				data: this.tit,
				success: function() {
					console.log('success');
				}
			});
			uni.navigateTo({
				url: `../detail/detail?tit=${this.tit}`
			});
		}
		gotodetail(item: any): void {
			this.tit = item
			// this.histoy.unshift(this.tit)
			// try {
			// 	uni.setStorageSync('histoy_key', this.histoy);
			// } catch (e) {
			// 	// error
			// }
			uni.setStorage({
				key: 'storage_key',
				data: this.tit,
				success: function() {
					console.log('success');
				}
			});
			uni.navigateTo({
				url: `../detail/detail?tit=${this.tit}`
			});
		}
		del(): void {
			this.histoy = []
			uni.removeStorage({
				key: 'histoy_key'
			});
		}



	}
</script>

<style lang="less" scoped>
	.contain {
		.uni-form-item {
			padding: 5px 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 4rpx solid #000;
		}

		.uni-form-item image {
			width: 40rpx;
			height: 40rpx;
		}

		.uni-input {
			width: 100%;
			height: 60rpx;
		}
	}

	.content {
		width: 90%;
		margin: 0 auto;
	}



	.nav-rg {
		width: 40rpx;
		height: 40rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav {
		margin: 70rpx 0 5px 0;

	}

	.nav text {
		font-weight: 800;
		font-size: 32rpx;
	}

	.nav-fs {
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.nav-fs image {
		width: 30rpx;
		height: 30rpx;
	}

	.header {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;

		.header-ts {
			margin: 10rpx 30rpx 20rpx 0;
			padding: 14rpx 30rpx;
			box-sizing: border-box;
			border: 2rpx solid #ccc;
		}
	}




	.hot {
		.hot-hd {
			display: flex;
			align-items: center;
			margin-top: 60rpx;

			image {
				width: 30rpx;
				height: 30rpx;
			}

			text {
				font-weight: 800;
				margin-left: 15rpx;
				font-size: 32rpx;
			}
		}

		.hot-fs {
			display: flex;
			flex-wrap: wrap;
			width: 100%;

			.hot-ts {
				display: flex;
				align-items: center;
				margin-top: 70rpx;
				width: 50%;

				text {
					margin-right: 20rpx;
					margin-left: 6rpx;


					&:nth-child(1) {
						border-radius: 5rpx;
						font-weight: 800;
						display: block;
						padding: 0 6rpx;
						line-height: 30rpx;
						color: #fff;
						// background-color: #ebebeb;
						text-align: center;
						margin-top: 5rpx;
					}

					&:nth-child(2) {
						font-weight: 800;
						font-size: 32rpx;
					}

					&:nth-child(3) {
						margin-top: 10rpx;
						color: #666;
						font-size: 20rpx;
					}
				}

			}
		}

		.ps {
			// color: #fff;
			background-color: #ebebeb;
		}

		.hs {
			// color: #fff;
			background-color: orange;
		}

		.twoo {
			background-color: #CECFD4;
		}

		.thr {
			background-color: #F59359;
		}


	}
</style>
