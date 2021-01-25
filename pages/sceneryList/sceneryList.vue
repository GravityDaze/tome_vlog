<!-- 景区列表 -->
<template>
	<view class="scenery-list">
		<view class="search">
			<input type='text' placeholder='请输入您要搜索的景区' @input="input" />
			<icon type='search' class='icons' bindtap="confirmFn"></icon>
		</view>
		<view class="title">
			<text>周边景区</text>
		</view>
		<scroll-view class="list" scroll-y enable-flex enhanced :show-scrollbar="false">
			<template v-for="(item,index) in activeList">
				<view class="item" :key="index" @click="navigate(item)">
					<view class="top">
						<view>{{item.name}}</view>
					</view>
					<view class="bottom">
						<image src="../../static/location@2x.png"></image>
						<text>{{item.distance < 1 ? `${parseInt(item.distance * 1000)}M` : `${item.distance.toFixed(2)}KM`}}</text>
					</view>
				</view>
			</template>
		</scroll-view>
	</view>
</template>


<script>
	import {
		queryNearby
	} from '../../api/sceneryList.js'
	export default {
		data() {
			return {
				assert:false, // 选择景区时否作为定位景区
				originList: [], //原始数据 用于清空key后恢复数据
				activeList: [], //动态数据 用于检索
				id: '' //当前选择的景区ID
			}
		},
		onLoad(options) {
			// 如果type是assert 则选择的景区会作为定位景区
			if(options.type === 'assert'){   
				uni.showModal({
					content:'未定位到景区，请手动选择您所在的景区',
					showCancel:false
				})
				this.assert = true
			}
			this.getSceneryList()
		},
		methods: {
			async getSceneryList() {
				const {
					lon,
					lat
				} = getApp().globalData
				const res = await queryNearby({
					lon,
					lat
				})
				this.originList = res.value
				this.activeList = res.value
			},
			// 检索关键词
			input(e) {
				const key = e.detail.value
				if (key === "") {
					this.activeList = this.originList
				} else {
					this.activeList = this.originList.filter(v => v.name.includes(key))
				}
			},
			// 带参数跳转
			navigate(item){
				if(this.assert){
					getApp().globalData.sceneryId = item.id
					// 保存用户手动定位的景区经纬度
					getApp().globalData.manualLocation.lon = item.lon
					getApp().globalData.manualLocation.lat = item.lat
				}
				uni.redirectTo({
					url: `/pages/shoot/shoot?id=${item.id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.scenery-list {
		height: 100vh;
		display: flex;
		flex-direction: column;

		/* 搜索栏 */
		.search {
			background-color: #fff;
			box-shadow: 5rpx 0 50rpx rgb(200, 200, 200);
			margin-top: 20rpx;
			border-radius: 30px;
			box-sizing: border-box;
			padding: 0 30rpx;
			height: 78rpx;
			font-size: 24rpx;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			margin: 20rpx 26rpx 0;
			justify-content: flex-end;

			input {
				flex-grow: 1;
				height: 100%;
				padding-left: 20rpx;
				color: rgba(153, 152, 150, 1);
				background-color: #fff;
			}

			.icons {
				display: flex;
				align-items: center;
			}

		}

		.title {
			display: flex;
			align-items: center;
			height: 173rpx;
			font-size: 34rpx;
			font-weight: 700;
			box-sizing: border-box;
			padding: 0 56rpx;
		}

		/* 景区选择区域 */
		.list {
			position: absolute;
			top: 256rpx;
			bottom: 0;
			padding: 0 56rpx;
			box-sizing: border-box;

			.item {
				display: flex;
				height: 130rpx;
				flex-flow: column;
				justify-content: center;
				box-sizing: border-box;
				border-bottom: 1px solid rgba(214, 215, 217, 1);

				.top {
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 50, 1)
				}

				.bottom {
					font-size: 26rpx;
					font-family: San Francisco Display;
					font-weight: 400;
					color: rgba(153, 152, 150, 1);

					image {
						width: 22rpx;
						height: 22rpx;
						margin-right: 9rpx;
					}
				}

			}

			// &:last-child{
			// 	.item{
			// 		margin-bottom:130rpx;
			// 	}
			// }
		}


		// .btn {
		// 	width: 700rpx;
		// 	height: 88rpx;
		// 	border-radius: 44rpx;
		// 	font-size: 30rpx;
		// 	background-color: rgba(255, 200, 60, 1);
		// 	display: flex;
		// 	justify-content: center;
		// 	align-items: center;
		// 	box-shadow: 10rpx 0 100rpx rgb(220, 220, 220);
		// 	position: fixed;
		// 	left: 0;
		// 	right: 0;
		// 	margin: 0 auto;
		// 	bottom: 20rpx;
		// 	z-index: 999
		// }

	}

	/* 修改默认单选框样式 */
	// radio .wx-radio-input {
	// 	height: 34rpx;
	// 	width: 34rpx;
	// 	// border-radius: 50%;
	// 	// border: 2rpx solid rgba(191, 191, 191, 1);
	// }

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
