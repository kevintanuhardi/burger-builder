import React from 'react';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu';

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
    <Logo height='80%' />
    <Menu
      clicked={() => props.toggleSideDrawer(true)}
      showSideDrawer={props.showSideDrawer} />
  </header>
);

export default Toolbar;