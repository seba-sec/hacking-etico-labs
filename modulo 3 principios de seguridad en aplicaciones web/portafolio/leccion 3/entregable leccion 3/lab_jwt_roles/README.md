# Laboratorio: Autenticación y Autorización con JWT y Roles

## Características
- Registro con contraseñas **hasheadas** (bcrypt).
- Login que emite **JWT** con **expiración** y **rol**.
- Protección de rutas con **requireAuth** y control de acceso con **requireRole**.
- Cookie **HttpOnly + SameSite=Strict + Secure** (modo web) o **Authorization: Bearer** (modo API).
- **Helmet** y **rate limiting** para endurecer endpoints de autenticación.

## Pasos
1. `npm init -y`
2. `npm i express mongoose bcrypt jsonwebtoken helmet express-rate-limit cookie-parser dotenv`
3. Copia `.env.example` a `.env` y ajusta valores.
4. Inicia: `node server.js`

## Pruebas rápidas (curl)
```bash
# Registro
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json"  -d '{"username":"alice","password":"ClaveSegura12345"}'

# Login (Bearer)
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json"  -d '{"username":"alice","password":"ClaveSegura12345","bearer":true}'

# Usar token
curl http://localhost:3000/projects -H "Authorization: Bearer <TOKEN>"
```
