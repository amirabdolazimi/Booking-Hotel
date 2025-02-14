import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../../context/BookmarkListProvider";

const BookmarkLayout = () => {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
};

export default BookmarkLayout;
