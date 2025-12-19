import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/app/App.vue";
import router from "./router";
import "./app/global.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import icons you want
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

// add icons to library
library.add(faUserSecret);

const app = createApp(App);
const pinia = createPinia();

// register components globally
app.component("font-awesome-icon", FontAwesomeIcon);

createApp(App).use(router).use(pinia).mount("#app");
pinia.use(piniaPluginPersistedstate);
