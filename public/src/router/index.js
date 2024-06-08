import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import PatientsView from "../views/PatientsView.vue";
import AppointmentsView from "../views/AppointmentsView.vue";
import DrugsView from "../views/DrugsView.vue";
import store from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: "/patients",
      name: "patients",
      component: PatientsView,
    },
    {
      path: "/appointments",
      name: "appointments",
      component: AppointmentsView,
    },
    {
      path: "/drugs",
      name: "drugs",
      component: DrugsView,
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import("../views/LoginView.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () =>
        import("../views/CalendarView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

// Navigation guard - checking if the user is logged in
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLoggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router