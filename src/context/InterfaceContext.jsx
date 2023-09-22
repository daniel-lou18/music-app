import { createContext, useContext, useReducer } from "react";

const InterfaceContext = createContext();

const initialState = { fixedHeaderIsColored: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "header/fixed/transparent":
      return { ...state, fixedHeaderIsColored: false };
    case "header/fixed/colored":
      return { ...state, fixedHeaderIsColored: true };
    default:
      throw new Error("Unknown action type");
  }
};

export const InterfaceProvider = function ({ children }) {
  const [{ fixedHeaderIsColored }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <InterfaceContext.Provider value={{ fixedHeaderIsColored, dispatch }}>
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
