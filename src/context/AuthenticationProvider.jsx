import { useContext, useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown Action !");
  }
};

const FAKE_USER = {
  name: "amir",
  email: "amir@ex.com",
  password: "123456",
};

const AuthenticationProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };
  const logout = () => dispatch({ type: "logout" });

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
