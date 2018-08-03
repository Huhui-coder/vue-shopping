const routers = [
  {   name:'List',
      path: '/list',
      meta: {
          title: '商品列表'
      },
      component: (resolve) => require(['../views/list.vue'], resolve)
  },
  {
      name:'Product',
      path: '/product/:id',
      meta: {
          title: '商品详情'
      },
      component: (resolve) => require(['../views/product.vue'], resolve)
  },
  {   name:'Cart',
      path: '/cart',
      meta: {
          title: '购物车'
      },
      component: (resolve) => require(['../views/cart.vue'], resolve)
  },
  {
      path: '*',
      redirect: '/list'
  }
];
export default routers;