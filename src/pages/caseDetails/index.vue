<template>
	<view class="content">
		<u-swiper :list="data.vice_big" height="1000"></u-swiper>

		<view class="click_mun">人气{{data.click_mun}}</view>
		<view class="order content u-text-center">
			<b class="title">{{data.case_name}}</b>
			<view class="u-margin-30">
				{{data.square}}㎡ {{data.space}}
			</view>
			<view class="u-text-left">
				{{data.brief}}
			</view>
		</view>

		<view class="content" v-if="data.case_goods">
			<h3 class="u-m-l-20">案例商品</h3>
			<scroll-view scroll-x="true" class="scroll">
				<view style="width: 300px; height: 300px" class="box order content u-text-center" v-for="(res, index) in data.case_goods"
				 :key="res.goods_id" @click="toPath(res)">
					<image :src="res.image_middle" style="width: 240px; height: 200px"></image>
					<view class="title topic_cont_text">
						<b>{{res.goods_name}}</b>
					</view>
					
				</view>
			</scroll-view>
		</view>

		<view class="content">
			<h3 class="u-m-l-20">案例推荐</h3>
			<scroll-view scroll-x="true" class="scroll">
				<view class="box order content u-text-center" v-for="(res, index) in dataList" :key="res.case_id" @click="toPath(res)">
					<image :src="res.image"></image>
					<view class="title">
						<b>{{res.case_name}}</b>
					</view>
					<view class="">
						{{res.style_name}} {{res.space}} {{res.square}}㎡
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="content">
			<h3 class="u-text-center">案例效果图</h3>
			<scroll-view scroll-y="true" class="scroll">
				<view class="order content" v-for="(res, index) in data.img_info" :key="res.case_image_id">
					<image :src="res.image" mode="widthFix" @click="chooseImage(res.image,index)"></image>
				</view>
			</scroll-view>
		</view>
		<view class="u-p-fixed u-padding-20">
			<view class="" @click="show = !show">
				<u-icon name='edit-pen' color="#cccccc" size="50"></u-icon>
				<view class="u-font-10">留言</view>
				<u-popup v-model="show" mode="bottom">
					<view class="">
						<h2 class="u-text-center">编辑留言</h2>
						<u-field placeholder="请输入内容" type="textarea">
						</u-field>
						<u-button>确认提交</u-button>

					</view>

				</u-popup>
			</view>
			<view class="u-m-l-80">
				<u-icon v-show="showicon" name='star' color="#cccccc" size="50" @click="changeImg"></u-icon>
				<u-icon v-show="!showicon" name="star-fill" color="#cccccc" size="50" @click="changeImg"></u-icon>
				<view class="u-font-10">收藏</view>
				<u-toast ref="uToast"></u-toast>
			</view>
			<u-button class="u-m-r-10" size="medium">装修到我家</u-button>
		</view>

	</view>

</template>

<script>
	// 引入本地数据
	// import {
	// 	casedatas
	// } from '../../../public/case.js'
	import {myRequest} from "@/utils/http.js";
	// import "@/uview-ui/iconfont.css"
	export default {
		data() {
			return {
				show: false,
				data: "",
				showicon: true,
				dataList: '',
				list: '',
			};
		},
		onLoad: function(options) { //option为object类型，会序列化上个页面传递的参数
			if (options.item) {
				this.data = JSON.parse(options.item);
			}
			this.getDatees()
		},
		methods: {
			async getDatees(){
				let res = await myRequest({
					method:"get",
					url:'/api/Example/CaseList'
				})
				this.dataList = res.datas.list,
				this.list = res.datas.style_list
				// console.log(res.datas)
			},
			changeImg: function() {
				this.showicon = !this.showicon;
				uni.showModal({
					showCancel: false,
					title: this.showicon ? '取消收藏成功' : '收藏成功'
				})
			},
			chooseImage: function(image, index) {
				let imgArr = [];
				imgArr.push(image)
				uni.previewImage({
					urls: imgArr,
					current: index
				});
			},
			toPath(res) {
				let item = JSON.stringify(res);
				uni.navigateTo({
					url: `/pages/caseDetails/index?item=${item}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.topic_cont_text{
			padding: 30upx;
			colof: #999;
			// background: #E1FFFF;
			max-height: 130upx;
			overflow: hidden;
			word-break: break-all;  /* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;  /* 超出部分省略号 */
			display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 3; /** 显示的行数 **/
	
		}
	.u-p-fixed {
		width: 100%;
		background: #ffffff;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;

		.bg-black {
			color: #FFFFFF;
			background-color: #000000;
		}
	}

	.scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	.box {
		display: inline-block;
		width: 520upx;
		height: 600upx;
		background: #0062CC;
		margin-right: 30upx;
	}

	.click_mun {
		position: absolute;
		border: 1px solid #fff;
		padding: 5rpx;
		top: 10rpx;
		right: 10rpx;
		color: #f0f0f0,
	}

	.order {
		width: 330px;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		// padding: 20rpx;
		font-size: 28rpx;

		b {
			font-size: 16px;
		}
	}
</style>
