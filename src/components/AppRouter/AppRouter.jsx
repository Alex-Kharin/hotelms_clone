import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom"
import {privateRoutes, publicRoutes} from './urls'
import {connect} from 'react-redux'

const AppRouter = (props) => {
    const {isAuth} = props
    const whichRoute = isAuth ? privateRoutes : publicRoutes
    const toPath = isAuth ? '/' : '/login'
    return (
            <Switch>
                {whichRoute.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to={toPath}/>
            </Switch>
    )
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps)(AppRouter);
