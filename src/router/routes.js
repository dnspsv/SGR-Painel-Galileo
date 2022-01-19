const routes = [
  {
    path: "/",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [
      { path: "", name: "login", component: () => import("pages/login.vue") },
    ],
  },

  {
    path: "/autorizado",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/Index.vue") },
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
