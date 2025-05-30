// index.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (if you add CSS/images)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('/background.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        font-family: 'Press Start 2P', system-ui, -apple-system, sans-serif;
      }
      .pokedex-container {
        position: relative;
        width: 800px;
        height: 600px;
        background-image: url('/pokedex.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pokedex-screen {
        position: absolute;
        top: 145px;
        left: 50px;
        width: 320px;
        height: 266px;
        background: #b6fcd5;
        border: 4px solid #222;
        border-radius: 8px;
        box-shadow: 0 0 0 4px #6ad1a7, 0 0 0 8px #222;
        padding: 8px 12px;
        box-sizing: border-box;
        overflow-y: auto;
        font-size: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }
      .search-form {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
      }
      input[name="name"] {
        width: 120px;
        padding: 2px 6px;
        border: 2px solid #333;
        border-radius: 2px;
        font-family: inherit;
        font-size: 10px;
        background: #e0ffe0;
        margin-right: 4px;
      }
      button {
        padding: 2px 10px;
        background-color: #ff0000;
        color: white;
        border: 2px solid #333;
        border-radius: 2px;
        cursor: pointer;
        font-family: inherit;
        font-size: 10px;
        text-transform: uppercase;
      }
      button:hover {
        background-color: #cc0000;
      }
      .pokemon-info {
        text-align: center;
        width: 100%;
      }
      .pokemon-info h1 {
        font-size: 1em;
        margin: 4px 0 6px 0;
        letter-spacing: 1px;
      }
      .pokemon-info img {
        image-rendering: pixelated;
        width: 96px;
        height: 96px;
      }
      .pokemon-info p {
        margin: 4px 0;
        font-size: 0.9em;
      }
      .pokemon-info ul {
        list-style: none;
        padding: 0;
        margin: 6px 0 0 0;
        text-align: left;
        font-size: 0.85em;
      }
      .pokemon-info li {
        margin: 2px 0;
      }
      .error-message {
        color: #ff0000;
        text-align: center;
        font-size: 0.9em;
        margin-top: 12px;
      }
    </style>
    <div class="pokedex-container">
      <div class="pokedex-screen">
        <div class="search-form">
          <form action="/pokemon" method="get">
            <input name="name" placeholder="Name or ID" required autocomplete="off" />
            <button>Search</button>
          </form>
        </div>
        <div id="result" class="pokemon-info"></div>
      </div>
    </div>
    <script>
      document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('input[name="name"]').value;
        const response = await fetch('/pokemon?name=' + name);
        const data = await response.json();
        const resultDiv = document.getElementById('result');
        if (response.ok) {
          resultDiv.innerHTML =
            '<h1>#' + data.id + ' ' + data.name + '</h1>' +
            '<img src="' + data.sprite + '" alt="' + data.name + '" />' +
            '<p>Types: ' + data.types.join(', ') + '</p>' +
            '<ul>' + data.stats.map(s => '<li>' + s.name + ': ' + s.value + '</li>').join('') + '</ul>';
        } else {
          resultDiv.innerHTML = '<p class="error-message">' + data.error + '</p>';
        }
      });
    </script>
  `);
});

app.get('/pokemon', async (req, res) => {
  const query = req.query.name.toLowerCase();
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const { name, sprites, types, stats } = data;
    res.json({
      id: data.id,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      sprite: sprites.front_default,
      types: types.map(t => t.type.name),
      stats: stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
    });
  } catch (err) {
    res.status(404).json({ error: `Couldn't fetch "${query}". Try another name or ID.` });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});