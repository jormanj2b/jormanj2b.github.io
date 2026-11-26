# Portafolio · Jorman Bravo · Desarrollo web

Sitio de portafolio en https://jormanbravo.com/: proyectos, servicios, precios orientativos, proceso, garantía, mantenimiento y contacto.

HTML, CSS y un archivo de JavaScript propio (`main.js`), sin librerías externas. Las fuentes están alojadas en el propio repo (Bricolage Grotesque e IBM Plex Mono, licencia OFL).

## Proyectos
| # | Proyecto | Tipo | Demo | Repo |
|---|----------|------|------|------|
| 01 | Laborathorno (cliente real) | Catálogo + pedidos por WhatsApp | https://jormanbravo.com/laborathorno-demo/ | — |
| 02 | Barbería Corte Norte | Reservas | https://jormanbravo.com/demo-barberia/ | jormanj2b/demo-barberia |
| 03 | Café Almendro | Carta QR | https://jormanbravo.com/demo-cafe/ | jormanj2b/demo-cafe |
| 04 | Barro Lento | Tienda online | https://jormanbravo.com/demo-tienda/ | jormanj2b/demo-tienda |
| 05 | Ribera & Ochoa Asesores | Sitio corporativo | https://jormanbravo.com/demo-asesoria/ | jormanj2b/demo-asesoria |
| 06 | Forja Entrenamiento | Landing de conversión | https://jormanbravo.com/demo-gimnasio/ | jormanj2b/demo-gimnasio |

Los proyectos 02–06 son negocios ficticios. Las fotos de esas demos se generaron con IA.

## Cambios frecuentes
- **Nombre de marca** (p. ej. «JormanWebs»): busca `Jorman Bravo · Desarrollo web` y `brand-name` en `index.html`. Aparece en el `<title>`, las metas OG, el JSON-LD, la cabecera y el pie. Cambia también las iniciales `JB` de `brand-mark` y `favicon.svg`.
- **Contacto**: el número de teléfono no se publica en el sitio. El contacto va por el formulario (`#contacto`), Freelancer o Workana. Los enlaces viejos a `#agenda` redirigen a `#contacto`.
- **Precios «desde»**: están en la sección `#servicios`. Para ocultarlos, borra los párrafos con la clase `from`.
- **Imagen para redes**: `img/og.jpg`, 1200×630.

## Formulario de contacto
La sección `#contacto` es un formulario (nombre, negocio, tipo de sitio, canal y dato de contacto). No hay agenda ni reserva de llamada. Hoy el formulario no envía nada a ningún servidor. Arma un resumen, lo copia al portapapeles y ofrece enviarlo por Freelancer o Workana. Si más adelante quieres recibir las solicitudes directo en tu correo, crea un formulario gratis en Formspree o similar, pega su URL en `CFG.ENDPOINT` y añade ese dominio a `connect-src` en la CSP de `index.html`.

El número de teléfono no se publica en el sitio.
