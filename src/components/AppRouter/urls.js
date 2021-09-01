import {Main} from '../Main/Main'
import {Documentation} from '../pages/Documentation'
import Login from '../pages/Login'


export const privateRoutes = [
    {path: '/', component: Main, exact: true},
    {path: '/doc', component: Documentation, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
    {path: '/doc', component: Documentation, exact: true},
]
