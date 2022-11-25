import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import StarWarsProvider from '../context/StarWarsProvider';
import StarWarsContext from '../context/StarWarsContext';
import mockData from './mockData';
import App from '../App';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Testando a aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  it('Verificando se estão renderizados os elementos do formulário', () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    )
    const input1 = screen.getByText(/search/i);
    expect(input1).toBeInTheDocument();
    const select1 = screen.getByText(/coluna/i);
    expect(select1).toBeInTheDocument();
    const select2 = screen.getByText(/operador/i);
    expect(select2).toBeInTheDocument();
    const input2 = screen.getByTestId('value-filter');
    expect(input2).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /filtrar/i });
    expect(button).toBeInTheDocument();
  });

  it('Verifica se a tabela é renderizada', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    )
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    const rows = await screen.findAllByRole('row');
    expect(rows[0]).toHaveTextContent(/name/i);
    expect(rows[0]).toHaveTextContent(/rotation period/i);
    expect(rows[0]).toHaveTextContent(/orbital period/i);
    expect(rows[0]).toHaveTextContent(/diameter/i);
    expect(rows[0]).toHaveTextContent(/climate/i);
    expect(rows[0]).toHaveTextContent(/gravity/i);
    expect(rows[0]).toHaveTextContent(/terrain/i);
    expect(rows[0]).toHaveTextContent(/surface water/i);
    expect(rows[0]).toHaveTextContent(/population/i);
    expect(rows[0]).toHaveTextContent(/films/i);
    expect(rows[0]).toHaveTextContent(/created/i);
    expect(rows[0]).toHaveTextContent(/edited/i);
    expect(rows[0]).toHaveTextContent(/url/i);
  });

  it('Verificando se a tabela é renderizada', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    )

    const planet1 = await screen.findByText(/alderaan/i);
    expect(planet1).toBeInTheDocument();

    const input1 = screen.getByText(/search/i);
    await waitFor(() => {
      userEvent.type(input1, 'o');
    });

    expect(planet1).not.toBeInTheDocument();
    const planet2 = await screen.findByText(/tatooine/i);
    expect(planet2).toBeInTheDocument();
    const planet3 = await screen.findByText(/naboo/i);
    expect(planet3).toBeInTheDocument();
    const getPlanet4 = await screen.findByText('Dagobah');
    expect(getPlanet4).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(1);
  });

  it('Verifica se os demais filtros estão funcionando', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    )

    const planet = await screen.findByText(/hoth/i);
    expect(planet).toBeInTheDocument();

    const planet1 = await screen.findByText(/alderaan/i);
    expect(planet1).toBeInTheDocument();

    const planet2 = await screen.findByText('Tatooine');
    expect(planet2).toBeInTheDocument();
    const planet3 = await screen.findByText('Naboo');
    expect(planet3).toBeInTheDocument();
    const planet4 = await screen.findByText('Dagobah');
    expect(planet4).toBeInTheDocument();
    const planet5 = await screen.findByText('Tatooine');
    expect(planet5).toBeInTheDocument();

    const column = screen.getByTestId('column-filter');
    const quantity = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(quantity, 'maior que');
    userEvent.type(value, '1000');
    userEvent.click(button);

    expect(planet).not.toBeInTheDocument();

    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(quantity, 'menor que');
    userEvent.type(value, '13000');
    userEvent.click(button);

    expect(planet2).toBeInTheDocument();
  });

});
