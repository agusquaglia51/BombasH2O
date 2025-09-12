# 💣 BombasH2O Monorepo

¡Bienvenido al monorepo de **BombasH2O**! Este proyecto contiene toda la infraestructura para nuestra aplicación, gestionado con **Turborepo** y **Yarn Workspaces** para una experiencia de desarrollo integrada y eficiente.

- **`apps/frontend`**: Aplicación web construida con **Next.js**, **React** y **Chakra UI**.
- **`apps/backend`**: API RESTful desarrollada con **FastAPI** (Python).
- **`packages/ui`**: Librería de componentes de React compartida entre las aplicaciones del monorepo.

---

## 📋 Requisitos Previos

Asegúrate de tener instalado el siguiente software en tu sistema:

- **Node.js**: Versión `18` o superior.
- **Yarn**: Versión `4.x` o superior.
- **Python**: Versión `3.10` o superior.
- `pip` y `venv` para la gestión de paquetes y entornos virtuales de Python.

---

## 🚀 Puesta en Marcha

Sigue estos pasos para configurar el entorno de desarrollo y levantar el proyecto.

### 1️⃣ Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd BombasH2O
```

### 2️⃣ Instalar Dependencias (Node.js)

Este comando instalará todas las dependencias de los workspaces (frontend, backend y paquetes compartidos) desde la raíz del proyecto:

```bash
yarn install
```

### 3️⃣ Configurar el Backend (Python)

El backend requiere su propio entorno virtual de Python para aislar sus dependencias.

```bash
# 1. Navega a la carpeta del backend
cd apps/backend

# 2. Crea un entorno virtual
python -m venv .venv

# 3. Activa el entorno virtual
# macOS/Linux:
source .venv/bin/activate
# Windows (Git Bash):
source .venv/Scripts/activate
# Windows (CMD/PowerShell):
.venv\Scripts\activate

# 4. Instala las dependencias de Python
pip install -r requirements.txt

# 5. Regresa a la raíz del proyecto
cd ../..
```

---

## 🛠️ Desarrollo

Puedes levantar todas las aplicaciones simultáneamente o de forma individual. Se recomienda ejecutar los comandos desde la raíz del proyecto.

### Levantar Todo en Modo Desarrollo

Este es el método recomendado. Utiliza Turborepo para ejecutar el script `dev` en todos los workspaces que lo tengan definido (frontend y backend):

```bash
yarn dev
```

### Levantar Aplicaciones por Separado

Si solo necesitas trabajar en una parte del proyecto:

- **Frontend**:

```bash
yarn workspace frontend dev
```

- **Backend**:

```bash
yarn workspace backend dev
```

---

## 📦 Scripts Disponibles

Estos scripts se ejecutan desde la raíz del monorepo y afectan a todos los paquetes y aplicaciones relevantes:

- **Inicia todos los servicios (frontend y backend) en modo desarrollo:**

```bash
yarn dev
```

- **Compila las aplicaciones y paquetes para producción:**

```bash
yarn build
```

- **Ejecuta el linter de ESLint en todos los workspaces:**

```bash
yarn lint
```

- **Formatea todo el código del proyecto utilizando Prettier:**

```bash
yarn format
```

- **Realiza una comprobación de tipos con TypeScript en todo el monorepo:**

```bash
yarn check-types
```

---

Con este formato, tu README queda **consistente, limpio y listo para GitHub**, con instrucciones claras para cualquier desarrollador que se sume al proyecto.
