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
				pagePath:"/pages/shoot/shoot",
				iconPath:"/static/zbicon.png"
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
			const data = e.currentTarget.dataset
			const url = data.path
			if(data.index === 1){
				wx.navigateTo({
					url
				})
			}else{
				wx.switchTab({
					url
				})
			}
			
		}
	}
})
