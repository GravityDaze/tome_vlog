<script>
	export default {
		onLaunch: function() {

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			userInfo:{},
			noBuyVideoLook:"",
			uploadVideoMaxSize:"",
			uploadVideoDuration:"",
			uploadVideoMaxNum:"",
			composeSuccessSubscribeTmplId:"",
			lon: '104.072329', // 成都天府广场经度
			lat: '30.66342', // 成都天府广场维度
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		background-color: #FCFCFC;
	}
</style>
