import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Filters() {
  const { setFilters } = useContext(StarWarsContext);
  const [name, setName] = useState('');

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  useEffect(() => {
    setFilters(name);
  }, [name]);

  return (
    <form>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          value={ name }
          id="name"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
    </form>
  );
}
