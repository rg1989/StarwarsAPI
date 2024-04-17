import {
    createWebHistory,
    createRouter
} from "vue-router";

import { routeNames } from '../config/config';

import HomePage from '../pages/HomePage.vue';
import FilmsPage from '../pages/FilmsPage.vue';
import PeoplePage from '../pages/PeoplePage.vue';
import PlanetsPage from '../pages/PlanetsPage.vue';
import SpeciesPage from '../pages/SpeciesPage.vue';
import StarshipsPage from '../pages/StarshipsPage.vue';
import VehiclesPage from '../pages/VehiclesPage.vue';
import EntityPage from '../pages/EntityPage.vue';

const history = createWebHistory();
const routes = [
    {
        name: routeNames.HOME,
        path: "/",
        component: HomePage
    },
    {
        name: routeNames.FILMS,
        path: "/films",
        component: FilmsPage
    },
    {
        name: routeNames.PEOPLE,
        path: "/people",
        component: PeoplePage
    },
    {
        name: routeNames.PLANETS,
        path: "/planets",
        component: PlanetsPage
    },
    {
        name: routeNames.SPECIES,
        path: "/species",
        component: SpeciesPage
    },
    {
        name: routeNames.STARSHIPS,
        path: "/starships",
        component: StarshipsPage
    },
    {
        name: routeNames.VEHICLES,
        path: "/vehicles",
        component: VehiclesPage
    },
    {
        name: routeNames.ENTITY,
        path: "/entity/:entity",
        component: EntityPage,
        props: (route) => {
            return {
                entity: JSON.parse(route.params.entity)
            }
        }
    },
];
const router = createRouter({
    history,
    routes
});
export default router;