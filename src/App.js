import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [chosen, setChosen] = useState(false);
  const [attribute, setAttribute] = useState({
    name: "",
    species: "",
    img: "",
    type: "",
    hp: "",
    attack: "",
    defense: "",
  });

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        setAttribute({
          name: pokemonName,
          species: res.data.species.name,
          img: res.data.sprites.front_default,
          type: res.data.types[0].type.name,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
        });
        setChosen(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPokemon();
    setPokemonName("");
  };

  return (
    <div className="App">
      <div className="header">
        <h1>PoKéMoN</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Type Pokémon name in LOWERCASE..."
            className="input"
            onChange={(e) => {
              setPokemonName(e.target.value);
            }}
            value={pokemonName}
          ></input>
          <button className="button" type="submit">
            Search Pokémon
          </button>
        </form>
      </div>
      <div className="black" />
      <div className="display">
        {!chosen ? (
          <h1>Please Choose a Pokémon</h1>
        ) : (
          <div className="all">
            <img src={attribute.img} alt="" className="photo" />
            <h1 className="name">{attribute.name}</h1>
            <h2>Type: {attribute.type}</h2>
            <h2>Hp: {attribute.hp}</h2>
            <h2>Attack: {attribute.attack}</h2>
            <h2>Defense: {attribute.defense}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
