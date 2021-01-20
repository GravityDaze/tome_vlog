import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.mixin({
	methods:{
		setTabBarIndex(index){
			if (typeof this.$mp.page.getTabBar === 'function' &&
				this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected:index
				})
			}
		}
	}
})

const app = new Vue({
    ...App
})
app.$mount()
