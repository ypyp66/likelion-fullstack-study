import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Nav from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="container mx-auto">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/#" component={Home} />
          <Route exact path="/login">
            <h1>Login</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
