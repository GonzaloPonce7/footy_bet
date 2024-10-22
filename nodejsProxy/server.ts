import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:8100',
}));

// Middleware para loguear cada request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Ruta para el proxy
app.get('/proxy', async (req: Request, res: Response) => {
  const url = req.query['url'] as string;  // Asegura que `url` sea de tipo string
  // if (!url) {
  //   return res.status(400).send('Missing URL parameter');
  // }
  console.log(`Fetching data from: ${url}`); 

  try {
    const response = await axios.get(url, {
      headers: {
        //'X-Auth-Token': 'feab5e72ee94431db81526ae1dd56d58',
        'User-Agent': 'Mozilla/5.0'  
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    res.status(500).send('Error fetching data');
  }
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:8100');
});