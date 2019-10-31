import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from './components/async.component'
import Toolbar from './layouts/layout-toolbar/layout-toolbar.component'
import NoLayout from './layouts/layout-none/layout-none.component'
import Mensajes from './containers/mensajes/mensajes.component'
import Padron from './containers/padron/personas.component'
import Invitados from './containers/invitados/invitados.component'
import Reservations from './containers/reservations'
import Expensas from './containers/expensas/expensas.component'
import Proveedores from './containers/proveedores/proveedores.component'
import Feed from './containers/feed'
import Seguridad from './containers/seguridad/seguridad.component'
import Neighbourhood from './containers/neighbourhood/neighbourhood.component'
import Login from './containers/authentication/login/login.component'

// AUTHENTICATION ROUTES
const AsyncForgot = asyncComponent(() =>
  import('./containers/authentication/forgot-password/forgot-password.component')
)

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
)

const ToolbarLayout = props => <Toolbar>{props.children}</Toolbar>

const Routes = props => {
  let activeLayout
  switch (props.layout.currentLayout) {
    case 'toolbar':
      activeLayout = ToolbarLayout
      break
    default:
      activeLayout = ToolbarLayout
  }

  let routes = (
    <Switch>
      <AppRoute path="/login" exact component={Login} props={props.childProps} layout={NoLayout} />
      <AppRoute
        path="/forgot-password"
        exact
        component={AsyncForgot}
        props={props.childProps}
        layout={NoLayout}
      />
      <Redirect to="/Login" />
    </Switch>
  )

  if (props.isAuth) {
    routes = (
      <Switch>
        <AppRoute
          path="/"
          exact
          component={Mensajes}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/mensajes"
          exact
          component={Mensajes}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/padron"
          exact
          component={Padron}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/reservas"
          exact
          component={Reservations}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/invitados"
          exact
          component={Invitados}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/expensas"
          exact
          component={Expensas}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/proveedores"
          exact
          component={Proveedores}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/feed"
          exact
          component={Feed}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/seguridad"
          exact
          component={Seguridad}
          props={props.childProps}
          layout={activeLayout}
        />
        <AppRoute
          path="/nuevo_barrio"
          exact
          component={Neighbourhood}
          props={props.childProps}
          layout={activeLayout}
        />
        {/*    <AppRoute
          path="/perfil"
          exact
          component={AsyncProfile}
          props={props.childProps}
          layout={activeLayout}
        />*/}
        <Redirect to="/mensajes" />
      </Switch>
    )
  }

  return routes
}

export default Routes
