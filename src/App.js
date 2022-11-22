import React from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <>
      <p>Hello Star Wars!</p>
      <Filters />
      <Table />
    </>
  );
}

export default App;
