import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Themes from "../Pages/Themes/Themes";
import Colors from "../Pages/Colors/Colors";
import Bricks from "../Pages/Bricks/Bricks";
import Admin from "../Pages/Admin/Admin";
    
import './MainBody.scss';

const routes = [
    {
        path: "/",
        name: 'Home',
        exact: true,
        component: () => <Home/>,
    },
    {
        path: "/themes",
        name: 'Themes',
        component: () => <Themes />,
    },
    {
        path: "/colors",
        name: 'Colors',
        component: () => <Colors />,
    },
    {
        path: "/bricks",
        name: 'Bricks',
        component: () => <Bricks />,
    },
    {   path: '/admin',
        name: 'Admin',
        component: () => <Admin />,
    }
];

class MainBody extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className='mainBody'>
                <Router>
                    <div className='leftNav'>
                        {routes.map((route, index) => (
                            <div key={index} className="linkEntry">
                                <Link to={route.path}>{route.name}</Link>
                            </div>
                        ))}
                    </div>

                    <div className='workArea'>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={route.component}
                                />
                            ))}
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default MainBody;
