import useFetch from "../../hooks/useFetch";

const LocationList = () => {
  const { data, isLoading } = useFetch(
    "https://booking-hotel-server.liara.run/hotels",
    ""
  );

  if (isLoading) return <p>Loading ....</p>;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data?.map((item) => (
          <div className="locationItem" key={item.id}>
            <img src={item.medium_url} alt={item.name} />
            <div className="locationItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
