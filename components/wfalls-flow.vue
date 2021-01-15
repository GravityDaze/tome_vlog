<template>
	<view class="list-container">
		<view id="wf-list" class="list" v-for="(list,listIndex) of viewList" :key="listIndex">
			<view class="item" v-for="(item,index) of list.list" :key="index">

				<view class="pic">
					<image class="play" src="../../../static/play_small.png" mode=""></image>
					<image class="cover" @load="handleViewRender(listIndex,index)" @error="handleViewRender(listIndex,index)" :src="item.coverUrl"
					 mode="widthFix"></image>
				</view>
				<view class="content">
					<!-- 地点 -->
					<view class="location">
						<image src="../../../static/local.png" mode=""></image>
						<text>{{item.sceneryName}}</text>
					</view>
					<!-- 标题 -->
					<view class="title">
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
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array, //实际请求获取的列表数据
			}
		},
		data() {
			return {
				viewList: [{
					list: []
				}, {
					list: []
				}], //展示到视图的列表数据
				everyNum: 2
			}
		},
		methods: {
			init() {
				this.viewList = [{
					list: []
				}, {
					list: []
				}];
				// this.$nextTick(()=>{
				//                     this.$refs.wfalls.handleViewRender(0,0);
				//                 })
				setTimeout(() => {
					this.handleViewRender(0, 0)
				}, 0)
			},
			handleViewRender(x, y) {
				// console.log(x,y);
				// const num = (x+1)*(y+1);
				// console.log(num%(this.everyNum));
				// console.log(num);
				// if((num%(this.everyNum))!==0&&num!==1)return;
				// console.log(num,'----');
				const index = this.viewList.reduce((total, current) => total + current.list.length, 0)
				if (index > this.list.length - 1) {
					// 加载完成触发事件并返回加载过的图片数
					this.$emit('finishLoad', index)
					return
				};
				const query = uni.createSelectorQuery().in(this);
				let listFlag = 0;
				query.selectAll('#wf-list').boundingClientRect(data => {
					listFlag = data[0].bottom - data[1].bottom <= 0 ? 0 : 1;
					this.viewList[listFlag].list.push(this.list[index])
					// this.list.slice(index,index+this.everyNum).forEach((item,index)=>{
					//     const flag = listFlag===0?index&1:Number(!(index&1))
					//     this.viewList[flag].list.push(item)
					// })
				}).exec()
			},
		},
		mounted() {
			if (this.list.length) {
				this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0 24rpx;
		padding-top: 30rpx;

		.list {
			width: calc(50% - 8rpx);
			display: flex;
			flex-direction: column;

			.item {
				margin-bottom: 18rpx;
				box-shadow: 0px 8rpx 27rpx 0px rgba(0, 0, 0, 0.06);
				border-radius: 18rpx;
				overflow: hidden;


				.pic {
					position: relative;

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

				// }



			}

		}
	}
</style>
