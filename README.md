# 🛒 Mi Tienda Online - E-commerce React App

Una aplicación de comercio electrónico moderna construida con React, que ofrece una experiencia de compra completa con gestión de productos, autenticación de usuarios y panel de administración.

## 🚀 Características

### Para Usuarios
- **Catálogo de Productos**: Navegación intuitiva con filtros por categoría y búsqueda
- **Detalles de Producto**: Información completa con imágenes, descripciones y ratings
- **Carrito de Compras**: Gestión completa del carrito con actualización de cantidades
- **Autenticación**: Sistema de registro e inicio de sesión seguro
- **Perfil de Usuario**: Gestión de información personal
- **Historial de Pedidos**: Seguimiento de compras realizadas
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop

### Para Administradores
- **Panel de Administración**: Dashboard completo para gestión de productos
- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos
- **Gestión de Categorías**: Organización eficiente del catálogo
- **Interface Intuitiva**: Formularios y modales para fácil gestión

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **React Router DOM** - Navegación SPA
- **Styled Components** - Estilos CSS-in-JS
- **Bootstrap** - Framework CSS complementario
- **React Toastify** - Notificaciones elegantes
- **React Helmet Async** - Gestión de metadatos SEO
- **React Icons** - Iconografía moderna
- **MockAPI** - API de desarrollo y testing

## 📋 Requisitos Previos

Antes de instalar, asegúrate de tener:

- **Node.js** (versión 16.0 o superior)
- **npm** (versión 8.0 o superior) o **yarn**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://https://github.com/sedrna26/ReactJS
cd ReactJS
```

### 2. Instalar dependencias
```bash
npm install
# o si prefieres yarn
yarn install
```

### 3. Configurar variables de entorno (opcional)
Crea un archivo `.env` en la raíz del proyecto:
```env
REACT_APP_API_BASE_URL=https://68803b4ff1dcae717b615b5e.mockapi.io/api/v1
REACT_APP_APP_NAME=Mi Tienda Online
```

### 4. Iniciar el servidor de desarrollo
```bash
npm start
# o con yarn
yarn start
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes React reutilizables
│   ├── Layout/          # Componente de layout principal
│   ├── ProductList/     # Lista y filtrado de productos
│   ├── ProductDetail/   # Detalles de producto individual
│   ├── Cart/           # Carrito de compras
│   ├── Auth/           # Componentes de autenticación
│   ├── Admin/          # Panel de administración
├── services/           # Servicios de API
│   └── api.js         # Configuración y llamadas a la API
└── App.js            # Componente principal de la aplicación
```

## 👥 Usuarios de Prueba

### Usuario Regular
- **Email**: `usuario@test.com`
- **Contraseña**: `123456`

### Administrador
- **Email**: `admin@test.com`
- **Contraseña**: `admin123`

## 🌐 Funcionalidades Detalladas

### Navegación y Búsqueda
- Filtrado por categorías dinámicas
- Búsqueda por nombre y descripción
- Ordenamiento por precio y nombre
- Paginación automática

### Gestión del Carrito
- Agregar productos desde la lista o detalles
- Modificar cantidades directamente
- Eliminar productos individuales
- Cálculo automático de totales
- Persistencia en localStorage

### Sistema de Autenticación
- Registro de nuevos usuarios
- Inicio de sesión seguro
- Rutas protegidas
- Roles de usuario (user/admin)
- Gestión de sesiones

### Panel de Administración
- Dashboard con estadísticas
- CRUD completo de productos
- Subida de imágenes por URL
- Validación de formularios
- Confirmación de acciones destructivas

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ **Desktop**: 1920x1080 y superior
- ✅ **Laptop**: 1366x768 a 1920x1080
- ✅ **Tablet**: 768x1024 (iPad, Android tablets)
- ✅ **Mobile**: 375x667 a 414x896 (iPhone, Android)

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
# o con yarn
yarn build
```

### Opciones de Despliegue

#### Vercel (Recomendado)
1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel` en la carpeta del proyecto
3. Sigue las instrucciones interactivas

#### Netlify
1. Ejecuta `npm run build`
2. Arrastra la carpeta `build` a [Netlify Drop](https://app.netlify.com/drop)


## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Crea build optimizado para producción
- `npm test` - Ejecuta los tests
- `npm run eject` - Expone configuración de webpack (irreversible)

## 🐛 Solución de Problemas

### Problemas Comunes

**Error de CORS**
```bash
# Instalar proxy para desarrollo
npm install --save-dev http-proxy-middleware
```

**Problemas de memoria en build**
```bash
# Aumentar memoria para Node.js
node --max-old-space-size=4096 node_modules/.bin/react-scripts build
```

**Estilos no cargan**
- Verificar importaciones de CSS
- Comprobar orden de importación de Bootstrap

## 🔐 Configuración de Seguridad

### Variables de Entorno
Nunca incluyas claves secretas en el código. Usa variables de entorno:

```env
# .env.local
REACT_APP_API_KEY=tu_clave_api
REACT_APP_ENVIRONMENT=production
```

### Validación de Datos
- Sanitización de inputs de usuario
- Validación en frontend y backend
- Protección contra XSS

## 📊 Optimización de Rendimiento

### Métricas Objetivo
- **First Contentful Paint**: < 2 segundos
- **Largest Contentful Paint**: < 3 segundos
- **Time to Interactive**: < 4 segundos
- **Cumulative Layout Shift**: < 0.1

### Optimizaciones Implementadas
- ✅ Lazy loading de imágenes
- ✅ Minificación de CSS y JS
- ✅ Compresión de assets
- ✅ Caching de API calls
- ✅ Code splitting por rutas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request


## 👨‍💻 Autor

**Horacio A. Rodriguez**
- GitHub: [@sedrna26](https://github.com/sedrna26)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: sedrna26@gmail.com

## 🙏 Agradecimientos

- Agencia de TalentoTech de la cuidad de Buenos Aires por poner a disposicion todo el material y profesores calificados.
- React Team por el excelente framework
- MockAPI por el servicio de API de desarrollo
- Styled Components por el sistema de estilos
- Bootstrap por los componentes base
- Iconos por React Icons

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella en GitHub!



---
*Última actualización: Julio 2025*