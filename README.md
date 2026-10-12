# FelinCan Reservas

Este es mi proyecto final de Backend I de Coderhouse. Elegí hacer un sistema de reservas de servicios para mascotas, como baños, cortes de pelo, cepillados y paseos.

El proyecto permite administrar los servicios y crear reservas con uno o varios servicios asociados. Lo desarrollé a partir de las preentregas del curso, integrando MongoDB, validaciones, vistas y actualizaciones en tiempo real.

Los servicios y precios cargados son ejemplos para probar la aplicación.

## Tecnologías utilizadas

Node.js, Express, MongoDB Atlas, Mongoose, Zod, Handlebars, Socket.io y dotenv. Para las vistas también utilicé HTML, CSS y JavaScript.

## Cómo ejecutar el proyecto

Es necesario tener Node.js y npm instalados, y una conexión a MongoDB Atlas.

1. Clonar o descargar el repositorio.
2. Abrir una terminal dentro de la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env`, tomando como referencia `.env.example`, y completar:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=tu_cadena_de_conexion_a_mongodb_atlas
MONGO_DB_NAME=felincan_reservas
```

La URI debe tener las credenciales de un usuario de la base de datos. También hay que habilitar en Atlas el acceso desde la IP del equipo.

5. Iniciar la aplicación:

```bash
npm start
```

Para trabajar con reinicio automático al guardar cambios:

```bash
npm run dev
```

Si la conexión funciona, la terminal muestra `MongoDB conectado` y el puerto del servidor.

## Organización del código

El proyecto sigue la estructura por capas trabajada en el curso:

routes → controllers → services → repositories → DAO → models

- Las rutas definen los endpoints y aplican los middlewares.
- Los controllers reciben las peticiones y devuelven las respuestas.
- Los services contienen las reglas de negocio.
- Los repositories conectan los services con los DAO.
- Los DAO realizan las operaciones con MongoDB.
- Los models definen la estructura de los documentos.

Las configuraciones están en `config`, los esquemas de Zod en `validators` y las validaciones de las peticiones en `middlewares`.

Las vistas están en `views`. Los estilos y el JavaScript del navegador están en `public`.

## Servicios

Cada servicio tiene nombre, descripción, duración, precio, categoría y disponibilidad. El identificador se genera automáticamente.

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/services` | Lista los servicios |
| GET | `/api/services/:sid` | Busca un servicio por su ID |
| POST | `/api/services` | Crea un servicio |
| PUT | `/api/services/:sid` | Actualiza un servicio |
| DELETE | `/api/services/:sid` | Elimina un servicio |

Ejemplo para crear un servicio:

```json
{
  "name": "Baño para perros",
  "description": "Baño y secado para perros",
  "duration": 45,
  "price": 15000,
  "category": "higiene",
  "available": true
}
```

La duración está expresada en minutos y el precio en pesos.

### Filtros, paginación y ordenamiento

El listado permite combinar estos parámetros:

```text
/api/services?category=higiene
/api/services?available=true
/api/services?page=1&limit=2
/api/services?sortBy=price&order=asc
/api/services?sortBy=duration&order=desc
```

Por ejemplo, para consultar servicios disponibles de higiene, ordenados por precio:

```text
/api/services?category=higiene&available=true&sortBy=price&order=asc
```

`page` y `limit` deben ser enteros positivos. Si no se envían, se utiliza la página 1 con un límite de 10 resultados.

Se puede ordenar por `price` o `duration`, usando `asc` o `desc`.

La respuesta incluye el listado en `payload` y los datos de paginación: `total`, `page`, `limit`, `totalPages`, `hasPrevPage` y `hasNextPage`.

## Reservas

| Método | Ruta | Qué hace |
|---|---|---|
| POST | `/api/bookings` | Crea una reserva |
| GET | `/api/bookings/:bid` | Consulta una reserva con sus servicios |
| POST | `/api/bookings/:bid/services/:sid` | Agrega un servicio a la reserva |
| PUT | `/api/bookings/:bid/services/:sid` | Modifica la cantidad |
| DELETE | `/api/bookings/:bid/services/:sid` | Quita un servicio de la reserva |
| DELETE | `/api/bookings/:bid/services` | Vacía los servicios de la reserva |

`bid` es el ID de la reserva y `sid` es el ID del servicio.

Ejemplo para crear una reserva:

```json
{
  "clientName": "Cliente de prueba",
  "clientEmail": "prueba@example.com",
  "date": "2026-10-20",
  "time": "10:00",
  "status": "pending"
}
```

La reserva se crea con un array de servicios vacío. Después se pueden agregar servicios existentes mediante sus IDs.

Los servicios asociados se guardan como referencias `ObjectId` junto con `quantity`. Si se agrega dos veces el mismo servicio, aumenta su cantidad en lugar de duplicar la entrada.

Para modificar una cantidad se envía este body:

```json
{
  "quantity": 3
}
```

La cantidad debe ser un número entero mayor o igual a 1.

Al consultar una reserva, se utiliza `populate` para mostrar los datos completos de cada servicio asociado.

Quitar un servicio de una reserva no lo borra del catálogo. Al vaciar una reserva, se conservan los datos del cliente, la fecha, la hora y el estado.

## Validaciones

Utilicé Zod para validar los datos antes de procesarlos. La creación de servicios desde Socket.io también pasa por el esquema de validación.

Se controlan campos obligatorios, tipos de datos, duración y precio, parámetros de consulta e identificadores. También se verifica que las cantidades sean positivas y enteras.

Email, fecha y hora se controlan como textos obligatorios. Esta versión no valida su formato específico ni comprueba si dos reservas se superponen.

La API responde con:

- `200` cuando la operación se realiza correctamente.
- `201` cuando se crea un recurso.
- `400` cuando los datos enviados son inválidos.
- `404` cuando no existe el recurso o la asociación.
- `500` cuando ocurre un error interno.

## Vistas y Socket.io

Con el servidor iniciado en el puerto 8080, se pueden abrir:

- [Catálogo de servicios](http://localhost:8080/views/services)
- [Servicios disponibles](http://localhost:8080/views/availability)

El catálogo incluye un formulario para agregar servicios. La otra vista muestra los que tienen disponibilidad activada.

Al crear un servicio desde el formulario, el servidor lo valida, lo guarda y avisa a los navegadores conectados. Las listas se actualizan sin recargar la página.

Para probarlo, se pueden abrir las dos vistas en pestañas distintas y crear un servicio disponible desde el catálogo.

Esta actualización automática funciona para la creación mediante el formulario de Socket.io. Los cambios realizados desde la API REST se ven al recargar.

Las vistas muestran hasta 100 servicios. Para recorrer el catálogo completo se puede utilizar la paginación de la API.

## Pruebas realizadas

Durante el desarrollo probé:

- Crear, consultar, modificar y eliminar servicios.
- Rechazar un precio negativo sin modificar el valor guardado.
- Filtrar, ordenar y paginar los resultados.
- Rechazar parámetros e identificadores inválidos.
- Crear reservas y asociarles servicios.
- Agregar el mismo servicio varias veces y comprobar su cantidad.
- Cambiar cantidades, quitar servicios y vaciar reservas.
- Consultar los servicios asociados mediante `populate`.
- Actualizar las vistas en dos pestañas sin recargar.
- Recargar las páginas y comprobar que los datos seguían guardados.

## Alcance del proyecto

Es un proyecto académico. Las reservas se gestionan mediante la API REST y las vistas permiten consultar y cargar servicios.

No incluye inicio de sesión, pagos ni un calendario de horarios libres. La disponibilidad indica si un servicio está habilitado para reservar.

El archivo `.env` y la carpeta `node_modules` están excluidos del repositorio. Para configurar el proyecto se incluye `.env.example`.