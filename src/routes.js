import {HomePage} from './pages/home-page.jsx'
import {AboutUs} from './pages/about-us.jsx'
import {CarApp} from './pages/car-app.jsx'

const routes = [
    {
        path:'/',
        component: HomePage,
    },
    {
        path:'/car',
        component: CarApp,
    },
    {
        path:'/about',
        component: AboutUs,
    }
]

export default routes;