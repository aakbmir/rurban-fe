import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
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

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [{ cities, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function getAllCities() {
      try {
        dispatch({ type: "loading", payload: true });
        const res = await fetch(`http://localhost:5000/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    }
    getAllCities();
  }, []);

  const getCity = useCallback(
    async function getCity(cityId) {
      if (cityId === currentCity.id) return null;
      try {
        dispatch({ type: "loading", payload: true });
        const res = await fetch(`http://localhost:5000/cities/${cityId}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
        //setCurrentCity(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading", payload: true });
      const res = await fetch(`http://localhost:5000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "city/created", payload: data });
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  async function handleDelete(id) {
    try {
      dispatch({ type: "loading", payload: true });
      await fetch(`http://localhost:5000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      console.log(err.message);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        dispatch,
        getCity,
        createCity,
        handleDelete,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside of the Cities Provider");
  return context;
}

export { CitiesProvider, useCities };
