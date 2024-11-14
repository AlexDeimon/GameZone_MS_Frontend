import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Auth from '../views/Auth.vue';
import Home from '../views/Home.vue';
import Categorias from '../views/Categoria.vue';
import Productos from '../views/Productos.vue';
import Carritos from '../views/Carrito.vue';
import Clientes from '../views/Clientes.vue';
import Compras from '../views/Compras.vue';
import App from '../App.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: "root",
    component: App
  }, 
  {
    path: '/userAuth',
    name: "Auth",
    component: Auth
  }, 
  {
    path: '/Home/:username',
    name: "Home",
    component: Home
  },
  {
    path: "/Categorias",
    name: "Categorias",
    component: Categorias
  },
  {
    path: "/Productos",
    name: "Productos",
    component: Productos
  },
  {
    path: "/Carritos",
    name: "Carritos",
    component: Carritos
  },
  {
    path: "/Clientes",
    name: "Clientes",
    component: Clientes
  },
  {
    path: "/Compras",
    name: "Compras",
    component: Compras
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
