import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/pilot",
    name: "Pilot",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SelectLanguage.vue")
  },
  {
    path: "/grade9",
    name: "Grade9",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SelectLanguage.vue")
  },
  {
    path: "/grade10",
    name: "Grade10",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SelectLanguage.vue")
  },
  {
    path: "/data-presentation",
    name: "DataPresentation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/DataPresentationView.vue"
      )
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
