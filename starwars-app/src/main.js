import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

//Vuex
import store from './store'

//Router
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(store)
  .use(vuetify)
  .use((router))
  .mount('#app')
