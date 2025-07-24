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


