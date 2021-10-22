import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 自定义tabbar mixin
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

// 解决onLaunch无法进行异步操作
Vue.prototype.$onLaunched = new Promise( resolve=>{
	Vue.prototype.$isResolve = resolve
} )

const app = new Vue({
    ...App
})
app.$mount()
