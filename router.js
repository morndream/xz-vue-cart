//router.js 引入路由
import Vue from 'vue'
import Router from 'vue-router'
//自定义组件
import Login from './components/xz/Login'
import Home from './components/xz/Home'
import Product from './components/xz/Product'
import Cart from './components/xz/Cart.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {path:'/Cart',component: Cart},
    {path:'/Product',component: Product},
    {path:'/Home',component:Home},
    {path:'/Login',component:Login},
  ]
})
