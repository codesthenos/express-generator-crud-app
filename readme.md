# CRUD API siguiendo el video: [Fazt Code video](https://www.youtube.com/watch?v=NmkY4JgS21A)

## Scaffolding del proyecto usando [my custom template](https://github.com/codesthenos/express-generator-standard-template) coming from edit one created using [`npx express-generator . --view=ejs`](https://github.com/expressjs/generator)

## Ruta de desarrollo

1.  **Scaffolding** del proyecto usando **`npx express-generator nodepop --ejs`**, este comando nos crea una estructura de carpetas y archivos inciales y el **`package.json`** con las dependencias:

    - ["cookie-parser"](https://www.npmjs.com/package/cookie-parser)

      _middleware_ que nos permite acceder a las cookies enviadas por el cliente

    - ["debug"](https://www.npmjs.com/package/debug)

      _funcion_ que nos permite controlar que _logs_ mostramos usando la variable de entorno _DEBUG_

    - ["ejs"](https://www.npmjs.com/package/ejs)

      _view engine_ que nos permite insertar javascript en el _HTML_

    - ["express"](https://www.npmjs.com/package/express)

      _framework_ que, entre otras cosas, nos facilita el manejo de _rutas_ y _middlewares_

    - ["http-errors"](https://www.npmjs.com/package/http-errors)

      _funcion_ que nos facilita la creacion de _errores_

    - ["morgan"](https://www.npmjs.com/package/morgan)

      _middleware_ que nos muestra _logs_ de las _request_

    **Actualizo** las dependencias para tratar las **vulnerabilities** que este _scaffolding_ tenia por defecto

2.  Edito el **Script** `"start"` para arrancar el servidor usando `node --watch` y creo _Scripts_ para arrancar el servidor en modo **dev** y modo **debug**:

    - `"dev": "cross-env PORT=4444 npm start"`

    - `"debug": "cross-env PORT=5555 DEBUG=npx-express-generator-ejs:* npm start"`

    [`npm i cross-env`](https://www.npmjs.com/package/cross-env) para que las variables de entorno se lean bien en todos los sistemas

3.  Configuro [**standard**](https://standardjs.com/) incluyendo la _propiedad_ `"eslintConfig": { "extends": "standard" }` en el _package.json_ e instalando la dependencia usando [`npm i standard -D`](https://www.npmjs.com/package/standard), como herramienta para:

    - **linting**: conjunto de reglas que ayudan al control de errores mientras escribimos codigo

    - **formateo**: reglas especificas de como se ha de colocar el codigo, indentado, puntos y comas...

    Creo **script** `"lint": "standard"` para obtener en consola el resultado del lintado detallado

    Configuro el _VSCode_ para que cada vez que guardo automaticamente se apliquen los cambios provinientes de los _warnings_ de **standard**

4.  Migracion de **CommonJS Modules** a **ECMASCRIPT Modules**:

    - Incluyo la propiedad `"type": "module"` en el _top level_ del **package.json**

    - Cambio `__dirname` por `import.meta.dirname` en **app.js**
    - Cambio todos los `require` y `module.exports` por `import from` y `export, export default`
    - La sintaxis de usar la _libreria_ **debug** cambia:

      - **Antes** una sola linea:

             const debug = require('debug')('npx-express-generator-ejs:server')

      - **Ahora** dos lineas:

             import debugLib from 'debug'
             const debug = debugLib('npx-express-generator-ejs:server')

5.  Instalo en mi ordenador [MongoDB Community Server](https://www.mongodb.com/try/download/community-kubernetes-operator) y creo una conexion

6.  Instalo [**mongoose**](https://mongoosejs.com/) usando [`npm i mongoose`](https://www.npmjs.com/package/mongoose):

    - Creo una _async funcion_ para conectar la **base de datos** usando `mongoose.connect('<URI>')`

    - La importo en el archivo **www** y la uso justo antes del `server.listen(PORT)`

7.  Creo **userSchema** usando `mongoose.Schema({<properties and constraints>})` y exporto el modelo `mongoose.model('User', userSchema)`

8.  Creo **auth.routes.js** dentro de _routes_ donde voy a definir las rutas con **autenticacion**, tanto la de _registro_ como la de _login_

9.  Uso el **router** the _auth.routes.js_ an **app.js** `app.use('/api', authRouter)`

10. Defino las funciones de **registro** y **login** en la carpeta _controllers_:

    **Registro**:

    - Obtengo los datos del **req.body**

    - Compruebo si el _usuario_ ya existe para lanzar un error de **bad request**
    - Encripto la _password_ antes de enviarla a la **base de datos** usando la funcion _bcrypt_ importada del modulo [`npm i bcryptjs`](https://www.npmjs.com/package/bcryptjs)
    - Creo nuevo _usuario_ con los datos del **req.body**
    - utilizo el `.save()` de _mongoose_ para guardar el registro en la **base de datos**
    - Creo **token** usando la funcion _jwt_ importada de [`npm i jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken)
    - Creo una **cookie** usando `res.cookie('token', token)`, funcion de _express_ con la info del **token**
    - Devuelvo los datos que necesitare en la **view** con `res.status(200).json(<data>)` funcion de _express_

    **LogIn**:

    - Obtengo los datos del **req.body**

    - Compruebo si el _usuario_ ya existe para lanzar un error de **bad request**
    - Comparo la _password_ enviarda con la de la **base de datos** usando la funcion _bcrypt.compare()_ importada del modulo [`npm i bcryptjs`](https://www.npmjs.com/package/bcryptjs)
    - Creo **token** usando la funcion _jwt_ importada de [`npm i jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken)
    - Creo una **cookie** usando `res.cookie('token', token)`, funcion de _express_ con la info del **token**
    - Devuelvo los datos que necesitare en la **view** con `res.status(200).json(<data>)` funcion de _express_

    **LogOut**:

    - Limpiamos el la cookie **token** usando `res.clearCookie('token')`
