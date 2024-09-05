# Random Number API/Web Project

## Descripción

Este proyecto consiste en una API backend construida con **NestJS** que genera un número aleatorio en el servidor y un frontend hecho en **Next.js** que lo solicita y lo presenta visualmente mediante una ruleta giratoria. La aplicación simula la suerte del número generado por el servidor utilizando el paquete `roulette-spinner`.

## Estructura del Proyecto

- **Backend**: API en **NestJS**.
- **Frontend**: Aplicación en **Next.js** que consume la API y visualiza el resultado con una ruleta.

---

## Backend (API)

### Stack Tecnológico
- **Framework**: [NestJS](https://nestjs.com/)
- **Lenguaje**: TypeScript
- **Versión de Node.js**: >=16

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar la API en modo desarrollo
npm run start:dev
