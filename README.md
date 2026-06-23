# Sistema de biblioteca

Proyecto simple para demostrar:

- TypeScript
- Webpack
- Variables de entorno
- Persistencia intercambiable
- Ejecución en Node.js y Navegador

---

## Requisitos

Node.js 22+

Verificar:

```bash
node -v
npm -v
```

---

## Clonar proyecto

```bash
git clone https://github.com/usuario/library-training.git
```

Entrar al proyecto:

```bash
cd library-training
```

---

## Variable de entorno

Tener esto en la variable de entorno local (.env.local)
compilar en la terminal

```bash

ENVIRONMENT=TERMINAL

PERSISTENCE_TYPE=MEMORY
```


## Instalar dependencias

```bash
npm install
```

---

## Instalar lenguaje Typescript 

```bash
npm install -D typescript
```

## Instalar dependencia prompt

```bash
npm i --save-dev @types/prompt-sync
```

## Ejecutar en la terminal

```bash
npm run start:terminal
```
