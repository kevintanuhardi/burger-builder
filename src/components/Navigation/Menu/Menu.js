import React from 'react';

import classes from './Menu.module.css';

import menuLogo from '../../../assets/images/menu.png';

const Menu = (props) => {
  let menuClasses = props.showSideDrawer ? 
    [classes.Menu, classes.Active] :
    [classes.Menu, classes.Inactive]
  return (
    <div
      onClick={props.clicked}
      className={menuClasses.join(' ')}
      style={{ height: props.height }}>
      <img src={menuLogo} alt="myBurger" />
    </div>
  );
}

export default Menu;