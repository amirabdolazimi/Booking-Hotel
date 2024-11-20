import { useNavigate } from "react-router-dom";
import useURLLocation from "../../hooks/useURLLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkListProvider";
const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const AddNewBookmark = () => {
  const navigate = useNavigate();
  const [lat, lng] = useURLLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not a city ! please click somewhere else"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (err) {
        // console.log(error.message);
        toast.error(err.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);
  // console.log(lat, lng);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!country || !cityName) {
      toast.error("All Fields Are Mandatory");
    }
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <Loader />;
  return (
    <div>
      <Toaster />
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag
            style={{ transform: "scale(1.7)", marginTop: "4px" }}
            className="flag"
            svg
            countryCode={countryCode}
          />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr;
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
