# Auditoría de la API pública de Nerd.IA

Fecha de consulta: 2026-08-15  
Alcance: cuatro operaciones candidatas para la PoC **Nerd.IA Developer Docs — Unofficial PoC**.

## Criterio

- `DOCUMENTED`: la documentación pública afirma el dato de forma explícita o lo muestra directamente en el path o en un ejemplo.
- `AMBIGUOUS`: existen contradicciones, nomenclatura inconsistente o no se puede determinar una única interpretación.
- `NOT DOCUMENTED`: la documentación pública consultada no aporta el dato.

No se completan vacíos con convenciones REST. Las fuentes principales son:

- [API Doc](https://nerds.notion.site/API-Doc-77a08e24d2a34c098fcd24658041e842)
- [Login (Inicio de sesión)](https://nerds.notion.site/Login-Inicio-de-sesi-n-2b063162b29f4240bb38f042e3c06f69)
- [Users (Usuarios)](https://nerds.notion.site/Users-Usuarios-af25bd7771bc4850a5ce4e0896bb6f6b)
- [Messages (Mensajes)](https://nerds.notion.site/Messages-Mensajes-ca504f3e4ab7445ebf60794f7471214c)

## Hallazgos transversales

### Base URL

**DOCUMENTED**

`https://api.nerds.ai/v2.0`

Fuente: [API Doc](https://nerds.notion.site/API-Doc-77a08e24d2a34c098fcd24658041e842)

Las subpáginas representan algunos paths como `/BASE_URL/...` y el login como `BASE_URL/login`. Para la PoC se interpreta `BASE_URL` como el valor publicado por la página raíz; no se conserva la barra que aparece delante de `BASE_URL` porque no forma parte del host publicado.

### Autenticación global

**DOCUMENTED**, con una inconsistencia terminológica registrada abajo.

La página raíz indica que el token obtenido con login debe enviarse en todas las peticiones en el header `Authorization` con el formato `Bearer TOKEN`.

Fuente: [API Doc](https://nerds.notion.site/API-Doc-77a08e24d2a34c098fcd24658041e842)

### Inconsistencia del nombre del header

**AMBIGUOUS**

La página raíz usa `Authorization`; la página de login menciona la cabecera `Authetication`, probablemente como texto inconsistente. La PoC usa `Authorization` porque la fuente raíz proporciona tanto el nombre como el formato exacto, y documenta aquí la discrepancia.

Fuentes:

- [API Doc](https://nerds.notion.site/API-Doc-77a08e24d2a34c098fcd24658041e842)
- [Login (Inicio de sesión)](https://nerds.notion.site/Login-Inicio-de-sesi-n-2b063162b29f4240bb38f042e3c06f69)

### Media type de los bodies

**AMBIGUOUS**

Las páginas de Users y Messages etiquetan los cuerpos como `Body (JSON)`, pero no documentan expresamente un header `Content-Type`. OpenAPI representará esos cuerpos como `application/json` para expresar el formato publicado; los ejemplos narrativos no presentarán otros headers no documentados.

### HTTP status codes

**NOT DOCUMENTED**

No se publican códigos HTTP para ninguna de las cuatro operaciones auditadas. OpenAPI usa una respuesta `default` en lugar de inventar códigos.

### Errores

**AMBIGUOUS**

Las respuestas documentan una propiedad `error`, pero no definen un catálogo, estructura exhaustiva, códigos HTTP ni condiciones completas. Messages sí afirma que un `next_block` inexistente o ajeno a la cuenta produce un error, sin publicar su payload o status.

## 1. Iniciar sesión

### Goal

**DOCUMENTED**

Iniciar sesión como administrador para consultar datos de chatbot y obtener un token Bearer con caducidad de 24 horas.

### Source URL

**DOCUMENTED**

[Login (Inicio de sesión)](https://nerds.notion.site/Login-Inicio-de-sesi-n-2b063162b29f4240bb38f042e3c06f69)

### HTTP method

**DOCUMENTED** — `POST`

### Path

**DOCUMENTED** — `/login`

### Base URL

**DOCUMENTED** — `https://api.nerds.ai/v2.0`

Fuente adicional: [API Doc](https://nerds.notion.site/API-Doc-77a08e24d2a34c098fcd24658041e842)

### Authentication

**AMBIGUOUS**

El propósito del endpoint es obtener el token, pero la regla global dice que el token debe enviarse en “todas las peticiones”. No se documenta explícitamente una excepción para `/login`. La PoC no exige Bearer en esta operación para evitar presentar una dependencia circular como contrato confirmado.

### Headers

**NOT DOCUMENTED**

No se documentan headers específicos de la petición de login.

### Path parameters

**DOCUMENTED** — ninguno aparece en el path.

### Query parameters

**NOT DOCUMENTED** — no se publica una sección de query parameters.

### Request body

**DOCUMENTED**

Propiedades publicadas:

| Propiedad | Tipo | Estado |
| --- | --- | --- |
| `email` | No especificado | `DOCUMENTED` |
| `password` | No especificado | `DOCUMENTED` |

### Required fields

**DOCUMENTED** — `email`, `password`.

### Response

**DOCUMENTED**, de forma parcial.

La tabla de respuesta documenta `token` (`String`) y `error` (`String`). El ejemplo exitoso contiene además `admin_id`, `first_name`, `last_name`, `image`, `email`, `last_login`, `can_attend_cases` y `status`, pero la página no proporciona un schema ni descripciones para esos campos adicionales.

La caducidad del token de 24 horas está documentada.

### HTTP status codes

**NOT DOCUMENTED**

### Errors

**AMBIGUOUS**

Se documenta una propiedad `error` de tipo `String` para errores de autenticación, sin payload de ejemplo, código HTTP ni lista de casos.

### Ambiguities

- Tipo de `email` y `password` del request: **NOT DOCUMENTED**.
- Obligación o excepción de Bearer para `/login`: **AMBIGUOUS**.
- Schema completo de la respuesta exitosa: **AMBIGUOUS**.
- Nombre del header en la subpágina (`Authetication`) frente a la raíz (`Authorization`): **AMBIGUOUS**.

### Missing information

- Headers propios de login.
- Status codes.
- Respuesta de error completa.
- Restricciones y validaciones de email/password.

## 2. Crear o actualizar un usuario

### Goal

**DOCUMENTED**

Buscar un usuario con los datos enviados y crearlo si no existe.

### Source URL

**DOCUMENTED**

[Users (Usuarios)](https://nerds.notion.site/Users-Usuarios-af25bd7771bc4850a5ce4e0896bb6f6b)

### HTTP method

**DOCUMENTED** — `POST`

### Path

**DOCUMENTED** — `/{username}/user/createOrUpdate`

La fuente lo muestra como `/BASE_URL/{username}/user/createOrUpdate`; se normaliza contra la Base URL publicada.

### Base URL

**DOCUMENTED** — `https://api.nerds.ai/v2.0`

### Authentication

**DOCUMENTED** — Bearer token en `Authorization`, por la regla global.

### Headers

- `Authorization: Bearer TOKEN`: **DOCUMENTED** en la página raíz.
- `Content-Type`: **NOT DOCUMENTED**; la subpágina solamente indica `Body (JSON)`.

### Path parameters

| Parámetro | Tipo | Required | Estado |
| --- | --- | --- | --- |
| `username` | No especificado | Sí | `DOCUMENTED` |

La descripción publicada es “Nombre de usuario de Cuenta”. No se explica cómo obtenerlo.

### Query parameters

**NOT DOCUMENTED** — no se publica una sección de query parameters para esta operación.

### Request body

**DOCUMENTED**

| Propiedad | Tipo publicado | Estado |
| --- | --- | --- |
| `external_id` | String | `DOCUMENTED` |
| `platform` | String | `DOCUMENTED` |
| `first_name` | String | `DOCUMENTED` |
| `last_name` | String | `DOCUMENTED` |
| `email` | String | `DOCUMENTED` |
| `data` | Object | `DOCUMENTED` |

`data` admite información exclusiva asociada al usuario; no se publica un schema cerrado para su contenido.

### Required fields

**DOCUMENTED** — `external_id`, `platform`.

La ausencia de la marca `required` en las demás propiedades se conserva sin agregar otras propiedades requeridas.

### Response

**DOCUMENTED**, con una inconsistencia.

| Propiedad | Tipo publicado | Estado |
| --- | --- | --- |
| `success` | Bool | `DOCUMENTED` |
| `resource` | Object o null | `DOCUMENTED` |
| `error` | String | `DOCUMENTED` |

El ejemplo exitoso incluye un modelo de usuario con `user_id`, `external_id`, `bot_enabled`, `first_name`, `last_name`, `profile_pic`, `user_email` y `last_interaction_time`.

### HTTP status codes

**NOT DOCUMENTED**

### Errors

**AMBIGUOUS**

`error` se describe como mensaje cuando `success` es `false`, sin schema de error, ejemplos, códigos o condiciones.

### Ambiguities

- La tabla del modelo usa `email`; el ejemplo de respuesta usa `user_email`: **AMBIGUOUS**.
- La tabla del modelo declara `user_id` como `Int`; la operación no declara un schema completo formal: **AMBIGUOUS**.
- Valores válidos de `platform`: **NOT DOCUMENTED** en la página accesible. Un enlace a la página de plataformas devolvió 404 durante la auditoría.
- Cómo obtener `username`: **NOT DOCUMENTED**.

### Missing information

- Status codes y catálogo de errores.
- Reglas de matching para decidir cuándo actualizar frente a crear.
- Restricciones de strings, email y `data`.
- Valores permitidos de `platform`.

## 3. Consultar variables del usuario

### Goal

**DOCUMENTED**

Obtener las variables asociadas a un usuario.

### Source URL

**DOCUMENTED**

[Users (Usuarios)](https://nerds.notion.site/Users-Usuarios-af25bd7771bc4850a5ce4e0896bb6f6b)

### HTTP method

**DOCUMENTED** — `GET`

### Path

**DOCUMENTED** — `/{username}/user/variables`

### Base URL

**DOCUMENTED** — `https://api.nerds.ai/v2.0`

### Authentication

**DOCUMENTED** — Bearer token en `Authorization`, por la regla global.

### Headers

**DOCUMENTED** — `Authorization: Bearer TOKEN`. No se documentan otros headers.

### Path parameters

| Parámetro | Tipo | Required | Estado |
| --- | --- | --- | --- |
| `username` | No especificado | Sí | `DOCUMENTED` |

### Query parameters

| Parámetro | Tipo publicado | Required individual | Estado |
| --- | --- | --- | --- |
| `external_id` | String | No se especifica individualmente | `DOCUMENTED` |
| `platform` | String | No se especifica individualmente | `DOCUMENTED` |
| `user_id` | String | No se especifica individualmente | `DOCUMENTED` |

La fuente requiere enviar `external_id` y `platform`, o únicamente `user_id`.

### Request body

**NOT DOCUMENTED** — no se publica body para esta operación GET.

### Required fields

**DOCUMENTED**, como regla combinada.

Se requiere `(external_id AND platform) OR user_id`. OpenAPI 3.1 no expresa de forma estándar dependencias entre query parameters; se mantiene la regla en las descripciones sin marcar los tres parámetros como requeridos simultáneamente.

### Response

**DOCUMENTED**

| Propiedad | Tipo publicado | Estado |
| --- | --- | --- |
| `success` | Bool | `DOCUMENTED` |
| `resource` | Array | `DOCUMENTED` |
| `error` | String | `DOCUMENTED` |

Cada elemento de `resource` se muestra con `name`, `type` y `value`. Se documenta que `value` puede ser texto (`String`) u objeto (objeto o arreglo de objetos). El ejemplo usa `type: "text"` y `type: "object"`.

### HTTP status codes

**NOT DOCUMENTED**

### Errors

**AMBIGUOUS**

`error` se describe como mensaje cuando `success` es `false`, sin schema, ejemplos, códigos o condiciones.

### Ambiguities

- La tabla del modelo general declara `user_id` como `Int`; este query parameter se publica como `String`: **AMBIGUOUS**.
- El ejemplo publicado contiene un fragmento que no es JSON válido (`id` sin comillas en objetos anidados): **AMBIGUOUS**.
- No se define un conjunto cerrado de valores para `type`: **NOT DOCUMENTED**.

### Missing information

- Status codes y catálogo de errores.
- Comportamiento si se envían ambas estrategias de identificación.
- Schema completo de `value`.
- Paginación o límites del arreglo, si existen.

## 4. Enviar un mensaje

### Goal

**DOCUMENTED**

Enviar un mensaje a la conversación de un usuario. La fuente afirma que el autor se marca como `admin` y el bot de la conversación se desactiva.

### Source URL

**DOCUMENTED**

[Messages (Mensajes)](https://nerds.notion.site/Messages-Mensajes-ca504f3e4ab7445ebf60794f7471214c)

### HTTP method

**DOCUMENTED** — `POST`

### Path

**DOCUMENTED** — `/{username}/conversation/send_message`

### Base URL

**DOCUMENTED** — `https://api.nerds.ai/v2.0`

### Authentication

**DOCUMENTED** — Bearer token en `Authorization`, por la regla global.

### Headers

- `Authorization: Bearer TOKEN`: **DOCUMENTED**.
- `Content-Type`: **NOT DOCUMENTED**; la subpágina solamente indica `Body (JSON)`.

### Path parameters

| Parámetro | Tipo | Required | Estado |
| --- | --- | --- | --- |
| `username` | No especificado | Sí | `DOCUMENTED` |

### Query parameters

**NOT DOCUMENTED** — no se publica una sección de query parameters para esta operación.

### Request body

**DOCUMENTED**

| Propiedad | Tipo publicado | Nota | Estado |
| --- | --- | --- | --- |
| `platform` | String | Nombre de plataforma de la conversación | `DOCUMENTED` |
| `from` | String | Solo WhatsApp; opcional si la cuenta tiene un número configurado | `DOCUMENTED` |
| `user_id` | Integer | Se debe especificar este campo o `external_id` | `DOCUMENTED` |
| `external_id` | String | Identificador de usuario de plataforma externa | `DOCUMENTED` |
| `message` | Object | Elementos del mensaje | `DOCUMENTED` |
| `message.text` | String | Texto | `DOCUMENTED` |
| `message.image` | String | URL de imagen | `DOCUMENTED` |
| `message.imagePayload` | Object | Imagen base64 | `DOCUMENTED` |
| `message.imagePayload.payload` | String | Datos base64 | `DOCUMENTED` |
| `message.imagePayload.filename` | String | Nombre con extensión | `DOCUMENTED` |
| `message.attachment` | Object | URL y tipo | `DOCUMENTED` |
| `message.quick_replies` | Array | Entre 1 y 10 elementos según el texto publicado | `DOCUMENTED` |
| `next_block` | Integer | Dirige la conversación a un bloque y no envía mensaje | `DOCUMENTED` |
| `hsm` | Object | Plantilla de WhatsApp | `DOCUMENTED` |
| `data` | Object | Datos utilizables en la conversación | `DOCUMENTED` |

La PoC modela solamente lo necesario para el goal de mensaje de texto más las propiedades publicadas que pueden expresarse sin inventar subcontratos. Los ejemplos de guía usan `message.text`.

### Required fields

- `platform`: **DOCUMENTED** como required.
- `user_id` o `external_id`: **DOCUMENTED** como regla alternativa.
- Required de `message`, `message.text`, `next_block`, `hsm` y `data`: **NOT DOCUMENTED**. La fuente muestra rutas de uso alternativas, pero no publica una regla formal completa.

### Response

**DOCUMENTED**

| Propiedad | Tipo publicado | Estado |
| --- | --- | --- |
| `success` | Bool | `DOCUMENTED` |
| `resource` | String | `DOCUMENTED` |
| `error` | String | `DOCUMENTED` |

Ejemplo exitoso publicado: `success: true`, `resource: "Ok"`.

### HTTP status codes

**NOT DOCUMENTED**

### Errors

**AMBIGUOUS**

`error` se describe como mensaje cuando `success` es `false`. También se afirma que un `next_block` inexistente o ajeno a la cuenta genera un error, pero no se documenta el payload ni el status.

### Ambiguities

- Required/optional de las distintas variantes de contenido: **AMBIGUOUS**.
- Relación exacta entre crear/actualizar un usuario y la conversación usada por `send_message`: **NOT DOCUMENTED**.
- Cómo se selecciona o crea la conversación: **NOT DOCUMENTED**.
- Valores válidos generales de `platform`: **NOT DOCUMENTED** en la página accesible.
- La propiedad `from` se describe con una condición de WhatsApp, sin contrato para otras plataformas: **AMBIGUOUS**.

### Missing information

- Status codes y catálogo de errores.
- Schema formal de las variantes de mensaje.
- Validaciones de URL, base64, filenames y tamaños.
- Comportamiento exacto de creación/selección de conversación.
- Identificador de conversación en la respuesta.

## Endpoint investigado y excluido del MVP

### `GET /{username}/conversation/{_id}/messages`

**DOCUMENTED**, pero excluido.

La operación y el path parameter `_id` están publicados en [Messages (Mensajes)](https://nerds.notion.site/Messages-Mensajes-ca504f3e4ab7445ebf60794f7471214c). Una página pública distinta permite listar conversaciones y sus `_id`, pero esa operación queda fuera del límite y del goal principal. `send_message` no documenta que devuelva el identificador de conversación. Por ello, esta PoC no presenta el historial como siguiente paso directo ni lo incluye en OpenAPI.

## Decisiones derivadas para la PoC

1. El Quickstart usa `POST /login`, `POST /{username}/user/createOrUpdate` y `POST /{username}/conversation/send_message`.
2. `GET /{username}/user/variables` queda en la guía de usuarios y en API Reference; no se fuerza dentro del Quickstart.
3. OpenAPI contiene exactamente cuatro operaciones y tres tags: `Authentication`, `Users`, `Conversations`.
4. Los status codes se representan con `default` y una descripción explícita de que no están documentados.
5. Los ejemplos usan placeholders y no precargan credenciales.
6. Las inconsistencias se exponen en Known documentation gaps y no se convierten en contratos confirmados.
