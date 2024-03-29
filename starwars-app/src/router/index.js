import {
    createWebHistory,
    createRouter
} from "vue-router";

import HomePage from '../pages/HomePage.vue'

const history = createWebHistory();
const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/customers",
        component: HomePage
    },
];
const router = createRouter({
    history,
    routes
});
export default router;