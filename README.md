# 🎵 Soundboard Shrek

Un soundboard interactivo con las mejores frases de las películas de Shrek, desarrollado con Node.js y Express.

## ✨ Características

- 🎵 Reproducción de archivos de audio MP3
- 📊 Contadores de reproducción persistentes
- 🔍 Buscador de frases en tiempo real
- 🌙 Modo oscuro/claro
- 📱 Diseño responsive
- ⚡ API REST para gestión de datos
- 🎨 Interfaz moderna con SweetAlert2

## 📁 Estructura del Proyecto

```
Simulador/
├── public/
│   ├── index.html          # Página principal
│   ├── main.js             # JavaScript del frontend
│   ├── style.css           # Estilos CSS
│   ├── sounds/             # Archivos de audio MP3
│   └── img/                # Imágenes de personajes
├── server.js               # Servidor Express
├── package.json            # Dependencias y scripts
├── frases.json             # Base de datos de frases
└── reproducciones.json     # Contadores de reproducción
```

## 🎮 Uso

### Reproducir Sonidos
- Haz clic en el botón "Reproducir" de cualquier tarjeta
- El audio se reproducirá y el contador se incrementará
- Usa el botón "Detener" para parar la reproducción

### Buscar Frases
- Escribe en el campo de búsqueda para filtrar las frases
- La búsqueda es en tiempo real y no distingue mayúsculas/minúsculas

### Gestionar Contadores
- El botón "Reiniciar contadores" resetea todos los contadores a 0
- Los contadores se guardan automáticamente en el servidor

### Modo Oscuro
- Toggle el botón "Modo Oscuro" para cambiar entre temas

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Base de Datos:** JSON (archivos locales)
- **Librerías:** SweetAlert2
- **Servidor:** Express Static Files