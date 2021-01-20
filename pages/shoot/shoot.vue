<template>
	<view class="shoot">
		<navbar showBack :immersive="immersive">
			<view slot="center">
				<text>{{sceneryInfo.name}}</text>
			</view>
		</navbar>
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
			<!-- 引导视频 -->
			<view class="title1">
				<text>打卡攻略</text>
			</view>
			<view class="guide">
				<text>在开拍前，可观看此视频进行操作指引哟~</text>
				<view class="guide-cover">
					<image class="cover" src="https://tomevideo.zhihuiquanyu.com/20210120142357.jpg"></image>
					<image class="play" src="../../static/play_guide.png" mode=""></image>
				</view>
			</view>
			
			<!-- 文字2 -->
			<view class="title2">
				<text>自动录像点</text>
				<view class="goMap">
					<text>查看地图</text>
					<image src="../../static/arrow.png" mode=""></image>
				</view>
			</view>
			
			<!-- 自动录像点 -->
			<view class="poi">
				<view class="box" v-for="(item,index) in testData" :key="index">
					<image :src="item.img"></image>
					<view class="desc">
						<view class="top">
							<text>{{item.name}}</text>
							<text>0m</text>
						</view>
						<view class="bottom">
							<text>{{item.desc}}</text>
						</view>
					</view>
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
	import {
		querySceneryInfo
	} from '../../api/shoot.js'
	export default {
		data() {
			return {
				sceneryInfo: {},
				latitude: "",
				longitude: "",
				immersive:true,
				testData:[
					{
						img:"https://img1.qunarzz.com/travel/d5/1801/d0/6a8fbbdf116efcb5.jpg_r_720x480x95_bef77a31.jpg",
						name:"敬请期待",
						desc:"打卡点未开放，敬请期待"
						
					},
					{
						img:"https://youimg1.c-ctrip.com/target/100ghk133vsycxbk0D1D9.jpg",
						name:"敬请期待",
						desc:"打卡点未开放，敬请期待"
					},
					{
						img:"https://youimg1.c-ctrip.com/target//100h16000000yzfy6C1F2.jpg",
						name:"敬请期待",
						desc:"打卡点未开放，敬请期待"
					}
				]
			}
		},
		onLoad(options) {
			// 获取到景区id 链接参数中如果没有 就去globalData中寻找
			const sceneryId = options.id?options.id:getApp().globalData.sceneryId
			// 如果在globalData中都没有
			console.log(getApp().globalData.sceneryId)
			if( sceneryId === ""){
				return uni.redirectTo({
					url:"/pages/sceneryList/sceneryList"
				})
			}
			// 查询景区数据( 景区id为进入本页面的前置条件 )
			this.getSceneryInfo(sceneryId)


		},
		methods: {
			async getSceneryInfo(id) {
				const res = await querySceneryInfo({
					id
				})
				this.sceneryInfo = res.value
			},
		},
		onPageScroll(e) {
			if (e.scrollTop > 50) {
				// 防止频繁修改
				if (!this.immersive) return
				this.immersive = false
		
			} else {
				if (this.immersive) return
				this.immersive = true
			}
		},
		components: {
			navbar
		}
	}
</script>

<style lang="scss" scoped>
	.shoot {

		.cover {
			position: relative;
			height: 430rpx;
			transition: .3s;

			.bkg {
				height: 100%;
				background-color: #f5f5f5;
				background-position: center;
				background-size: cover;

			}

			.mask {
				position: absolute;
				height: 145rpx;
				width: 100%;
				bottom: 0;
				background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8));
			}

			.text {
				position: absolute;
				bottom: 45rpx;
				left: 30rpx;
				z-index: 10;

				text {
					font-family: PingFang SC;
					font-weight: 500;
					color: #FEFEFE;
				}

				.name {
					font-size: 36rpx;
				}

				.desc {
					margin-top: 5rpx;
					font-size: 24rpx;
				}


			}
		}

		.panel {
			position: relative;
			z-index: 99;
			background: #fff;
			transform: translateY(-35rpx);
			border-radius: 27rpx 27rpx 0px 0px;
			padding: 30rpx 30rpx 150rpx;

			.guide {
				font-size: 26rpx;
				font-weight: 500;
				color: #B2B2B2;

				.guide-cover {
					position: relative;
					margin-top: 15rpx;

					.cover {
						height: 292rpx;
						width: 100%;
						box-shadow: 0px 8rpx 27rpx 0px rgba(0, 0, 0, 0.06);
						border-radius: 27rpx;
						
					}

					.play {
						position: absolute;
						top: 35rpx;
						right: 35rpx;
						height: 60rpx;
						width: 60rpx;
					}
				}

			}
			.title1{
				padding:10rpx 0rpx 5rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333332;
			}
			
			.title2{
				display: flex;
				justify-content: space-between;
				padding:30rpx 0;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333332;
				
				.goMap{
					display: flex;
					align-items: center;
					font-size: 22rpx;
					font-weight: 400;
					color: #B5B3B2;
					
					image {
						padding-left: 8rpx;
						width: 13rpx;
						height: 24rpx;
					}
				}
			}
			
			.poi{
				display:grid;
				grid-template-columns: repeat(2,1fr);
				gap: 28rpx;
				
				.box{
					image{
						width: 337rpx;
						height: 225rpx;
						border-radius: 18rpx;
					}
					
					.desc{
						.top{
							display:flex;
							justify-content: space-between;
							
							text:first-child{
								font-size: 28rpx;
								font-weight: bold;
								color: #333332;
							}
							
							text:last-child{
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #979797;
							}
						}
						
						.bottom{
							font-size: 24rpx;
							font-weight: 400;
							color: #808080;
							margin-top:8rpx;
						}
					}
				}
				
			}

		}

		.bottom-bar {
			position: fixed;
			z-index:99;
			display: flex;
			align-items: center;
			justify-content: center;
			bottom: 0;
			width: 100%;
			height: 137rpx;
			box-shadow: 0 5rpx 19rpx rgba(0, 0, 0, 0.15);
			background: #fff;

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: calc(100% - 60rpx);
				height: 88rpx;
				background: #FBC32A;
				box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
				border-radius: 44rpx;
			}
		}

	}
</style>
