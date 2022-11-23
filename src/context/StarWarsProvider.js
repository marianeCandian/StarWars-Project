import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestFetch from '../services/RequestAPI';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    requestFetch().then((result) => setData(result));
  }, []);

  const value = useMemo(() => ({
    data,
    filterName,
    setFilterName,
    newData,
    setNewData,
  }), [data, filterName, setFilterName, setNewData, newData]);

  return (
    <StarWarsContext.Provider value={ value }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
