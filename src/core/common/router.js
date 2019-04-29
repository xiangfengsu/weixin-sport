import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";
import MainLayout from "@/core/layouts/BasicLayout.vue";
import UserLayout from "@/core/layouts/UserLayout.vue";
import storeBase from "@/store";

Vue.use(VueRouter);

export const store = storeBase;

const dynamicWrapper = (modules = [], component) => {
  if (modules.length > 0) {
    modules.forEach(module => {
      const m = require(`@/pages/${module}`).default; // eslint-disable-line
      const { name = "default" } = m;
      store.registerModule(name, m);
    });
  }

  return component;
};
const page404 = {
  path: "/*",
  name: "e-404",
  title: "404",
  redirect: "/exception/404"
};

const exceptionRouter = {
  path: "/exception",
  name: "exception",
  title: "exception",
  redirect: "/exception/404",
  component: MainLayout,
  children: [
    {
      path: "404",
      name: "404",
      meta: {
        title: "404"
      },
      component: dynamicWrapper([], () => import("@/pages/Exception/route/404"))
    },
    {
      path: "403",
      name: "403",
      meta: {
        title: "403"
      },
      component: dynamicWrapper([], () => import("@/pages/Exception/route/403"))
    },
    {
      path: "500",
      name: "500",
      meta: {
        title: "500"
      },
      component: dynamicWrapper([], () => import("@/pages/Exception/route/500"))
    }
  ]
};
const userRouter = {
  path: "/user",
  name: "user",
  title: "user",
  redirect: "/user/login",
  component: UserLayout,
  children: [
    {
      path: "login",
      name: "login",
      meta: {
        title: "login"
      },
      component: dynamicWrapper(["Login/module"], () => import("@/pages/Login/route"))
    },
    {
      path: "register",
      name: "register",
      meta: {
        title: "注册"
      },
      component: dynamicWrapper(["Register/module"], () => import("@/pages/Register/route"))
    }
  ]
};

const basicRouter = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "index",
        meta: {
          title: "首页",
          requiresAuth: true
        },
        component: dynamicWrapper(["Home/module"], () => import("@/pages/Home/route"))
      },
      {
        path: "apply",
        name: "apply",
        meta: {
          title: "申报",
          requiresAuth: true
        },
        component: dynamicWrapper(["Apply/module"], () => import("@/pages/Apply/route"))
      },
      {
        path: "applyquery",
        name: "applyquery",
        meta: {
          title: "申报查询",
          requiresAuth: true
        },
        component: dynamicWrapper(["ApplyQuery/module"], () => import("@/pages/ApplyQuery/route"))
      },
      {
        path: "honorquery",
        name: "honorquery",
        meta: {
          title: "光荣榜查询",
          requiresAuth: true
        },
        component: dynamicWrapper(["HonorQuery/module"], () => import("@/pages/HonorQuery/route"))
      },
      {
        path: "honorresult",
        name: "honorresult",
        meta: {
          title: "光荣榜结果",
          requiresAuth: true
        },
        component: dynamicWrapper(["HonorResult/module"], () => import("@/pages/HonorResult/route"))
      }
    ]
  }
];

const routers = [...basicRouter, userRouter, exceptionRouter, page404];
// 路由配置
const RouterConfig = {
  mode: "hash",
  base: "/",
  routes: routers,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  console.log('to',to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authCode = Cookies.get("authCode");
    if (!authCode) {
      next({
        path: "/user/login",

      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
