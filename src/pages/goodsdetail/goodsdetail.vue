<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="item in lunboinfo" :key="item.id_">

							<image :src="item.url_"></image>

						</swiper-item>

					</swiper>
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="left">
				<view>
					<image src="../../static/icons/share.png" mode="" class="share"></image><text>分享</text>
				</view>
				<view>
					<image src="../../static/icons/kefu2.png" mode="" class="share"></image><text>客服</text>
				</view>
				<view>
					<image src="../../static/icons/guowuche.png" mode="" class="share"></image><text>购物车</text>
				</view>
			</view>
			<view class="right">
				<view class="right-1">
					<view class="join">
						加入购物车
					</view>
					<view class="buy">
						立即购买
					</view>
				</view>

			</view>
		</view>

		<view class="price">
			￥{{price}}
		</view>
		<view class="name">
			{{name}}
		</view>


		<view class="posters">
			<image src="../../static/icons/haibao.png" mode=""></image>
			<view class="posters-wz">海报分享</view>
		</view>

		<view class="kb">
		</view>
		<view class="choose">
			<view class="c1">
				<view class="c1-1">
					<text class="fuwu">服务</text>
					<text class="guang">含光源</text>
				</view>
				<view class="c1-2">
					<text class="fuwu">保障</text>
					<text class="guang">{{value}}质保</text>
				</view>
			</view>
			<view class="c2" @click="open">
				<view class="size">
					选择规格　　　　＞
				</view>
				<view class="cs">
					颜色、尺寸、大小...
				</view>
			</view>

		</view>
		
		<uni-popup ref="popup" type="bottom" class="tan">
			<view class="popup-content">
				
				<view class="pic">
					<image :src="size.img_" mode="widthFix"></image>
				</view>
				<view class="jiage">
					￥{{price}}
				</view>
				<view class="yixuan">
					已选: {{size.format_}}/{{size.code_}}
				</view>
				<view class="kucun">
					数量:　1件起购　　 库存:　{{size.stock_}}件
				</view>
				<view class="guige">
					规格
				</view>
				<view class="guige-1">
					 {{size.format_}}/{{size.code_}}
				</view>
				
				 <view class="num">
				            <sunui-stepper :label='2' :max="10" :val="1" :step="1" :min="1" @change=""></sunui-stepper>
				        </view>
				<!-- <wm-numberBox class="num" min="1" max="10" value="1" destination="body-btn" model="1" ></wm-numberBox> -->
				<view class="shuliang">
					数量
				</view>
				
				<view class="qd">
					确定
				</view>
				
				
			</view>
			
		</uni-popup>

		<uni-list>
			<uni-list-item :border="false" title="商品信息" class="no1"></uni-list-item>
			<uni-list-item :border="false" :title="text[0].name_" :rightText="text[0].value_"></uni-list-item>
			<uni-list-item :border="false" :title="text[1].name_" :rightText="text[1].value_"></uni-list-item>
			<uni-list-item :border="false" :title="text[2].name_" :rightText="text[2].value_"></uni-list-item>
			<uni-list-item :border="false" :title="text[3].name_" :rightText="text[3].value_"></uni-list-item>
			<uni-list-item :border="false" :title="text[4].name_" :rightText="text[4].value_"></uni-list-item>
		<view class="ycang" v-show="flag">
			<uni-list-item :border="false" :title="text[5].name_" :rightText="text[5].value_"></uni-list-item>
			<uni-list-item :border="false" :title="text[6].name_" :rightText="text[6].value_"></uni-list-item>
			<uni-list-item :border="false" :title="text[7].name_" :rightText="text[7].value_"></uni-list-item>	
		</view>
			
		</uni-list>

		
		
		<view class="shouqi" @click = "showTag">
			{{flag?"收起":"展开"}}
		</view>

		<view class="kb2">
		</view>

		<view class="tp" v-for="item in tp" :key="item">

			<image :src="item" mode="widthFix"></image>
		</view>

		<view class="kb">
		</view>


	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import  uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	 
	import {
		uniList,
		uniListItem,
		uniListChat,
		
	} from '@dcloudio/uni-ui'

	import {
		myRequest
	} from '@/utils/http1.js'
	export default {
		components: {
			uniList,
			uniListItem,
			uniListChat,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			
		},
		data() {
			return {
				size:"",
				tp: "",
				text: "",
				value: "",
				name: "",
				price: "",
				lunboinfo: "",
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				flag:false,
				ids:""

			}
		},
		created() {
			//this.id = options.id
			this.getData()
		},
		onLoad(options){
			console.log(options)
			this.ids = options.id
		},
		methods: {
			 
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			
			 showTag(){
			          this.flag = !this.flag
			      },

		 open(){
		         this.$refs.popup.open()
		      },

			async getData() {
				console.log(this.ids)
				let res = await myRequest({
					method: "GET",
					// ${this.ids}
					url: `/api/v1/buyer/goods/noDecode/getTypeGoodsById/27644`
				})
				console.log(res)
				if(res.data.goodsImgList){
					this.lunboinfo = res.data.goodsImgList
				}
				
				this.price = res.data.price_
				this.name = res.data.name_
				this.value = res.data.propertyList[3].value_
				this.text = res.data.propertyList
				this.tp = JSON.parse(res.data.introduce_)
				this.size = res.data.productList[0]


			}
		}
	}
</script>

<style lang="scss" scoped>
	

	
	/deep/.uni-list .no1 .uni-list-item .uni-list-item__container .uni-list-item__content .uni-list-item__content-title{
			font-weight: 400rpx;
			font-size: 40rpx;
		
	}

	.tan{
		z-index: 101;
	}
	/deep/.popup-content {
		background-color: #fff;
		padding: 15px;
		z-index: 1111;
		height: 600rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.qd{
			
			height: 70rpx;
			color: white;
			text-align: center;
			line-height: 70rpx;
			margin: 20rpx auto;
			background-color: black;
			border-radius:10rpx ;
		}
		.shuliang{
			margin-top: 45rpx;
			font-size: 30rpx;
		}
		.num{
			float: right;
			margin-top: 30rpx;
		}
		.guige-1{
			width: 500rpx;
			height: 70rpx;
			text-align: center;
			line-height: 70rpx;
			border: 1px solid #d0d0d0;
			font-size: 25rpx;
			margin-top: 10rpx;
		}
		.guige{
			margin-top: 10rpx;
			font-size: 30rpx;
		}
		.kucun{
			text-align: center;
			font-size: 24rpx;
			color: #b0afb3;
			margin-top: 10rpx;
		}
		.yixuan{
			text-align: center;
			font-size: 26rpx;
		}
		.jiage{
			text-align: center;
			color:orange;
			height: 100rpx;
			font-size: 40rpx;
			font-weight: 100rpx;
			line-height: 100rpx;
			margin-top: 125rpx;
		}
		
		.pic{
			
			margin:-125rpx auto;
			width: 250rpx;
			height: 250rpx;
			background-color: white;
			border-radius: 20rpx;
			border: 1rpx solid #e0e0e0;
			image{
				width: 100%;
				
				
			}
		}
	}
	.tp {
		width: 100%;

		image {
			width: 100%;

		}

	}

	.shouqi {
		margin-top: 40rpx;
		text-align: center;
		color: #8d8e8f
	}

	

	.posters {
		width: 25%;
		height: 60rpx;
		margin-left: auto;
		margin-right: auto;
		line-height: 60rpx;

		.posters-wz {
			float: right;
			font-size: 30rpx;
		}

		image {
			width: 50rpx;
			height: 60rpx;
			color: black;
			float: left;
		}
	}

	.kb2 {
		height: 70rpx;
	}

	.kb {
		height: 130rpx;
	}

	.choose {
		position: relative;
		height: 300rpx;
		background-color: #FAFAFA;

		.c1 {
			position: absolute;
			width: 340rpx;
			height: 200rpx;
			background-color: white;
			top: 50rpx;
			left: 20rpx;

			.c1-2 {
				
				margin-top: 35rpx;
				margin-left: 35rpx;

				.fuwu {
					font-weight: 50rpx;
					color: black;
					font-size: 30rpx;
				}

				.guang {
					font-size: 30rpx;
					padding-left: 10rpx;
					color: #8c8c8c;
				}
			}

			.c1-1 {
				margin-top: 45rpx;
				margin-left: 35rpx;
				font-size: 30rpx;

				.fuwu {
					font-size: 30rpx;
					font-weight: 50rpx;
					color: black;
				}

				.guang {
					font-size: 30rpx;
					padding-left: 10rpx;
					color: #8c8c8c;
				}
			}
		}

		.c2 {
			position: absolute;
			width: 340rpx;
			height: 200rpx;
			background-color: white;
			top: 50rpx;
			right: 20rpx;

			.size {
				font-size: 30rpx;
				margin-top: 45rpx;
				margin-left: 35rpx;
			}

			.cs {
				font-size: 30rpx;
				margin-top: 35rpx;
				margin-left: 35rpx;
				color: #8c8c8c;
			}
		}
	}

	.name {
		margin-left: auto;
		margin-right: auto;

		width: 80%;
		height: 200rpx;

		text-align: center;
		font-size: 40rpx;
		font-weight: 60rpx;
	}

	.price {
		color: orange;
		line-height: 200rpx;
		height: 200rpx;
		text-align: center;
		font-size: 50rpx;
	}

	.swiper {
		height: 800rpx;

		image {
			width: 100%;
			height: 800rpx;
		}
	}

	.bottom {
		z-index: 99;
		width: 100%;
		height: 130rpx;
		background-color: white;
		position: fixed;
		bottom: 0;

		.left {
			float: left;
			width: 45%;
			height: 100%;
			display: flex;
			justify-content: space-around;

			text {
				font-size:28rpx;
			}

			image {
				display: block;
			}

			.share {
				width: 60rpx;
				height: 60rpx;
				margin-top: 20rpx;
				margin-left: 5rpx;
			}
		}

		.right {

			height: 100%;
			width: 53%;
			float: right;
			font-size: 30rpx;
			color: white;
			text-align: center;
			line-height: 90rpx;

			.right-1 {
				width: 380rpx;
				height: 100rpx;

				
				margin-top: 15rpx;

				.join {
					width: 190rpx;
					height: 100%;
					float: left;
					background-color: black;

					border-top-left-radius: 10rpx;
					border-bottom-left-radius: 10rpx;

				}

				.buy {
					width: 190rpx;
					height: 100%;
					float: left;
					background-color: orange;

					border-top-right-radius: 10rpx;
					border-bottom-right-radius: 10rpx;
				}
			}
		}
	}
</style>
