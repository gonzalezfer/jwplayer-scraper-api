const express = require('express');
const jwplayerScraper = require('jwplayer-scraper');
const cors = require('cors');

const app = express();
app.use(cors());  // Habilitar CORS

app.get('/api', async (req, res) => {
  const { url } = req.query;  // Obtener la URL desde los parámetros de la URL

  // Verificar si la URL fue proporcionada
  if (!url) {
    return res.status(400).json({ error: 'Falta el parámetro "url"' });
  }

  try {
    // Intentar raspar los medios de la URL proporcionada
    const mediaSources = await jwplayerScraper.getMediaSources(url);

    // Si no hay fuentes de medios, retornar un mensaje
    if (!mediaSources || mediaSources.length === 0) {
      return res.status(404).json({ error: 'No se encontraron fuentes de medios para esta URL.' });
    }

    // Responder con los datos obtenidos
    res.json(mediaSources);
  } catch (error) {
    // En caso de error, imprimirlo y devolver un mensaje
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno al obtener los medios', details: error.message });
  }
});

module.exports = app;  // Exportar la función para que Vercel la ejecute
