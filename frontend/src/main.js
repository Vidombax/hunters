import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import Main from '@/pages/Main.vue'
import MakeThread from '@/pages/MakeThread.vue'
import Thread from '@/pages/Thread.vue'
import User from '@/pages/User.vue'
import Admin from '@/pages/Admin.vue'

const routes = [
    { path: '/', name: 'Main', component: Main },
    { path: '/login', name: 'Login', component: Login },
    { path: '/make-thread', name: 'MakeThread', component: MakeThread },
    { path: '/thread/:id', name: 'Thread', component: Thread },
    { path: '/user/:id', name: 'User', component: User },
    { path: '/admin', name: 'Admin', component: Admin },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
