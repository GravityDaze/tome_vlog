<template>
	<view class="menubar">
		<view class="menu-item" v-for="(item,index) in menuItem" :key="index" @click="navigate(item.path)">
			<image :src="require(`../../../static/${item.icon}.png`)" mode=""></image>
			<text>{{item.label}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuItem: [{
						label: '精彩瞬间',
						icon: 'moment'
					},
					{

						label: '导游机',
						icon: 'guide'
					},
					{

						label: '景区玩乐',
						icon: 'entertainment'
					},
					{

						label: '加盟合作',
						icon: 'join'
					},{

						label: '途咪视频',
						icon: 'tome'
					},
				]
			}
		},
		created() {

		},
		methods: {
			navigate(path){
				if(path){
					uni.navigateTo({
						url:path
					})
				}else{
					uni.showToast({
						title:'敬请期待',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menubar {
		
		position:relative;
		z-index:50;
		padding:20rpx 0;
		margin: -40rpx 30rpx 0;
		display: flex;
		justify-content: space-around;
		background: #FFFFFF;
		box-shadow: 0px 8rpx 8rpx 0px rgba(0, 0, 0, 0.06);
		border-radius: 18rpx;
		
		.menu-item{
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items:center;
			
			image{
				width:90rpx;
				height:90rpx;
				margin-bottom:6rpx;
			}
			
			text{
				
				font-size: 22rpx;
				font-weight: 500;
				color: #333332;
			}
		}
		
		
	}
</style>
