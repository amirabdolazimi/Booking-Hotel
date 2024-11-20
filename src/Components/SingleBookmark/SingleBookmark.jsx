import { useEffect } from "react";
import { useBookmark } from "../../context/BookmarkListProvider";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBookmark, getBookmark, isLoading } = useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);
  
  if (isLoading) return <Loader />;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <h2 style={{ margin: "1.5rem 0" }}>{currentBookmark.cityName}</h2>
      <div className="bookmarkItem ">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<strong>{currentBookmark.cityName}</strong>
        &nbsp;<span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
