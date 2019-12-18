import React, { Fragment, memo, useEffect } from 'react';

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

  useEffect (()=> {
    console.log('[Modal] use effect')
  }, [])
  return (
    <Fragment>
      <Backdrop
        showing={props.showing}
        clicked={props.closeModal} />
      <div
        className={classes.Modal}
        style={{
          transform: props.showing ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.showing ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Fragment>
  );
};

export default memo(Modal);