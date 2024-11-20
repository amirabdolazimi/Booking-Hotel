import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./Components/Header/Header";
import LocationList from "./Components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import HotelsProvider from "./context/HotelsProvider";
import SingleHotel from "./Components/SingleHotel/SingleHotel";
import BookmarkLayout from "./Components/BookmarkLayout/BookmarkLayout";
import BookmarkProvider from "./context/BookmarkListProvider";
import Bookmark from "./Components/Bookmark/Bookmark";
import SingleBookmark from "./Components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./Components/AddNewBookmark/AddNewBookmark";
import AuthenticationProvider from "./context/AuthenticationProvider";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthenticationProvider>
      <BookmarkProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Bookmark />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleBookmark />
                  </ProtectedRoute>
                }
              />
              <Route
                path="add"
                element={
                  <ProtectedRoute>
                    <AddNewBookmark />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarkProvider>
    </AuthenticationProvider>
  );
}

export default App;
