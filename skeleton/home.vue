<!--
此文件为开发者工具生成，生成时间: 2021/9/27 上午10:57:15
使用方法：
在 C:\Users\11632\Desktop\project\tome_vlog\unpackage\dist\dev\mp-weixin\pages\home\home.wxml 引入模板

```
<import src="home.skeleton.wxml"/>
<template is="skeleton" wx-if="{{loading}}" />
```

在 C:\Users\11632\Desktop\project\tome_vlog\unpackage\dist\dev\mp-weixin\pages\home\home.wxss 中引入样式
```
@import "./home.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view class="sk-container">
    <view class="home data-v-92bb8f34">
      <view class="data-v-92bb8f34">
 
        <view class="banner data-v-92bb8f34">
          <swiper autoplay="false" circular="true" class="swiper data-v-92bb8f34" interval="10000" current="0">
            <swiper-item class="data-v-92bb8f34" data-event-opts="tap,navigate,$0,bannerList,,0" style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
              <image class="play-icon data-v-92bb8f34 sk-image"></image>
              <view class="swiper-item data-v-92bb8f34">
                <image class="data-v-92bb8f34 sk-image"></image>
              </view>
            </swiper-item>
          </swiper>
        </view>
 
          <view class="hot-scenery nearby--hot-scenery data-v-05917e21 nearby--data-v-05917e21">
            <view class="title-bar nearby--title-bar data-v-05917e21 nearby--data-v-05917e21">
              <text class="title nearby--title data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-441 sk-text">周边景区</text>
            </view>
            <view class="scenery-list nearby--scenery-list data-v-05917e21 nearby--data-v-05917e21" >
              <scroll-view class="list nearby--list data-v-05917e21 nearby--data-v-05917e21" enable-flex="true">
                <view class="card-wrapper nearby--card-wrapper data-v-05917e21 nearby--data-v-05917e21">
                  <navigator class="scenery-card nearby--scenery-card data-v-05917e21 nearby--data-v-05917e21 sk-image" style="background-image:url(https://tomevideo.zhihuiquanyu.com/1610955678057.jpg);border:none;">
                    <view class="mask nearby--mask data-v-05917e21 nearby--data-v-05917e21"></view>
                    <view class="hot nearby--hot data-v-05917e21 nearby--data-v-05917e21 sk-image">
                      <text class="data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-379 sk-text">热门</text>
                    </view>
                    <view class="text nearby--text data-v-05917e21 nearby--data-v-05917e21">
                      <view class="name nearby--name data-v-05917e21 nearby--data-v-05917e21">
                        <text class="data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-346 sk-text">宽窄巷子</text>
                      </view>
                      <view class="desc nearby--desc data-v-05917e21 nearby--data-v-05917e21">
                        <text class="data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-839 sk-text">清朝古街道</text>
                      </view>
                    </view>
                  </navigator>
                  <navigator class="scenery-card nearby--scenery-card data-v-05917e21 nearby--data-v-05917e21 sk-image" style="background-image:url(https://tomevideo.zhihuiquanyu.com/1610529264762.jpg);border:none;">
                    <view class="mask nearby--mask data-v-05917e21 nearby--data-v-05917e21"></view>
                    <view class="hot nearby--hot data-v-05917e21 nearby--data-v-05917e21 sk-image">
                      <text class="data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-520 sk-text">热门</text>
                    </view>
                    <view class="text nearby--text data-v-05917e21 nearby--data-v-05917e21">
                      <view class="name nearby--name data-v-05917e21 nearby--data-v-05917e21">
                        <text class="data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-841 sk-text">麦田中心</text>
                      </view>
                      <view class="desc nearby--desc data-v-05917e21 nearby--data-v-05917e21">
                        <text class="data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-441 sk-text">Traveller's Tale</text>
                      </view>
                    </view>
                  </navigator>
                  <navigator class="scenery-card nearby--scenery-card data-v-05917e21 nearby--data-v-05917e21 sk-image" style="background-image:url(https://tomevideo.zhihuiquanyu.com/1596012391606.jpg);border:none;">
                    <view class="mask nearby--mask data-v-05917e21 nearby--data-v-05917e21"></view>
                    <view class="text nearby--text data-v-05917e21 nearby--data-v-05917e21">
                      <view class="name nearby--name data-v-05917e21 nearby--data-v-05917e21">
                        <text class="data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-261 sk-text">硅谷影视城</text>
                      </view>
                      <view class="desc nearby--desc data-v-05917e21 nearby--data-v-05917e21">
                        <text class="data-v-05917e21 nearby--data-v-05917e21 sk-transparent sk-text-14-2857-19 sk-text">西部文创中心</text>
                      </view>
                    </view>
                  </navigator>
                </view>
              </scroll-view>
            </view>
          </view>
     
   
          <view class="promote promote--promote data-v-06ec89e4 promote--data-v-06ec89e4">
            <view class="title-bar promote--title-bar data-v-06ec89e4 promote--data-v-06ec89e4">
              <text class="title promote--title data-v-06ec89e4 promote--data-v-06ec89e4 sk-transparent sk-text-14-2857-74 sk-text">玩转途咪</text>
            </view>
            <view class="banner promote--banner data-v-06ec89e4 promote--data-v-06ec89e4" data-event-opts="tap,to360,$event">
              <swiper autoplay="false" circular="true" class="swiper promote--swiper data-v-06ec89e4 promote--data-v-06ec89e4" interval="10000" current="0">
                <swiper-item class="data-v-06ec89e4 promote--data-v-06ec89e4" style="width: 100%; position: absolute; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
                  <view class="guide-cover promote--guide-cover data-v-06ec89e4 promote--data-v-06ec89e4">
                    <image class="cover promote--cover data-v-06ec89e4 promote--data-v-06ec89e4 sk-image"></image>
                  </view>
                </swiper-item>
              </swiper>
            </view>
          </view>
     
       
          <view class="moment moment--moment data-v-1f052d22 moment--data-v-1f052d22">
            <view class="title-bar moment--title-bar data-v-1f052d22 moment--data-v-1f052d22">
              <text class="title moment--title data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-text-14-2857-292 sk-text">精彩游记</text>
            </view>
            <view class="data-v-1f052d22 moment--data-v-1f052d22">
            
                <view class="data-v-77aa3c8a flow--data-v-77aa3c8a" style="padding:0 16px 0;padding-bottom:8px;overflow:hidden;">
                  <view class="waterfalls-box flow--waterfalls-box data-v-77aa3c8a flow--data-v-77aa3c8a" style="height:1148.578125px;">
                    <view class="waterfalls-list flow--waterfalls-list data-v-77aa3c8a flow--data-v-77aa3c8a vue-ref-in-for flow--vue-ref-in-for" data-event-opts="tap,$emit,wapper-lick,$0,list,videoId,103055" data-ref="waterfalls-list-id-103055" style="--offset:10px;--cols:2;top:0px;left:0px;">
                      <image class="waterfalls-list-image flow--waterfalls-list-image data-v-77aa3c8a flow--data-v-77aa3c8a sk-image" data-event-opts="load,imageLoadHandle,0,error,imageLoadHandle,0,tap,$emit,image-click,$0,list,videoId,103055" mode="widthFix"
                        style="height: 123.923px;"></image>
                      <image class="play flow--play data-v-77aa3c8a flow--data-v-77aa3c8a sk-image"></image>
                      <view class="box moment--box data-v-1f052d22 moment--data-v-1f052d22">
                        <view class="content moment--content data-v-1f052d22 moment--data-v-1f052d22">
                          <view class="location moment--location data-v-1f052d22 moment--data-v-1f052d22">
                            <image mode="true" class="data-v-1f052d22 moment--data-v-1f052d22 sk-image"></image>
                            <text class="data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-text-14-2857-271 sk-text">普陀山</text>
                          </view>
                          <view class="title moment--title data-v-1f052d22 moment--data-v-1f052d22">
                            <text class="data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-text-14-2857-544 sk-text">普陀游</text>
                          </view>
                          <view class="bottom moment--bottom data-v-1f052d22 moment--data-v-1f052d22">
                            <view class="user moment--user data-v-1f052d22 moment--data-v-1f052d22">
                              <image class="data-v-1f052d22 moment--data-v-1f052d22 sk-image"></image>
                              <text class="data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-text-14-2857-213 sk-text">朱杰</text>
                            </view>
                            <view class="like moment--like data-v-1f052d22 moment--data-v-1f052d22" data-event-opts="tap,like,$0,0,momentList,,0">
                              <image class="data-v-1f052d22 moment--data-v-1f052d22 sk-image"></image>
                              <text class="data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-opacity">0</text>
                            </view>
                          </view>
                        </view>
                      </view>
                    </view>
                    <view class="waterfalls-list flow--waterfalls-list data-v-77aa3c8a flow--data-v-77aa3c8a vue-ref-in-for flow--vue-ref-in-for" data-event-opts="tap,$emit,wapper-lick,$0,list,videoId,322" data-ref="waterfalls-list-id-322" style="--offset:10px;--cols:2;top:0px;left:196px;">
                      <image class="waterfalls-list-image flow--waterfalls-list-image data-v-77aa3c8a flow--data-v-77aa3c8a sk-image" data-event-opts="load,imageLoadHandle,1,error,imageLoadHandle,1,tap,$emit,image-click,$0,list,videoId,322" mode="widthFix"
                        style="height: 99.223px;"></image>
                      <image class="play flow--play data-v-77aa3c8a flow--data-v-77aa3c8a sk-image"></image>
                      <view class="box moment--box data-v-1f052d22 moment--data-v-1f052d22">
                        <view class="content moment--content data-v-1f052d22 moment--data-v-1f052d22">
                          <view class="location moment--location data-v-1f052d22 moment--data-v-1f052d22">
                            <image mode="true" class="data-v-1f052d22 moment--data-v-1f052d22 sk-image"></image>
                            <text class="data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-text-14-2857-346 sk-text">宽窄巷子</text>
                          </view>
                          <view class="title moment--title data-v-1f052d22 moment--data-v-1f052d22">
                            <text class="data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-text-14-2857-311 sk-text">漫步宽窄巷子</text>
                          </view>
                          <view class="bottom moment--bottom data-v-1f052d22 moment--data-v-1f052d22">
                            <view class="user moment--user data-v-1f052d22 moment--data-v-1f052d22">
                              <image class="data-v-1f052d22 moment--data-v-1f052d22 sk-image"></image>
                              <text class="data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-text-14-2857-216 sk-text">Charlotte</text>
                            </view>
                            <view class="like moment--like data-v-1f052d22 moment--data-v-1f052d22" data-event-opts="tap,like,$0,1,momentList,,1">
                              <image class="data-v-1f052d22 moment--data-v-1f052d22 sk-image"></image>
                              <text class="data-v-1f052d22 moment--data-v-1f052d22 sk-transparent sk-text-14-2857-607 sk-text">11</text>
                            </view>
                          </view>
                        </view>
                      </view>
                    </view>
                    <view class="waterfalls-list flow--waterfalls-list data-v-77aa3c8a flow--data-v-77aa3c8a vue-ref-in-for flow--vue-ref-in-for" data-event-opts="tap,$emit,wapper-lick,$0,list,videoId,631" data-ref="waterfalls-list-id-631" style="--offset:10px;--cols:2;top:200.21875px;left:196px;">
                      <image class="waterfalls-list-image flow--waterfalls-list-image data-v-77aa3c8a flow--data-v-77aa3c8a sk-image" data-event-opts="load,imageLoadHandle,2,error,imageLoadHandle,2,tap,$emit,image-click,$0,list,videoId,631" mode="widthFix"
                        style="height: 159.666px;"></image>
                      <image class="play flow--play data-v-77aa3c8a flow--data-v-77aa3c8a sk-image"></image>
                    </view>
                  </view>
                </view>
            
            </view>
          </view>
   
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style lang="scss">
	/*
	此文件为开发者工具生成，生成时间: 2021/9/27 上午10:57:15
	
	在 C:\Users\11632\Desktop\project\tome_vlog\unpackage\dist\dev\mp-weixin\pages\home\home.wxss 中引入样式
	```
	@import "./home.skeleton.wxss";
	```
	
	更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
	*/
	.sk-transparent {
	    color: transparent !important;
	  }
	.sk-text-14-2857-677 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 32.9710rpx;
	    position: relative !important;
	  }
	.sk-text {
	    background-origin: content-box !important;
	    background-clip: content-box !important;
	    background-color: transparent !important;
	    color: transparent !important;
	    background-repeat: repeat-y !important;
	  }
	.sk-text-14-2857-441 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 43.1159rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-379 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 27.8986rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-346 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 38.0435rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-839 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 30.4348rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-520 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 27.8986rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-841 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 38.0435rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-261 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 38.0435rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-19 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 30.4348rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-74 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 43.1159rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-292 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 43.1159rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-271 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 30.4348rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-544 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 38.0435rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-213 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 32.9710rpx;
	    position: relative !important;
	  }
	.sk-opacity {
	    opacity: 0 !important;
	  }
	.sk-text-14-2857-311 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 38.0435rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-216 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 32.9710rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-607 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 30.4348rpx;
	    position: relative !important;
	  }
	.sk-image {
	    background: #EFEFEF !important;
	  }
	.sk-container {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    background-color: transparent;
	  }

</style>
