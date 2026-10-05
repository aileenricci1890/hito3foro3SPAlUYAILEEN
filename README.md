# Cochala Bistro

Sitio de pedidos en React 19 y Vite 8. La interfaz es una SPA de una página: el catálogo y sus secciones se mantienen montados mientras las rutas cliente (`/menu`, `/sabores`, `/promociones`, `/nosotros`, `/cochabamba`, `/ubicaciones`) actualizan la URL y desplazan a la sección correspondiente. El carrito se guarda en `localStorage`; el checkout abre WhatsApp.

## Desarrollo

Requiere Node.js compatible con Vite 8.

```sh
npm install
npm run dev
```

## Verificación y compilación

```sh
npm run lint
npm run build
npm run preview
```

No hay un script de pruebas configurado.

## Despliegue

Publica el contenido generado en `dist/` en un hosting estático. El servidor de producción debe servir `index.html` como fallback para rutas de la aplicación (por ejemplo `/menu` y `/ubicaciones`), conservando la entrega normal de archivos existentes y sin reescribir endpoints API. Vite dev y `vite preview` ya aplican el fallback. No se encontró configuración de un proveedor de despliegue en el repositorio; define allí la regla de fallback antes de publicar. Para un dominio montado bajo un subdirectorio también habrá que configurar `base` en `vite.config.js`.
