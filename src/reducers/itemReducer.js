//where our state is going to go and this is where we check our items
import { v4 as uuid } from "uuid";
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM } from "../actions/types";
const initialState = {
  items: [
    {
      id: uuid(),
      name: "eggs",
    },
    {
      id: uuid(),
      name: "sugar",
    },
    {
      id: uuid(),
      name: "milk",
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    default:
      return {
        ...state,
      };
  }
}
