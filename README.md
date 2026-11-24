# Portafolio · Jorman Bravo · Desarrollo web

Sitio de portafolio en https://jormanj2b.github.io/: proyectos, servicios, precios orientativos, proceso, garantía, mantenimiento y contacto.

HTML y CSS, sin JavaScript ni dependencias. Las fuentes están alojadas en el propio repo (Bricolage Grotesque e IBM Plex Mono, licencia OFL).

## Proyectos
| # | Proyecto | Tipo | Demo | Repo |
|---|----------|------|------|------|
| 01 | Laborathorno (cliente real) | Catálogo + pedidos por WhatsApp | https://jormanj2b.github.io/laborathorno-demo/ | — |
| 02 | Barbería Corte Norte | Reservas | https://jormanj2b.github.io/demo-barberia/ | jormanj2b/demo-barberia |
| 03 | Café Almendro | Carta QR | https://jormanj2b.github.io/demo-cafe/ | jormanj2b/demo-cafe |
| 04 | Barro Lento | Tienda online | https://jormanj2b.github.io/demo-tienda/ | jormanj2b/demo-tienda |
| 05 | Ribera & Ochoa Asesores | Sitio corporativo | https://jormanj2b.github.io/demo-asesoria/ | jormanj2b/demo-asesoria |
| 06 | Forja Entrenamiento | Landing de conversión | https://jormanj2b.github.io/demo-gimnasio/ | jormanj2b/demo-gimnasio |

Los proyectos 02–06 son negocios ficticios. Las fotos de esas demos se generaron con IA.

## Cambios frecuentes
- **Nombre de marca** (p. ej. «JormanWebs»): busca `Jorman Bravo · Desarrollo web` y `brand-name` en `index.html`. Aparece en el `<title>`, las metas OG, el JSON-LD, la cabecera y el pie. Cambia también las iniciales `JB` de `brand-mark` y `favicon.svg`.
- **Contacto**: el número de teléfono no se publica en el sitio. El contacto va por Freelancer, Instagram y el formulario de consulta.
- **Precios «desde»**: están en la sección `#servicios`. Para ocultarlos, borra los párrafos con la clase `from`.
- **Imagen para redes**: `img/og.jpg`, 1200×630.

## Agenda de consultas
La sección `#agenda` muestra horarios de lunes a viernes, de 9:00 a 18:00 hora de Venezuela, cada 30 minutos, con 3 horas de anticipación mínima. El visitante los ve en su hora local. Se cambia en `CFG`, al inicio de `main.js`.

Hoy el formulario no envía nada a ningún servidor. Arma un resumen, lo copia al portapapeles y ofrece enviarlo por Instagram (ig.me/m/jorman_j2b) o Freelancer. Si más adelante quieres recibir las solicitudes directo en tu correo, crea un formulario gratis en Formspree o similar, pega su URL en `CFG.ENDPOINT` y añade ese dominio a `connect-src` en la CSP de `index.html`.

El número de teléfono no se publica en el sitio.
