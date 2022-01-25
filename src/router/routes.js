const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", name: "login", component: () => import("pages/login.vue") },
    ],
  },

  {
    path: "/autorizado",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/Index.vue") },
      {
        path: "ingredientes",
        name: "ingredientes",
        component: () => import("pages/Ingredientes.vue"),
      },
      {
        path: "receitas",
        name: "receitas",
        component: () => import("pages/Receitas.vue"),
      },
      {
        path: "usuarios",
        name: "usuarios",
        component: () => import("pages/usuarios.vue"),
      },
      {
        path: "lojas",
        name: "lojas",
        component: () => import("pages/lojas.vue"),
      },
      {
        path: "unidades",
        name: "unidades",
        component: () => import("pages/unidades.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
