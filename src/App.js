import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/home/auth";
import {Provider} from 'react-redux';
import storeRedux from  './config/redux/store';

function App() {
  return (
    <Provider store={storeRedux}>
      <Router>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
