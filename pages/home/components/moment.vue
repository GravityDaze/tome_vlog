<template>
	<view class="moment">
		<view class="title-bar">
			<text class="title">VLOG精彩放送</text>
		</view>
		<!-- 瀑布流 -->
		<view style="padding:0 30rpx">
			<waterfallsFlow :list="momentList" imageSrcKey="coverUrl" idKey="videoId">
				<view class="box" v-for="(item, index) of momentList" :key="index" slot="slot{{index}}">
					<view class="content">
						
						
						<!-- 地点 -->
						<view class="location">
							<image src="../../../static/local.png" mode=""></image>
							<text>{{item.sceneryName}}</text>
						</view>
						<!-- 标题 -->
						<view class="title">
							<view class="recommend" v-if="item.recommend">
								<text>推荐</text>
							</view>
							<text>{{item.describe}}</text>
						</view>
						<!-- 用户 & 点赞 -->
						<view class="bottom">
							<view class="user">
								<image :src="item.headUrl" mode=""></image>
								<text>{{item.shareCustomer}}</text>
							</view>

							<view class="like">
								<image src="../../../static/like.png" mode=""></image>
								<text>{{item.laudTimes}}</text>
							</view>
						</view>
					</view>

				</view>
			</waterfallsFlow>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from '../../../components/maramlee-waterfalls-flow.vue'
	import {
		queryMoment
	} from '../../../api/home.js'
	export default {
		data() {
			return {
				momentList: [],
				pageNum: 1,
				pageSize: 10
			}
		},
		created() {
			this.getMomentList()
		},
		methods: {
			async getMomentList() {
				const {
					pageNum,
					pageSize
				} = this
				const data = {
					pageNum,
					pageSize
				}
				const res = await queryMoment(data)
				console.log(res.value)
				this.momentList = res.value
				// this.$refs.wfalls.init()
			},
			getLoadNum() {
				console.log('起飞')
			}
		},
		components: {
			waterfallsFlow
		}
	}
</script>

<style lang="scss" scoped>
	.moment {	
		.title-bar {
			padding: 25rpx 30rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333332;
			}

		}

		.list {
			padding: 0 30rpx;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;
		}

		.box {
			position: relative;
			// margin: 15rpx;
			background: #FFFFFF;
			box-shadow: 0px 8rpx 27rpx 0px rgba(0, 0, 0, 0.06);
			border-radius: 18rpx;
			overflow: hidden;
			
			
			  
			
			

			.pic {
				position: relative;

				.cover {
					width: 337rpx;
					height: auto;
				}

				.play {
					position: absolute;
					right: 23rpx;
					top: 20rpx;
					width: 33rpx;
					height: 33rpx;
					z-index: 99;
				}
			}


			.content {
				padding: 15rpx 22rpx 15rpx;
				

				.location {
					display: flex;
					align-items: center;

					text {
						font-size: 22rpx;
						font-weight: 500;
						color: rgb(141, 141, 141);
					}

					image {
						margin-right: 8rpx;
						width: 29rpx;
						height: 29rpx;
					}
				}

				.title {
					padding: 20rpx 0 15rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					
					// 推荐标志
					  .recommend{
						  display: inline-block;
						  font-size:22rpx;
						  background:rgb(255,203,62);
						  margin-right:10rpx;
						  color:#fff;
						  // z-index:99;
						  padding:3rpx 10rpx;
						  border-radius: 8rpx;
						  vertical-align: 1rpx;
					  }
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.user {
						display: flex;
						align-items: center;

						image {
							width: 38rpx;
							height: 38rpx;
							box-shadow: 0px 0px 12rpx 0px rgba(62, 62, 62, 0.11);
							border-radius: 50%;
							margin-right: 13rpx;
						}

						text {
							font-size: 24rpx;
							// font-weight: bold;
							color: #8D8D8D;
						}
					}

					.like {
						display: flex;
						align-items: center;
						font-size: 23rpx;
						font-weight: bold;
						color: #999896;

						image {
							width: 30rpx;
							height: 28rpx;
							margin-right: 7rpx;
						}

					}
				}
			}
		}
	}
</style>
