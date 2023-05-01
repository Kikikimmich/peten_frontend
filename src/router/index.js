import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [

  // 首页
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
    meta:{
      headerShow: true,
      footerShow: true,

      keepAlive: true
    }
  },
  // 首页-推荐
  {
    path: "/recommend",
    name: "home-recommend",
    component: () => import("@/views/content/ContentList.vue"),
    meta:{
      headerShow: true,
      footerShow: true,

      keepAlive: true
    }
  },
  // 首页-热门
  {
    path: "/hot",
    name: "home-hot",
    component: () => import("@/views/content/ContentList.vue"),
    meta:{
      headerShow: true,
      footerShow: true,

      keepAlive: true
    }
  },
  // 首页-关注
  {
    path: "/follow",
    name: "home-follow",
    component: () => import("@/views/content/follow/Follow.vue"),
    meta:{
      headerShow: true,
      footerShow: true,

      keepAlive: true
    }
  },

  // 首页-圈子
  {
    path: "/group",
    name: "home-group",
    component: () => import("@/views/content/group/Group.vue"),
    meta:{
      headerShow: true,
      footerShow: true,

      keepAlive: true
    }
  },
  
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "注册" },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" },
  },
  // 文章
  {
    path: "/write",
    name: "Write",
    component: () => import("@/views/editor/Editor"),
  },
  // 发布
  {
    name: "post-create",
    path: "/post/create",
    component: () => import("@/views/post/Create"),
    meta: { title: "信息发布", requireAuth: true },
  },
  // 编辑
  {
    name: 'topic-edit',
    path: '/topic/edit/:id',
    component: () => import('@/views/post/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  // 医院
  {
    name: "hospital",
    path: "/hospital",
    component: () => import("@/views/hospital/Index"),
    meta: { 
      title: "健康",
      // shopHeaderShow: true
    },
  },
    // 医院详情
    {
      name: "hospital-detail",
      path: "/hospital/detail",
      component: () => import("@/views/hospital/Detail"),
      meta: { 
        title: "健康",
        // shopHeaderShow: true
      },
    },
  // 商城
  {
    name: "shop",
    path: "/shop/goods",
    component: () => import("@/views/shop/Goods"),
    meta: { 
      title: "商城",
      shopHeaderShow: true
    },
  },
  // 商店-我的订单
  {
    name: "shop-order",
    path: "/shop/order",
    component: () => import("@/views/shop/Order"),
    meta: { 
      title: "商品",
      shopHeaderShow: true
    },
  },
   // 商店-我的收藏
  {
    name: "shop-collect",
    path: "/shop/collect",
    component: () => import("@/views/shop/Collect"),
    meta: { 
      title: "商品",
      shopHeaderShow: true
    },
  },
   // 商店-购物车
  {
    name: "shop-shopping-cart",
    path: "/shop/shoppingCart",
    component: () => import("@/views/shop/ShoppingCart"),
    meta: { 
      title: "商品",
      shopHeaderShow: true
    },
  },
   // 商店-确认订单
   {
    name: "shop-confirm-order",
    path: "/shop/confirm-order",
    component: () => import("@/views/shop/ConfirmOrder"),
    meta: { 
      title: "商品",
      shopHeaderShow: true
    },
  },
  // 商品详情
  {
    name: "shop-goods-details",
    path: "/shop/goods/details",
    component: () => import("@/views/shop/Details"),
    meta: { 
      title: "商品",
      shopHeaderShow: true
    },
  },

  // 详情
  {
    name: "article-detail",
    path: "/article/:id",
    component: () => import("@/views/article/Detail"),
    meta: { title: "详情" },
  },

  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/Tag'),
    meta: { title: '主题列表' }
  },
  // 检索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '检索' }
  },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/Profile'),
    meta: { title: '用户主页' }
  },
  // 用户消息
  {
    name: 'user',
    path: '/member/:username/message',
    component: () => import('@/components/Chat/index'),
    meta: { title: '用户主页' }
  },
  // 用户设置
  {
    name: 'user-setting',
    path: '/member/:username/setting',
    component: () => import('@/views/user/Setting'),
    meta: { title: '设置', requireAuth: true }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },


  // 搜索结果
  {
    name: 'search-result',
    path: '/search/result',
    component: () => import('@/views/content/search/SearchResult'),
    // meta: { title: '设置', requireAuth: true }
  },

  // 全部圈子
  {
    name: 'group-all',
    path: '/group/all',
    component: () => import('@/views/content/group/AllGroup'),
    // meta: { title: '设置', requireAuth: true }
  },
  // 圈子详情
  {
    name: 'group-detail',
    path: '/group/detail/:id',
    component: () => import('@/views/content/group/GroupDetail'),
  },

  // 帖子详情
  {
    name: 'post-detail',
    path: '/post/detail/:id',
    component: () => import('@/views/content/group/PostDetail'),
  },

  // 发布帖子
  {
    name: 'group-post',
    path: '/group/post',
    component: () => import('@/views/content/group/Editor'),
  }


];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
