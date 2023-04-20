import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        name:'Main',
        redirect:'/home',
        children: [
            // { path: '/home',name:"home", component: Home },
            // { path: '/user',name:"user", component: User },
            // { path: '/mall',name:"mall", component: Mall },
            // { path: '/page1',name:"page1", component: PageOne },
            // { path: '/page2',name:"page2", component: PageTwo },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    }

]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
router.beforeEach((to,from,next)=>{ 
    const token = Cookie.get('token')
    if(!token&&to.name !=='login'){
        next({name:'login'})
    }else if(token && to.name=='login'){ 
        next({name:'home'})
    }else{ 
        next()
    }
})
export default router