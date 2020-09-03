import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log("Sending http request " + url);
    axios.get(url).then((res) => {
      setIsLoading(false);
      setFetchedData(res);
    });
    // eslint-disable-next-line
  }, dependencies);

  return [isLoading, fetchedData];
};

useHttp.propTypes = {
  dependencies: PropTypes.array.isRequired,
};
