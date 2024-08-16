# 1° Proyecto Web 2 Client

Este proyecto fue desarrollado durante el primer cuatrimestre del año 2024 como parte del curso Web 2. Es la parte del frontend de una aplicación web que permite a los padres de familia gestionar el contenido que ven sus hijos en una plataforma similar a Netflix. La aplicación está construida utilizando React, SCSS, HTML y CSS.

## Descripción del Proyecto

El "1° Proyecto Web 2 Client" es una aplicación frontend diseñada para que los padres de familia puedan controlar y gestionar los perfiles de sus hijos. Cada usuario puede tener hasta seis perfiles, y cada perfil puede tener una playlist de videos de YouTube. La aplicación permite a los usuarios registrar una cuenta, iniciar sesión, crear y gestionar perfiles, y administrar la playlist asociada a cada perfil.

### Características Principales

- **Registro de Usuario:** Permite a los padres de familia crear una cuenta en la plataforma ingresando información como nombre, apellido, email, contraseña, país, y un PIN de seguridad. 
- **Inicio de Sesión:** Los usuarios pueden iniciar sesión utilizando su email y contraseña.
- **Gestión de Perfiles:** Similar a Netflix, después de iniciar sesión, los usuarios pueden ver una lista de perfiles creados. Pueden seleccionar un perfil ingresando un PIN asociado.
- **Administración de Perfiles:** Los usuarios pueden crear, editar y eliminar perfiles. Cada perfil puede tener una imagen, un nombre, y un PIN de acceso.
- **Playlist de Videos:** Cada usuario puede crear una playlist de videos de YouTube, que es compartida entre todos los perfiles. Se pueden agregar, actualizar y eliminar videos de esta playlist.
- **Navegación y Visualización de Contenido:** Una vez dentro de un perfil, el usuario puede ver la lista de videos en la playlist y reproducirlos.
- **Seguridad:** La aplicación incluye PINs para proteger tanto la entrada a perfiles como la edición de los mismos, asegurando que solo los usuarios autorizados puedan realizar cambios.

### Estructura del Proyecto

El proyecto está organizado en varios componentes y carpetas:

- **Componentes Principales:**
  - `Register`: Componente para el registro de nuevos usuarios.
  - `Login`: Componente para el inicio de sesión.
  - `Profiles`: Pantalla donde se muestran los perfiles creados y se permite seleccionar uno para ingresar.
  - `ProfilesEdit`: Interfaz para la administración de perfiles (crear, editar, eliminar).
  - `Home`: Página principal que muestra la playlist de videos.
  - `HomeAdmin`: Página de administración de perfiles y playlist.
  - `PlaylistsEdit`: Componente para la edición de la playlist de videos.
  - `User`: Componente que muestra la barra de navegación y los datos del usuario.

- **Carpeta `Forms`:** Contiene los formularios relacionados con el registro y el login, como:
  - `Password`: Para la creación y confirmación de la contraseña.
  - `Name`: Para el nombre del usuario.
  - `Email`: Para el email del usuario con verificación.
  - `PIN`: Para la creación y verificación del PIN de seguridad.
  - `Country`: Para la selección del país del usuario.

### Tecnologías Utilizadas

- **Frontend:**
  - **React:** Biblioteca de JavaScript utilizada para construir la interfaz de usuario.
  - **SCSS:** Lenguaje de extensión de CSS para estilos más estructurados y reutilizables.
  - **HTML y CSS:** Estructura y estilos básicos del proyecto.
  
- **Lenguajes:**
  - **JavaScript:** 49.9% del código.
  - **SCSS:** 48.1% del código.
  - **HTML:** 1.3% del código.
  - **CSS:** 0.7% del código.

## Ejecución del Proyecto

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio en tu máquina local utilizando el siguiente comando:
    ```bash
    git clone https://github.com/FierceSpectrum/1-Proyecto-Web-II-Client
    ```
2. Navega hasta la carpeta del proyecto:
    ```bash
    cd 1-Proyecto-Web-II-Client
    ```
3. Instala las dependencias necesarias:
    ```bash
    npm install
    ```
4. Inicia la aplicación:
    ```bash
    npm start
    ```
5. La aplicación estará disponible en `http://localhost:3000`.

## Estado del Proyecto

Este proyecto fue desarrollado como parte del curso Web 2 y está completo en términos de funcionalidades frontend. No se han realizado actualizaciones desde su creación.

## Autor

Este proyecto fue desarrollado en su totalidad por [Benjamín Sandí](https://github.com/FierceSpectrum) durante el primer cuatrimestre del año 2024.

## Licencia

Este proyecto no tiene una licencia formal y fue creado con fines educativos. No está destinado para uso comercial.
