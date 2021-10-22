<template>
	<uni-popup ref="download" type="center" :mask-click="false">
		<view class="download">
			<view class="pic-box" :style="{backgroundImage:`url(${videoInfo.coverUrl})`}"></view>
			<view class="content-box">
				<view class="progress">
					<view class="line"></view>
					<view class="progress-line">
						<view class="curline" :style="{ width:`${ progress }%`}">
							<text>{{ progress }}%</text>
							<view class="circle"></view>
						</view>
					</view>
				</view>
				<view class="tips">
					<text>正在下载中{{ dot }}</text>
				</view>
			</view>
		</view>
		<image @click="$emit('close')" class="close" src="../../../static/close.png"></image>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean
			},
			progress: {
				type: Number
			},
			videoInfo: {
				type: Object
			}
		},
		data(){
			return{
				dot:'..'
			}
		},
		watch: {
			show(val) {
				const { open, close } = this.$refs.download
				if(val){
					open()
					this.timer = setInterval(_=>{
						if(this.dot.split('').length >= 3){
							this.dot = '.'
						}else{
							this.dot = [...this.dot.split(''),'.'].join('')
						}
					},500)
				}else{
					clearInterval(this.timer)
					close()
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.close{
		position:absolute;
		bottom:-93rpx;
		left:50%;
		transform: translate(-50%);
		width:55rpx;
		height:55rpx;
	}
	
	.download {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		width: 600rpx;
		height: 600rpx;
		box-shadow: 0 8rpx 27rpx 0 rgba(0, 0, 0, 0.06);
		overflow: hidden;
		border-radius: 30rpx;

		.pic-box {
			position: relative;
			flex: 1;
			width: 100%;
			background-size: cover;
		}

		.content-box {
			position: relative;
			flex: 1;
			display: flex;
			flex-flow: column;
			width: 100%;
			box-sizing: border-box;

			.progress {
				position: relative;
				left: 50%;
				transform: translateX(-50%);
				width: 70%;
				flex: 1;
				display: flex;
				align-items: flex-end;

				&>text {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 100%;
					text-align: center;
					font-size: 30rpx;
					// font-family: PingFang SC;
					// font-weight: bold;
					color: #333332;
				}

				.line {
					position: absolute;
					width: 100%;
					height: 20rpx;
					border-radius: 20rpx;
					background: rgb(235, 224, 220);
				}

				.progress-line {
					position: absolute;
					z-index: 2;
					height: 20rpx;
					width: 100%;

					.curline {
						position: absolute;
						top: 0;
						left: 0;
						width: 0;
						height: 20rpx;
						border-radius: 20rpx;
						background: #FBC32A;
						box-shadow: 0px 0rpx 10rpx 0px rgba(239, 181, 22, 0.48);
					}

					.circle {
						position: absolute;
						right: 0;
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						background: #FBC32A;
						top: 50%;
						transform: translate(50%, -50%);
						box-shadow: 0 0rpx 10rpx 0px rgba(239, 181, 22, 0.48);

						&::after {
							content: '';
							position: absolute;
							width: 55%;
							height: 55%;
							background-color: #fff;
							border-radius: 50%;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
						}
					}

					text {
						position: absolute;
						right: 0;
						top: -60rpx;
						font-size: 28rpx;
						transform: translateX(60%);
						color: #FBC32A;
					}

				}
			}

			.tips {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				color: rgb(134, 134, 134);
			}
		}


	}
</style>
