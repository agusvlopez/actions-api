# Actions API

Una API REST simple para gestionar acciones de sostenibilidad y su impacto de carbono. Construida con Node.js, Express y MongoDB.

## ✨ Características

- **Operaciones CRUD:** Crea, Lee, Actualiza y Elimina acciones.
- **RESTful:** Sigue los principios de diseño REST para una API limpia y predecible.
- **Integración con MongoDB:** Utiliza Mongoose para un modelado de datos prolijo y una interacción fluida con la base de datos.

## 🛠️ Tecnologías Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [CORS](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)

## 📋 Prerrequisitos

- Node.js (v18 o superior recomendado)
- npm o yarn pnpm
- Una cuenta de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o una instancia local de MongoDB.

## 🚀 Instalación y Paso a paso

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/actions-api.git
    cd actions-api
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto. Puedes usar el archivo `.env.example` como plantilla.

    ```
    PORT=puerto_a_utilizar
    MONGO_URI=tu_mongodb_connection_string
    ```
    Reemplaza `tu_mongodb_connection_string` con tu URI de conexión de MongoDB.
    Opcional: Indicar el puerto

5.  **Inicia el servidor:**
    ```bash
    npm start
    ```
    El servidor estará corriendo en `http://localhost:{PORT}`.

## 📡 Endpoints de la API

Podes encontrar y probar todos los endpoints en el archivo [`api.http`](./api.http) utilizando la extensión 'REST Client' para VS Code
La URL base para todos los endpoints es `/actions`.

### Obtener Todas las Acciones

- **Endpoint:** `GET /actions`
- **Descripción:** Recupera una lista de todas las acciones.
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Contenido:** `[{ "_id": "...", "title": "...", ... }]`

### Obtener Acción por ID

- **Endpoint:** `GET /actions/:id`
- **Descripción:** Recupera una única acción por su ID.
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Contenido:** `{ "_id": "...", "title": "...", ... }`
- **Respuesta de Error:**
  - **Código:** 404 Not Found (si la acción no existe)
  - **Contenido:** `{ "error": "Action not found" }`
  - **Código:** 400 Bad Request (si el formato del ID es inválido)
  - **Contenido:** `{ "error": "Invalid ID format" }`

### Crear una Nueva Acción

- **Endpoint:** `POST /actions`
- **Descripción:** Crea una nueva acción.
- **Cuerpo de la Petición (Request Body):**
  ```json
  {
    "title": "Usar lamparas LED de bajo consumo",
    "description": "Reemplazar bombillas incandescentes por LED.",
    "carbon": 2,
    "category": "energía"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 201 Created
  - **Contenido:** El objeto de la acción recién creada.

### Actualizar una Acción

- **Endpoint:** `PUT /actions/:id`
- **Descripción:** Actualiza una acción existente por su ID.
- **Cuerpo de la Petición (Request Body):**
  ```json
  {
    "description": "Una descripción actualizada."
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Contenido:** El objeto de la acción actualizada.

### Eliminar una Acción

- **Endpoint:** `DELETE /actions/:id`
- **Descripción:** Elimina una acción por su ID.
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Contenido:** `{ "message": "Action '...' deleted successfully" }`

