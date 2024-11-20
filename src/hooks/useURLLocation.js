import { useSearchParams } from "react-router-dom";

const useURLLocation = () => {
  const [searchParams, _] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
};

export default useURLLocation;
