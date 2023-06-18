const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'club_fans_barcelona_fc',
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Middleware para procesar los datos enviados en el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para procesar el formulario
app.post('/procesar-formulario', (req, res) => {
  const { nombreApellido, correoElectronico, fechaNacimiento, detalleUsuario } = req.body;

  // Insertar los datos en la base de datos
  const sql = `INSERT INTO usuarios (nombreApellido, correoElectronico, fechaNacimiento, detalleUsuario) 
               VALUES (?, ?, ?, ?)`;
  connection.query(sql, [nombreApellido, correoElectronico, fechaNacimiento, detalleUsuario], (error, results) => {
    if (error) {
      console.error('Error al insertar los datos: ' + error.stack);
      return res.status(500).send('Error al insertar los datos en la base de datos');
    }

    return res.send('Datos insertados correctamente en la base de datos');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Node.js iniciado en http://localhost:${port}`);
});
