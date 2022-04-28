import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    displayLanguage: "en",
    country: "",
    school: "",
    fullname: "",
    email: ""
  },
  mutations: {},
  actions: {},
  modules: {}
});
