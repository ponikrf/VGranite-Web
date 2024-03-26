import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import ConnectFormView from '../views/connector/ConnectFormView.vue'
import ConnectShowView from '../views/connector/ConnectShowView.vue'

import MapView from '../views/MapView.vue'

import General from '../views/GeneralView.vue'
import ElementFormView from '../views/elements/ElementFormView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        name: "General",
        path: "general",
        component: General,
      },
      {
        name: "ConnectAdd",
        path: "connect/add",
        component: ConnectFormView,
      },

      {
        name: "ConnectShow",
        path: "connect/show/:from/:to",
        component: ConnectShowView,
      },
      {
        name: "Map",
        path: "map",
        component: MapView,
      },
      {
        name: "AddElement",
        path: "element/:device/add",
        component: ElementFormView,
      },
      {
        name: "EditElement",
        path: "element/:device/edit/:id",
        component: ElementFormView,
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
