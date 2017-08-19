import Vue from 'vue';
import VueRouter from 'vue-router';// 路由
import VueResource from 'vue-resource'; // 处理前后端数据交互

import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

Vue.use(VueRouter); // 调用
Vue.use(VueResource); // 调用
/* eslint-disable no-new */
// 在js里面，new 一个对象，需要赋值给某个值（变量），用Vue实例化的时候，不需要赋值给值（变量），所以要单独给配一条规则，
// 给new Vue这行代码上面加这个注释，把这行代码规则的校验跳过，通过eslint-disable
// new Vue({
//   el: 'body',
//   components: { App } /* ==>{App:App}的简写*/
// });

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active'  // 点击激活后的选项添加active类
});

router.map({            // router.map({}) 定义路由
  '/goods': {
    component: goods   // 打死不要写成components
  },
  '/seller': {
    component: seller
  },
  '/ratings': {
    component: ratings
  }
});

router.start(app, '#app');// 调用执行

// router.go('/goods'); // 默认页
