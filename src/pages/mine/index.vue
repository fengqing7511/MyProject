<template>
	<view class="content">
		<view class="userInfo">
			<view class="tabbar" :class="show?'tabbarshow':'tabbarhide'">
				<text v-if="show">个人中心</text>
				<image :src="show?'../../static/icons/shezhi.svg':'../../static/icons/shezhi2.svg'"></image>
			</view>
			<view class="userBox">
				<image :src="userInfo.avatarUrl"
				 class="userImg"></image>
				<view class="userBar">
					<button  type="primary" class="user" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">授权</button>
				</view>
				<text class="username">{{userInfo.nickName}}</text>
				<text class="userId">ID：106077</text>
				<view class="userCont">
					<view>
						<text class="conNum">
							<text class="msg" v-if="myCol>0"></text>
							{{myCol}}
						</text>
						<text class="conName">收藏</text>
					</view>
					<view>
						<text class="conNum">
							<text class="msg" v-if="myMsg>0"></text>
							{{myMsg}}
						</text>
						<text class="conName">消息</text>

					</view>
					<view>
						<text class="conNum">
							<text class="msg" v-if="myMon>0"></text>
							{{myMon}}</text>
						<text class="conName">钱包</text>
					</view>
					<view>
						<button class="btn" type="default" @click="toCart()">购物车</button>
					</view>
				</view>
			</view>
		</view>
		<view class="userSell">
			<view>
				<image src="@/static/icons/经销商.svg" mode="" class="img1"> 成为经销商 <text class="left_txt">&gt;</text>
			</view>
			<view>
				<image src="@/static/icons/供应商.svg" mode="" class="img2"></image> 成为供应商 <text class="left_txt">&gt;</text>
			</view>
		</view>
		<view class="order">
			<text @click="toMyOrderAll">全部订单></text>
			<text>我的订单</text>
		</view>
		<view class="gird">
			<uni-grid :column="2" :square="false" @change='toMyOrder'>
				<uni-grid-item v-for="item in myOrder" key="item.title" :index="item.index">
					<view class="grid-item">
						<view class="text">
							<text>{{item.title}}</text>
							<text class="textNum">
								0
							</text>
						</view>
						<image :src="item.img" class="img_font"></image>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<uni-card title="我的分享">
			<uni-grid :column="4" :show-border="false" :square="false">
				<uni-grid-item v-for="item in myShare" key='item.title'>
					<view class="share-gird">
						<image :src="item.img"></image>
						<text>{{item.title}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-card>
		<uni-card title="常用功能">
			<uni-grid :column="4" :show-border="false" :square="false">
				<uni-grid-item v-for="item in myTools" key='item.title'>
					<view class="share-gird">
						<image :src="item.image"></image>
						<text>{{item.title}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-card>
	</view>
</template>

<script lang="ts">
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniCard from '@/components/uni-ui/lib/uni-card/uni-card.vue'
	import {
		Vue,
		Component,
	} from 'vue-property-decorator';
	@Component({
		components: {
			uniGrid,
			uniGridItem,
			uniCard
		}
	})
	export default class MyPage extends Vue {
		private userInfo:any = ""
		private bg: string = '../../static/bg1.jpg'
		private myCol: number = 3;
		private myMsg: number = 1000;
		private myMon: number = 100;
		private myOrder: {} [] = [{
				title: '待付款',
				img: require('@/static/icons/cart1.png'),
				index: 0
			},
			{
				title: '待发货',
				img: require('@/static/icons/cart2.png'),
				index: 1
			},
			{
				title: '待收货',
				img: require('@/static/icons/cart3.png'),
				index: 2
			},
			{
				title: '已完成',
				img: require('@/static/icons/cart4.png'),
				index: 3
			},
		];
		private myShare: {} [] = [{
				title: '邀请好友',
				img: '../../static/icons/yaoqing.svg'
			},
			{
				title: '我的名片',
				img: '../../static/icons/mingpian.svg'
			},
			{
				title: '我的二维码',
				img: '../../static/icons/iconfonterweima.svg'
			},
			{
				title: '我的足迹',
				img: '../../static/icons/icon-zuji.svg'
			}
		]
		private myTools: {} [] = [{
				title: '地址管理',
				image: '../../static/icons/dizhi.svg'
			},
			{
				title: '售后列表',
				image: '../../static/icons/liebiao.svg'
			},
			{
				title: '联系客服',
				image: '../../static/icons/kefu.svg'
			},
			{
				title: '优惠券',
				image: '../../static/icons/9.svg'
			},
			{
				title: '产品提问',
				image: '../../static/icons/tiwen.svg'
			},
			{
				title: '推广材料',
				image: '../../static/icons/yuancailiaojiagong.svg'
			},
		];
		private show: boolean = false
		onPageScroll(scrollTop: any) {
			// console.log(scrollTop.scrollTop)
			if (scrollTop.scrollTop >= 200) {
				this.show = true
			} else {
				this.show = false
			}
		}
		wxGetUserInfo(){
		                uni.getUserInfo({
		                    success: (res) => {
		                        this.userInfo = res.userInfo;
		                        console.log(this.userInfo);
		                    },
		                    fail: () => {
		                        console.log("未授权");
		                    }
		                })
		            }
		toMyOrder(e: any): void {
			let url = e.detail.index;
			uni.navigateTo({
				url: '/pages/mine/order/index?id=' + url
			});
		}
		toMyOrderAll(): void {
			uni.navigateTo({
				url: '/pages/mine/order/index?id=-1'
			});
		}
		toCart(): void {
			console.log(1111)
			uni.navigateTo({
				url: '/pages/cart/index'
			});
		}
	}
</script>

<style>
	.user{
		height: 50rpx !important;width: 150rpx !important;
		line-height: 50rpx !important;
		font-size: 28rpx !important;
		margin-left: -12rpx !important;
		margin-top: -10rpx !important;
	}
	.userInfo {
		/* margin-top: 200px; */
		width: 100%;
		height: 540px;
		background-image: url('https://ss0.baidu.com/6ON1bjeh1BF3odCf/it/u=149268171,13030427&fm=15&gp=0.jpg');
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: 0 -240px;
		position: relative;
	}

	.userBox {
		height: 250px;
		width: 90%;
		margin-top: 275px;
		background-color: white;
		box-shadow: 1px 1px 9px 0px #00000045;
		border-radius: 16px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		text-align: center;

	}

	.userBox text {
		display: block;
	}

	

	.userBox .username {
		margin-top: 50px;
		font-size: 32px;
	}

	.img_font {
		width: 50rpx;
		height: 50rpx;
	}

	.userBox .userId {
		color: gray;
		margin-top: 10px;
	}

	.userBox .userCont {
		display: flex;
		width: 90%;
		margin: 20px auto;
	}

	.userBox .userCont text {
		line-height: 25px;
		font-weight: 1000;
	}

	.userBox .userCont view {
		flex: 1;
		position: relative;
		margin: 0 2px;
		vertical-align: middle;
	}

	.userBox .userCont .conName {
		font-size: 14px;
		color: gray;
	}

	.userBox .userCont .btn {
		font-size: 13px;
		line-height: 50px;
		background-color: rgb(245, 147, 89);
		color: #fff;

	}

	.userImg {
		width: 80px;
		height: 80px;
		background-color: red;
		border: 5px white solid;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 8px black;
	}

	.userSell {
		height: 70px;
		display: flex;
		justify-content: space-between;
		padding-left: 15px;
		padding-right: 15px;
	}

	.userSell view {
		width: 330rpx;
		height: 50px;
		line-height: 50px;
		font-size: 15px;
		/* margin: 0 17px; */
		box-shadow: 0 0 4px #0000004d;
		font-weight: 600;
		border: none;

	}

	.userSell view image {
		width: 30px;
		height: 30px;
		vertical-align: middle;
		margin-left: 12px;
		padding-right: 10px;
	}

	.userSell view text {
		color: grey;
		margin-left: 20px;
	}

	.userBar {
		width: 60px;
		height: 20px;
		background-color: orange;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 145%);
		z-index: 10;
		color: white;
		font-size: 12px;
		line-height: 20px;
		text-align: center;
		border-radius: 5px;
	}

	.userBox .userCont .msg {
		width: 10px;
		height: 10px;
		background-color: orange;
		border-radius: 50%;
		position: absolute;
		right: 0;
	}

	.tabbar text {
		display: block;
		line-height: 60px;
		text-align: center;
	}

	.tabbar image {
		position: fixed;
		top: 15px;
		right: 25%;
		width: 30px;
		height: 30px;
	}

	.tabbarshow {
		width: 100%;
		height: 60px;
		position: fixed;
		background-color: white;
		z-index: 100;
	}

	.tabbarhide {
		width: 100%;
		height: 60px;
		position: fixed;
		background-color: unset;
		z-index: 100;
	}

	.order {
		width: 90%;
		margin: 0 auto;
	}

	.order text:nth-child(2) {
		font-weight: 1000;
	}

	.order text:nth-child(1) {
		color: grey;
		float: right;
	}

	.gird {
		width: 90%;
		margin: 30px auto;
	}

	.grid-item {
		display: flex;
		margin: 16px 8px;
	}

	.grid-item .text {
		margin-left: 10px;
		flex: 1;
		font-weight: 1000;
	}

	.grid-item .textNum {
		display: block;
		color: gray;
		text-align: left;
	}

	.grid-item image {
		width: 50px;
		height: 50px;
		float: right;
		display: block;
		flex: 1;
		margin-top: -3px;
	}

	.share-gird {
		text-align: center;
		margin-bottom: 10px;
		margin-top: 8px;
	}

	.share-gird text {
		display: block;
		font-size: 15px;
		color: gray;
	}

	.share-gird image {
		display: inline-block;
		width: 30px;
		height: 30px;
	}
</style>
