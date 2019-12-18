import React, { Component, Fragment } from 'react';

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import toggleState from '../../helpers/toggleState';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }

  render() {
    return (
      <Fragment>
        <Toolbar
          toggleSideDrawer={(preferedState) => toggleState(this, 'showSideDrawer', preferedState)}
          showSideDrawer={this.state.showSideDrawer} />
        <SideDrawer
          toggle={(preferedState) => toggleState(this, 'showSideDrawer', preferedState)}
          open={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
};

export default Layout;