<template>
	<view class="brandRank">
		<nav-bar ref="navBar" :scrollTop="scrollTop" transparentFixedFontColor="#FFF" type="transparentFixed" title="品牌排行榜">
		<view class="transparent_fixed_preview" slot="transparentFixedRight" @click="onPreview"></view>
		</nav-bar>
		<view class="himg">
			<image class="headImg" src="@/static/classify/brand.jpg"></image>
			<view class="headDesc"></view>
		</view>
		<view class="headText">
			<text class="red1">推荐理由：</text>
			<text class="red2">在近200家工厂中，自营店精心臻选，从品味、品牌、品质三大标准中，用心精选推荐前12家优质家具品牌。</text>
		</view>
		<view class="brands">
			<view class="brand" v-for="item in blist" :key="item.sort">
				<view class="bindex">No.{{item.sort}}</view>
				<view class="brandde">
					<view class="ds">
						<view class="recom">
							<text class="btitle">推荐指数：</text><text class="bdescr">{{item.star}}星</text>
						</view>
						<view class="recom">
							<text class="btitle">货期：</text><text class="bdescr">{{item.delivery}}</text>
						</view>
						<view class="recom">
							<text class="btitle">材质：</text><text class="bdescr">{{item.texture}}</text>
						</view>
						<view class="recom">
							<text class="btitle">定制：</text><text class="bdescr">{{item.size}}</text>
						</view>	
						<view class="recom">
							<text class="btitle">推荐理由：</text><text class="bdescr">{{item.reason}}</text>
						</view>	
					</view>
				    <view class="brandfa">
				    	<image class="factory" :src="item.logo"></image>
						<view class="facdesc">
							<view class="facname">{{item.factory_name}}</view>
							<view class="facother">
								<text >人气：{{item.click}}</text>
								<text>{{item.style}}</text>
							</view>
						</view>
				    </view>
				    <view class="describle">{{item.brief}}</view>
					<view class="goodslist">
						<view class="good" v-for="value in item.goods_list" :key="value.goods_id">
							<image class="goodimg" :src="value.image"></image>
							<view class="goodname">{{value.goods_name}}</view>
							<view class="goodprice">￥{{value.retail_price}}</view>
						</view>
					</view>
				    <view class="goodmore">查看更多</view>
				</view>
			</view>
		</view>
	    <view class="brandlast">我也是有底线的哦~</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from "vue-property-decorator";
	import {
		manualDate
	} from "@/utils/classify/manual.js";
	import navBar from "@/components/zhouWei-navBar/index.vue";

	@Component({
		components:{
			navBar
		}
	})
	export default class Index extends Vue {
		private blist:Array<any> = manualDate.datas.list
		private scrollTop:any = 0
		created() {
			 uni.hideTabBar({})
			// console.log(this.blist)
		}
		onPageScroll(e:any) {
		    this.scrollTop = e.scrollTop;
		}
	}
</script>
<style lang="scss" scoped>
	.btitle{
		font-weight: 700;
		font-size: 30rpx;
	}
	.recom{
		width: 610rpx;
		margin-left: 30rpx;
		padding-top: 34rpx;
		
	}
	.recom:not(:first-child){
		padding-top: 30rpx;
	}
	.bdescr{
		color: #b2b2b2;
		font-size: 28rpx;
	}
	.brandRank {
		.himg {
			width: 750rpx;
			height: 530rpx;
			position: relative;

			.headImg {
				width: 750rpx;
				height: 530rpx;
			}

			.headDesc {
				width: 750rpx;
				height: 170rpx;
				border-radius: 24rpx;
				background-color: black;
				opacity: 0.4;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}

		.headText {
			width: 710rpx;
			height: 140rpx;
			margin-left: 20rpx;
			margin-top: -152rpx;
			position: absolute;
			z-index: 1;

			.red1 {
				color: #ffffff;
				font-size: 30rpx;
				font-weight: 600;
			}

			.red2 {
				color: #ffffff;
				font-size: 26rpx;
			}
		}

		.brands {
			.brand {
				width: 750rpx;
				border-radius: 30rpx;
				margin-bottom: 20rpx;
				border: 2rpx solid #FFFFFF;
				box-sizing: border-box;
				.bindex{
					text-align: center;
					width: 750rpx;height: 40rpx;
					margin-top: 100rpx;
					line-height: 40rpx;
					font-size: 36rpx;
					font-weight: 600;
				}
				.brandde{
					width: 670rpx;
					margin:40rpx auto;
					border-radius: 30rpx;
					box-shadow: 0 0 18rpx 6rpx #999;
					.ds{
						border-radius: 30rpx 30rpx 0 0;
						color: #FFFFFF;
						background-color: #000000;
						
					}
	                .brandfa{
						width: 640rpx;height: 100rpx;
						margin-top: 40rpx;
						margin-left: 20rpx;
						display: flex;
						.factory{
							width: 100rpx;height: 100rpx;
							border-radius: 50%;
						}
						.facdesc{
							display: inline-block;
							width: 360rpx;height: 100rpx;
							margin-left: 30rpx;
							.facname{
								font-weight: 600;
							}
							.facother{
								width: 360rpx;
								margin-top: 10rpx;
								color: #999999;
								font-size: 32rpx;
								display: flex;
								justify-content: space-between;
								overflow:hidden;
								white-space:nowrap;
								text-overflow:ellipsis;
							}
						}
					}			
				    .describle{
						width: 630rpx;
						margin-left: 20rpx;
						color: #7e7e7e;
						margin-top: 20rpx;
					}
				    .goodslist{
						width: 630rpx;
						margin-left: 20rpx;
						margin-top: 30rpx;
						display: flex;
						.good{
							width: 210rpx;height: 340rpx;
							.goodimg{
								width: 210rpx;height: 210rpx;
								border-radius: 10rpx;
							}
							.goodname{
								margin-top: 10rpx;
								font-size: 30rpx;
								overflow:hidden;
								white-space:nowrap;
								text-overflow:ellipsis;
							}
							.goodprice{
								margin-top: 20rpx;
								color: #f59359;
							}
						}
					}
					.goodmore{
						width: 280rpx;height: 80rpx;
						border-radius: 10rpx;
						margin:60rpx auto;
						margin-bottom: 30rpx;
						line-height: 80rpx;
						text-align: center;
						border: 2rpx solid #e6e6e6;
					}
				}
			}

			.brand:nth-of-type(1) {
				margin-top: -44rpx;
				background-color: #FFFFFF;
				position: relative;
				z-index: 2;
			}
		}
	    .brandlast{
			width: 750rpx;
			font-size: 30rpx;
			text-align: center;
			color: #999999;
			margin-top: 20rpx;
			margin-bottom: 40rpx;
		}
	}
</style>
