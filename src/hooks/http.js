import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {useCookies} from "react-cookie";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then((res) => {
      setIsLoading(false);
      setFetchedData(res);
    });
  }, dependencies);

  return [isLoading, fetchedData];
};

useHttp.propTypes = {
  dependencies: PropTypes.array.isRequired,
};
