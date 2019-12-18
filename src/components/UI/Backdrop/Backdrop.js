import React, { Fragment } from 'react';

import classes from './Backdrop.module.css'

const Backdrop = (props) => (
  <Fragment>
    {props.showing &&
    <div
      className={classes.Backdrop}
      onClick={props.clicked} />}
  </Fragment>
);

export default Backdrop;