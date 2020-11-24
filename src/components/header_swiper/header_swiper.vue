<template>

<view class="box">
	<HeaderTxt :titleArr="titleArr" :swiperIndex="swiperIndex"></HeaderTxt>
	<swiper class="swiper-block" circular="true" previous-margin="90rpx" next-margin="90rpx" current="0" @change="swiperChange($event)">
		 <swiper-item class="swiper-item" v-for="(item,index) in arr" :key="item.name" @click="goDetaila()">
		   <view class="img_content" :class="['slide-image',swiperIndex == index ? 'active' : ''] ">
		   	<image mode="aspectFill" :src="item.url"  />
		 	<view class="txt_content">
		 		<view class="left_txt">
		 			<view class="left_txt_top">
		 				{{item.title}}
		 			</view>
		 			<view class="left_txt_bottom">
		 				{{item.tab}}
		 			</view>
		 		</view>
		 		<view class="right_txt">
		 			{{index+1}}/{{arr.length}}
		 		</view>
		 	</view>
		   </view>
		 </swiper-item>
	
	 
	  </swiper>
</view>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Watch
  } from "vue-property-decorator";
  import { myRequest } from '@/utils/http.js'
  import HeaderTxt from "./header_txt.vue"
  @Component({
	  components:{
		  HeaderTxt
	  }
  })
  export default class Index extends Vue {
    private style_list:any[] = []
	private arr:{}[]=[]
    private swiperIndex: Number = 0
	private titleArr:string[]=[]
	private newIndex:number=0
    swiperChange(e: any): void {
      this.swiperIndex = e.detail.current
    }
     created(){
            this.getSwipers()
        }
		goDetaila():void{
			uni.navigateTo({
			    url: '/pages/goodsdetail/goodsdetail',
			  })
		}
	// 请求头部滑块组件
	async getSwipers(): Promise < any > {
	    const res = await myRequest({
	        method: 'GET',
	        url: '/api/Index/Index'
	    })
     this.style_list=res.datas.style_list
	 const newArr:any[]=[]
	  res.datas.style_list.forEach((item:any,index:any)=>{
		  newArr.push(item.images_list)
		  this.titleArr.push(item.name)
	  })
	  this.arr=newArr.flat()
	  
	}
	
	
  }
</script>

<style lang="less" scoped>
  .swiper-block {
    height: 720rpx !important;
    width: 100%;
    transform: rotate(0deg) !important;

    .swiper-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      overflow: unset;
	  height: 500rpx;
	  position: relative;
  
		  .slide-image {
		    width: 520rpx;
		    border-radius: 12rpx;
		    box-shadow: 0px 0px 30rpx rgba(0, 0, 0, .2);
		    margin: 0rpx 30rpx;
		    z-index: 1;
			border-radius: 12rpx;
			image{
				width: 100%;
				height: 400rpx;
				border-top-left-radius: 12rpx;
				border-top-right-radius: 12rpx;
			}
			.txt_content{
				display: flex;
				height: 140rpx;
				.left_txt{
					flex: 7;
					.left_txt_top{
						padding: 6rpx 0 0 6rpx;
						margin-left: 10rpx;
						font-weight: 600;
						font-size: 32rpx;
						white-space: nowrap;
					}
					.left_txt_bottom{
						margin-top: 20rpx;
						font-size: 25rpx;
						margin-left: 18rpx;
						color: #000;
					}
				}
				.right_txt{
						flex:1;	
						color: #000;
						margin-top:65rpx;
						font-size: 25rpx;
						margin-right: 15rpx;
					}
			
			}
		  }
	 

      .active {
        transform: scale(1.1, 1.2);
        transition: all .2s ease-in 0s;
        border-radius: 12rpx !important;
        z-index: 20;
      }

   
	
    }

  }
</style>