import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';


const Profiles = () => {
    const activeStyle = {
        background: 'blue',
        color: 'white'
    }
    return (
        <div>
            <h3>사용자 목록: </h3>
            <ul>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/user1">user1</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/user2">user2</NavLink>
                </li>
            </ul>
            <Route 
                path="/profiles"
                exact
                render={()=><div>사용자선택</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
            <WithRouterSample />
        </div>
    );
};

export default Profiles;