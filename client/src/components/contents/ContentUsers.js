import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './User/Index';
import Create from './User/Create';

const ContentUser = () => {
    return (
        <div className="content">
            <div className="content-title">
                <h3>Users</h3>
            </div>
            <div className="content-body">
                <Router>
                    <Switch>
                        <Route path="/home/user/" exact component={Index} />
                        <Route path="/home/user/create" exact component={Create} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default ContentUser;