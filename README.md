# Actions API

Una API REST simple para gestionar acciones de sostenibilidad y su impacto de carbono. Construida con Node.js, Express y soporte tanto para MongoDB como MySQL.

## ✨ Características

- **Operaciones CRUD:** Crea, Lee, Actualiza y Elimina acciones.
- **RESTful:** Sigue los principios de diseño REST para una API limpia y predecible.
- **Integración con MongoDB:** Utiliza Mongoose para un modelado de datos prolijo y una interacción fluida con la base de datos.
- **Integración con MySQL:** Utiliza `mysql2`.

## 🛠️ Tecnologías Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [CORS](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)

## 📋 Prerrequisitos

- Node.js (v18 o superior recomendado)
- npm o yarn pnpm
- Una cuenta de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o una instancia local de MongoDB.
- MySQL local o remoto

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

    PORT=puerto_a_utilizar
    Opcional: Indicar el puerto
    
    **Para MongoDB**
    ```
    MONGO_URI=tu_mongodb_connection_string
    ```
    Reemplaza `tu_mongodb_connection_string` con tu URI de conexión de MongoDB.

    **Para MySQL**
    ```
    MYSQL_DATABASE_HOST=
    MYSQL_DATABASE_USER=
    MYSQL_DATABASE_PORT=
    MYSQL_DATABASE_PASSWORD=
    MYSQL_DATABASE_NAME=
    ```
    Reemplaza con tus datos de configuración de MySQL.
    
5.  **Inicia el servidor:**

   **Correr en MongoDB**
    ```bash
    npm run dev:mongodb
    ```

    **Correr en MySQL**
    ```bash
    npm run dev:mysql
    ```
    
    El servidor estará corriendo en `http://localhost:{PORT}`.

# 📡 Endpoints de la API

Puedes encontrar y probar todos los endpoints en el archivo [`api.http`](./api.http) utilizando la extensión 'REST Client' para VS Code.

## Acciones

La URL base para estos endpoints es `/actions`.

### Obtener Todas las Acciones

-   **Endpoint:** `GET /actions`
-   **Descripción:** Recupera una lista de todas las acciones.
-   **Respuesta Exitosa:**
    -   **Código:** 200 OK
    -   **Contenido:** `[{ "_id": "...", "title": "...", ... }]`

### Obtener Acción por ID

-   **Endpoint:** `GET /actions/:id`
-   **Descripción:** Recupera una única acción por su ID.
-   **Respuesta Exitosa:**
    -   **Código:** 200 OK
    -   **Contenido:** `{ "_id": "...", "title": "...", ... }`
-   **Respuesta de Error:**
    -   **Código:** 404 Not Found (si la acción no existe)
    -   **Contenido:** `{ "error": "Action not found" }`
    -   **Código:** 400 Bad Request (si el formato del ID es inválido)
    -   **Contenido:** `{ "error": "Invalid ID format" }`

### Crear una Nueva Acción

- **Endpoint:** `POST /actions`
- **Descripción:** Crea una nueva acción. El cuerpo de la petición varía según la base de datos.
- **Cuerpo de la Petición (Request Body):**

  - **Para MongoDB:** Se usa la clave `category` y se pasa el **nombre** de la categoría como un `string`. Debe ser uno de los siguientes valores: 'energía', 'transporte', 'reciclaje', 'alimentación', 'agua', 'otros'.
    ```json
    {
      "title": "Usar lamparas LED de bajo consumo",
      "description": "Reemplazar bombillas incandescentes por LED.",
      "carbon": 2,
      "category": "energía"
    }
    ```
  - **Para MySQL:** Se usa la clave `categoryId` y se pasa el **UUID** de la categoría.
    ```json
    {
      "title": "Juntar agua de lluvia para regar",
      "description": "Aprovechar el agua de lluvia para el riego de plantas y jardín.",
      "carbon": 1,
      "categoryId": "8b6b9a1c-555e-11f0-b7f9-7085c2cd2972"
    }
    ```
- **Respuesta Exitosa:**
  - **Código:** 201 Created
  - **Contenido:** El objeto de la acción recién creada.

### Actualizar una Acción

-   **Endpoint:** `PUT /actions/:id`
-   **Descripción:** Actualiza una acción existente por su ID.
-   **Cuerpo de la Petición (Request Body):**
    ```json
    {
      "description": "Una descripción actualizada."
    }
    ```
-   **Respuesta Exitosa:**
    -   **Código:** 200 OK
    -   **Contenido:** El objeto de la acción actualizada.

### Eliminar una Acción

-   **Endpoint:** `DELETE /actions/:id`
-   **Descripción:** Elimina una acción por su ID.
-   **Respuesta Exitosa:**
    -   **Código:** 200 OK
    -   **Contenido:** `{ "message": "Action '...' deleted successfully" }`

---

*SOLO EN MYSQL*

## Categorías

La URL base para estos endpoints es `/categories`.

### Obtener Todas las Categorías

-   **Endpoint:** `GET /categories`
-   **Descripción:** Recupera una lista de todas las categorías.
-   **Respuesta Exitosa:**
    -   **Código:** 200 OK
    -   **Contenido:** `[{ "id": 1, "name": "energía" }, ...]`

### Obtener Categoría por ID

-   **Endpoint:** `GET /categories/:id`
-   **Descripción:** Recupera una única categoría por su ID.
-   **Respuesta Exitosa:**
    -   **Código:** 200 OK
    -   **Contenido:** `{ "id": 1, "name": "energía" }`
-   **Respuesta de Error:**
    -   **Código:** 404 Not Found (si la categoría no existe)
    -   **Contenido:** `{ "error": "Category not found" }`
    -   **Código:** 400 Bad Request (si el formato del ID es inválido)
    -   **Contenido:** `{ "error": "Invalid ID format" }`

### Crear una Nueva Categoría

-   **Endpoint:** `POST /categories`
-   **Descripción:** Crea una nueva categoría.
-   **Cuerpo de la Petición (Request Body):**
    ```json
    {
      "name": "transporte"
    }
    ```
-   **Respuesta Exitosa:**
    -   **Código:** 201 Created
    -   **Contenido:** El objeto de la categoría recién creada.

### Actualizar una Categoría

-   **Endpoint:** `PUT /categories/:id`
-   **Descripción:** Actualiza una categoría existente por su ID.
-   **Cuerpo de la Petición (Request Body):**
    ```json
    {
      "name": "transporte sostenible"
    }
    ```
-   **Respuesta Exitosa:**
    -   **Código:** 200 OK
    -   **Contenido:** El objeto de la categoría actualizada.

### Eliminar una Categoría

-   **Endpoint:** `DELETE /categories/:id`
-   **Descripción:** Elimina una categoría por su ID.
-   **Respuesta Exitosa:**
    -   **Código:** 200 OK
    -   **Contenido:** `{ "message": "Category '...' deleted successfully" }`
