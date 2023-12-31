import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//只有在这引入了才会执行,不引入不执行
import "@/plugins/axios";
import "@/access/index.ts";

import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
createApp(App).use(ArcoVue).use(store).use(router).mount("#app");
