import { createContext, useContext, useReducer } from "react";

const InterfaceContext = createContext();

const initialState = { nestedHeaderIsVisible: true };

const reducer = (state, action) => {
  switch (action.type) {
    case "nestedHeader/true":
      return { ...state, nestedHeaderIsVisible: true };
    case "nestedHeader/false":
      return { ...state, nestedHeaderIsVisible: false };
    default:
      throw new Error("Unknown action type");
  }
};

export const InterfaceProvider = function ({ children }) {
  const [{ nestedHeaderIsVisible }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <InterfaceContext.Provider value={{ nestedHeaderIsVisible, dispatch }}>
      {children}
    </InterfaceContext.Provider>
  );
};

export const useInterface = () => {
  const context = useContext(InterfaceContext);
  if (!context)
    throw new Error(
      "You can not acces useInterface outside of InterfaceProvider"
    );
  return context;
};
