<script lang="ts">
	import Vue from 'vue';
	export default Vue.extend({
		mpType: 'app',
		onLaunch() {
			console.log('App Launch')
		},
		onHide() {
			console.log('App Hide')
		}
	});
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@font-face {
		font-family: 'iconfont';
		/* project id 2158745 */
		src: url('https://at.alicdn.com/t/font_2158745_mnghumcg659.eot');
		src: url('https://at.alicdn.com/t/font_2158745_mnghumcg659.eot?#iefix') format('embedded-opentype'),
			url('https://at.alicdn.com/t/font_2158745_mnghumcg659.woff2') format('woff2'),
			url('https://at.alicdn.com/t/font_2158745_mnghumcg659.woff') format('woff'),
			url('https://at.alicdn.com/t/font_2158745_mnghumcg659.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_2158745_mnghumcg659.svg#iconfont') format('svg');
	}
	@font-face {
	  font-family: 'iconfont';  /* project id 2163571 */
	  src: url('http://at.alicdn.com/t/font_2163571_o0280efscgh.eot');
	  src: url('http://at.alicdn.com/t/font_2163571_o0280efscgh.eot?#iefix') format('embedded-opentype'),
	  url('http://at.alicdn.com/t/font_2163571_o0280efscgh.woff2') format('woff2'),
	  url('http://at.alicdn.com/t/font_2163571_o0280efscgh.woff') format('woff'),
	  url('http://at.alicdn.com/t/font_2163571_o0280efscgh.ttf') format('truetype'),
	  url('http://at.alicdn.com/t/font_2163571_o0280efscgh.svg#iconfont') format('svg');
	}
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
	.icon {
		font-family: iconfont;
		font-size: 24upx;
		color: #000000;
	}

	//需要使用的图标
	.icon-chakan:before {
		content: '\e60c';
		font-size: 48upx;
	}
	.icon-chakan:before {
		content: '\e607';
		font-size: 35upx;
	}
	.icon-icon_dianhua:before {
	  content: "\e617";
	}
	
	.icon-location:before {
	  content: "\e611";
	}
	
	.icon-youjiantou:before {
	  content: "\e629";
	}
	
	.icon-lihe:before {
	  content: "\e6a2";
	}
	
	.icon-fenxiang:before {
	  content: "\e682";
	}
	
	.icon-chakan:before {
	  content: "\e63b";
	}
	.icon-chakan:before {
		content: '\e607';
		font-size: 35upx;
	}
</style>
