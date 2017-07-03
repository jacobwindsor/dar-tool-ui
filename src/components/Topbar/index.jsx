import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import './index.css';

const Topbar = () => (
  <Toolbar className="topbar">
    <ToolbarGroup>
      <ToolbarTitle text="DARLing" />
      <Link to="/">
        <FlatButton
          labelStyle={{ color: 'white' }}
          label="Home"
        />
      </Link>
      <Link to="/create">
        <FlatButton
          labelStyle={{ color: 'white' }}
          label="Create"
        />
      </Link>
    </ToolbarGroup>
    <ToolbarSeparator />
  </Toolbar>
);

export default Topbar;
