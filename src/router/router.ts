import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorldVue from "../components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HelloWorldVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;