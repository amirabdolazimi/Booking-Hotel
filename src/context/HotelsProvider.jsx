import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const BASE_URL = "https://booking-hotel-server.liara.run/hotels";

const HotelsContext = createContext();
const HotelsProvider = ({ children }) => {
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const room = JSON.parse(searchParams.get("options"))?.room;
  const destination = searchParams.get("destination");

  //   const { isLoading, data } = useFetch(
  //     "http://localhost:5000/hotels",
  //     `name_like=${destination || ""}&accommodates_gte=${
  //       room || ""
  //     }&host_location_like=${destination}`
  //   );

  const { isLoading, data: hotels } = useFetch(
    "https://booking-hotel-server.liara.run/hotels",
    `q=${destination || ""}&accommodates_gte=${room || ""}`
  );

  const getSingleHotel = async (id) => {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      // console.log(data);
      setCurrentHotel(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  };

  return (
    <HotelsContext.Provider
      value={{
        isLoading,
        hotels,
        currentHotel,
        isLoadingCurrentHotel,
        getSingleHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
};

export default HotelsProvider;

export const useHotels = () => useContext(HotelsContext);
