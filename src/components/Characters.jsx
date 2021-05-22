import {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { favoriteReducer } from "../reducers/favoriteReducer";
import Search from "./Search";

const initialState = {
  favorites: [],
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  //   const handleSearch = () => {
  //     setSearch(searchInput.current.value);
  //   };

  const handleSearchCallback = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteredCharacters = () => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const memoFilteredCharacters = useMemo(filteredCharacters, [
    characters,
    search,
  ]);

  const handleAddToFavorites = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: favorite });
  };

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  return (
    <div className="Characters">
      {favorites.favorites.map((character) => (
        <li key={character.id}>{character.name}</li>
      ))}

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearchCallback}
      />

      {memoFilteredCharacters.map((character) => (
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          <button type="button" onClick={() => handleAddToFavorites(character)}>
            Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default Characters;
