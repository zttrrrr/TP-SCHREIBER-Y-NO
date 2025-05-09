import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors


const app  = express();
const port = 3000;              // El puerto 3000 (http://localhost:3000)

// Agrego los Middlewares
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//a1
app.get('/', (req, res) => {     // EndPoint "/saludar"
    res.send('Hello World!');
    res.status(200).send("OK")
})

//a2
app.get('/saludar/:nombre', (req, res) => {  // EndPoint "/saludar"
    const nombre = req.params.nombre;  
    res.status(200).send(`Hola ${nombre}`);  
});

//a3
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    const { ano, mes, dia } = req.params;
    const fecha = `${ano}-${mes}-${dia}`;
    const tiempo = Date.parse(fecha);

    if (isNaN(tiempo)) {
        res.status(400).send('Fecha inválida');
    } else {
        res.status(200).send('Fecha válida');
    }
});

//b1
app.get('/matematica/sumar', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    res.status(200).send({ resultado: matematica.sumar(n1, n2) });
  });
  
  //b2
  app.get('/matematica/restar', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    res.status(200).send({ resultado: matematica.restar(n1, n2) });
  });
  
  //b3
  app.get('/matematica/multiplicar', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    res.status(200).send({ resultado: matematica.multiplicar(n1, n2) });
  });
  
  //b4
  app.get('/matematica/dividir', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (n2 === 0) {
      return res.status(400).send("El divisor no puede ser cero");
    }
    res.status(200).send({ resultado: matematica.dividir(n1, n2) });
  });
  
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });


// c1) 
app.get('/omdb/searchbypage', async (req, res) => {
    const { search, p } = req.query;
    try {
      const resultados = await omdb.searchByPage(search, p);
      res.status(200).send(resultados); 
    } catch (error) {
      res.status(500).send('Error en búsqueda por página');
    }
  });
  
  // c2) 
  app.get('/omdb/searchcomplete', async (req, res) => {
    const { search } = req.query;
    try {
      const resultados = await omdb.searchComplete(search);
      res.status(200).send(resultados); 
    } catch (error) {
      res.status(500).send('Error en búsqueda completa');
    }
  });
  
  // c3) 
  app.get('/omdb/getbyomdbid', async (req, res) => {
    const { imdbID } = req.query;
    try {
      const resultado = await omdb.getByOmdbId(imdbID);
      res.status(200).send(resultado); 
    } catch (error) {
      res.status(500).send('Error al buscar por IMDb ID');
    }
  });
  
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });


//d
const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido"  , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao"    , "32623391", 18));

app.use(express.json());

// d1) 
app.get('/alumnos', (req, res) => {
  res.status(200).send(alumnosArray);
});

// d2) 
app.get('/alumnos/:dni', (req, res) => {
  const { dni } = req.params;
  const alumno = alumnosArray.find(a => a.dni === dni);

  if (alumno) {
    res.status(200).send(alumno);
  } else {
    res.status(404).send('Alumno no encontrado');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// d4) DELETE "/alumnos" - Eliminar por DNI recibido en el body
app.delete('/alumnos', (req, res) => {
    const { dni } = req.body;
  
    const index = alumnosArray.findIndex(a => a.dni === dni);
  
    if (index !== -1) {
      alumnosArray.splice(index, 1); // Elimina al alumno en esa posición
      res.status(200).send('Alumno eliminado exitosamente');
    } else {
      res.status(404).send('Alumno no encontrado');
    }
  }); 