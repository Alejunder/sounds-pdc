
# pdc-sounds

# Sonidos Aleatorios

Una aplicación web moderna para reproducir sonidos aleatorios con un diseño atractivo y funcionalidad escalable.

## 🚀 Características

- **Reproducción aleatoria**: Pulsa un botón para escuchar sonidos sorpresa
- **Interfaz moderna**: Diseño responsivo con gradientes y animaciones
- **Control de volumen**: Ajusta el volumen con un slider intuitivo
- **Biblioteca de sonidos**: Gestiona tu colección de sonidos de audio
- **Subida de archivos**: Arrastra y suelta o selecciona archivos de audio
- **Estadísticas**: Seguimiento de sonidos reproducidos
- **Atajos de teclado**: 
  - `Espacio`: Reproducir/pausar
  - `Escape`: Detener
  - `Ctrl/Cmd + O`: Agregar archivos

## 📁 Estructura del Proyecto

```
sonidos-aleatorios/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── assets/
│   ├── sounds/         # Archivos de audio
│   └── images/         # Imágenes y recursos gráficos
└── README.md           # Este archivo
```

## 🎵 Formatos de Audio Soportados

- MP3
- WAV
- OGG
- M4A
- AAC

## 🛠️ Instalación y Uso

1. **Clona o descarga** el proyecto
2. **Agrega archivos de audio** a la carpeta `assets/sounds/`
3. **Abre** `index.html` en tu navegador web
4. **¡Disfruta!** Pulsa el botón para reproducir sonidos aleatorios

## ⚡ Funcionalidades Escalables

### Arquitectura Modular
- Código organizado en clases para fácil mantenimiento
- Separación clara de responsabilidades
- Sistema de eventos robusto

### Extensibilidad
- **Categorías de sonidos**: Organiza sonidos por tipo
- **Filtros**: Futura implementación de filtros por categoría
- **Favoritos**: Sistema para marcar sonidos favoritos
- **Playlists**: Creación de listas de reproducción
- **Efectos**: Aplicación de efectos de audio
- **Sincronización**: Conexión con servicios en la nube

### Características Técnicas
- **Local Storage**: Persistencia de configuraciones
- **File API**: Manejo moderno de archivos
- **Web Audio API**: Preparado para efectos avanzados
- **Progressive Web App**: Listo para conversión a PWA
- **Responsive Design**: Funciona en dispositivos móviles

## 🎨 Personalización

### Temas
El CSS utiliza variables CSS para fácil personalización:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --background-color: #0f172a;
    /* ... más variables */
}

### Agregar Nuevas Características
1. **Nuevos controles**: Agrega elementos HTML y conecta eventos en `script.js`
2. **Efectos visuales**: Modifica `styles.css` para nuevas animaciones
3. **Funcionalidades**: Extiende la clase `RandomSoundPlayer`

## 📱 Responsive Design

La aplicación está optimizada para:
- **Escritorio**: Experiencia completa con todos los controles
- **Tablet**: Diseño adaptado para pantallas medianas
- **Móvil**: Interfaz simplificada y táctil

## 🔧 Desarrollo

### Próximas Características
- [ ] Sistema de favoritos
- [ ] Categorización avanzada
- [ ] Efectos de audio en tiempo real
- [ ] Sincronización con la nube
- [ ] Modo oscuro/claro
- [ ] Visualizador de audio
- [ ] Exportar/importar biblioteca

### Contribuir
1. Fork el proyecto
2. Crea una rama para tu característica
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🤝 Soporte

Si tienes preguntas o necesitas ayuda:
- Abre un issue en GitHub
- Consulta la documentación del código
- Revisa los comentarios en el código fuente

---

¡Disfruta creando tu biblioteca de sonidos personalizada! 🎵

