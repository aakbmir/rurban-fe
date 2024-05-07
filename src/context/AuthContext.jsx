import { createContext, useContext, useReducer } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: null, isAuthenticated: true };
    case "logout":
      console.log("inside logout");
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("unknown action");
  }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login() {
    dispatch({ type: "login" });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    return new Error("Context was used outside of Auth Provider");
  return context;
}

export { AuthProvider, useAuth };
