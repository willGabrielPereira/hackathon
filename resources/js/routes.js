const routes = [
    { name: `login`, path: `/login`, component: () => import('./views/Login.vue') },
    { name: 'home', path: '/', component: () => import('./views/Home.vue') },
];


export default routes;