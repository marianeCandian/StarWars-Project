import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { data, filterName, newData, setNewData,
    search, setSearch } = useContext(StarWarsContext);

  useEffect(() => {
    setSearch(data);
    const dataFilterName = data
      .filter((el) => el.name.toUpperCase().includes(filterName?.toUpperCase()));
    setSearch(dataFilterName);

    const resultArray = newData.reduce((acc, filter) => acc.filter((planet) => {
      switch (filter.operator) {
      case 'maior que':
        return Number(planet[filter.column]) > Number(filter.value);
      case 'menor que':
        return Number(planet[filter.column]) < Number(filter.value);
      case 'igual a':
        return Number(planet[filter.column]) === Number(filter.value);
      default:
        return true;
      }
    }), dataFilterName);
    setSearch(resultArray);
  }, [data, filterName, newData, setSearch]);

  const handleDeleteFilter = ({ target }) => {
    const newArray = newData.filter((el) => el.column !== target.name);
    setNewData([...newArray]);
  };

  return (
    <>
      {newData.map((info, index) => (
        <div key={ `${info.column}-${index}` } data-testid="filter">
          <p>
            {`${info.column} ${info.operator} ${info.value}`}
          </p>
          <button
            type="button"
            name={ info.column }
            onClick={ handleDeleteFilter }
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setNewData([]) }
      >
        Remover todas filtragens
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            search.map((el) => (
              <tr key={ el.name }>
                <td data-testid="planet-name">{el.name}</td>
                <td>{el.rotation_period}</td>
                <td>{el.orbital_period}</td>
                <td>{el.diameter}</td>
                <td>{el.climate}</td>
                <td>{el.gravity}</td>
                <td>{el.terrain}</td>
                <td>{el.surface_water}</td>
                <td>{el.population}</td>
                <td>
                  {el.films
                    .map((film, i) => <p key={ i }>{film}</p>)}
                </td>
                <td>{el.created}</td>
                <td>{el.edited}</td>
                <td>{el.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}
