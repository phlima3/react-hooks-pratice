import { useEffect, useState } from "react";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async () => {
    const response = await fetch("https://api.github.com/users/phlima3/repos");
    const data = await response.json();
    setRepositories(data);
  };

  useEffect(() => {
    getRepositories();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo: any) => repo.favorite);
    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id: any) {
    const newRepositories = repositories.map((repo: any) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        {repositories.map((repo: any) => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
      =
    </>
  );
}
