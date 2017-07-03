import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal500, teal700, orangeA200 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './scenes/Home';
import CompoundSet from './scenes/CompoundSet';
import CreateCompoundSet from './scenes/CreateCompoundSet';
import Topbar from './components/Topbar';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500, // #009688
    primary2Color: teal700,
    accent1Color: orangeA200, // FF9100
  },
});

const App = () => (
  <Router history={{}}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Topbar />
        <div className="scene-wrapper">
          <Route exact path="/" component={Home} />
          <Route path="/compounds/:compoundSetId" component={CompoundSet} />
          <Route exact path="/create" component={CreateCompoundSet} />
        </div>
      </div>
    </MuiThemeProvider>
  </Router>
);

export default App;
