import React from 'react';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = (props) => {
  let reverseIngredients = [...props.ingredients].reverse();
  return (
    <div className={classes.Burger}>
      
      <BurgerIngredient type='bread-top'/>
        {
          reverseIngredients.length === 0?
          <p>Please start adding ingredients!</p> :
          reverseIngredients.map((el, i) => <BurgerIngredient key={i} type={el} />)
        }
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default Burger;