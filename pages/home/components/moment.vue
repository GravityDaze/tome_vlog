<template>
	<view class="moment">
		<view class="title-bar">
			<text class="title">VLOG精彩放送</text>
		</view>
		<!-- 瀑布流 -->
		<view>
			<waterfallsFlow ref="waterfallsFlow" :list="momentList" imageSrcKey="coverUrl" idKey="videoId" @image-load="imageLoad" @wapper-lick="watchVideo" >
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
								<image :src="item.headUrl" ></image>
								<text>{{item.shareCustomer}}</text>
							</view>

							<view class="like" @click.stop="like(item,index)">
								<image v-if="!item.laudMe" src="../../../static/like.png"></image>
								<image v-else src="../../../static/like2.jpg"></image>
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
		queryMoment,
		like
	} from '../../../api/home.js'
	export default {
		data() {
			return {
				momentList: [],
				pageNum: 1,
				pageSize: 10,
				finish:false //提示瀑布流所有数据是否加载完成
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
				this.momentList.push(...res.value)
				// 如果已经加载到最后一页数据
				if( res.value.length < pageSize ){
					this.finish = true
				}
				
			},
			// 图片加载完成
			imageLoad(){
				// 如果数据已经全部加载完成
				if(this.finish){
					// 提示父组件显示加载结束字样
					this.$emit("loadFinish")
				}
			},
			
			// 加载下一页数据
			loadNextPage(){
				this.pageNum ++
				this.getMomentList()
			},
			// 跳转到视频播放
			watchVideo(e){
				uni.navigateTo({
					url:`/pages/shareVideo/shareVideo?videoShareId=${e.videoShareId}`
				})
			},
			// 点赞
			async like(item,index){
				
				if(!uni.getStorageSync('access_token')){
					getApp().globalData.returnPath = '/pages/home/home'
					return uni.navigateTo({
						url:'/pages/login/login'
					}) 
				}
				
				if(item.laudMe){
					uni.showToast({
						title:'您已点赞',
						icon:'none'
					})
				}else{
					try{
						// 直接修改数据
						this.momentList[index].laudMe = 1
						this.momentList[index].laudTimes++
						await like({
							videoShareId:item.videoShareId
						})
					}catch(err){
						uni.showToast({
							title:'点赞失败',
							icon:'none'
						})
						console.log(err)
						this.momentList[index].laudMe = 0
						this.momentList[index].laudTimes--
					}
					
				}
			},
			
			// 更新点赞数据
			updateLikeData(){
				const index = this.momentList.findIndex( v=>v.videoShareId === getApp().globalData.updateLikeId )
				this.momentList[index].laudMe = 1
				this.momentList[index].laudTimes++ 
				// 清空全局
				getApp().globalData.updateLikeId = ''
			},
			
			// 刷新
			refresh(){
				// 初始化数据
				this.finish = false
				this.momentList = []
				// 刷新瀑布流高度
				this.$refs.waterfallsFlow.refresh()
				// 重新获取瀑布流数据
				this.pageNum = 1
				this.getMomentList()
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

		.box {
			position: relative;
			// margin: 15rpx;
			background: #FFFFFF;
			box-shadow: 0px 8rpx 27rpx 0px rgba(0, 0, 0, 0.06);
			border-radius: 18rpx;
			// overflow: hidden;	

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
