import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Counter from './components/Counter';
import Nav from './components/Header';
import Intro from './components/Intro';
import Login from './components/Login';
import Register from './components/Register';
import Auth from './pages/Auth';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <div>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route path="/counter" component={Counter} />
            <Route path="/register" component={Register} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
