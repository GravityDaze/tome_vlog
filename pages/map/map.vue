<template>
	<view class="record-position">
		<swiper class="swiper" next-margin="109rpx" @change="change">
			<swiper-item v-for="(item,index) in positionData"  :key="index">
				<view class="swiper-item">
					<view class="cover" :style="{backgroundImage: `url(${item.img})`}"></view>
					<view class="desc">
						<view class="text">
							<text>{{item.name}}</text>
							<text>{{item.desc}}</text>
						</view>
						<view class="line"></view>
						<view class="distance">
							<text>距离0m</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<map id="map" :latitude="lat" :longitude="lon" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lon:"",
				lat:"",
				current:0,
				markers:[],
				positionData: [{
						img: "https://img1.qunarzz.com/travel/d5/1801/d0/6a8fbbdf116efcb5.jpg_r_720x480x95_bef77a31.jpg",
						name: "敬请期待",
						desc: "打卡点开放，敬请期待",
						lon:104.069321,
						lat:30.614256
					},
					{
						img: "https://youimg1.c-ctrip.com/target/100ghk133vsycxbk0D1D9.jpg",
						name: "敬请期待",
						desc: "打卡点未开放，敬请期待",
						lon:104.070277,
						lat:30.614491
					},
					{
						img: "https://youimg1.c-ctrip.com/target//100h16000000yzfy6C1F2.jpg",
						name: "敬请期待",
						desc: "打卡点未开放，敬请期待",
						lon:104.069076,
						lat:30.613932
					}
				]
			}
		},
		onLoad(options) {
			// 初始化设定中心经纬度为第一个
			const {  lon , lat } =  this.positionData[0]
			this.updateLocation(lon,lat)
			// 初始化marker
			this.initMarkers()
		},
		methods: {
			change(e){
				this.current = e.detail.current
				const {  lon , lat } =  this.positionData[e.detail.current]
				// 修改markers的callout
				for(let i = 0;i<this.markers.length;i++){
					this.markers[i].label.color = "#000"
				}
				this.markers[e.detail.current].label.color = '#FF0000'
				this.updateLocation(lon,lat)
			},
			updateLocation(lon,lat){
				this.lon = lon
				this.lat = lat
			},
			initMarkers(){
				this.markers = this.positionData.map( (v,i)=>{
					return {
						id:i++,
						longitude:v.lon,
						latitude:v.lat,
						iconPath:"/static/position.png",
						label:{
							content:v.name,
							color:--i === 0?'#FF0000':'#000',
							textAlign:'center'
						}
					}
				} )
				
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
					background-size:cover;
					background-position:center center;
					border-radius: 18rpx 0 0 18rpx;

					
				}

				.desc {
					flex: 1;
					display: flex;
					flex-flow: column;
					padding:20rpx 0 0 15rpx;
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
							padding-bottom:10rpx;

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
