import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Configuración de CORS para permitir solicitudes desde un origen específico
app.use(
  cors({
    origin: "http://localhost:8100",
  })
);

/**
 * @middleware requestLogger
 * @description Middleware para registrar cada solicitud HTTP que recibe el servidor.
 * Registra el método y la URL de cada solicitud.
 */
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

/**
 * @route GET /proxy
 * @description Endpoint para actuar como un proxy que envía solicitudes HTTP a una URL especificada en los parámetros.
 * Añade un encabezado de autenticación y retorna los datos recibidos de la URL solicitada.
 * @query {string} url - La URL a la que se envía la solicitud de proxy.
 */
app.get("/proxy", async (req, res) => {
  try {
    const url = req.query.url;
    console.log(`Fetching data from: ${url}`);

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", 
        "X-Auth-Token": "feab5e72ee94431db81526ae1dd56d58", 
      },
    });

    res.json(response.data); // Retorna los datos obtenidos de la URL
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    res.status(500).send("Error fetching data"); // Envía un error 500 si ocurre un fallo en la solicitud
  }
});

/**
 * @function listen
 * @description Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola.
 */
app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});