const express = require('express');
const jwplayerScraper = require('jwplayer-scraper');
const cors = require('cors');  // Agregar CORS

const app = express();
app.use(cors());  // Habilitar CORS para todas las solicitudes

app.get('/api', async (req, res) => {
  const { url } = req.query;  // Obtener la URL desde los parámetros de la URL

  if (!url) {
    return res.status(400).json({ error: 'Falta el parámetro "url"' });
  }

  try {
    const mediaSources = await jwplayerScraper.getMediaSources(url);
    res.json(mediaSources);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los medios', details: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
