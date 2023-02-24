import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/app.css'
import './assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import format from 'date-fns/format'
import '@/permission'
import relativeTime from 'dayjs/plugin/relativeTime';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 国际化
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');

// 相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;//可以全局使用dayjs

// 全局使用$axios
import Axios from 'axios';
Vue.prototype.$axios = Axios;

// 全局函数及变量
import Global from './Global';
Vue.use(Global);


// // 全局引入地图
// import AmapVue from '@amap/amap-vue';

// AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
// // AmapVue.config.key = '您的JSAPI KEY';
// AmapVue.config.key = 'd7fa03bbe3cb1c99dbeb945a9c4be9db';
// AmapVue.config.plugins = [
//   'AMap.ToolBar',
//   'AMap.MoveAnimation',
//   // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
// ];
// Vue.use(AmapVue);

// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'd7fa03bbe3cb1c99dbeb945a9c4be9db',
//   plugin: ['AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   v: '1.4.4'
// });


Vue.filter('date', (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
})

Vue.use(Buefy)
Vue.use(ElementUI);
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
