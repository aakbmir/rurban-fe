import { createContext, useContext, useReducer } from "react";

const initialState = {
  cities: [],
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, loading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "loading":
      return { ...state, loading: action.payload };
    default:
      return new Error("unknown action type");
  }
}

const CheckInContext = createContext();

const CheckInProvider = ({ children }) => {
  const [{ cities, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <CheckInContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        dispatch,
      }}
    >
      {children}
    </CheckInContext.Provider>
  );
};

function useCheckIns() {
  const context = useContext(CheckInContext);
  if (context === undefined)
    throw new Error("CheckIn context was used outside of the CheckIn Provider");
  return context;
}

export { CheckInProvider, useCheckIns };
