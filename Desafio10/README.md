## Información del proyecto

El proyecto está formado por varias APIs: `session`, `carts`, `products`, `tickets` y `messages`. Para acceder a cada una de ellas, la URL es `/api/nombreApi/metodo`.

El proyecto puede trabajar tanto con MongoDB como con persistencia en archivos. Esto se define en la variable `PERSISTENCE` del archivo `.env` y utiliza el patrón Factory para alternar entre ellos.

## Usuario administrador

El usuario administrador tiene las siguientes credenciales:

- Email: adminCoder@coder.com
- Contraseña: adminCod3r123

## Rutas

- La ruta `/api/products/mockProducts` devuelve 100 productos como si fuera una petición a MongoDB. No realiza ninguna modificación.
- La ruta `/loggerTest` muestra un logger de cada tipo.
- La ruta /apidocs brinda información adicional sobre las rutas de las APIs carts y products

## Detalles

Para que el servidor esté en producción y no muestre los loggers, la variable `LOGGER` en el archivo `.env` debe establecerse como "PRODUCTION".
