import { useState, useCallback, useEffect } from "react";
import { apiClient } from "services";

export const useJobList = () => {
  const [hasFetched, setHasFetched] = useState(false);
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleOnSubmit = useCallback(async () => {
    setIsFetching(true);

    try {
      const { data, error } = await apiClient.searchJobs(query);
      setHasFetched(true);

      if (error) {
        setError(error);
      } else {
        setJobs(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsFetching(false);
    }
  }, [query]);

  useEffect(() => {
    handleOnSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = query => {
    setQuery(query);
  };

  return {
    query,
    error,
    isFetching,
    hasFetched,
    jobs,
    handleOnSubmit,
    handleOnChange
  };
};
