import React from 'react';
import { Link, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profiles">user profile</Link>
        </li>
        <li>
          <Link to="/history">history</Link>
        </li>
      </ul>
      <hr />
      <switch>
        <Route path="/" component={Home} exact={true} />
        <Route path={['/about','/info']} component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
        <Route render={({location}) => (
            <div>
              <h2>존재하지않는 페이지</h2>
              <p>{location.pathname}</p>
            </div>
        )}
        />
      </switch>
    </div>
  );
};

export default App;