import { ACTIONTYPE, StateType } from "./types";

const reducer = (state: StateType, action: ACTIONTYPE) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE_ITEM") {
    // filter array by passed id in payload and return new cart state
    const updatedCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: updatedCart };
  }
  if (action.type === "INCREASE_AMOUNT") {
    // find item which amount need to be changed by payload id and return new array with new amount
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        // change amount
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: updatedCart };
  }
  if (action.type === "DECREASE_AMOUNT") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        // change amount
        return { ...item, amount: item.amount - 1 };
      }
      return item;
    });
    // also check if item amount is 0 then remove that item
    const filteredCart = updatedCart.filter((item) => {
      return item.amount !== 0;
    });
    return { ...state, cart: filteredCart };
  }
  if (action.type === "GET_TOTALS") {
    // calculate total price and amount of items using reduce method
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        // calculate price
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        // calculate amount of items
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    // limit amount of numbers after dot
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, loading: false, cart: action.payload };
  }

  return state;
};

export default reducer;
