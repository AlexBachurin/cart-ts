export type AppContextTypes = {
  loading: boolean;
  cart: ICart[];
  total: number;
  amount: number;
  clearCart: () => void;
  removeItem: (id: number) => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
};

export type StateType = {
  loading: boolean;
  cart: ICart[];
  total: number;
  amount: number;
};

export interface ICart {
  id: number;
  title: string;
  price: number;
  img: string;
  amount: number;
}

export type ACTIONTYPE =
  | { type: "CLEAR_CART" }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "INCREASE_AMOUNT"; payload: number }
  | { type: "DECREASE_AMOUNT"; payload: number }
  | { type: "LOADING" }
  | { type: "DISPLAY_ITEMS"; payload: ICart[] }
  | { type: "GET_TOTALS" };
