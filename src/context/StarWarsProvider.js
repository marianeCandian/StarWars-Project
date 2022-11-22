import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestFetch from '../services/RequestAPI';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    requestFetch().then((result) => setData(result));
  }, []);

  const value = useMemo(() => ({
    data,
  }), [data]);

  return (
    <StarWarsContext.Provider value={ value }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
