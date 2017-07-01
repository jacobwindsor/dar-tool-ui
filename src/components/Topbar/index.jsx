import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const Topbar = () => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text="DARling" />
      <FlatButton>
        <Link to="/">Home</Link>
      </FlatButton>
    </ToolbarGroup>
    <ToolbarSeparator />
  </Toolbar>
);

export default Topbar;
