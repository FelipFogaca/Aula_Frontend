import { useEffect, useState } from "react";
import api from './services/api';

function App() {
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchShows(searchTerm) {
    try {
      setError('');
      setLoading(true);
      const response = await api.get(searchTerm);
      setShows(response.data);
    } catch (error) {
      setError('Não foi possível carregar os dados da API', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchShows();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Digite um titulo para pesquisar");
      return;
    }

    fetchShows(query);
  }

  function handleClear() {
    setQuery('');
    setShows([]);
    setError('');
  }

  function removeHtmlTags(text) {
    return text.replace(/<[^>]*>/g, '');
  }
  return (
    <main className="container">
      <h1><b>Consumo de API com React</b></h1>

      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="query">PESQUISAR POR TÍTULO </label>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(event => setQuery(event.target.value))}
          placeholder="Star wars, Simpsons..."
        />
        <button type="submit">Pesquisar</button>
        <button type="button" onClick={handleClear}>
          Limpar
        </button>
      </form>
      {loading && <p>Carregando Dados...</p>}
      {error && <p>{error}</p>}

      <ul className="show-list">
        {shows.map((item) => (
          <li key={item.show.id} className="show-card">
            <h2>{item.show.name}</h2>

            {item.show.image?.medium ? (
              <img
                src={item.show.image.medium}
                alt={`Capa de ${item.show.name}`}
              />
            ) : (
              <div className="no-image">Sem imagem</div>
            )}

            <p>
              <strong>Nota: </strong>
              {item.show.rating?.average ?? 'Sem avaliação'}
            </p>

            {item.show.summary && (
              <p className="show-summary">
                {removeHtmlTags(item.show.summary)}
              </p>
            )}

            <p>
              <strong>Link: </strong>
              <a href={item.show.url} target="_blank" rel="noreferrer">
                Acessar a página do card
              </a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App;