# Configuración del VPS para el equipo de desarrollo
# ⚠️ IMPORTANTE: Este archivo es solo para referencia, NO compartir credenciales en código

## 🖥️ Información del Servidor VPS
**IP del VPS:** 37.60.243.227

## 👤 Usuarios y Credenciales

### Super Usuario (root)
- **Usuario:** root
- **Contraseña:** SuperDupeMylove123
- **Comando SSH:** `ssh root@37.60.243.227`

### Usuario de Base de Datos del VPS
- **Usuario:** database
- **Contraseña:** LaTadaBase.1

### Usuario PostgreSQL de la aplicación
- **Base de datos:** bill
- **Usuario:** billuser
- **Contraseña:** BilluserSuperPassword

### Usuario de Deploy
- **Usuario:** bill
- **Contraseña:** BillPedro12.
- **Comando SSH:** `ssh bill@37.60.243.227`

## 🚀 URLs de Conexión

### Frontend Angular
- **URL de desarrollo:** http://localhost:4200
- **URL de producción:** Pendiente de configurar

### Backend Spring Boot
- **URL en VPS:** http://37.60.243.227:8090 ⚡ **PUERTO ACTUALIZADO**
- **API Base:** http://37.60.243.227:8090/api

### Endpoints disponibles
- **Obtener todas las facturas:** `GET http://37.60.243.227:8090/api/final-consumer/all`
- **Obtener por código de generación:** `GET http://37.60.243.227:8090/api/final-consumer/generation-code/{generationCode}`
- **Crear nueva factura:** `POST http://37.60.243.227:8090/api/final-consumer`

### Base de Datos PostgreSQL
- **Host:** 37.60.243.227
- **Puerto:** 5432 (estándar PostgreSQL)
- **Base de datos:** bill

## 📋 Comandos útiles

### Conectar al VPS por SSH
```bash
# Como usuario de deploy (recomendado)
ssh bill@37.60.243.227

# Como root (solo para administración)
ssh root@37.60.243.227
```

### Build para producción
```bash
# Construir aplicación Angular para producción
ng build --configuration=production

# Los archivos se generan en dist/
```

## 🔐 Notas de Seguridad
- Las credenciales deben manejarse con variables de entorno en producción
- Considerar implementar HTTPS/SSL en el futuro
- El acceso a la base de datos solo debe hacerse desde el backend