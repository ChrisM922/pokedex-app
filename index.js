// index.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (if you add CSS/images)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <form action="/pokemon" method="get">
      <input name="name" placeholder="Enter name or ID" required />
      <button>Search</button>
    </form>
  `);
});

app.get('/pokemon', async (req, res) => {
  const query = req.query.name.toLowerCase();
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const { name, sprites, types, stats } = data;
    res.send(`
      <h1>#${data.id} ${name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <img src="${sprites.front_default}" alt="${name}" />
      <p>Types: ${types.map(t => t.type.name).join(', ')}</p>
      <ul>
        ${stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('')}
      </ul>
      <p><a href="/">Search another</a></p>
    `);
  } catch (err) {
    res.status(404).send(`
      <h1>Not found</h1>
      <p>Couldn't fetch "${query}". Try another name or ID.</p>
      <p><a href="/">Back</a></p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
