/**
 * Aplicación de Sonidos Aleatorios
 * Estructura escalable y modular para gestionar reproducción de audio
 */

class RandomSoundPlayer {
    constructor() {
        this.sounds = [];
        this.audioPlayer = document.getElementById('audioPlayer');
        this.currentSoundIndex = null;
        this.soundsPlayed = 0;
        this.isPlaying = false;
        
        // Referencias a elementos del DOM
        this.elements = {
            playButton: document.getElementById('playRandomSound'),
            stopButton: document.getElementById('stopSound'),
            volumeSlider: document.getElementById('volumeSlider'),
            volumeValue: document.getElementById('volumeValue'),
            soundInfo: document.getElementById('soundInfo'),
            currentSound: document.querySelector('.current-sound'),
            soundsPlayedStat: document.getElementById('soundsPlayed'),
            totalSoundsStat: document.getElementById('totalSounds'),
            soundList: document.getElementById('soundList')
        };
        
        this.init();
    }
    
    /**
     * Inicializa la aplicación
     */
    init() {
        this.setupEventListeners();
        this.loadDefaultSounds();
        this.updateStats();
        this.updateVolumeDisplay();
        
        // Configuración inicial del reproductor de audio
        this.audioPlayer.volume = 0.5;
        
        console.log('🎵 Aplicación de Sonidos Aleatorios inicializada');
    }
    
    /**
     * Configura todos los event listeners
     */
    setupEventListeners() {
        // Botón principal de reproducción
        this.elements.playButton.addEventListener('click', () => {
            this.playRandomSound();
        });
        
        // Botón de detener
        this.elements.stopButton.addEventListener('click', () => {
            this.stopSound();
        });
        
        // Control de volumen
        this.elements.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value);
        });
        
        // Event listeners del reproductor de audio
        this.audioPlayer.addEventListener('ended', () => {
            this.onSoundEnded();
        });
        
        this.audioPlayer.addEventListener('loadstart', () => {
            this.setLoadingState(true);
        });
        
        this.audioPlayer.addEventListener('canplay', () => {
            this.setLoadingState(false);
        });
        
        this.audioPlayer.addEventListener('error', (e) => {
            this.handleAudioError(e);
        });
        
        // Atajos de teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }
    
    /**
     * Carga los sonidos por defecto
     */
    loadDefaultSounds() {
        // Sonidos por defecto que se pueden incluir
        const defaultSounds = [
            {
                name: 'Blancuchi',
                url: 'assets/sounds/blancuchi.mp3',
                category: 'Hecho por El nigga'
            }
            // {
            //     name: 'Aplausos',
            //     url: 'assets/sounds/applause.mp3',
            //     category: 'Ambiente'
            // },
            // {
            //     name: 'Lluvia',
            //     url: 'assets/sounds/rain.mp3',
            //     category: 'Naturaleza'
            // },
            // {
            //     name: 'Gato',
            //     url: 'assets/sounds/cat.mp3',
            //     category: 'Animales'
            // },
            // {
            //     name: 'Notificación',
            //     url: 'assets/sounds/notification.mp3',
            //     category: 'UI'
            // }
            
        ];
        
        // Solo agregar sonidos que existan
        defaultSounds.forEach(sound => {
            this.sounds.push({
                ...sound,
                id: this.generateId(),
                dateAdded: new Date(),
                playCount: 0
            });
        });
        
        this.renderSoundList();
        this.updateStats();
    }
    
    /**
     * Reproduce un sonido aleatorio
     */
    async playRandomSound() {
        if (this.sounds.length === 0) {
            this.showNotification('No hay sonidos disponibles. Agrega algunos archivos de audio.', 'warning');
            return;
        }
        
        if (this.isPlaying) {
            this.stopSound();
            return;
        }
        
        try {
            // Seleccionar sonido aleatorio
            const randomIndex = Math.floor(Math.random() * this.sounds.length);
            const selectedSound = this.sounds[randomIndex];
            
            this.currentSoundIndex = randomIndex;
            this.updateCurrentSoundDisplay(selectedSound.name, 'Cargando...');
            
            // Configurar y reproducir audio
            this.audioPlayer.src = selectedSound.url;
            await this.audioPlayer.play();
            
            this.isPlaying = true;
            this.updatePlayButton(true);
            this.updateCurrentSoundDisplay(selectedSound.name, 'Reproduciendo');
            
            // Actualizar estadísticas
            selectedSound.playCount++;
            this.soundsPlayed++;
            this.updateStats();
            
            console.log(`🎵 Reproduciendo: ${selectedSound.name}`);
            
        } catch (error) {
            console.error('Error al reproducir sonido:', error);
            this.showNotification('Error al reproducir el sonido', 'error');
            this.onSoundEnded();
        }
    }
    
    /**
     * Detiene la reproducción actual
     */
    stopSound() {
        if (!this.isPlaying) return;
        
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.onSoundEnded();
    }
    
    /**
     * Maneja el final de la reproducción
     */
    onSoundEnded() {
        this.isPlaying = false;
        this.currentSoundIndex = null;
        this.updatePlayButton(false);
        this.updateCurrentSoundDisplay('', 'Listo para reproducir...');
        this.setLoadingState(false);
    }
    
    /**
     * Establece el volumen del reproductor
     */
    setVolume(value) {
        const volume = value / 100;
        this.audioPlayer.volume = volume;
        this.updateVolumeDisplay(value);
    }
    
    /**
     * Actualiza la visualización del volumen
     */
    updateVolumeDisplay(value = null) {
        const currentValue = value || (this.audioPlayer.volume * 100);
        this.elements.volumeValue.textContent = `${Math.round(currentValue)}%`;
        
        if (value === null) {
            this.elements.volumeSlider.value = currentValue;
        }
    }
    
    /**
     * Actualiza el estado del botón principal
     */
    updatePlayButton(isPlaying) {
        const icon = this.elements.playButton.querySelector('.button-icon');
        const text = this.elements.playButton.querySelector('.button-text');
        
        if (isPlaying) {
            icon.textContent = '⏸️';
            text.textContent = 'Pausar';
            this.elements.playButton.classList.add('playing');
        } else {
            icon.textContent = '🔊';
            text.textContent = 'Reproducir Sonido';
            this.elements.playButton.classList.remove('playing');
        }
    }
    
    /**
     * Actualiza la información del sonido actual
     */
    updateCurrentSoundDisplay(soundName, status) {
        if (soundName) {
            this.elements.currentSound.textContent = `${soundName} - ${status}`;
        } else {
            this.elements.currentSound.textContent = status;
        }
        
        // Aplicar clase CSS según el estado
        this.elements.currentSound.classList.toggle('playing', status === 'Reproduciendo');
    }
    
    /**
     * Actualiza las estadísticas
     */
    updateStats() {
        this.elements.soundsPlayedStat.textContent = this.soundsPlayed;
        this.elements.totalSoundsStat.textContent = this.sounds.length;
    }
    
    /**
     * Establece el estado de carga
     */
    setLoadingState(isLoading) {
        this.elements.playButton.disabled = isLoading;
        this.elements.playButton.classList.toggle('loading', isLoading);
    }
    
    /**
     * Renderiza la lista de sonidos
     */
    renderSoundList() {
        this.elements.soundList.innerHTML = '';
        
        if (this.sounds.length === 0) {
            this.elements.soundList.innerHTML = `
                <div class="no-sounds">
                    <p>No hay sonidos disponibles</p>
                    <p>Agrega archivos de audio para comenzar</p>
                </div>
            `;
            return;
        }
        
        this.sounds.forEach(sound => {
            const soundElement = this.createSoundElement(sound);
            this.elements.soundList.appendChild(soundElement);
        });
    }
    
    /**
     * Crea un elemento de sonido para la lista
     */
    createSoundElement(sound) {
        const div = document.createElement('div');
        div.className = 'sound-item';
        div.innerHTML = `
            <h4>${sound.name}</h4>
            <p class="sound-category">${sound.category}</p>
            <div class="sound-actions">
                <button onclick="soundPlayer.playSoundById('${sound.id}')" class="play-individual">
                    ▶️ Reproducir
                </button>
            </div>
        `;
        return div;
    }
    
    /**
     * Reproduce un sonido específico por ID
     */
    async playSoundById(soundId) {
        const sound = this.sounds.find(s => s.id === soundId);
        if (!sound) return;
        
        try {
            if (this.isPlaying) {
                this.stopSound();
            }
            
            this.updateCurrentSoundDisplay(sound.name, 'Cargando...');
            this.audioPlayer.src = sound.url;
            await this.audioPlayer.play();
            
            this.isPlaying = true;
            this.updatePlayButton(true);
            this.updateCurrentSoundDisplay(sound.name, 'Reproduciendo');
            
            sound.playCount++;
            this.soundsPlayed++;
            this.updateStats();
            this.renderSoundList();
            
        } catch (error) {
            console.error('Error al reproducir sonido:', error);
            this.showNotification('Error al reproducir el sonido', 'error');
        }
    }
    
    /**
     * Elimina un sonido por ID
     */
    removeSoundById(soundId) {
        const soundIndex = this.sounds.findIndex(s => s.id === soundId);
        if (soundIndex === -1) return;
        
        const sound = this.sounds[soundIndex];
        
        this.sounds.splice(soundIndex, 1);
        this.renderSoundList();
        this.updateStats();
        
        this.showNotification(`Sonido "${sound.name}" eliminado`, 'info');
    }
    
    /**
     * Maneja atajos de teclado
     */
    handleKeyboardShortcuts(event) {
        // Spacebar para reproducir/pausar
        if (event.code === 'Space' && !event.target.matches('input, textarea, button')) {
            event.preventDefault();
            this.playRandomSound();
        }
        
        // Escape para detener
        if (event.code === 'Escape') {
            this.stopSound();
        }
    }
    
    /**
     * Maneja errores de audio
     */
    handleAudioError(event) {
        console.error('Error de audio:', event);
        this.showNotification('Error al cargar el archivo de audio', 'error');
        this.onSoundEnded();
    }
    
    /**
     * Muestra notificaciones al usuario
     */
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos básicos para la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        // Colores según el tipo
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#6366f1'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    /**
     * Genera un ID único
     */
    generateId() {
        return 'sound_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia global para acceso desde HTML
    window.soundPlayer = new RandomSoundPlayer();
});

// Exportar para uso en módulos (si es necesario en el futuro)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RandomSoundPlayer;
}