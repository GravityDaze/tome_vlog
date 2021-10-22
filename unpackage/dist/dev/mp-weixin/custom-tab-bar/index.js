Component({
	data: {
		selected: 0,
		color: "#7A7E83",
		selectedColor: "#FFBE0C",
		list: [{
				pagePath: "/pages/home/home",
				iconPath: "/static/1.png",
				selectedIconPath: "/static/2.png",
				text: "首页"
			},
			{
				pagePath: "/pages/shoot/shoot",
				iconPath: "/static/zbicon.png"
			},
			{
				pagePath: "/pages/mine/mine",
				iconPath: "/static/3.png",
				selectedIconPath: "/static/4.png",
				text: "我的"
			}
		]
	},
	methods: {
		switchTab(e) {
			const {
				sceneryId,
				sceneryName
			} = getApp().globalData
			const data = e.currentTarget.dataset
			const url = data.path
			if (data.index === 1) {
				// 景区未获取未完成时禁止点击
				if( sceneryName === '' ) return 
				// 未获取到景区时 跳转到景区选择页面
				return !sceneryId ?
					wx.navigateTo({
						url: '/pages/sceneryList/sceneryList?type=select'
					}) :
					wx.navigateTo({
						url
					})
			} else {
				wx.switchTab({
					url
				})
			}
		}
	}
})
