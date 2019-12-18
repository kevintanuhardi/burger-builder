import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const convertListToObject = (list, object = {}) => {

  list.forEach(element => {
    if (object[element] === undefined) {
      Object.assign(object, { [element]: 1 })
    } else {
      object[element]++
    }
  });

  return object;
}

const OrderSummary = (props) => {
  const { ingredients, continued, canceled } = props;

  const ingredientsSummary = convertListToObject(ingredients, { salad: 0, bacon: 0, cheese: 0, meat: 0 });

  const renderIngredientSummary = () => (
    Object.keys(ingredientsSummary).map((el, index) => (
      <li key={index}>
        <span style={{ textTransform: "capitalize" }}>{el}: {ingredientsSummary[el]}</span>
      </li>
    ))
  )

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the follwoing ingredients:</p>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <ul>
        {renderIngredientSummary()}
      </ul>
      <p>Continue to checkout?</p>
      <Button buttonType="Danger" clicked={canceled}>CANCEL</Button>
      <Button buttonType="Success" clicked={continued}>CONTINUE</Button>
    </Fragment>
  );
};

export default OrderSummary;