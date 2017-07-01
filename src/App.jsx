import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './scenes/Home';
import Topbar from './components/Topbar';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <Router history={{}}>
    <MuiThemeProvider>
      <div>
        <Topbar />
        <Route exact path="/" component={Home} />
      </div>
    </MuiThemeProvider>
  </Router>
);

export default App;
