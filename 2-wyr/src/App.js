import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Poll from './components/Poll';
import NewQuestion from './components/NewQuestion';
import LeaderBoard from './components/LeaderBoard';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/leaderboard" component={LeaderBoard} />
        <Route path="/add" component={NewQuestion} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/question/:question_id" component={Poll} />
        <Route exact path="/404" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
