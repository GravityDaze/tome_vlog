<template>
	<view class="record-position">
		<swiper v-if="showNativeComponents" class="swiper" next-margin="109rpx" @change="change" :current="current">
			<swiper-item v-for="(item,index) in positionData" :key="index">
				<view class="swiper-item">
					<view class="cover" :style="{backgroundImage: `url(${item.picUrl})`}"></view>
					<view class="desc">
						<view class="text">
							<text>{{item.name}}</text>
							<text>{{item.description}}</text>
						</view>
						<view class="line"></view>
						<view class="distance">
							<!-- <text>距离0m</text> -->
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<map v-if="showNativeComponents" id="map" :latitude="lat" :longitude="lon" :markers="markers" @markertap="markertap"></map>
	</view>
</template>

<script>
	import gcoord from '../../libs/gcoord/index.js';
	import {
		queryPointList
	} from "../../api/shoot.js"
	export default {
		data() {
			return {
				lon: "",
				lat: "",
				current: 0,
				markers: [],
				showNativeComponents: false,
				positionData: [],
				includePoints: []
			}
		},
		onLoad(options) {
			// 延时调用原生组件
			setTimeout(_ => this.showNativeComponents = true, 300)
			// 初始化swiper索引
			this.current = parseInt(options.index)
			// 初始化
			this.initPoints(options.id)

			// 设置marker
			this.setMarkers()
		},
		methods: {
			change(e) {
				if (e.detail.source === "touch") {
					this.current = e.detail.current
				}
				this.setMarkers()
			},

			bd2Gcj02(lonValue, latValue) {
				return gcoord.transform([lonValue, latValue], gcoord.BD09, gcoord.GCJ02)
			},

			markertap(e) {
				this.current = e.detail.markerId
				this.setMarkers()
			},

			async initPoints(id) {
				const res = await queryPointList({
					sceneryId: id,
					status: 1
				})
				if (res.value.list.length) {
					this.positionData = res.value.list.map(v => ({
						...v,
						lat: gcoord.transform([v.lat, v.lon], gcoord.BD09, gcoord.GCJ02)[0],
						lon: gcoord.transform([v.lat, v.lon], gcoord.BD09, gcoord.GCJ02)[1]
					}))
					console.log(this.positionData)
					this.initLocation()
					this.setMarkers()
					const ctx = uni.createMapContext("map", this)
					ctx.includePoints({
						points: this.positionData.map(v => ({
							latitude: v.lat,
							longitude: v.lon
						})),
						padding: [50, 50, 50, 50]
					})
				}
			},
			initLocation() {
				const {
					lon,
					lat
				} = this.positionData[0]
				this.lon = lon
				this.lat = lat
			},
			setMarkers() {
				this.markers = this.positionData.map((v, i) => {
					return {
						id: i,
						longitude: v.lon,
						latitude: v.lat,
						iconPath: this.current === i ? "/static/position.png" : "/static/position2.png",
						width: parseInt(47 / 1.5),
						height: parseInt(70 / 1.5),
						callout: {
							borderRadius: 14 / 1.5,
							bgColor: "#3C3C3C9E",
							content: v.name,
							color: "#FFFFFF",
							padding: 12 / 1.5,
							display: "ALWAYS",
							fontSize: 22 / 1.5
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record-position {
		.swiper {
			position: fixed;
			bottom: 150rpx;
			left: 25rpx;
			z-index: 999;
			width: 100%;
			height: 230rpx;

			.swiper-item {
				display: flex;
				width: 586rpx;
				height: 225rpx;
				background: #FFFFFF;
				box-shadow: 0px 5rpx 8rpx 0px rgba(0, 0, 0, 0.21);
				border-radius: 18rpx;

				.cover {
					width: 240rpx;
					height: 100%;
					background-size: cover;
					background-position: center center;
					border-radius: 18rpx 0 0 18rpx;


				}

				.desc {
					flex: 1;
					display: flex;
					flex-flow: column;
					padding: 20rpx 0 0 15rpx;
					box-sizing: border-box;

					.text {
						flex: 1;
						display: flex;
						flex-flow: column;

						&>text:first-child {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 800;
							color: #000000;
							padding-bottom: 10rpx;

						}

						&>text:nth-child(2) {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
						}
					}

					.line {
						height: 1rpx;
						background: #DCDCDC;
						width: 190rpx;
					}

					.distance {
						height: 47rpx;
						display: flex;
						align-items: center;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #a9a9a9;
					}
				}


			}

		}

		#map {
			height: 100vh;
			width: 750rpx;
		}

	}
</style>
