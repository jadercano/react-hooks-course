import { useState, useEffect, useReducer } from "react";
import { favoriteReducer } from "../reducers/favoriteReducer";

const initialState = {
  favorites: [],
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

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

      {characters.map((character) => (
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
