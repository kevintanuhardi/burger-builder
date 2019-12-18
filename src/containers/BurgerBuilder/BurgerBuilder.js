import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import toggleState from '../../helpers/toggleState';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: [],
    totalPrice: 4,
    showOrderSummary: false,
    loading: false,
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = [...this.state.ingredients];
    updatedIngredients.push(type);

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    })
  }

  removeIngredientHandler = (type) => {
    let updatedIngredients = [...this.state.ingredients].reverse();
    const ingredientIndex = updatedIngredients.indexOf(type);
    if (ingredientIndex !== -1) {
      updatedIngredients.splice(ingredientIndex, 1).reverse();
      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
      })
    }
  }

  disabledButtonChecker = () => {
    const disabledInfo = {}
    Object.keys(INGREDIENT_PRICES).map((el) => Object.assign(disabledInfo, { [el]: this.state.ingredients.indexOf(el) < 0 }))

    return disabledInfo
  }

  purchasableChecker = () => {
    const purchasable = this.state.ingredients.length <= 0;

    return purchasable;
  }

  continuePurchaseHandler = async () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Kevin Wijaya',
        address: {
          street: 'Testsreet 1',
          zipcode: 'test'
        },
        email: 'kevin@test.com'
      },
      deliveryMethod: 'JNE'
    }

    toggleState(this, 'loading', true);

    try {
      await axios.post('/orders', order);
    } catch (err) {
      console.log(err)
    }
    toggleState(this, 'loading', false);
    toggleState(this, 'showOrderSummary', false);
  }

  render() {
    const disabledInfo = this.disabledButtonChecker();
    const purchasable = this.purchasableChecker();

    const renderOrderSummary = this.state.loading ?
      <Spinner /> :
      <OrderSummary
        ingredients={this.state.ingredients}
        canceled={() => toggleState(this, 'showOrderSummary')}
        continued={this.continuePurchaseHandler}
        price={this.state.totalPrice} />;
    
    return (
      <Fragment>
        <Modal
          showing={this.state.showOrderSummary}
          closeModal={() => toggleState(this, 'showOrderSummary', false)} >
          {renderOrderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          purchasable={purchasable}
          toggleShowOrderSummary={() => toggleState(this, 'showOrderSummary')} />
      </Fragment >
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);