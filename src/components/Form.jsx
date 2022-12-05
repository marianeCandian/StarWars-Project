import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Form() {
  const { setFilterName, setNewData, setSearch, search } = useContext(StarWarsContext);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState('0');
  const [numberFilters, setNumberFilters] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

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
    setColumn('population');
  };

  const filtraOpcoes = (opcao) => !numberFilters.find((filtro) => (
    opcao === filtro.column));

  const ordenaDados = () => {
    const orderAsc = (a, b) => +a[order.column] - +b[order.column];
    const orderDesc = (a, b) => +b[order.column] - +a[order.column];

    const orderData = search.filter((e) => e[order.column] !== 'unknown');
    const orderUnknown = search.filter((e) => e[order.column] === 'unknown');

    let orderPlanet = [];
    if (order.sort === 'ASC') {
      orderPlanet = orderData.sort(orderAsc);
    } else {
      orderPlanet = orderData.sort(orderDesc);
    }
    const orderResult = [...orderPlanet, ...orderUnknown];
    setSearch(orderResult);
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
          {
            ['population', 'orbital_period', 'diameter',
              'rotation_period', 'surface_water']
              .filter(filtraOpcoes).map((item) => (
                <option value={ item } key={ item }>
                  {item}
                </option>
              ))
          }
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
      <label htmlFor="sort">
        Ordenar:
        <select
          name="sort"
          id="sort"
          data-testid="column-sort"
          onChange={ (e) => setOrder((prevState) => (
            { ...prevState, column: e.target.value })) }
          value={ order.column }
        >
          {
            ['population', 'orbital_period', 'diameter',
              'rotation_period', 'surface_water']
              .map((e, i) => (
                <option value={ e } key={ i }>
                  {e}
                </option>
              ))
          }
        </select>
      </label>
      <label htmlFor="asc">
        Ascendente
        <input
          id="asc"
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ (e) => setOrder((prevState) => (
            { ...prevState, sort: e.target.value })) }
        />
      </label>
      <label htmlFor="desc">
        Descendente
        <input
          id="desc"
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ (e) => setOrder((prevState) => (
            { ...prevState, sort: e.target.value })) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ ordenaDados }
      >
        ORDENAR
      </button>
    </form>
  );
}
