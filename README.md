# 🧾 Sistema de Inventario y Tesorería – Frontend

**Frontend web modular y ligero** para la gestión de inventario, compras, gastos, proveedores y usuarios dentro de un entorno administrativo. Este cliente web está construido con **HTML, CSS y JavaScript puro**, y consume servicios desde una API RESTful externa.

---

## 📌 Características Principales

- 🔒 Inicio de sesión con autenticación por token (JWT)
- 📊 Dashboard con visión general del sistema
- 📦 CRUD completo de Inventario, Compras, Gastos, Proveedores y Usuarios
- 🧩 Sistema de rutas SPA (Single Page Application) basado en hash (`#`)
- 💬 Modales y notificaciones reutilizables
- ⚙️ Código modular y bien organizado por vista, componente y lógica
- ❌ Página 404 personalizada

---

## 📁 Estructura del Proyecto

```

inventario-tesoreria-frontend/
│
├── assets/
│   ├── css/
│   │   ├── main.css                # Estilos principales
│   │   ├── components/             # Estilos por componentes
│   │   │   ├── buttons.css
│   │   │   ├── forms.css
│   │   │   ├── tables.css
│   │   │   ├── notifications.css
│   │   │   └── modals.css
│   │   └── views/                  # Estilos por vistas
│   │       ├── compras.css
│   │       ├── gastos.css
│   │       ├── inventario.css
│   │       ├── proveedores.css
│   │       ├── dashboard.css
│   │       ├── login.css
│   │       ├── listar.css
│   │       ├── registrar.css
│   │       ├── editar.css
│   │       └── usuarios.css
│   │
│   ├── js/
│   │   ├── app.js                  # Configuración principal (router SPA)
│   │   ├── api/                    # Conexión con endpoints de la API
│   │   │   ├── api.js              # Configuración base de la API
│   │   │   ├── compras.js
│   │   │   ├── gastos.js
│   │   │   ├── inventario.js
│   │   │   ├── proveedores.js
│   │   │   ├── login.js
│   │   │   └── usuarios.js
│   │   ├── components/             # Componentes JS reutilizables
│   │   │   ├── modal.js
│   │   │   ├── notifications.js
│   │   │   ├── sidebar.js
│   │   │   ├── partials-loader.js
│   │   │   └── table-manager.js
│   │   └── views/                  # Scripts específicos por vista
│   │       ├── compras.js
│   │       ├── gastos.js
│   │       ├── inventario.js
│   │       ├── proveedores.js
│   │       ├── login.js
│   |       ├── dashboard.js         
│   │       └── usuarios.js
│   │
│   └── images/                     # Imágenes e iconos
│
├── views/
│   ├── partials/                   # Componentes reutilizables HTML
│   │   ├── header.html
│   │   ├── sidebar.html
│   │   ├── footer.html
│   │   └── modal-base.html
│   │
│   ├── compras/                    # Vistas de compras 
│   │   ├── listar.html
│   │   ├── registrar.html
│   │   └── editar.html
│   │
│   ├── gastos/                     # Vistas de gastos  
│   │   ├── listar.html
│   │   ├── registrar.html
│   │   └── editar.html
│   │
│   ├── inventario/                 # Vistas de inventario 
│   │   ├── listar.html
│   │   ├── registrar.html
│   │   └── editar.html
│   │
│   ├── proveedores/                # Vistas de proveedores 
│   │   ├── listar.html
│   │   ├── registrar.html
│   │   └── editar.html
│   │
│   ├── usuarios/                   # Vistas de usuarios  
│   │   ├── listar.html
│   │   ├── registrar.html
│   │   └── editar.html
│   │
│   ├── dashboard.html              # Vista principal tras login
│   ├── login.html                  # Página de inicio de sesión(http://localhost:8000/#/login)
│   └── 404.html                    # Página de error para rutas no válidas
│
├── index.html                      # Punto de entrada principal
└── README.md                       # Documentación del frontend

````

---

## 🚀 Instalación y Uso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/inventario-tesoreria-frontend.git
cd inventario-tesoreria-frontend
````

### 2. Ejecutar Localmente

* Puedes abrir `index.html` directamente desde tu navegador.
* O bien, usar [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VSCode para una mejor experiencia de desarrollo.

---

## ⚙️ Requisitos del Backend

Este frontend requiere una API REST funcional que exponga los siguientes endpoints:

* `/api/login`
* `/api/inventario`
* `/api/compras`
* `/api/gastos`
* `/api/proveedores`
* `/api/usuarios`

> La autenticación se maneja mediante token JWT guardado en `localStorage`.

---

## 🧭 Navegación SPA

Las vistas se cargan dinámicamente usando rutas hash (`#/usuarios`, `#/inventario`, etc.). Si una ruta no existe, redirige automáticamente a `#/404`.

---

## ✅ Orden de Implementación

1. `index.html`, `main.css`, `app.js`
2. `partials/`: header, sidebar, footer, modales
3. Login (`login.html`, API y estilos)
4. Dashboard (`dashboard.html`)
5. Componentes JS reutilizables
6. Estilos globales y por componente
7. Vistas CRUD para: Inventario → Compras → Gastos → Proveedores → Usuarios
8. Página de error `404.html`
9. Documentación (`README.md`)

---

## ✨ Créditos

Desarrollado con fines académicos y profesionales por el equipo de desarrollo para optimizar la gestión de recursos y gastos en áreas administrativas.

---

## 📬 Contacto

**Autor:** \[Tu Nombre o Equipo]
**Email:** [contacto@ejemplo.com](mailto:contacto@ejemplo.com)
**Repositorio:** [github.com/tu-usuario/inventario-tesoreria-frontend](https://github.com/tu-usuario/inventario-tesoreria-frontend)

---
