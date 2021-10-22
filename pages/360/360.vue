<template>
	<view class="bkg">
		<navbar showBack></navbar>
		<!-- <view class="btn">
			<image src="../../static/text.png" mode=""></image>
		</view> -->
		<view class="bottom-bar">
			<view class="btn1 open" @click="open">
				<text>开启360°环拍</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '../../components/nav.vue'
	export default {
		components:{
			navbar
		},
		methods:{
			open(){
				
			}
		}
	}
</script>

<style lang="scss">
	@keyframes wateranimate {
		0% {
			transform: scale(1);
			opacity: 1;
		}

		100% {
			transform: scale(2);
			opacity: 0;
		}
	}
	
	.open {
		background:linear-gradient(
		 100deg,
		 rgba(255,255,255,0) 40%,
		 rgba(255,255,255,.5) 50%,
		 rgba(255,255,255,0) 60%
		 ) #FBC32A;
		box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
		background-size: 200% 100%;
		background-position-x: 150%;
		animation: 1.5s light ease-in-out infinite;
	}
	
	@keyframes light{
		to{
			background-position-x: -20%;
		}
	}
	
	.bottom-bar {
		position: fixed;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 0;
		width: 100%;
		height: 210rpx;	
	
		view {
			display: flex;
			align-items: center;
			justify-content: center;
			width: calc(100% - 60rpx);
			height: 88rpx;
			border-radius: 44rpx;
		}
	
		.btn1 {
			background-color: #FBC32A;
			box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
		}

	}

	.bkg {
		height: 100vh;
		background: url(https://tomevideo.zhihuiquanyu.com/360bkg.jpg) no-repeat center;
		background-size: cover;
		
		.btn {
			position: fixed;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 180rpx;
			height: 180rpx;
			left: 0;
			right: 0;
			margin: 0 auto;
			bottom: 20%;
			border-radius: 50%;
			background: rgba(113,69,174, 1);
			color: #fff;
			// transform-style: preserve-3d;
			
			image{
				width:85rpx;
				height:75rpx;
			}
			
			&::after , &::before{
				content: '';
				position: absolute;
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
				z-index:-99;
				background: rgba(113,69,174, .8);
				// background: rgba(255,255,255, .8);
			}
			
			&::after {
				animation: wateranimate 1.6s linear infinite;
			}

			&::before  {
				animation: wateranimate 1.6s linear infinite 1s;
			}
		}
	}
</style>
