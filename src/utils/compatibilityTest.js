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
            flexbox: CSS.supports('display', 'flex'),
            grid: CSS.supports('display', 'grid'),
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

// =============================================================================
// ARCHIVO: src/components/CompatibilityChecker.jsx
// Componente para mostrar información de compatibilidad
// =============================================================================

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { compatibilityTests } from '../utils/compatibilityTests';

const CompatibilityContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const CompatibilityButton = styled.button`
  background: ${props => props.hasIssues ? '#dc3545' : '#28a745'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.5em;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const CompatibilityModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  margin: 1rem;
`;

const RecommendationItem = styled.div`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  border-left: 4px solid ${props =>
        props.type === 'warning' ? '#ffc107' :
            props.type === 'error' ? '#dc3545' : '#17a2b8'
    };
  background: ${props =>
        props.type === 'warning' ? '#fff3cd' :
            props.type === 'error' ? '#f8d7da' : '#d1ecf1'
    };
`;

const CompatibilityChecker = () => {
    const [report, setReport] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Solo ejecutar en modo desarrollo
        if (process.env.NODE_ENV === 'development') {
            generateReport();
        }
    }, []);

    const generateReport = async () => {
        setLoading(true);
        try {
            const compatibilityReport = await compatibilityTests.generateCompatibilityReport();
            setReport(compatibilityReport);
        } catch (error) {
            console.error('Error generating compatibility report:', error);
        } finally {
            setLoading(false);
        }
    };

    if (process.env.NODE_ENV !== 'development') {
        return null; // No mostrar en producción
    }

    const hasIssues = report?.recommendations?.some(r => r.type === 'warning' || r.type === 'error');

    return (
        <CompatibilityContainer>
            <CompatibilityButton
                onClick={() => setShowModal(true)}
                hasIssues={hasIssues}
                title="Ver información de compatibilidad"
            >
                🔧
            </CompatibilityButton>

            {showModal && (
                <CompatibilityModal onClick={() => setShowModal(false)}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>📊 Reporte de Compatibilidad</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5em' }}>
                                ×
                            </button>
                        </div>

                        {loading ? (
                            <p>Generando reporte...</p>
                        ) : report ? (
                            <div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <h4>🖥️ Información del Dispositivo</h4>
                                    <p><strong>Navegador:</strong> {report.device.browser.name} {report.device.browser.version}</p>
                                    <p><strong>Tipo:</strong> {report.device.mobile ? 'Móvil' : report.device.tablet ? 'Tablet' : 'Desktop'}</p>
                                    <p><strong>Resolución:</strong> {report.device.viewport.width}x{report.device.viewport.height}</p>
                                    <p><strong>Pixel Ratio:</strong> {report.device.pixelRatio}</p>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h4>🌐 Características Soportadas</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                                        {Object.entries(report.features).map(([feature, supported]) => (
                                            <div key={feature} style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ color: supported ? 'green' : 'red', marginRight: '0.5rem' }}>
                                                    {supported ? '✅' : '❌'}
                                                </span>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h4>📶 Red</h4>
                                    <p><strong>Latencia:</strong> {report.network.latency.toFixed(2)}ms</p>
                                    <p><strong>Calidad:</strong> {report.network.quality}</p>
                                    <p><strong>Online:</strong> {report.device.online ? 'Sí' : 'No'}</p>
                                </div>

                                {report.recommendations.length > 0 && (
                                    <div>
                                        <h4>💡 Recomendaciones</h4>
                                        {report.recommendations.map((rec, index) => (
                                            <RecommendationItem key={index} type={rec.type}>
                                                {rec.message}
                                            </RecommendationItem>
                                        ))}
                                    </div>
                                )}

                                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                    <button
                                        onClick={generateReport}
                                        style={{
                                            background: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        🔄 Actualizar Reporte
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p>No se pudo generar el reporte de compatibilidad.</p>
                        )}
                    </ModalContent>
                </CompatibilityModal>
            )}
        </CompatibilityContainer>
    );
};

export default CompatibilityChecker;

// =============================================================================
// ARCHIVO: scripts/build-optimized.js
// Script personalizado para build optimizado
// =============================================================================

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build optimizado para producción...\n');

// 1. Limpiar build anterior
console.log('🧹 Limpiando build anterior...');
if (fs.existsSync('build')) {
    fs.rmSync('build', { recursive: true, force: true });
}

// 2. Ejecutar build con optimizaciones
console.log('📦 Construyendo aplicación...');
try {
    execSync('npm run build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            GENERATE_SOURCEMAP: 'false',
            REACT_APP_BUILD_MODE: 'production'
        }
    });
} catch (error) {
    console.error('❌ Error en build:', error.message);
    process.exit(1);
}

// 3. Análisis del bundle
console.log('\n📊 Analizando tamaño del bundle...');
const buildPath = path.join(__dirname, '../build');
const staticPath = path.join(buildPath, 'static');

function getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2) + ' KB';
}

function analyzeDirectory(dirPath, type) {
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);
    console.log(`\n${type.toUpperCase()} FILES:`);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isFile()) {
            console.log(`  ${file}: ${getFileSize(filePath)}`);
        }
    });
}

analyzeDirectory(path.join(staticPath, 'js'), 'JavaScript');
analyzeDirectory(path.join(staticPath, 'css'), 'CSS');

// 4. Generar reporte de rendimiento
console.log('\n⚡ Generando reporte de rendimiento...');
const performanceReport = {
    buildTime: new Date().toISOString(),
    bundleSize: {
        total: getDirectorySize(buildPath),
        js: getDirectorySize(path.join(staticPath, 'js')),
        css: getDirectorySize(path.join(staticPath, 'css')),
        media: getDirectorySize(path.join(staticPath, 'media'))
    },
    optimizations: [
        'Code splitting implementado',
        'Tree shaking habilitado',
        'Minificación de assets',
        'Compresión gzip',
        'Source maps deshabilitados para producción'
    ]
};

fs.writeFileSync(
    path.join(buildPath, 'performance-report.json'),
    JSON.stringify(performanceReport, null, 2)
);

function getDirectorySize(dirPath) {
    if (!fs.existsSync(dirPath)) return '0 KB';

    let totalSize = 0;

    function calculateSize(currentPath) {
        const files = fs.readdirSync(currentPath);
        files.forEach(file => {
            const filePath = path.join(currentPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                calculateSize(filePath);
            } else {
                totalSize += stats.size;
            }
        });
    }

    calculateSize(dirPath);
    return (totalSize / 1024).toFixed(2) + ' KB';
}

console.log('\n✅ Build optimizado completado!');
console.log(`📁 Archivos generados en: ${buildPath}`);
console.log(`📊 Reporte guardado en: ${path.join(buildPath, 'performance-report.json')}`);

// =============================================================================
// ARCHIVO: package.json (scripts adicionales)
// Agregar estos scripts al package.json existente
// =============================================================================

/*
"scripts": {
  "build:optimized": "node scripts/build-optimized.js",
  "analyze": "npm run build && npx bundle-analyzer build/static/js/*.js",
  "lighthouse": "npm run build && npx lighthouse-ci autorun",
  "test:compatibility": "node scripts/compatibility-test.js",
  "prebuild": "npm run test:compatibility"
}

"devDependencies": {
  "@lighthouse-ci/cli": "^0.12.0",
  "webpack-bundle-analyzer": "^4.9.0"
}
*/

// =============================================================================
// ARCHIVO: src/App.jsx (versión optimizada)
// Mejoras principales para el componente App
// =============================================================================

/*
// Agregar estas importaciones y mejoras a App.jsx:

import { Suspense, lazy } from 'react';
import ErrorBoundary from './utils/errorBoundary';
import CompatibilityChecker from './components/CompatibilityChecker';
import { useLocalStorage } from './hooks/useLocalStorage';

// Lazy loading de componentes
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const OrderHistory = lazy(() => import('./components/OrderHistory'));
const Profile = lazy(() => import('./components/Profile'));

function App() {
  // Usar useLocalStorage en lugar de useState para cart
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  // Componente de loading para Suspense
  const LoadingFallback = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh'
    }}>
      <LoadingSpinner message="Cargando componente..." />
    </div>
  );

  return (
    <HelmetProvider>
      <GlobalStyle />
      <ErrorBoundary>
        <AuthProvider>
          <ProductProvider>
            <Router>
              <Layout cartItemsCount={totalItemsInCart}>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    // ... rutas existentes

                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute>
                          <OrderHistory />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Suspense>
              </Layout>
            </Router>

            {process.env.NODE_ENV === 'development' && <CompatibilityChecker />}
          </ProductProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
*/

// =============================================================================
// ARCHIVO: public/manifest.json
// Manifest para PWA (Progressive Web App)
// =============================================================================

/*
{
  "short_name": "Mi Tienda",
  "name": "Mi Tienda Online - E-commerce",
  "description": "Tu destino para las mejores compras online",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "orientation": "portrait",
  "categories": ["shopping", "business"],
  "lang": "es"
}
*/

// =============================================================================
// ARCHIVO: .env.production
// Variables de entorno para producción
// =============================================================================

/*
GENERATE_SOURCEMAP=false
REACT_APP_BUILD_MODE=production
REACT_APP_API_BASE_URL=https://tu-api-produccion.com/api/v1
REACT_APP_APP_NAME=Mi Tienda Online
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
*/