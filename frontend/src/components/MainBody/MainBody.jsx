import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";

  import {getUser, setUserId} from '../../actions/admin';


import Home from "../Pages/Home/Home";
import Kits from '../Pages/Kits/Kits';
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
        state: 'home',
        component: () => <Home/>,
    },
    {
        path: '/kits',
        name: 'Kits',
        state: 'kits',
        component: () => <Kits/>,
    },
    {
        path: "/themes",
        name: 'Themes',
        state: 'thems',
        component: () => <Themes />,
    },
    {
        path: "/colors",
        name: 'Colors',
        state: 'colors',
        component: () => <Colors />,
    },
    {
        path: "/bricks",
        name: 'Bricks',
        state: 'bricks',
        component: () => <Bricks />,
    },
    {   path: '/admin',
        name: 'Admin',
        state: 'admin',
        component: () => <Admin />,
    }
];

class MainBody extends Component {
    displayName = "MainBody";
    
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'home',
        }
    }

    componentDidMount() {
        const {setUserId, getUser} = this.props;

        const userId = localStorage.getItem('userId');
        if (userId) {
            setUserId(userId);
            getUser(userId);
        }
    }

    onClickNavHandler = (newState) => {
        this.setState({selectedTab: newState})
    }

    render() {
        const {selectedTab} = this.state;

        console.log('process: ', process.env.NODE_ENV)

        return (
            <div className='mainBody'>
                <Router>
                    <div className='leftNav'>
                        {routes.map((route, index) => { 
                            let entryStyle = 'linkEntry';
                            if (route.state === selectedTab) {
                                entryStyle += ' selected';
                            }

                            return (
                                <div key={index} className={entryStyle}>
                                    <Link to={route.path}>
                                        <div className="linkBtn" onClick={() => {this.onClickNavHandler(route.state)}}>
                                            {route.name}
                                        </div>
                                    </Link>
                                </div>
                            )}
                        )}
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

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: k => dispatch(getUser(k)),
        setUserId: k => dispatch(setUserId(k)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);
