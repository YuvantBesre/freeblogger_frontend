import layout from "../layouts/layout";

const routes = [
    {
        path : '',
        component : layout,
        children : [
            {
                path : '',
                name : 'home',
                component : () => import("../views/homepage/home-page"),
                meta : {
                    requiresAuth : false,
                    title : 'Home | Blog Project'
                }
            },
            {
                path : '/:id',
                name : 'postDetails',
                component : () => import("../views/PostDetails/post-details"),
                meta : {
                    requiresAuth : false,
                    title : 'Details | Blog Project'
                }
            },
        ]
    }
]

export default routes;