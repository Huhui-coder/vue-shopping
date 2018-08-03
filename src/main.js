// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Routers from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import './style.css'
import product_data from './product'
Vue.use(VueRouter)
Vue.use(Vuex)
 
Vue.config.productionTip = false

const RouterConfig = {
    mode:'history',
    routes:Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title;
  next();
})
router.afterEach((to,form,next)=>{
  window.scrollTo(0,0)
})

function getFilterArray (array) {
  const res = [];
  const json = {};
  for (let i = 0; i < array.length; i++){
      const _self = array[i];
      if(!json[_self]){
          res.push(_self);
          json[_self] = 1;
      }
  }
  return res;
}
 const store = new Vuex.Store({
    state: {
      productList:[],
      cartList:[]
    },
    getters: {
      brands:state=>{
        const brands = state.productList.map(item =>item.brand);
        return getFilterArray(brands);
      },
      colors:state =>{
        const colors =state.productList.map(item =>item.color);
        return getFilterArray(colors);
      }
    },
    mutations: {
      setProductList(state,data){
        state.productList = data;
      },
      addCart(state,id){
        const isAdded = state.cartList.find(item =>item.id === id);
        if(isAdded){
          isAdded.count++;
        }else{
          state.cartList.push({
            id:id,
            count:1
          })
        }
      },
      editCartCount (state, payload) {
        const product = state.cartList.find(item => item.id === payload.id);
        product.count += payload.count;
    },
    // 删除商品
      deleteCart (state, id) {
          const index = state.cartList.findIndex(item => item.id === id);
          state.cartList.splice(index, 1);
      },
      // 清空购物车
      emptyCart (state) {
          state.cartList = [];
      }
    },
    actions: {
           // 请求商品列表
           getProductList (context) {
            // 真实环境通过 ajax 获取，这里用异步模拟
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 500);
        },
        // 购买
        buy (context) {
            // 真实环境应通过 ajax 提交购买请求后再清空购物列表
            return new Promise(resolve=> {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500)
            });
        }
    }
 })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>{
    return h(App)
  }
})
