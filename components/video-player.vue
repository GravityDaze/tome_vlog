<!-- 弹出式视频播放组件 -->
<template>
	<view class="tips" v-if="show">
		<view class="mask"></view>
		<view class="play">
			<video style="width:100vw" autoplay :src="src" controls></video>
			<image @click="$emit('close')" src="../static/close.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			src:{
				default:'https://tomevideo.zhihuiquanyu.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%95%E5%AF%BC_0302.mp4',
				type:String
			},
			
			show:{
				default:false,
				type:Boolean
			}
		}
	}
</script>

<style lang="scss" scoped>
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
