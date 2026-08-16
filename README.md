# Nerd.IA Developer Docs — PoC no oficial

Esta es una prueba de concepto de documentación para la API pública de Nerd.IA. La idea es mostrar una ruta de integración más clara y práctica, sin intentar reemplazar ni reconstruir toda la documentación original.

El recorrido principal sigue esta estructura:

`Objetivo → Inicio rápido → Guía → Referencia API`

## ¿Qué incluye?

- Documentación en español y en inglés.
- Un inicio rápido para autenticarte, identificar un usuario y enviar un primer mensaje.
- Ejemplos con cURL y JavaScript usando `fetch()`.
- Una referencia interactiva generada con Scalar y OpenAPI 3.1.
- Una página dedicada a la información que no está especificada en las fuentes públicas.

La PoC se limita a estas cuatro operaciones:

- `POST /login`
- `POST /{username}/user/createOrUpdate`
- `GET /{username}/user/variables`
- `POST /{username}/conversation/send_message`

No incluye backend, SDK, CMS, analítica, chatbot ni ejecución de solicitudes con credenciales reales.

## Tecnologías

- Astro
- Starlight
- MDX
- Scalar (`@scalar/astro`)
- OpenAPI 3.1
- npm

El sitio se genera como contenido estático y está preparado para publicarse en Vercel.

## Ejecutar el proyecto

Necesitas una versión reciente de Node.js y npm.

```bash
npm install
npm run dev
```

Después abre `http://localhost:4321`.

## Generar la versión de producción

```bash
npm run build
```

Los archivos generados se guardan en `dist/`. Para revisar esa versión localmente:

```bash
npm run preview
```

## Publicación

El repositorio se puede importar directamente desde Vercel. No necesita un backend, un adaptador específico ni un archivo `vercel.json`.

## Fuentes públicas

La información técnica utilizada en esta PoC proviene de la documentación pública de Nerd.IA:

- [Documentación de la API](https://nerds.notion.site/API-Doc-77a08e24d2a34c098fcd24658041e842)
- [Inicio de sesión](https://nerds.notion.site/Login-Inicio-de-sesi-n-2b063162b29f4240bb38f042e3c06f69)
- [Usuarios](https://nerds.notion.site/Users-Usuarios-af25bd7771bc4850a5ce4e0896bb6f6b)
- [Mensajes](https://nerds.notion.site/Messages-Mensajes-ca504f3e4ab7445ebf60794f7471214c)

Cuando un dato no aparece claramente en estas fuentes, se indica como información no disponible en lugar de asumir su comportamiento.

## Limitaciones conocidas

- Las fuentes públicas no detallan códigos de estado HTTP, respuestas de error ni todas las reglas de campos obligatorios y opcionales.
- Algunos ejemplos muestran cuerpos JSON, pero no especifican el encabezado `Content-Type`.
- El ejemplo de `send_message` no explica cómo obtener un identificador de conversación, por lo que el historial de mensajes quedó fuera del flujo principal.
- La versión utilizada de `@scalar/astro` todavía no declara compatibilidad con Astro 7 en su rango de dependencias pares. La instalación se resuelve mediante la configuración incluida en `.npmrc`.

## Autor

Construido por [Jesrig Pineda].

- [LinkedIn](https://www.linkedin.com/in/jesrigpineda/)

## Aviso

**Prueba de concepto no oficial construida exclusivamente con información disponible públicamente.**

Este proyecto no está afiliado, respaldado ni mantenido por Nerd.IA. Su propósito es educativo y demostrativo.
