import { createApp } from 'vue'
import router from './router'
import store from './store'

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})


store.dispatch('checkAuth');

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)
  
app.mount("#app")
  