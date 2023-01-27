import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/products/:id',
      name: 'produits',
      component: () => import('../views/PageProduit.vue')
    },
    {
      path: '/cart',
      name: 'panier',
      component: () => import('../views/PagePanier.vue')
    },
    {
      path: '/:category',
      name: 'Catalog category',
      component: CatalogCategory
    }
  ]
})

export default router
