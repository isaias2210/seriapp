const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Base de datos de ejemplo (en memoria)
const users = [
  { usuario: 'admin', contrasena: 'adminpass' },
];

// Ruta para la página principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página principal!');
});

// Ruta para la página de registro
app.get('/registro', (req, res) => {
  res.sendFile(__dirname + '/registro.html');
});

// Ruta para procesar el formulario de registro
app.post('/registro', (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).send('Datos incompletos');
  }

  users.push({ usuario, contrasena });

  // Redirigir a la página de usuario con mensaje de éxito usando JavaScript
  res.send('<script>alert("Registrado con éxito"); window.location.href = "/pantalla_usuario.html";</script>');
});

// Ruta para la página de inicio de sesión
app.get('/inicia_sesion.html', (req, res) => {
  res.sendFile(__dirname + '/inicia_sesion.html');
});

// Ruta para procesar el formulario de inicio de sesión
app.post('/inicia_sesion', (req, res) => {
  const { usuario, contrasena } = req.body;

  const user = users.find(u => u.usuario === usuario && u.contrasena === contrasena);

  if (!user) {
    return res.status(401).send('Credenciales incorrectas');
  }

  // Si las credenciales son las del administrador, redirigir a pantalla_admin.html
  if (usuario === 'admin' && contrasena === 'adminpass') {
    return res.redirect('/pantalla_admin.html');
  }

  // Redirigir a la pantalla de usuario
  res.redirect('/pantalla_usuario.html');
});

// Ruta para la pantalla de administrador
app.get('/pantalla_admin.html', (req, res) => {
  res.sendFile(__dirname + '/pantalla_admin.html');
});

// Ruta para la pantalla de usuario
app.get('/pantalla_usuario.html', (req, res) => {
  // Obtener el mensaje de la URL (si hay uno)
  const mensaje = req.query.mensaje || 'Bienvenido a la pantalla de usuario';
  res.send(`<p>${mensaje}</p>`);
});

// Iniciar el servidor
app.listen(port, '192.168.56.1', () => {
  console.log(`Servidor escuchando en http://192.168.56.1:${port}`);
});
