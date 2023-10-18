import {createRouter, createWebHistory} from 'vue-router'  

import SignIn from "@/views/login/SignIn";
import AsignRol from "@/views/login/AsignRol";
import SignUp from "@/views/login/SignUp";
import Landing from "@/views/Landing";
import Home from "@/views/Home";
import Post from "@/views/Post";
import CreatePost from "@/views/CreatePost";
import Administrar from "@/views/Administrar";
import Categories from "@/views/Categories";
import Themes from "@/views/Themes";
import hasNotUserSession from "@/middlewares/hasNotUserSession";
import hasUserSession from "@/middlewares/hasUserSession";
// import hasRolDefined from '@/middlewares/hasRolDefined';
import hasRolUndefined from '@/middlewares/hasRolUndefined';


const routes = [
  {
      path: "/",
      meta: {
        middleware: [hasNotUserSession]
        },
      component: Landing
  },
  {
      path: "/signin",
      meta: {
        middleware: [hasNotUserSession]
        },
      component: SignIn
  },
  {
      path: "/asignrol",
      meta: {
        middleware: [hasRolUndefined]
        },
      component: AsignRol
  },
  {
      path: "/signup",
      meta: {
        middleware: [hasNotUserSession]
        },
      component: SignUp
  },
  {
      path: "/home",
      meta: {
        middleware: [hasUserSession]
        },
      component: Home
  },
  {
      path: "/post/:id",
      name: 'postDetail',
      meta: {
        middleware: [hasUserSession]
        },
      component: Post
  },
  {
      path: "/create",
      meta: {
        middleware: [hasUserSession]
        },
      component: CreatePost
  },
  {
      path: "/administrar",
      meta: {
        middleware: [hasUserSession]
        },
      component: Administrar
  },
  {
      path: "/categories",
      meta: {
        middleware: [hasUserSession]
        },
      component: Categories
  },
  {
      path: "/themes",
      meta: {
        middleware: [hasUserSession]
        },
      component: Themes
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {

    if (to.matched.some(record => record.meta.middleware)) {

        const middlewareFound = checkMiddlewares(to.matched);

        const context = {
            from,
            next,
            router,
            to,
        };

        const nextMiddleware = nextFactory(context, middlewareFound, 1);

        return middlewareFound[0]({ ...context, next: nextMiddleware });
    }

    return next();
});

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

function checkMiddlewares(matched) {
    const middlewareFound = [];
    for (const i of matched) {
        if (i.meta.middleware) {
            if (Array.isArray(i.meta.middleware)) {
                for (const c of i.meta.middleware) {
                    middlewareFound.push(c);
                }
            } else {
                middlewareFound.push(i.meta.middleware)
            }
        }
    }

    return middlewareFound;
}

export default router;