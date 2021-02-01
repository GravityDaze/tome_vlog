<template>
	<view class="tips" v-if="show">
		<view class="mask"></view>
		<view class="play">
			<video style="width:100vw" autoplay src="https://tomevideo.zhihuiquanyu.com/M_%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97%E5%90%88%E6%88%90.mp4" controls></video>
			<image @click="close" src="../../../static/close.png" mode=""></image>
		</view>

	</view>
</template>

<script>
	export default {
		props:{
			show:{
				default:false,
				type:Boolean
			}
		},
		methods:{
			close(){
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	.tips {
		position: fixed;
		z-index: 100;
		
		.mask {
			position: fixed;
			top: 0;
			bottom: 0;
			background: rgba(0, 0, 0, .8);
			left: 0;
			right: 0;
		}
		
		.play{
			position:fixed;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
			text-align: center;
			
			image{
				margin-top:40rpx;
				width:55rpx;
				height:55rpx;
			}
		}
	}
</style>
