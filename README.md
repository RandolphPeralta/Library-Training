# Sistema de biblioteca

Proyecto desarrollado en **TypeScript** que simula un sistema de préstamo de libros para una biblioteca. El proyecto puede ejecutarse tanto desde la **terminal** como desde un **navegador web** gracias a Webpack.

- TypeScript
- Webpack

---

## Requisitos

Git

Verificar:

```bash
git -v
```

Node.js 22+

Verificar:

```bash
node -v
npm -v
```

---

## Clonar proyecto

```bash
git clone https://github.com/RandolphPeralta/Library-Training.git
```

Entrar al proyecto:

```bash
cd Library-Training
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar en la terminal

```bash
npm run start:terminal
```

## Construir o preparar archivos empaquetados para la web
```bash
npm run build:web
```

### Ejecutar en la web

```bash
npm run dev:web
```

Al terminar, luego presionar Ctrl + C para dejar de usar el navegador en la terminal

# Estructura del proyecto

```
Library-Training
│
├── src/                 # Código fuente
├── dist/                # Archivos compilados
├── .editorconfig
├── webpack.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Sugerencias

## Variable de entorno

Si se esta usando vscode tener esto en la variable de entorno local (.env.local)
compilar en la terminal

```bash
BASE_URL=https://localhost:8000
ENVIRONMENT=LOCAL
```

Dado algun caso no llega a funcionar en la terminal se puede forzar la instalacion de typescript

Forzar Instalacion de Typescript 
```bash
npm install -D typescript
```

Forzar instalacion de prompt
```bash
npm install prompt-sync
npm i --save-dev @types/prompt-sync
```

Forzar instalacion de localstorage
```bash
npm install node-localstorage 
npm install --save-dev @types/node-localstorage 
```

Forzar instalacion de sqlite
```bash
npm install better-sqlite3  
npm install -D @types/better-sqlite3  
```
