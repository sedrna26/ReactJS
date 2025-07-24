// =============================================================================
// ARCHIVO: src/utils/compatibilityTests.js
// Pruebas de compatibilidad del navegador
// =============================================================================

export const compatibilityTests = {
    // Verificar soporte de características modernas
    checkModernFeatures() {
        const features = {
            localStorage: typeof Storage !== 'undefined',
            sessionStorage: typeof Storage !== 'undefined',
            fetch: typeof fetch !== 'undefined',
            intersectionObserver: 'IntersectionObserver' in window,
            webp: false,
            flexbox: ('supports' in CSS) && CSS.supports('display', 'flex'),
            grid: ('supports' in CSS) && CSS.supports('display', 'grid'),
            customProperties: CSS.supports('--test', 'green'),
            asyncAwait: true, // Verificado en tiempo de transpilación
        };

        // Test WebP support
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        features.webp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

        return features;
    },

    // Detectar información del dispositivo
    getDeviceInfo() {
        const ua = navigator.userAgent;
        return {
            mobile: /Mobile|Android|iPhone|iPad/.test(ua),
            tablet: /iPad|Android/.test(ua) && !/Mobile/.test(ua),
            desktop: !/Mobile|Android|iPhone|iPad/.test(ua),
            browser: this.getBrowserInfo(),
            screenSize: {
                width: window.screen.width,
                height: window.screen.height,
                available: {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                }
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            pixelRatio: window.devicePixelRatio || 1,
            colorDepth: window.screen.colorDepth,
            online: navigator.onLine,
            connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection
        };
    },

    // Detectar navegador
    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let version = 'Unknown';

        if (ua.includes('Chrome') && !ua.includes('Edg')) {
            browser = 'Chrome';
            version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Firefox')) {
            browser = 'Firefox';
            version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
            browser = 'Safari';
            version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Edg')) {
            browser = 'Edge';
            version = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
        }

        return { name: browser, version };
    },

    // Verificar rendimiento de la red
    async checkNetworkSpeed() {
        const startTime = performance.now();
        try {
            // Descargar una imagen pequeña para medir velocidad
            await fetch('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', {
                cache: 'no-cache'
            });
            const endTime = performance.now();
            const duration = endTime - startTime;

            return {
                latency: duration,
                quality: duration < 100 ? 'fast' : duration < 300 ? 'medium' : 'slow'
            };
        } catch (error) {
            return { latency: -1, quality: 'unknown', error: error.message };
        }
    },

    // Generar reporte completo
    async generateCompatibilityReport() {
        const features = this.checkModernFeatures();
        const device = this.getDeviceInfo();
        const network = await this.checkNetworkSpeed();

        const report = {
            timestamp: new Date().toISOString(),
            features,
            device,
            network,
            recommendations: this.generateRecommendations(features, device, network)
        };

        console.log('📊 Reporte de Compatibilidad:', report);
        return report;
    },

    // Generar recomendaciones basadas en las pruebas
    generateRecommendations(features, device, network) {
        const recommendations = [];

        if (!features.localStorage) {
            recommendations.push({
                type: 'warning',
                message: 'LocalStorage no disponible. Se perderán datos al cerrar la sesión.'
            });
        }

        if (!features.intersectionObserver) {
            recommendations.push({
                type: 'info',
                message: 'IntersectionObserver no disponible. Se usará polyfill para lazy loading.'
            });
        }

        if (device.mobile && device.viewport.width < 375) {
            recommendations.push({
                type: 'warning',
                message: 'Pantalla muy pequeña. Algunos elementos pueden no visualizarse correctamente.'
            });
        }

        if (network.quality === 'slow') {
            recommendations.push({
                type: 'info',
                message: 'Conexión lenta detectada. Se optimizarán las imágenes automáticamente.'
            });
        }

        if (device.pixelRatio > 2) {
            recommendations.push({
                type: 'info',
                message: 'Pantalla de alta densidad detectada. Se cargarán imágenes de mayor calidad.'
            });
        }

        return recommendations;
    }
};



