# Proyecto de Autenticación y Autorización Básica

## Características implementadas:
- Registro e inicio de sesión con contraseñas hasheadas (bcrypt).
- JWT en cookie HttpOnly (SameSite=Strict, Secure).
- Middleware de autenticación y autorización por roles (admin/usuario).
- Rutas protegidas según permisos (CRUD de posts).

## Instrucciones de ejecución:
1. Clonar este proyecto y ejecutar `npm install express mongoose bcrypt jsonwebtoken helmet cookie-parser express-rate-limit dotenv`.
2. Configurar un `.env` con:
   - `MONGO_URL=mongodb://localhost:27017/proyecto_auth`
   - `JWT_SECRET=unasecretoseguro`
   - `PORT=3000`
3. Iniciar el servidor con `node server.js`.
4. Probar las rutas con Postman o curl:
   - POST `/auth/register` {username, password}
   - POST `/auth/login` {username, password}
   - GET `/posts` (requiere estar autenticado)
   - POST `/posts` (requiere rol admin)
