import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { compatibilityTests } from '../utils/compatibilityTest';

const CompatibilityContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const CompatibilityButton = styled.button`
  background: ${props => props.$hasIssues ? '#dc3545' : '#28a745'};
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
                $hasIssues={hasIssues}
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