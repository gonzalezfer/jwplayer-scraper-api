const express = require('express');
const jwplayerScraper = require('jwplayer-scraper');

const app = express();
app.use(express.json());

app.post('/scrape-video', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Falta la URL del video' });
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
