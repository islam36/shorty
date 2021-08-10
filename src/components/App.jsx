import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Main from './Main';
import Edit from './Edit';
import Add from './Add';
import Home from './Home';
import NotFound from './404';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const App = () => {
  useEffect(() => {
  }, []);

  const routes = [
    {
      parent: PublicRoute,
      path: '/',
      component: Home
    },
    {
      parent: PublicRoute,
      path: '/login',
      component: Login,
    },
    {
      parent: PublicRoute,
      path: '/register',
      component: Register
    },
    {
      parent: PrivateRoute,
      path: '/app',
      component: Main,
    },
    {
      parent: PrivateRoute,
      path: '/edit/:id',
      component: Edit
    },
    {
      parent: PrivateRoute,
      path: '/add',
      component: Add,
    },
    {
      parent: Route,
      path: '/notFound',
      component: NotFound,
    },
    {
      parent: Route,
      path: '/*',
      component: NotFound
    }
  ]


  


  return (
    <BrowserRouter basename="main">
      <TransitionGroup>
        <Switch >
          {
            routes.map((route, index) => (
              <route.parent
                key={index}
                exact path={route.path}
              >
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={300}
                    classNames="route"
                    unmountOnExit
                  >
                    <route.component />
                  </CSSTransition>
                )}
              </route.parent>
            ))
          }
        </Switch>
      </TransitionGroup>
    </BrowserRouter>
  );
}

export default App