import { createRouter, createWebHistory } from 'vue-router'
import analytics from "@/pages/analytics/analytics.vue";
import Subscription from '@/pages/Subscription.vue'
import Services from "@/pages/Services.vue";
import IndividualCourses from "@/pages/Courses/IndividualCourses.vue";
import ReviewsPage from "@/pages/Courses/ReviewsPage.vue";
import Clients from "@/pages/Clients/Clients.vue";
import UserPages from "@/pages/Clients/UserPage.vue";
import UserBlocked from "@/pages/Clients/UserBlocked.vue";
import Newsletters from "@/pages/Newsletters.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'analytics',
      component: analytics
    },
    {
      path: '/subscription',
      name: 'Subscription',
      component: Subscription
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/individual-courses',
      name: 'IndividualCourses',
      component: IndividualCourses
    },
    {
      path: '/reviews-page',
      name: 'ReviewsPage',
      component: ReviewsPage
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
    {
      path: '/user-page',
      name: 'UserPage',
      component: UserPages
    },
    {
      path: '/user-locked',
      name: 'UserBlocked',
      component: UserBlocked
    },
    {
      path: '/newsletters',
      name: 'Newsletters',
      component: Newsletters
    },

  ]
})

export default router
