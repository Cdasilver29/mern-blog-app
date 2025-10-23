import { useState, useEffect } from 'react';

export const useApi = (apiFunc, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiFunc();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, setData };
};

export default useApi;