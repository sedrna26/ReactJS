import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    margin: '2rem'
                }}>
                    <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>
                        ¡Algo salió mal!
                    </h2>
                    <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
                        Ha ocurrido un error inesperado. Por favor, recarga la página.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Recargar Página
                    </button>
                    {import.meta.env.DEV && this.state.error && this.state.errorInfo && (
                        <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                            <summary>Detalles del error (modo desarrollo)</summary>
                            <pre style={{
                                backgroundColor: '#f8f8f8',
                                padding: '1rem',
                                overflow: 'auto',
                                fontSize: '0.8em'
                            }}>
                                {this.state.error.toString()}
                                <br />
                                {this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
