# Sistema de biblioteca

Proyecto sobre un sistema de prestamo en una biblioteca, con herramientas como:

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

## Variable de entorno

Tener esto en la variable de entorno local (.env.local)
compilar en la terminal

```bash
BASE_URL=https://localhost:8000
ENVIRONMENT=LOCAL
```

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

## Sugerencias

Dado algun caso no llega a funcionar en la terminal se puede forzar la instalacion de typescript

Forzar Instalacion de Typescript 
```bash
npm install -D typescript
```

Forzar instalacion de prompt
```bash
npm i --save-dev @types/prompt-sync
```

Forzar instalacion de localstorage
```bash
npm install node-localstorage 
npm install --save-dev @types/node-localstorage 
```

Forzar instalacion de localstorage
```bash
npm install better-sqlite3  
npm install -D @types/better-sqlite3  
```