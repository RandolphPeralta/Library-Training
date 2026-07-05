# Sistema de biblioteca

Proyecto desarrollado en **TypeScript** que simula un sistema de gestión y préstamo de libros de una biblioteca aplicando los **principios de Programación Orientada a Objetos (POO)**, **SOLID** y **Separación de responsabilidades**.

La aplicación puede ejecutarse tanto desde la **terminal** como desde un **navegador web**, utilizando Webpack para el empaquetado del proyecto.

# Tecnologías utilizadas

| Tecnología   | Uso                        |
| ------------ | -------------------------- |
| TypeScript   | Lenguaje principal         |
| JavaScript   | Código generado            |
| Node.js      | Ejecución en consola       |
| Webpack      | Empaquetado para navegador |
| HTML         | Interfaz web               |
| SQLite       | Persistencia de datos      |
| LocalStorage | Persistencia local         |
| prompt-sync  | Entrada por consola        |

---

Abrir la terminal

## Requisitos

Antes de comenzar asegúrese de tener instalado:

Git
Node.js 22 o superior
npm

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

# Instalación

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

Una vez iniciado, abrir el navegador en la dirección indicada por Webpack Dev Server.

Para detener el servidor:

```bash
Ctrl + C
```

# Scripts disponibles

| Script                   | Descripción                                  |
| ------------------------ | -------------------------------------------- |
| `npm run start:terminal` | Ejecuta la aplicación en consola             |
| `npm run build:web`      | Genera la versión de producción para la web  |
| `npm run dev:web`        | Ejecuta la aplicación web en modo desarrollo |


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

## Solución de problemas

## Variable de entorno

Si se esta usando vscode debes Crear un archivo llamado en la raiz del proyecto:

```bash
.env.local
```

con el siguiente contenido:
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
