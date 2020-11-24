<template>
	<view class="content">
		<headerSwiper></headerSwiper>

		<van-grid>
			<van-grid-item :icon="item.image" :text="item.name" v-for="item in index_tab" :key="item.id" />
		</van-grid>

		<scroll-view scroll-x="true" class="scroll_content1" show-scrollbar="true">
			<view v-for="(item,index) in space_list" :key="item.shelf_id" @click="goTaocan()">
				<image :src="item.url" mode=""></image>
			</view>
		</scroll-view>

		<van-grid column-num="2">
			<van-grid-item use-slot v-for="item in tab_list" :key="item.shelf_id">
				<image style="width: 100%; height: 60px;" :src="item.url" />
			</van-grid-item>
		</van-grid>


		<!-- 广告区域 -->
		<view class="img_display">
			<image :src="advertising.img" mode=""></image>
		</view>


		<view class="mian_box" v-for="(item,index) in shelf_list" :key="item.shelf_id">
			<view class="view_lost" v-if="index==1|| index==2">
				<view class="view_lost_content">
					<text>左滑查看更多</text>
<image :src="require('../../static/icons/shower.png')" class="img"></image>
				</view>
			</view>
			<!-- 头部navbar组件 -->
			<HeaderTitle>
				<view class="left_top_title" slot="main_title">
					{{item.name}}
				</view>
				<view class="left_bottom_title" slot="subtitle">
					{{item.subtitle}}
				</view>
				<view class="right_title" slot="right_title">
					更多 | MORE
				</view>
			</HeaderTitle>

       
			<!-- 全屋套餐,N98套餐 -->
			<view class="img_show_area">
				<swiper v-if="index<2" :class="index==1?'swiper_active':''">
					<swiper-item v-for="item1 in item.data" :key="item1.goods_id" class="swiper-item">
						<view class="pic_area">
							<image :src="item1.image" mode="" :class="index==1?'index_active':''"></image>
						</view>
						<view class="txt_area">
							<view class="header_title">
								{{item1.goods_name}}
							</view>
							<view class="footer_title">
								<text>￥{{item1.retail_price}}</text><text>{{item1.remark}}</text><text></text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>


			<view class="show_goods" v-if="index>=2&&index<6">
				<view class="img_area">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="goods_show_area">
					<view class="goods_pic" v-for="item2 in item.data" :key="item2.goods_id">
						<image :src="item2.image" mode=""></image>
						<view class="goods_txt">
							{{item2.goods_name}}
						</view>
						<view class="goods_sal">
							￥{{item2.retail_price}}
						</view>
					</view>
				</view>
			</view>


			<view class="tabbar_area" v-if="index==6">
				<van-tabs :active="active" :change="onChange" color="#0081ff" animated="true" duration="0.8">
					<van-tab :title="item.data[0].name">
						<van-grid column-num="3">
							<van-grid-item :icon="item2.logo" :text="item2.factory_name" v-for="item2 in item.data[0].shelf_tab" :key="item2"/>
						</van-grid>
					</van-tab>
					<van-tab :title="item.data[1].name">
						<van-grid column-num="3">
							<van-grid-item :icon="item2.logo" :text="item2.factory_name" v-for="item2 in item.data[1].shelf_tab" :key="item2"/>
						</van-grid>
					</van-tab>
				</van-tabs>
			</view>

			<view class="scroll_show_area" v-if="index==7">
				<scroll-view scroll-x="true" class="scroll_content" show-scrollbar="false">
					<view class="scroll_content_item" v-for="item1 in item.data" :key="item1.goods_id">
						<image :src="item1.image" mode=""></image>
						<view class="title_scroll">
							{{item1.goods_name}}
						</view>
						<view class="content_scroll">
							￥{{item1.retail_price}}
						</view>
					</view>
				</scroll-view>

				<view class="bottom_title">
					<view class="bottom_title_item">
						<text>探索更多</text>
						<image :src="require('../../static/icons/right.png')" mode=""></image>
					</view>
				</view>
			</view>



			<!-- VR设计 -->
			<view v-if="index==8">
				<swiper class="vr_swiper">
					<swiper-item v-for="item1 in item.data" :key="item1.goods_id" class="swiper_item">
						<view class="pic_area">
							<image :src="item1.image" mode=""></image>
						</view>
						<view class="txt_area">
							<view class="header_title">
								{{item1.vr_name}}
							</view>
							<view class="footer_title">
								<text>{{item1.style_name}}</text><text>{{item1.space}}</text><text>{{item1.square}}m³</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>


			<!-- 案例推荐 -->
			<view class="case_area" v-if="index==9">
				<scroll-view scroll-x="true" class="scroll_new_view">
					<view class="scroll_new_item" v-for="item2 in item.data" :key="item.shelf_id">
						<image :src="item2.image" mode=""></image>
						<view class="case_title">
							{{item2.case_name}}
						</view>
						<view class="case_sal">
							<text>{{item2.style_name}}</text><text>{{item2.space}}</text><text>{{item2.square}}m³</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="foot_tabbar">
			<!-- 头部navbar组件 -->
			<HeaderTitle>
				<view class="left_top_title" slot="main_title">
					{{list.name}}
				</view>
				<view class="left_bottom_title" slot="subtitle">
					{{list.subtitle}}
				</view>
			</HeaderTitle>

			<!-- 导航切换组件 -->
			<view class="nav_tabbar">
				<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange">
				</wuc-tab>
					<view class="" v-if="TabCur==0" v-for="(item,index) in shelfspace" :key="index" v-cloak>
						<footerTabbar :shelfspaceobj="shelfspace[index]"></footerTabbar>
					</view>
					<view class="" v-if="TabCur>0&&TabCur<=4" v-cloak>
						<footerTabbar :shelfspaceobj="shelfspace[TabCur-1]"></footerTabbar>
					</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from "vue-property-decorator";

	import HeaderSwiper from "@/components/header_swiper/header_swiper.vue"
	import HeaderTitle from "@/components/header_title/header_title.vue"
	import FooterTabbar from "@/components/footer_tabbar/index.vue"
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import {
		myRequest
	} from '@/utils/http.js'
	@Component({
		components: {
			HeaderSwiper,
			HeaderTitle,
			FooterTabbar
		}
	})


	export default class Index extends Vue {
		//定义data中的数据
		private index_tab: {} [] = []
		private space_list: {} [] = []
		private tab_list: {} [] = []
		private shelf_list: {} [] = []
		private active: number = 0
		private advertising: {} = {}
		private shelfspace: {} [] = []
		private spaceList: any = []
		private list: {} = {}
		private TabCur: number = 0
		private tabList: any = []
		goTaocan():void{
			uni.navigateTo({
				url:"/pages/taocandetail/taocandetail"
			})
		}
		//请求头部数据
		async getSwipers(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/api/Index/Index'
			})
			this.index_tab = res.datas.tab_list.index_tab
			this.space_list = res.datas.tab_list.space_list
			this.tab_list = res.datas.tab_list.tab_list
			this.shelf_list = res.datas.shelf_list
			this.advertising = res.datas.advertising
		}

		// 请求精品推荐数据
		async getCates(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/api/Index/GoodsRecommend'
			})
			this.shelfspace = res.datas.list[0].shelf_space
			this.spaceList = res.datas.list[0].space_list
			this.list = res.datas.list[0]
			// this.tabList = this.spaceList.filter(item => {
			// 	return item.name
			// })
			this.tabList = this.spaceList.filter(function(item:any){
				return item.name
			})
		}

		//调用请求函数
		created() {
			this.getSwipers()
			this.getCates()
		}
		tabChange(index:any) {
			this.TabCur = index;
		}

	}
</script>

<style lang="less" scoped>
	.swiper {
		display: flex;
		justify-content: space-between;

		.swiper-item {
			width: 200rpx;
			height: 120rpx;

			image {
				width: 200rpx;
				height: 120rpx;
			}
		}
	}

	.scroll_content1 {
		height: 300rpx;
		width: 1000rpx;
		white-space: nowrap;
		display: flex;
		align-items: flex-start;

		view {
			display: inline-block;
			width: 230rpx;
			height: 100%;
			margin-left: 30rpx;
			padding-top: 30rpx;
			color: gray;

			image {
				width: 230rpx;
				height: 100%;
			}

		}
	}

	.custom-class {
		border-radius: 16rpx !important;
	}

	.left_top_title {
		font-size: 50rpx;
		font-weight: 600;
	}

	.left_bottom_title {
		font-size: 28rpx;
		color: rgb(107, 102, 118);
	}

	.right_title {
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}

	.img_show_area {
		width: 100%;

		.swiper_active {
			height: 600rpx !important;

			.swiper-item {
				width: 100%;
				height: 80%;

				.pic_area {
					height: 70%;
					width: 100%;

					image {
						border-radius: 16rpx;
						box-shadow: 0px 0px 30rpx rgba(0, 0, 0, .2);
					}
				}
			}
		}

		swiper {
			height: 940rpx !important;
			display: flex;
			justify-content: center;

			.swiper-item {
				width: 100%;
				height: 80%;

				.pic_area {
					height: 83%;
					width: 100%;
					display: flex;
					justify-content: center;

					image {
						width: 92%;
						height: 100%;
					}

					.index_active {
						width: 92%;
						height: 400rpx !important;
					}

				}

				.txt_area {
					padding-left: 20rpx;

					.header_title {
						font-size: 40rpx;
						margin-left: 20rpx;
						margin-top: 30rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.footer_title {
						margin-top: 20rpx;

						text {
							margin-left: 20rpx;
						}

						&>text:nth-child(1) {
							color: #FF8917;
						}

						&>text:nth-child(2) {
							color: #ADADAD;
							font-size: 24rpx;
						}
					}
				}
			}

		}
	}

	.show_goods {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.img_area {
			flex: 3;
			width: 100%;
			display: flex;
			justify-content: center;

			image {
				width: 90%;
				height: 400rpx;
				border-radius: 16rpx;
				box-shadow: 0px 0px 30rpx rgba(0, 0, 0, .2);
			}
		}

		.goods_show_area {
			flex: 2;
			display: flex;
			margin-top: 20rpx;
			justify-content: space-evenly;

			.goods_pic {
				width: 200rpx;
				display: flex;
				flex-direction: column;
				margin-left: 15rpx;

				image {
					width: 100%;
					height: 150rpx;
					border-radius: 16rpx;
					box-shadow: 0px 0px 30rpx rgba(0, 0, 0, .2);
				}

				.goods_txt {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-top: 15rpx;
					text-align: left;
				}

				.goods_sal {
					color: #FF8917;
					margin-top: 15rpx;
					text-align: left;
				}
			}
		}
	}

	.scroll_show_area {
		.bottom_title {
			width: 100%;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.bottom_title_item {
				width: 200rpx;

				text {
					margin-left: 10rpx;
					height: 30rpx;
					vertical-align: bottom;
					line-height: 30rpx;
				}

				image {
					width: 30rpx;
					height: 25rpx;
					padding-left: 14rpx;
					margin-top: 10rpx;
				}

			}
		}

		.scroll_content {
			height: 80%;
			white-space: nowrap;
			display: flex;
			align-items: flex-start;

			.scroll_content_item {
				display: inline-block;
				margin-left: 20rpx;
				width: 200rpx;

				image {
					height: 200rpx;
					width: 200rpx;
					border-radius: 16rpx;
					box-shadow: 0px 0px 30rpx rgba(0, 0, 0, .2);
				}

				.title_scroll {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: #ADADAD;
					margin-top: 15rpx;
				}

				.content_scroll {
					margin-top: 20rpx;
					color: #FF8917;
					font-size: 24rpx;
				}
			}


		}
	}

	.img_display {
		width: 100%;
		display: flex;
		justify-content: center;

		image {
			width: 92%;
			height: 280rpx;
			border-radius: 16rpx;
			box-shadow: 0px 0px 30rpx rgba(0, 0, 0, .2);
		}
	}

	.vr_swiper {
		height: 700rpx;
		display: flex;
		margin-left: 20rpx;

		.swiper_item {
			width: 500rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;


			.pic_area {
				width: 100%;
				height: 600rpx;
				display: flex;
				justify-content: center;

				image {
					width: 640rpx;
					height: 540rpx;
					border-top-left-radius: 16rpx;
					border-top-right-radius: 16rpx;
					box-shadow: 0px 0px 30rpx rgba(0, 0, 0, .2);
				}
			}

			.txt_area {
				width: 100%;
				height: 150rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;


				.header_title {
					display: flex;
					justify-content: center;
					font-size: 45rpx;
				}

				.footer_title {
					margin-top: 20rpx;
					display: flex;
					justify-content: center;
					color: #ADADAD;


					text {
						margin-right: 20rpx;
					}
				}
			}
		}
	}

	.case_area {
		.scroll_new_view {
			width: 100%;
			white-space: nowrap;
			display: flex;
			align-items: flex-start;
			height: 700rpx;
			border-radius: 16rpx;

			.scroll_new_item {
				width: 640rpx;
				display: inline-block;
				height: 100%;
				margin-left: 30rpx;
				border-radius: 16rpx;
				box-shadow: 0px 0px 30rpx rgba(0, 0, 0, .2);

				image {
					width: 100%;
					height: 550rpx;
					border-top-left-radius: 16rpx;
					border-top-right-radius: 16rpx;

				}

				.case_title {
					display: flex;
					justify-content: center;
					font-size: 40rpx;
					margin-top: 20rpx;
				}

				.case_sal {
					display: flex;
					justify-content: center;
					margin-top: 20rpx;
					color: #ADADAD;

					text {
						margin-right: 20rpx;
					}
				}
			}

		}
	}
	[v-cloak]{
	    display:none;
	}
	.view_lost{
		margin-top: 12rpx;
		display: flex;
		height: 180rpx;
	    width: 750rpx;
       box-shadow: 0 3px 6px 0px rgba(0, 0, 0, .1) inset;
		justify-content: center;
		align-items: center;
		border: none;
		.view_lost_content{
			width: 40%;
			text{
				font-size: 24rpx;
				margin-left: 20rpx;
			}
			.img{
				width: 30rpx ;
				height: 30rpx ;
				// padding-top: 10rpx;
				vertical-align: bottom;
				padding-left: 14rpx;
			}
			
		}
	}
	
</style>
