import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Form() {
  const { setFilterName, setNewData } = useContext(StarWarsContext);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState('0');
  const [numberFilters, setNumberFilters] = useState([]);

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  useEffect(() => {
    setFilterName(name);
    setNewData(numberFilters);
  }, [name, setFilterName, numberFilters, setNewData]);

  const handleNumberFilter = () => {
    const newNumberFilter = {
      column,
      operator,
      value,
    };
    setNumberFilters([...numberFilters, newNumberFilter]);
  };

  return (
    <form>
      <label htmlFor="name">
        Search:
        <input
          type="text"
          name="name"
          value={ name }
          id="name"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
      <label htmlFor="column">
        Coluna:
        <select
          name="column"
          id="column"
          onChange={ ({ target }) => setColumn(target.value) }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="operator">
        Operador:
        <select
          id="operator"
          name="operator"
          onChange={ ({ target }) => setOperator(target.value) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ ({ target }) => setValue(target.value) }
            data-testid="value-filter"
          />
        </label>
      </label>
      <button
        type="button"
        onClick={ handleNumberFilter }
        data-testid="button-filter"
      >
        FILTRAR
      </button>
    </form>
  );
}
