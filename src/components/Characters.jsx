import { useState, useReducer, useMemo, useRef, useCallback } from "react";
import useCharaters from "../hooks/useCharaters";
import { favoriteReducer } from "../reducers/favoriteReducer";
import Search from "./Search";

const initialState = {
  favorites: [],
};

const API = "https://rickandmortyapi.com/api/character";

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const characters = useCharaters(API);

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
