import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

Vue.use(Router)
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
export default new Router({
  routes: [
    {
      path: '',
      redirect:'/Home'
    },
    {
      path:'/Home',
      component: Home
    },
    {
      path:'/Category',
      component: Category
    },
    {
      path:'/Cart',
      component: Cart
    },
    {
      path:'/Profile',
      component: Profile
    },
    {
      path:'/Detail/:iid',
      component: Detail
    },
  ],
  mode:'history'
})
