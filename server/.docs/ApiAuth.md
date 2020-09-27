# Documentación API Auth
## Register

POST http://localhost:3000/api/auth/register
```json
{
    "firstName":"Nombre",
    "lastName":"Apellido",
    "email":"user1@gmail.com",
    "password":"123456789"
}
```

## Login

POST http://localhost:3000/api/auth/login
```json
{
    "email":"user1@gmail.com",
    "password":"123456789"
}
```
