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
<<<<<<< HEAD
      path: '/cart',
      name: 'cart'
    },
    {
      path: '/:category',
      name: 'Catalog category',
      component: CatalogCategory
=======
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/produits',
      name: 'produits',
      component: () => import('../views/PageProduit.vue')
    },
    {
      path: '/panier',
      name: 'panier',
      component: () => import('../views/PagePanier.vue')
>>>>>>> b479289 (add cart and porudct page)
    }
  ]
})

export default router
