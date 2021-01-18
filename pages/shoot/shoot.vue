<template>
	<view class="shoot">
		<navbar showBack />
		<view class="cover">
			<view class="bkg" :style="{backgroundImage:`url(${sceneryInfo.coverUrl})`}"></view>
			<view class="mask" v-if="Object.keys(sceneryInfo).length"></view>
			<view class="text">
				<text class="name">{{sceneryInfo.name}}</text>
				<view class="desc">
					<text>{{sceneryInfo.describe}}</text>
				</view>
			</view>
		</view>	
		<view class="panel">
			<view class="guide">
				<text>在开拍前，可观看此视频进行操作指引哟~</text>
				
				<view class="guide-cover">
					<image class="cover" src="../../static/guide.jpg" mode=""></image>
					<image class="play" src="../../static/play_guide.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="btn">
				<text>开启视频之旅</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import navbar from '../../components/nav.vue'
	import { querySceneryInfo } from '../../api/shoot.js'
	export default{
		data(){
			return{
				sceneryInfo:{}
			}
		},
		onLoad(options){
			// 查询景区数据( 进入本页面的前置条件 )
			this.getSceneryInfo(options.id)
			
			
		},
		methods:{
			async getSceneryInfo(id = 17){
				const res = await querySceneryInfo({
					id
				})
				this.sceneryInfo = res.value
				console.log(this.sceneryInfo)
				
			},
		},
		components:{
			navbar
		}
	}
</script>

<style lang="scss" scoped>
	.shoot{
		
		.cover{
			position: relative;
			height:430rpx;
			transition: .3s;
			
			.bkg{
				height:100%;
				background-position: center;
				background-size: cover;
				
			}
			
			.mask{
				position:absolute;
				height:130rpx;
				width:100%;
				bottom:0;
				   background: linear-gradient(to bottom,rgba(0, 0, 0, 0), rgba(0, 0, 0, .8));
			}
			
			.text{
				position:absolute;
				bottom:45rpx;
				left:30rpx;
				z-index:100;
				
				text{
					font-family: PingFang SC;
					font-weight: 500;
					color: #FEFEFE;
				}
				
				.name{
					font-size: 36rpx;
				}
				
				.desc{
					margin-top:5rpx;
					font-size:24rpx;
				}
				
				
			}
		}
		
		.panel{
			position:relative;
			z-index:99;
			background:#fff;
			transform:translateY(-25rpx);
			border-radius: 27rpx 27rpx 0px 0px;
			padding:30rpx;
			
			.guide{
				font-size: 26rpx;
				font-weight: 500;
				color: #B2B2B2;
				
				.guide-cover{
					position:relative;
					
					.cover{
						height: 292rpx;
						width:100%;
						box-shadow: 0px 8rpx 27rpx 0px rgba(0, 0, 0, 0.06);
						border-radius: 27rpx;
						margin-top:15rpx;
					}
					
					.play{
						position:absolute;
						top:35rpx;
						right:35rpx;
						height:60rpx;
						width:60rpx;
					}
				}
				
			}
		}
		.bottom-bar{
			position:fixed;
			display:flex;
			align-items:center;
			justify-content: center;
			bottom:0;
			width:100%;
			height:137rpx;
			box-shadow:0 5rpx 19rpx rgba(0, 0, 0, 0.15); 
			
			.btn{
				display:flex;
				align-items:center;
				justify-content: center;
				width:calc(100% - 60rpx);
				height: 88rpx;
				background: #FBC32A;
				box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
				border-radius: 44rpx;
			}
		}
		
	}
</style>
