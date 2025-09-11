# Plan de Implementación: Backend FastAPI + MongoDB para IFAP

## 📋 **Resumen Ejecutivo**

Este documento detalla la implementación de un backend moderno usando **FastAPI + MongoDB** para la plataforma educativa del Instituto de Formación Archivística del Perú (IFAP). El plan se basa en un análisis completo del frontend existente y establece una integración clara entre ambos sistemas.

## 🔍 **Análisis del Frontend Existente**

### **Formularios Identificados**

#### **1. Formulario de Login** (`iniciar-sesion.html`)
- **Campos**: usuario/correo, contraseña, recordar sesión
- **Acción actual**: Redirige a `aula-virtual.html`
- **Backend requerido**: Endpoint `/auth/login` con JWT

#### **2. Formulario de Registro** (`inscribirse.html`)
- **Tipo**: Multi-step (4 pasos)
- **Campos principales**:
  - **Paso 1**: nombres, apellidos, email, teléfono, fecha_nacimiento, género
  - **Paso 2**: dirección, ocupación, institución
  - **Paso 3**: motivación (textarea)
  - **Paso 4**: password, confirm_password, términos, newsletter
- **Backend requerido**: Endpoint `/auth/register` con validación completa

#### **3. Formulario de Contacto** (`contacto.html`)
- **Campos**: nombre, email, teléfono, asunto (select), mensaje
- **Backend requerido**: Endpoint `/contact/messages` para almacenar mensajes

#### **4. Formularios de Inscripción** (`curso-*.html`)
- **Campos**: nombre, email, teléfono, experiencia (select)
- **Backend requerido**: Endpoint `/courses/{course_id}/enroll`

### **Funcionalidades JavaScript Existentes**

#### **Sistema de Búsqueda** (`search.js`)
- Búsqueda por categorías: principal, cursos, recursos, institución, acceso, plataforma
- 25+ páginas indexadas con tags
- **Backend requerido**: Endpoint `/search` con filtros y paginación

#### **Validación de Formularios** (`formValidation.js`)
- Validación frontend completa
- Mensajes de error dinámicos
- **Backend requerido**: Validación adicional en APIs

#### **Otras Funcionalidades**
- Carrusel de imágenes (`carousel.js`)
- Galería de imágenes (`gallery.js`)
- Sistema de certificados (`certificates.js`)

## 🏗️ **Arquitectura del Backend**

### **Estructura del Proyecto**

```
backend-ifap/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app + CORS
│   ├── config.py               # Configuración MongoDB
│   ├── database.py             # Conexión async MongoDB
│   ├── models/                 # Modelos Pydantic/Beanie
│   │   ├── user.py            # Usuario, Perfil
│   │   ├── course.py          # Curso, Lección, Enrollment
│   │   ├── contact.py         # Mensajes de contacto
│   │   ├── forum.py           # Foros, Posts, Comments
│   │   └── file.py            # Sistema de archivos
│   ├── routes/                 # Endpoints API
│   │   ├── auth.py            # Login, Register, JWT
│   │   ├── users.py           # Gestión de usuarios
│   │   ├── courses.py         # CRUD cursos
│   │   ├── enrollment.py      # Inscripciones
│   │   ├── contact.py         # Mensajes de contacto
│   │   ├── search.py          # Búsqueda avanzada
│   │   └── files.py           # Upload/Download archivos
│   ├── services/               # Lógica de negocio
│   │   ├── auth_service.py
│   │   ├── email_service.py
│   │   └── file_service.py
│   ├── utils/                  # Utilidades
│   │   ├── security.py        # JWT, Hashing
│   │   ├── validators.py      # Validaciones custom
│   │   └── pagination.py      # Paginación
│   └── middleware/             # Middlewares
│       ├── auth_middleware.py
│       └── cors_middleware.py
├── tests/                      # Tests
├── requirements.txt
├── .env.example
└── README.md
```

## 📊 **Modelos de Datos (MongoDB)**

### **Usuario (`user.py`)**
```python
class User(Document):
    email: str
    password_hash: str
    first_name: str
    last_name: str
    phone: str
    birth_date: datetime
    gender: str
    address: str
    occupation: str
    institution: str
    motivation: str
    role: str  # student, teacher, admin
    is_active: bool
    created_at: datetime
    updated_at: datetime
```

### **Curso (`course.py`)**
```python
class Course(Document):
    title: str
    description: str
    instructor: str
    duration: int  # horas
    price: float
    discount_price: float
    category: str
    level: str  # básico, intermedio, avanzado
    status: str  # activo, inactivo
    created_at: datetime
```

### **Inscripción (`enrollment.py`)**
```python
class Enrollment(Document):
    user_id: str
    course_id: str
    enrollment_date: datetime
    status: str  # activo, completado, cancelado
    progress_percentage: float
    completed_lessons: List[str]
```

## 🔗 **APIs REST Principales**

### **Autenticación**
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Login con JWT
- `POST /auth/refresh` - Refresh token
- `POST /auth/forgot-password` - Recuperar contraseña

### **Usuarios**
- `GET /users/me` - Perfil del usuario actual
- `PUT /users/me` - Actualizar perfil
- `GET /users/{user_id}` - Perfil público

### **Cursos**
- `GET /courses` - Listar cursos (con filtros)
- `GET /courses/{course_id}` - Detalle de curso
- `POST /courses/{course_id}/enroll` - Inscribirse
- `GET /users/me/enrollments` - Mis cursos inscritos

### **Contacto**
- `POST /contact/messages` - Enviar mensaje
- `GET /contact/messages` - Listar mensajes (admin)

### **Búsqueda**
- `GET /search?q={query}&category={category}&page={page}` - Búsqueda avanzada

## 🔄 **Integración con Frontend**

### **Reemplazo de Formularios Estáticos**

#### **Formulario de Login**
```javascript
// Actual: <form action="aula-virtual.html" method="get">
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('usuario').value,
            password: document.getElementById('password').value
        })
    });
    const data = await response.json();
    if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        window.location.href = '/dashboard';
    }
});
```

#### **Formulario de Registro Multi-step**
```javascript
// Integración con steps existentes
async function submitRegistration(formData) {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    return await response.json();
}
```

### **Sistema de Búsqueda Dinámico**
```javascript
// Reemplazar búsqueda estática por API
async function searchContent(query, category) {
    const response = await fetch(`/api/search?q=${query}&category=${category}`);
    const results = await response.json();
    displaySearchResults(results);
}
```

## 📋 **Plan de Implementación por Fases**

### **Fase 1: Configuración Base (1-2 días)**
- [ ] Instalar FastAPI, MongoDB, Beanie
- [ ] Configurar estructura del proyecto
- [ ] Conectar a MongoDB
- [ ] Crear modelos básicos (User, Course)
- [ ] Implementar CORS y middlewares básicos

### **Fase 2: Autenticación (2-3 días)**
- [ ] Implementar registro completo con validación
- [ ] Sistema JWT para login
- [ ] Middleware de autenticación
- [ ] Endpoints de perfil de usuario
- [ ] Integrar con formulario de login existente

### **Fase 3: Sistema de Cursos (3-4 días)**
- [ ] CRUD completo de cursos
- [ ] Sistema de inscripciones
- [ ] Gestión de progreso de estudiante
- [ ] Integración con formularios de cursos
- [ ] API de búsqueda de cursos

### **Fase 4: Funcionalidades Adicionales (4-5 días)**
- [ ] Sistema de contacto
- [ ] Gestión de archivos (GridFS)
- [ ] API de búsqueda avanzada
- [ ] Sistema de notificaciones
- [ ] Dashboard APIs

### **Fase 5: Integración Frontend (3-4 días)**
- [ ] Reemplazar formularios estáticos por llamadas API
- [ ] Actualizar JavaScript para usar backend
- [ ] Implementar manejo de errores
- [ ] Testing de integración
- [ ] Optimización de rendimiento

### **Fase 6: Seguridad y Producción (2-3 días)**
- [ ] Validaciones de seguridad
- [ ] Rate limiting
- [ ] Logging y monitoreo
- [ ] Configuración de producción
- [ ] Documentación de APIs

## 🛠️ **Tecnologías y Dependencias**

```txt
# Core
fastapi==0.104.1
uvicorn[standard]==0.24.0
motor==3.3.2
beanie==1.23.8

# Seguridad
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6

# Utilidades
pydantic[email]==2.5.0
python-dotenv==1.0.0
aiofiles==23.2.1

# Desarrollo
pytest==7.4.3
httpx==0.25.2
```

## 🎯 **Beneficios de la Implementación**

### **Para Usuarios**
- ✅ Registro e inicio de sesión seguros
- ✅ Inscripción a cursos en tiempo real
- ✅ Seguimiento de progreso personalizado
- ✅ Búsqueda avanzada de contenido
- ✅ Comunicación directa con la institución

### **Para Administradores**
- ✅ Gestión completa de usuarios y cursos
- ✅ Análisis de datos y estadísticas
- ✅ Sistema de mensajería integrado
- ✅ Control de acceso basado en roles

### **Para Desarrolladores**
- ✅ APIs bien documentadas (/docs)
- ✅ Código mantenible y escalable
- ✅ Testing automatizado
- ✅ Despliegue simplificado

## 🚀 **Próximos Pasos**

1. **Configurar entorno de desarrollo**
2. **Implementar modelos básicos**
3. **Crear endpoints de autenticación**
4. **Integrar primer formulario (login)**
5. **Iterar y expandir funcionalidades**

¿Te gustaría que comience con la implementación de alguna fase específica?
