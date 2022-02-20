const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageHome.vue"), name: "Home" },
      {
        path: "/about",
        component: () => import("pages/PageAbout.vue"),
        name: "About",
      },
      {
        path: "/notification",
        component: () => import("pages/PageNoti.vue"),
        name: "Notification",
      },
      {
        path: "/messages",
        component: () => import("pages/PageMessages.vue"),
        name: "Messages",
      },
      {
        path: "/more",
        component: () => import("pages/PageMore.vue"),
        name: "More",
      },
      {
        path: "/bookmarks",
        component: () => import("pages/PageBook.vue"),
        name: "Bookmarks",
      },
      {
        path: "/profile",
        component: () => import("pages/PageProfile.vue"),
        name: "Profile",
      },
    ],
  },

  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageAuth.vue"), name: "Auth" },
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