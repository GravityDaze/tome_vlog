<template>
	<!--pages/dingzhiUpload/dingzhiUpload.wxml-->
	<view class="dingzhi_upload_box">
		<!-- <close return='true' bind:return="returnFn"></close> -->
		<view class="tips-box">
			<!-- 背景图片 -->
			<image src="/imgs/yellow1.png"></image>
			<!-- 文字信息 -->
			<view class="text-box">
				<view class="top-area">
	        <view class="location">
					<image src="/imgs/location.png" class="icon_location"></image>
					<text>{{sceneryName}}</text>
	        </view>
	        <text>视频之旅已开启</text>
				</view>
				<!-- 提示文字 -->
				<view class="tips">
					<text>1.上传对应景区的自拍视频，可与近期行程合成个性游记</text>
					<text>2.上传视频文件请控制在{{uploadVideoMaxSize}}M以内，建议不超过{{uploadVideoDuration}}秒</text>
				</view>
			</view>
		</view>
		<scroll-view class="row_box2_1" scroll-y >
			<view class="row_box2_title">
				<text>上传自拍视频</text>
			</view>
			<view class="all_pic_box">
				<block wx:for="{{selfVideoArr}}" wx:index="index" wx:for-item="item" wx:key="index">
					<view class="have_upload_box">
						<view class="single_pic_box">
							<video id="{{index}}" class="myVideo" src="{{item.fileUrl}}" objectFit="fill" autoplay="{{autoParam}}"></video>
						</view>
						<view class="re_choose" data-index="{{index}}" data-filename="{{item.fileName}}" data-id="{{item.id}}" bindtap="afreshChooseVideoFn">
							<text>重新选择</text>
						</view>
						<image src="../../imgs/cancel.png" class="icon_cancel" data-index="{{index}}" data-filename="{{item.fileName}}" data-id="{{item.id}}" bindtap="delVideoFn"></image>
					</view>
				</block>
				<view class="single_pic_box last_pic_box" bindtap="chooseVideoFn">
					<image class="icon_add" src="../../imgs/add.png"></image>
				</view>
			</view>
		</scroll-view>
		<view class="btn {{isSubmit ? 'row_box3' : 'row_box4'}}" bindtap="submitFn">
			<text wx:if="{{!isUpload}}">提交</text>
			<text wx:if="{{isUpload}}">自拍视频已提交</text>
		</view>
		<view class="row_box4 success_dialog_box" wx:if="{{isShowSuccess}}">
			<view class="dialog_content_box">
				<image src="../../imgs/success.png" class="icon_success"></image>
				<text class="text1">自拍视频提交成功</text>
				<view class="btn_text" bindtap="closeDialogFn">
					<text>我知道了</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	
	/* 顶部盒子 */
	.tips-box{
	  position:fixed;
	  height:435rpx;
	  top:0;
	  width:100%;
	  color:#fff;
	}
	
	.tips-box>image{
	  width:100%;
	  height:100%;
	}
	
	.text-box{
	  position:absolute;
	  top:0;
	  width:100%;
	  height:100%;
	}
	
	.top-area{
	  height:100rpx;
	  display: flex;
	  flex-flow: column;
	  justify-content: space-between;
	  align-items: center;
	  margin:50rpx 0;
	}
	
	.location{
	  display: flex;
	  justify-content: center;
	  font-size:40rpx;
	  align-items:center;
	  font-weight: bold;
	  position: relative;
	}
	
	.location + text{
	  display:flex;
	  justify-content: center;
	  font-size:34rpx;
	}
	
	.tips{
	  display:flex;
	  flex-flow:column;
	  padding-left:63rpx;
	  height:74rpx;
	  justify-content:space-between;
	  font-size:26rpx;
	}
	
	.icon_location {
	  width: 37rpx;
	  height: 42rpx;
	  position: absolute;
	  left:-45rpx;
	}
	
	/* 提交按钮 */
	.btn{
	  position:fixed;
	  bottom:21rpx;
	  left:0;
	  right:0;
	  margin:auto;
	  width:638rpx;
	  border-radius: 44rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 88rpx;
	  z-index:500;
	}
	
	
	
	.row_box3{
	  border:1px solid rgba(250,200,60,1);
	  background-color: rgba(250,200,60,1);
	}
	
	.row_box4{
	  border:1px solid rgb(165, 163, 159);
	  background-color: rgba(165, 163, 159);
	}
	
	.row_box2_1 {
	  position: absolute;
	  border-radius: 30rpx;
	  background-color: white;
	  width: 640rpx;
	  top:300rpx;
	  bottom:130rpx;
	  left:0;
	  right:0;
	  margin:auto;
	  padding: 50rpx 30rpx;
	  box-shadow: 10rpx 0 50rpx rgba(0,0,0,0.2)
	}
	.row_box2_title{
	  font-size: 36rpx;
	  font-weight: 700;
	}
	.all_pic_box{
	  /* border:1px solid green; */
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  flex-wrap: wrap;
	  width: 631rpx;
	  
	}
	.all_pic_box>view{
	  /* border:1px solid blue; */
	   margin: 40rpx 0 20rpx;
	}
	.have_upload_box{
	  /* border:1px solid red; */
	  position: relative
	}
	.single_pic_box{
	  /* border:1px solid burlywood; */
	  width:300rpx;
	  height: 168rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background-size: 100% 100%;
	}
	.re_choose{
	  border:1px solid rgba(255, 89, 62, 1);
	  background-color: rgba(255, 89, 62, 1);
	  border-radius: 25rpx;
	  width:196rpx;
	  height: 50rpx;
	  margin: 20rpx auto 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  color: white;
	  font-size: 26rpx;
	}
	.icon_cancel{
	  width:30rpx;
	  height: 30rpx;
	  /* border:1px solid red; */
	  padding: 20rpx 20rpx 0 0;
	  position: absolute;
	  top:-35rpx;
	  right: -30rpx;
	}
	.last_pic_box{
	  background-color: rgba(0,0,0,0.1)
	}
	.image_bg,.myVideo{
	  width:100%;
	  height: 100%;
	  /* border:1px solid blue; */
	}
	.icon_add{
	  width:43rpx;
	  height: 43rpx;
	  /* border:1px solid red; */
	  background-size: 100% 100%;
	}
	
	
	.success_dialog_box{
	  border:1px solid red;
	  background-color: rgba(0,0,0,0.4);
	  width:100vw;
	  height: 100vh;
	  position: absolute;
	  top:0;
	  left: 0;
	  display: flex;
	  justify-content: center;
	  align-items: center
	}
	.dialog_content_box{
	  /* border:1px solid red; */
	  border-radius: 30rpx;
	  background-color: white;
	  width:638rpx;
	  height: 394rpx;
	  display: flex;
	  flex-direction: column;
	  justify-content: flex-start;
	  align-items: center
	}
	.icon_success{
	  width:140rpx;
	  height: 140rpx;
	  /* border:1px solid red; */
	  margin-top: -70rpx;
	}
	.text1{
	  margin-top: 50rpx;
	  font-size: 34rpx;
	}
	.btn_text{
	  margin-top: 95rpx;
	  font-size: 30rpx;
	  width:480rpx;
	  height: 88rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  /* border:1px solid rgba(250,200,60,1); */
	  border-radius: 44rpx;
	  background-color: rgba(250,200,60,1);
	  box-shadow: 10rpx 0 50rpx rgba(0,0,0,0.1);
	}

</style>
