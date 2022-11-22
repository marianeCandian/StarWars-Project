const requestFetch = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    return results;
  } catch (e) {
    throw new Error(e.detail);
  }
};

export default requestFetch;
