# Marca personal · Juan Manuel Núñez Velasco

Sitio web responsive en HTML, CSS y JavaScript puro. No requiere Node.js, frameworks, base de datos ni proceso de compilación.

## Archivos

- `index.html`: estructura, textos, enlaces, SEO y secciones.
- `styles.css`: identidad visual oscura, verde y adaptación móvil.
- `script.js`: menú móvil, animación de red, pestañas, filtros, efectos de entrada y copiar correo.
- `assets/juan-manuel.jpg`: fotografía extraída del CV facilitado.
- `assets/favicon.svg`: ícono de la marca.

## Probar localmente

Abre `index.html` en el navegador. Como opción más cercana a producción, abre una terminal en esta carpeta y ejecuta:

```bash
python -m http.server 8000
```

Visita `http://localhost:8000`.

## Publicar en GitHub Pages

1. Crea un repositorio, por ejemplo `mi-portafolio`.
2. Sube **el contenido** de esta carpeta a la raíz del repositorio (no el ZIP).
3. En GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Selecciona `main` y la carpeta `/(root)`; guarda los cambios.
5. GitHub publicará el sitio en `https://TU-USUARIO.github.io/mi-portafolio/`.

Si el repositorio se llama exactamente `TU-USUARIO.github.io`, se publica en `https://TU-USUARIO.github.io/`.

## Publicar en hosting o VPS

Sube los archivos y la carpeta `assets/` a `public_html/`, `www/` o la carpeta raíz configurada para el sitio. El hosting solo necesita servir archivos estáticos por HTTPS. También funciona con Nginx o Apache.

## Personalización

- Nombre, presentación, experiencia, proyectos y enlaces: `index.html`.
- Colores: variables `:root` al comienzo de `styles.css`.
- Fotografía: reemplaza `assets/juan-manuel.jpg` manteniendo el nombre, o cambia su referencia.
- Para conectar demostraciones reales de proyectos, agrega enlaces en las tarjetas correspondientes, cuando cuentes con las URLs definitivas.
- El botón de contacto usa `mailto:` y abre el cliente de correo del visitante. No almacena datos ni envía correo desde un servidor.

## Antes de lanzamiento público

- Comprueba los enlaces de LinkedIn y Google Scholar y personaliza si es necesario.
- Revisa las descripciones y fechas de proyectos.
- Configura tu dominio personalizado, DNS y HTTPS.
- Si añades analítica, formularios con terceros o cookies, revisa los avisos de privacidad aplicables.
- Para redes sociales, conviene sustituir `og:image` con una imagen absoluta alojada en tu dominio.

## Privacidad y procedencia

Los textos se redactaron con base en el CV 2026-2 suministrado. No se incluyeron los datos de contacto de las referencias personales ni se publicó el CV completo. La cifra de 12+ años proviene del perfil del CV. No se han inventado demos ni enlaces externos para los proyectos.
