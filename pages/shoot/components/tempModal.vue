<template>
	<view class="wrapper">
		<view class="top">
			<view class="title">
				<text>模板主题选择</text>
			</view>
			<view class="tags">
				<view @click="changeCate(item,index)" :class="{'tag':true,'active':currentCate === index }" v-for="(item,index) in tags" :key="index">{{ item.title }}</view>
			</view>
		</view>
		<scroll-view class="list" scroll-y>
			<view class="scroll-warpper">
				<view :class="{'single':true,'active':current === index  }" v-for="(item,index) in list" :key="index">
					<view class="inner">
						<image @click="select(item,index)" :src="item.url"></image>
						<view class="text">
							<text>樱花亭子</text>
							<view class="preview" @click="preview(item.cover)">
								<image src="../../../static/preview.png"></image>
								<text>预览</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="btn" @click="apply">
			<text>确定</text>
		</view>
		<image @click="popup.close()" class="close" src="../../../static/closem.png" ></image>
		<videoPlayer @close="show = false" :show="show" :src="previewSrc" />
	</view>
</template>

<script>
	import videoPlayer from '../../../components/video-player.vue'
	export default {
		data() {
			return {
				tags: [
					{
						title: '全部'
					},
					{
						title: '浪漫'
					},
					{
						title: '怀旧'
					}
				],
				list: [],
				current: 0,
				currentCate:0,
				previewSrc:'',
				show:false
			}
		},
		inject:['popup'],
		created() {
			this.getList()
		},
		methods: {
			getList() {
				setTimeout(() => {
					this.list = [{
						title: '哈哈',
						url: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a6efce1b9d16fdfabf36882ab08f8c5495ee7b9f.jpg',
						cover: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4',

					}, {
						title: '哈哈',
						url: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a6efce1b9d16fdfabf36882ab08f8c5495ee7b9f.jpg',
						cover: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4',

					}, {
						title: '哈哈',
						url: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a6efce1b9d16fdfabf36882ab08f8c5495ee7b9f.jpg',
						cover: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4',

					}, {
						title: '哈哈',
						url: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a6efce1b9d16fdfabf36882ab08f8c5495ee7b9f.jpg',
						cover: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4',

					}, {
						title: '哈哈',
						url: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a6efce1b9d16fdfabf36882ab08f8c5495ee7b9f.jpg',
						cover: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4',

					}, {
						title: '哈哈',
						url: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a6efce1b9d16fdfabf36882ab08f8c5495ee7b9f.jpg',
						cover: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4',

					}, {
						title: '哈哈',
						url: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a6efce1b9d16fdfabf36882ab08f8c5495ee7b9f.jpg',
						cover: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4',

					}, {
						title: '哈哈',
						url: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a6efce1b9d16fdfabf36882ab08f8c5495ee7b9f.jpg',
						cover: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4',

					}, ]
				}, 200)
			},
			
			select(item,index){
				this.current = index
			},
			
			preview(url){
				this.show = true
				this.previewSrc = url
			},
			
			changeCate(item,index){
				this.currentCate = index
			},
			
			apply(){
				// 关闭弹框
				this.popup.close()
				// 开启视频之旅
				this.$emit('submit')
			}
		},
		components:{
			videoPlayer
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		display:flex;
		flex-flow:column;
		position: relative;
		width: 90vw;
		height: 70vh;
		background: #fff;
		box-sizing: border-box;
		border-radius: 30rpx;
		
		.close{
			position:absolute;
			width:30rpx;
			height:30rpx;
			padding:20rpx;
			top:1%;
			right:1%;
		}

		.top {
			height: 230rpx;
			display: flex;
			padding:0rpx 40rpx 0;
			flex-flow: column;
			justify-content: space-evenly;

			.title {
				font-size: 34rpx;
				color: #373737;
				text-align: center;
			}

			.tags {
				display: flex;
				font-size: 28rpx;
				
				.tag {
					margin-right: 15rpx;
					padding: 3rpx 22rpx;
					border: 2rpx solid #999;
					border-radius: 30rpx;
					color: #999;
				}
				
				.active{
					border: 2rpx solid #FBC32A;
					color: #FBC32A
				}
			}
		}


		.list {
			flex:1;
			height:1px;
			
			.scroll-warpper {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				font-size: 23rpx;
				color: #333332;
				margin:0rpx 40rpx 0;
			}

			.single {
				display:flex;
				justify-content: center;
				margin-top:30rpx;
				
				.inner{
					display:flex;
					flex-flow: column;
					image {
						width: 272rpx;
						height: 181rpx;
						border-radius: 18rpx;
					}
					
					.text{
						margin-top:18rpx;
						display:flex;
						justify-content: space-between;
						align-items: center;
						
						&>text{
							font-size: 26rpx;
							font-weight: bold;
							color: #1F1F1F;
						}
						
						.preview{
							display:flex;
							align-items: center;
							font-size: 24rpx;
							color: #989898;
							
							image{
								width: 30rpx;
								height: 22rpx;
								margin-right:8rpx;
							}
						}
					}
				}
					
					
				// }
			}

			.active {
				.inner{
					&>image {
						box-shadow: 0px 0rpx 17rpx 5px rgba(251, 195, 42, 1) !important;
					}
				}
			}
		}

		.btn {
			// position: absolute;
			margin:40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			// width: calc(100% - 80rpx);
			// bottom: 40rpx;
			height: 80rpx;
			background: #6FD531;
			box-shadow: 0px 8rpx 16rpx 0px rgba(57, 109, 25, 0.48);
			border-radius: 33rpx;
		}

	}
</style>
