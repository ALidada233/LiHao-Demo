import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//默认选中跳转为路由的第一个路径

var defaultRouter;
if (JSON.parse(sessionStorage.getItem('routesArr'))) {
  defaultRouter = JSON.parse(sessionStorage.getItem('routesArr'))[0];

} else {
  defaultRouter = {
    path: 'home'
  };
}
var router = new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: () => import('@/page/login')
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/' + defaultRouter.path,
      component: () => import('@/page/admin'),
      children: [{
          path: 'home',
          name: 'home',
          component: () => import('@/page/admin/home/index')
        },
        {
          path: 'articlelist',
          name: 'articlelist',
          component: () => import('@/page/admin/articlelist/index')
        },
        {
          path: 'articleclass',
          name: 'articleclass',
          component: () => import('@/page/admin/articleclass/index')
        },
        {
          path: 'application',
          name: 'application',
          component: () => import('@/page/admin/application/index')
        },
        {
          path: 'articletag',
          name: 'articletag',
          component: () => import('@/page/admin/articletag/index')
        },
        {
          path: 'advert',
          name: 'advert',
          component: () => import('@/page/admin/kindexList/index')
        },
        {
          path: 'customer',
          name: 'customer',
          component: () => import('@/page/admin/customerDetails/index')
        },
        {
          path: 'goods',
          name: 'goods',
          component: () => import('@/page/admin/goods/index')
        },
        {
          path: 'operator',
          name: 'operator',
          component: () => import('@/page/admin/operator/index')
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('@/page/admin/role/index')
        },
        {
          path: 'message',
          name: 'message',
          component: () => import('@/page/admin/message/index')
        },
        {
          path: 'info',
          name: 'info',
          component: () => import('@/page/admin/info/index')
        },
        {
          path: 'region',
          name: 'region',
          component: () => import('@/page/admin/region/index')
        },
        {
          path: 'offerList',
          name: 'offerList',
          component: () => import('@/page/admin/offerList/index')
        },
        {
          path: 'system',
          name: 'system',
          component: () => import('@/page/admin/system/index')
        },
        {
          path: 'discountApp',
          name: 'discountApp',
          component: () => import('@/page/admin/discountApp/index')
        },
        {
          path: 'contract',
          name: 'contract',
          component: () => import('@/page/admin/contract/index')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/page/admin/order/index')
        },
        {
          path: 'jurisdiction',
          name: 'jurisdiction',
          component: () => import('@/page/admin/jurisdiction/index')
        },
        {
          path: 'TechnicalSupport',
          name: 'TechnicalSupport',
          component: () => import('@/page/admin/TechnicalSupport/index')
        },
        {
          path: 'brand',
          name: 'brand',
          component: () => import('@/page/admin/brand/index')
        },
        {
          path: 'supplier',
          name: 'supplier',
          component: () => import('@/page/admin/supplier/index')
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('@/page/admin/category/index')
        },
        {
          path: 'purchase',
          name: 'purchase',
          component: () => import('@/page/admin/purchase/index')
        },
        {
          path: 'payLog',
          name: 'payLog',
          component: () => import('@/page/admin/payLog/index')
        },
        {
          path: 'shipping',
          name: 'shipping',
          component: () => import('@/page/admin/shipping/index')
        },
        {
          path: 'invoice',
          name: 'invoice',
          component: () => import('@/page/admin/invoice/index')
        },
        {
          path: 'purchaseInquiry',
          name: 'purchaseInquiry',
          component: () => import('@/page/admin/purchaseInquiry/index')
        },
        {
          path: 'orderDeduction',
          name: 'orderDeduction',
          component: () => import('@/page/admin/orderDeduction/index')
        },
        {
          path: 'orderTracking',
          name: 'orderTracking',
          component: () => import('@/page/admin/orderTracking/index')
        }
      ]
    }, {
      path: '/401',
      name: '401',
      component: () => import('@/components/common/401')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/components/common/404')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }

})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.name != "Login") { // 判断是否需要登录权限
    if (sessionStorage.getItem('c_token')) { // 判断是否登录
      var rows = JSON.parse(sessionStorage.getItem('routesArr'));
      var newItem = rows.filter(item => {
        return item.path == to.name
      })
      if (newItem.length > 0) {
        next()
      } else if (to.name == "404") {
        next()
      } else if (to.name == "info") {
        next()
      } else {
        next({
          path: '/404'
        })
      }
    } else { // 没登录则跳转到登录界面
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
