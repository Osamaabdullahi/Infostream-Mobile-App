import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result); // Store the fetched data
      } catch (err) {
        setError(err.message); // Handle and store error
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, [url]); // Only re-run effect if the URL changes

  return { data, loading, error };
};

export default useFetchData;
