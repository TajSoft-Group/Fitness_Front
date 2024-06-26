import Cookies from 'js-cookie';
import { createRouter, createWebHistory } from 'vue-router';
import analytics from "@/pages/analytics/analytics.vue";
import Subscription from '@/pages/Subscription.vue'
import Services from "@/pages/Services.vue";
import IndividualCourses from "@/pages/Courses/IndividualCourses.vue";
import ReviewsPage from "@/pages/Courses/ReviewsPage.vue";
import Clients from "@/pages/Clients/Clients.vue";
import UserPages from "@/pages/Clients/UserPage.vue";
import UserBlocked from "@/pages/Clients/UserBlocked.vue";
import Newsletters from "@/pages/Newsletters.vue";
import MailingsPlanned from "@/pages/sletters/MailingsPlanned.vue";
import MailingDelivered from "@/pages/sletters/MailingDelivered.vue";
import personal from "@/pages/personal/personal.vue";
import TrainerPage from "@/pages/personal/TrainerPage.vue";
import product from "@/pages/products/product.vue";
import MobileInformation from "@/pages/MobileInformation.vue";
import login from "@/pages/login.vue";
import Lockers from "@/pages/lockers.vue";
import finance from "@/pages/finance.vue";
import Cash from "@/pages/Cash.vue";

const routes = [
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
  {
    path: '/mailings-planned',
    name: 'MailingsPlanned',
    component: MailingsPlanned
  },
  {
    path: '/mailing-delivered',
    name: 'MailingDelivered',
    component: MailingDelivered
  },
  {
    path: '/personal',
    name: 'personal',
    component: personal
  },
  {
    path: '/trainer-page',
    name: 'TrainerPage',
    component: TrainerPage
  },
  {
    path: '/product',
    name: 'product',
    component: product
  },
  {
    path: '/mobile-information',
    name: 'mobile-information',
    component: MobileInformation
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/lockers',
    name: 'lockers',
    component: Lockers
  },
  {
    path: '/finance',
    name: 'finance',
    component: finance
  },
  {
    path: '/cash',
    name: 'cash',
    component: Cash
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const token = Cookies.get('token');

  if (authRequired && !token) {
    return next('/login');
  }

  next();
});

export default router;
