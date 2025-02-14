import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetch = (url, query = "") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, url]);

  return { isLoading, data };
};

export default useFetch;
