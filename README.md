# PreEntrega 8

Sistema Backend de Turnos y Reservas con consultas avanzadas, validaciones con Zod y populate.

## Ejecución

1. Ejecutar `npm install`.
2. Crear `.env` usando `.env.example` como referencia.
3. Ejecutar `npm start`.

## Servicios

Ejemplos:

- `GET /api/services?category=salud`
- `GET /api/services?available=true`
- `GET /api/services?page=1&limit=5`
- `GET /api/services?sortBy=price&order=asc`
- `GET /api/services?category=salud&available=true&page=1&limit=5&sortBy=price&order=asc`

La respuesta incluye `total`, `page`, `limit`, `totalPages`, `hasPrevPage` y `hasNextPage`.

## Validaciones

Se usa Zod antes de los controllers para validar:

- creación de servicios;
- actualización de servicios;
- creación de reservas;
- parámetros al agregar un servicio a una reserva.

Los datos inválidos responden con status 400.

## Reservas y populate

Los servicios asociados se guardan como referencia `ObjectId` junto con `quantity`.

`GET /api/bookings/:bid` usa `populate("services.service")` para devolver los datos completos de cada servicio asociado.
