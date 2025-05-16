# TraceWine FrontEnd Application

## Summary

This project is a front-end application for TraceWine

## Features

Project features include:

- CRUD operations for register, reports and authentication.
- Domain-Driven Design (DDD) principles.
- Internationalization (i18n) support.
- Integration with JSON Server Fake Api
- In-app Navigation App
- Environment configuration

## Documentation

The documentation is available in the docs' folder. It includes:

- User Stories are available in the [docs/user-stories.md](/docs/user-stories.md) folder.
- PlantUML Class diagram are available in the [docs/class-diagram.puml](/docs/class-diagram.puml) folder.
- C4 Model Software Architecture are available in the [docs/software-architecture](/docs/software-architecture.dsl) folder.

## Frameworks and Libraries

This project was generated using [Vue](https://github.com/vuejs/vue-cli) version Vue3.

It also uses the following dependencies:

- Angular Material (https://primevue.org/vite/)
- i18n language (https://vue-i18n.intlify.dev/guide/installation.html)
- Vue axios latest version (https://www.npmjs.com/package/vue-axios)
- JsPDF (https://www.npmjs.com/package/jspdf)

## Fake API start

Run the following commands to start the fake API server:

For windows:
```
 cd server
 cmd start.cmd
 start.cmd
```

For MacOS/Linux:
```
 cd server
 sh start.sh
```

The API endpoints should be access at `http://localhost:3000`. The current API resource endpoints are:
```
- `http://localhost:3000/profiles`
- `http://localhost:3000/users`
- `http://localhost:3000/products`
- `http://localhost:3000/records`
- `https://localhost:3001/batches`    
```

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
