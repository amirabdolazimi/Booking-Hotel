import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const BookmarkContext = createContext();

const INITIAL_STATE = {
  currentBookmark: {},
  isLoading: false,
  bookmarks: [],
};
const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      console.log("loading", state);
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "singleBookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Uknown Action !");
  }
};
const BookmarkProvider = ({ children }) => {
  const [{ currentBookmark, isLoading, bookmarks }, dispatch] = useReducer(
    bookmarkReducer,
    INITIAL_STATE
  );
  useEffect(() => {
    const fetchBookmarkList = async () => {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "rejected",
          payload: "an Error occurred in loading bookmarks",
        });
      }
    };

    fetchBookmarkList();
  }, []);

  const getBookmark = async (id) => {
    if (Number(id) === currentBookmark?.id) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "singleBookmark/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "an Error occurred in loading Single Bookmark",
      });
      console.log(error);
    }
  };
  const createBookmark = async (newBookmark) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  const deleteBookmark = async (id) => {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.log(error);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        currentBookmark,
        isLoading,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;

export const useBookmark = () => useContext(BookmarkContext);

// context + reducer => value={{state,dispatch}} => SYNC ACTIONS ! => (No side effects)

// ASYNC ACTION => reducer function is a PURE function !!
