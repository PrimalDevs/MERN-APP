# Documentación Auth 📥
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

## Verify OTP
POST http://localhost:3000/api/auth/verify-otp
```json
{
    "email":"user1@gmail.com",
    "otp":"ESTE-CODIGO-CAMBIA"
}
```

## Resend OTP
POST http://localhost:3000/api/auth/resend-verify-otp
```json
{
    "email":"user1@gmail.com",
}
```
