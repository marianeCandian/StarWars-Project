import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const [search, setSearch] = useState([]);
  const { data, filters } = useContext(StarWarsContext);

  const filterData = () => {
    const dataFilterName = data
      .filter((el) => el.name.toUpperCase().includes(filters?.toUpperCase()));
    console.log(dataFilterName);
    setSearch(dataFilterName);
  };

  useEffect(() => {
    setSearch(data);
    if (filters.length > 0) {
      filterData();
    }
  }, [data, filters]);

  return (
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
              <td>{el.name}</td>
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
  );
}
