# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved
here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved
here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved
here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved
here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved
here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved
here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---
### Installation de tailwind 
https://tailwindcss.com/docs/guides/create-react-app
```yaml
npm install -D tailwindcss
npx tailwindcss init
```
1. Dans le fichier talwind.config.js
```yaml
/** @type {import('tailwindcss').Config} */
   module.exports = {
content: [
   "./src/**/*.{js,jsx,ts,tsx}",
],
theme: {
   extend: {},
},
plugins: [],
}
```
2. Dans le fichier index.css 
```yaml
@tailwind base;
@tailwind components;
@tailwind utilities;
```
---

## Installation de Docker et configuration des services PHP, Adminer et MySQL

Ce projet utilise Docker pour fournir un environnement de développement cohérent et isolé. Suivez les étapes ci-dessous
pour installer Docker et configurer les services PHP, Adminer et MySQL.

### Installation de Docker

1. Téléchargez et installez Docker Desktop à partir du [site officiel de Docker](https://www.docker.com/get-started).

2. Une fois Docker Desktop installé, lancez-le et assurez-vous qu'il fonctionne correctement sur votre système.

### Configuration des services PHP, Adminer et MySQL

1. Créez un fichier `docker-compose.yml` à la racine de votre projet avec le contenu suivant :

```yaml
version: "3"

services:
  php:
    build: .
    restart: unless-stopped
    volumes:
      - ./src:/var/www/html
      - ./php-conf.d/php.ini:/usr/local/etc/php/conf.d/custom-php.ini:ro
    ports:
      - "86:80"

  mysql:
    image: mariadb
    restart: always
    volumes:
      - ./mysql-conf.d/my.cnf:/etc/mysql/conf.d/my.cnf
    environment:
      MARIADB_ROOT_PASSWORD: mariadb_password
    ports:
      - "3306:3306"

  adminer:
    image: adminer
    restart: always
    ports:
      - "8080:8080"
```

2. Créez un fichier Dockerfile à la racine de votre projet pour configurer l'environnement PHP dans le conteneur Docker.
   Voici un exemple de contenu pour le fichier Dockerfile :
   Dockerfile

```yaml

FROM php:8.2-apache

  # You should mount your source code to this volume
VOLUME ["/var/www/html"]

  # You could mount your extra config folder to this volume
  # which resolves to '/usr/local/etc/php/conf.d/'
VOLUME ["$PHP_INI_DIR/conf.d/"]

  # Install XDebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

  # Install MySQL drivers
RUN apt-get update && docker-php-ext-install mysqli pdo pdo_mysql

  # Use the default development configuration
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

EXPOSE 80

```

Assurez-vous d'avoir les dossiers src, php-conf.d et mysql-conf.d dans votre projet. Le dossier src contiendra vos
fichiers PHP, php-conf.d contiendra votre fichier de configuration PHP personnalisé (s'il y a lieu), et mysql-conf.d
contiendra votre fichier de configuration MySQL personnalisé (s'il y a lieu).
Lancement des services
Ouvrez un terminal à la racine de votre projet et exécutez la commande suivante pour construire et démarrer les services
Docker :

```yaml
docker-compose up --build
```
### `docker-compose up --build`

Une fois les services démarrés, ouvrez un navigateur web et accédez à votre application PHP à
l'adresse http://localhost:86. Vous devriez voir votre application PHP fonctionner correctement.

Pour accéder à l'interface Adminer pour gérer votre base de données MySQL, ouvrez un navigateur web et visitez
l'adresse http://localhost:8080.
