import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { AppContextTypes, StateType } from "./types";

const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext<AppContextTypes | null>(null);

export const initialState: StateType = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // CLEAR CART
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  //REMOVE SINGLE ITEM
  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  // INCREASE AMOUNT
  const increaseAmount = (id: number) => {
    dispatch({ type: "INCREASE_AMOUNT", payload: id });
  };
  // DECREASE AMOUNT
  const decreaseAmount = (id: number) => {
    dispatch({ type: "DECREASE_AMOUNT", payload: id });
  };
  // FETCH DATA
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(url);
    const data = await res.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: data });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // GET TOTALS every time cart state changes
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
