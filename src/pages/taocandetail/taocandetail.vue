<template>
	<view>
	<view class="">
		<v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
			<view class="main" v-if="activeindex==0">
				<view class="box" v-for="item in pic" :key="item.group_id">
					<image :src="item.image" mode="widthFix" class="pic-big"></image>
					<view class="pic-sm" >
						<view class="sm-pic" v-for="item in item.goods_list" :key="item.goods_id">
							<image :src="item.image" mode="heightFix"></image>
						</view>
					</view>
					<view class="wz">
						{{item.group_name}}
					</view>
					<view class="jiage">
						￥{{item.retail_price}}
					</view>
					<view class="xuanze">
						{{item.remark}}
					</view>
				</view>
			</view>
			<view class="main" v-if="activeindex==1">
				<view class="box" v-for="item in pic1" :key="item.group_id">
					<image :src="item.image" mode="widthFix" class="pic-big"></image>
					<view class="pic-sm" >
						<view class="sm-pic" v-for="item in item.goods_list" :key="item.goods_id">
							<image :src="item.image" mode="heightFix"></image>
						</view>
					</view>
					<view class="wz">
						{{item.group_name}}
					</view>
					<view class="jiage">
						￥{{item.retail_price}}
					</view>
					<view class="xuanze">
						{{item.remark}}
					</view>
				</view>
			</view>
			<view class="main" v-if="activeindex==2">
				<view class="box" v-for="item in pic2" :key="item.group_id">
					<image :src="item.image" mode="widthFix" class="pic-big"></image>
					<view class="pic-sm" >
						<view class="sm-pic" v-for="item in item.goods_list" :key="item.goods_id">
							<image :src="item.image" mode="heightFix"></image>
						</view>
					</view>
					<view class="wz">
						{{item.group_name}}
					</view>
					<view class="jiage">
						￥{{item.retail_price}}
					</view>
					<view class="xuanze">
						{{item.remark}}
					</view>
				</view>
			</view>
			
			<view class="main" v-if="activeindex==3">
				<view class="box" v-for="item in pic3" :key="item.group_id">
					<image :src="item.image" mode="widthFix" class="pic-big"></image>
					<view class="pic-sm" >
						<view class="sm-pic" v-for="item in item.goods_list" :key="item.goods_id">
							<image :src="item.image" mode="heightFix"></image>
						</view>
					</view>
					<view class="wz">
						{{item.group_name}}
					</view>
					<view class="jiage">
						￥{{item.retail_price}}
					</view>
					<view class="xuanze">
						{{item.remark}}
					</view>
				</view>
			</view>
			
			
			<view class="main" v-if="activeindex==4">
				<view class="box" v-for="item in pic4" :key="item.group_id">
					<image :src="item.image" mode="widthFix" class="pic-big"></image>
					<view class="pic-sm" >
						<view class="sm-pic" v-for="item in item.goods_list" :key="item.goods_id">
							<image :src="item.image" mode="heightFix"></image>
						</view>
					</view>
					<view class="wz">
						{{item.group_name}}
					</view>
					<view class="jiage">
						￥{{item.retail_price}}
					</view>
					<view class="xuanze">
						{{item.remark}}
					</view>
				</view>
			</view>
					
					
					
			<view class="main" v-if="activeindex==5">
				<view class="box" v-for="item in pic5" :key="item.group_id">
					<image :src="item.image" mode="widthFix" class="pic-big"></image>
					<view class="pic-sm" >
						<view class="sm-pic" v-for="item in item.goods_list" :key="item.goods_id">
							<image :src="item.image" mode="heightFix"></image>
						</view>
					</view>
					<view class="wz">
						{{item.group_name}}
					</view>
					<view class="jiage">
						￥{{item.retail_price}}
					</view>
					<view class="xuanze">
						{{item.remark}}
					</view>
				</view>
			</view>
					
					
					
					
			<view class="main" v-if="activeindex==6">
				<view class="box" v-for="item in pic6" :key="item.group_id">
					<image :src="item.image" mode="widthFix" class="pic-big"></image>
					<view class="pic-sm" >
						<view class="sm-pic" v-for="item in item.goods_list" :key="item.goods_id">
							<image :src="item.image" mode="heightFix"></image>
						</view>
					</view>
					<view class="wz">
						{{item.group_name}}
					</view>
					<view class="jiage">
						￥{{item.retail_price}}
					</view>
					<view class="xuanze">
						{{item.remark}}
					</view>
				</view>
			</view>
			
			
			
			
			<view class="main" v-if="activeindex==7">
				<view class="box" v-for="item in pic7" :key="item.group_id">
					<image :src="item.image" mode="widthFix" class="pic-big"></image>
					<view class="pic-sm" >
						<view class="sm-pic" v-for="item in item.goods_list" :key="item.goods_id">
							<image :src="item.image" mode="heightFix"></image>
						</view>
					</view>
					<view class="wz">
						{{item.group_name}}
					</view>
					<view class="jiage">
						￥{{item.retail_price}}
					</view>
					<view class="xuanze">
						{{item.remark}}
					</view>
				</view>
			</view>
							
		
	</view>
	</view>
	
</template>

<script>
	import {
		myRequest
	} from '@/utils/http2.js'
	export default {
		
	  data() {
		
	    return {
			
			pic:"",
			pic1:"",
			pic2:"",
			pic3:"",
			pic4:"",
			pic5:"",
			pic6:"",
			pic7:"",
	      current: 0,
		  activeindex:0,
	      tabs: ['全部', '轻奢主义', '现代简约', '自然北欧', '现代中式', '精品实木', '经典美式', '奢华欧法']
	    } 
	  },
	  created() {
	  
	  	this.getData()
	  },
	  methods: {
	    changeTab(index) {
			this.activeindex=index
	    //  console.log('当前选中的项：' + index)
	    },
		
		async getData() {
		
			let res = await myRequest({
				
				url: "/api/Group/GroupItems",
			   data:{
				  page:2
			   }
			})
			
			this.pic=res.datas.list
			this.pic1 = this.pic.slice(0,2)
			this.pic2 = this.pic.slice(2,4)
			this.pic3 = this.pic.slice(5,6)
			this.pic4 = this.pic.slice(6,7)
			this.pic5 = this.pic.slice(7,8)
			this.pic6 = this.pic.slice(8,9)
			this.pic7 = this.pic.slice(9,10)
			//this.smpic=res.datas.list.goods_list
			console.log(this.pic)
	  }
	}
	}
 </script>

<style lang="scss" scoped>
	::-webkit-scrollbar {
	  display: none;
	}
	/deep/.main{
		.box{
			.pic-sm {
			  overflow-x: auto; //设置x轴可滑动
			
			  white-space: nowrap; //元素不换行
			  width: auto;
			  display: flex;
			  .sm-pic {
			    margin-left: 20px; //每个li设置间距为20px
			    display: inline-block; //让所有的li在一行 注意这里不能用float:left 因为设置float后里超过一屏后会自动换行
			  }
			}
		}
	}
	
	
	/deep/ .main{
		padding: 25rpx;
		.box{
			width: 100%;
		
			margin-top:20rpx ;
			border: 1px solid #EEEEEE;
			.xuanze{
				font-size: 28rpx;
				color: #606060;
				float: right;
				margin-top: 25rpx;
				margin-right: 25rpx;
			}
			.jiage{
				display: inline-block;
				height: 50rpx;
				line-height: 50rpx;
				padding: 25rpx;
				font-size: 36rpx;
				font-weight: 500;
				color: orange;
			}
			.wz{
				 display: inline-block;
				  white-space: nowrap; 
				  width: 95%; 
				  overflow: hidden;
				  text-overflow:ellipsis;
				  padding: 25rpx;
				  font-size: 36rpx;
				  font-weight: 500;
				  text-align: center;	
				  line-height: 100rpx;
				  height:100rpx ;
			}
			.pic-sm{
				width: 100%;
				height: 200rpx;
				.sm-pic{
					width: 250rpx;
					height: 200rpx;
					image{
						height: 100%;
					}
				}
			}
			.pic-big{
				width: 100%;
			}
		}
	}
</style>
