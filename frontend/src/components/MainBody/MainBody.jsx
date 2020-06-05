import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
    
import './MainBody.scss';

const routes = [
    {
        path: "/",
        name: 'Home',
        exact: true,
        component: "MainPage"
    },
    {
        path: "/themes",
        name: 'Themes',
        component: "Themes",
    },
    {
        path: "/bricks",
        name: 'Bricks',
        components: "Bricks",
    },
    {   path: '/admin',
        name: 'Admin',
        components: "Admin",
    }
];

class MainBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='mainBody'>
                <Router>
                    <div className='leftNav'>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>π
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/topics">Topics</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='workArea'>
                        <Switch>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/topics">
                                <Topics />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Topics() {
    let match = useRouteMatch();
  
    return (
      <div>
        <h2>Topics</h2>
  
        <ul>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>
              Props v. State
            </Link>
          </li>
        </ul>
  
        {/* The Topics page has its own <Switch> with more routes
            that build on the /topics URL path. You can think of the
            2nd <Route> here as an "index" page for all topics, or
            the page that is shown when no topic is selected */}
        <Switch>
          <Route path={`${match.path}/:topicId`}>
            <Topic />
          </Route>
          <Route path={match.path}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch>
      </div>
    );
  }
  
  function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
  }
  

export default MainBody;
