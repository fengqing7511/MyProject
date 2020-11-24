<template>
	<view class="contain">
		<view class="nav" v-for="(item,index) in list" :key="index" @click="totodetail(item.goods_id)" :class="{'thin':!flag1,'think':flag1}">
	
			<image :src="item.image"></image>
			<view class="tit">{{item.goods_name}}</view>
			<view class="ft">￥{{item.retail_price}}</view>
			<view class="ts">人气 :{{item.click}}</view>
			<!-- <view class="">
				{{flag1}}
			</view> -->

			<!-- 	<view class="">
				{{value}},ssssss
			</view> -->
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch,
		Prop
	} from "vue-property-decorator";
	import {
		myRequest
	} from "@/utils/http.js"

	@Component({
		components: {

		}
	})


	export default class Detail extends Vue {

		// @Prop(String) private value!: string;
		@Prop(Boolean) private flag1!: boolean;
		private value: any = ""
		private list: Array < any >= []
		private page: number = 1

		created() {

			// console.log(this.value,"yyyyyy")
			uni.getStorage({
				key: 'storage_key',
				success: function(res) {
					console.log(res.data, "zzz")
				},
			});
			const tit = uni.getStorageSync('storage_key');
			this.value = tit
			this.getData()
			// uni.removeStorage({
			//               key: 'storage_key',
			//                 success: function (res) {
			//                     console.log('删除成功');
			//                 }
			//             });
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
			this.list = result.datas.data
			console.log(this.list)
			// this.page++
		}


		// startPull(): void {
		// 		uni.startPullDownRefresh({});

		// 	}
		// 	onPullDownRefresh(): void {
		// 		this.page++
		// 			this.getData()	
		// 		console.log('触发下拉刷新了')

		// 	}
			// onReachBottom() {
			// 	this.getData()
			// 	console.log('触底了')
			// }

totodetail(goods_id:number){
	console.log(goods_id)
	  uni.navigateTo({
	    url: `/pages/goodsdetail/goodsdetail?id=${goods_id}`,
	  })
}
	}
</script>

<style lang="scss" scoped>
	.contain {
		// margin-top: 50rpx;
		width: 93%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.thin {
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
</style>
