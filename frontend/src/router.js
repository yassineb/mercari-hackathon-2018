import Vue from "vue";
import Router from "vue-router";
import Discover from "./views/Discover.vue";
import AddItem from "./views/AddItem.vue";
import ItemDetail from "./views/ItemDetail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Discover",
      component: Discover
    },
    {
      path: "/add-item",
      name: "AddItem",
      component: AddItem
    },
    {
      path: "/items/:itemId",
      name: "itemDetail",
      component: ItemDetail
    }
  ]
});
