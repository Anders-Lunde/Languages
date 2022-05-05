import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import SelectLanguage from "../views/SelectLanguage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "SelectLanguage",
    component: SelectLanguage
  },
  {
    path: "/register-info",
    name: "RegisterInfo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterInfo.vue")
  },
  {
    path: "/intro-video",
    name: "IntroVideo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/IntroVideo.vue")
  },
  {
    path: "/vocabulary-test",
    name: "VocabularyTest",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VocabularyTest.vue")
  },
  {
    path: "/exit-screen",
    name: "ExitScreen",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ExitScreen.vue")
  }
];

const router = new VueRouter({
  routes,
  //Always scroll to top
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
