import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Catalog from '../views/Catalog.vue'
import CatalogCategory from '../views/CatalogCategory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/cart',
      name: 'cart'
    },
    {
      path: '/:category',
      name: 'Catalog category',
      component: CatalogCategory
    }
  ]
})

export default router
