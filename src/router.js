import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("./views/auth/Login.vue")
  },
  {
    path: "/",
    alias: "/users-list",
    name: "usersList",
    component: () => import("./views/user/UsersList.vue")
  },
  {
    name: 'registerUser',
    path: '/register-user',
    component: () => import('./views/user/RegisterUser.vue')
  },
  {
    name: 'surveysList',
    path: '/surveys',
    component: () => import('./views/survey/SurveysList.vue')
  },
  {
    name: 'userSurveysList',
    path: '/surveys/user/:id',
    component: () => import('./views/user/ViewUserSurveys.vue'),
    props: true
  },
  {
    name: 'createSurvey',
    path: '/create-survey',
    component: () => import('./views/survey/CreateSurvey.vue')
  },
  {
    name: 'editSurvey',
    path: '/edit-survey/:surveyId',
    component: () => import('./views/survey/CreateSurvey.vue'),
    props: true
  },
  {
    name: 'viewSurvey',
    path: '/survey/view/:id',
    component: () => import('./views/survey/ViewSurvey.vue'),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend-admin/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;