import '../Styles/SForms.css';
import { Helmet } from 'react-helmet';
import apiClient from '../config/apiClient.js';
import { API_ENDPOINTS } from '../config/api.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await apiClient.post('/api/auth/login', {
                email,
                password
            });

            console.log('Inicio de sesión exitoso:', response.data);
            navigate('/menu/clientes'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Error de red o en el servidor');
            console.error('Error en el inicio de sesión:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        setInfoMessage('');
        setError('');

        try {
            await apiClient.post('/api/auth/solicitarCambioContrasena', {
                email
            });
            setInfoMessage('Una clave de acceso ha sido enviada a tu correo electrónico.');
            navigate('/recuperar');
        } catch (err) {
            setError(err.response?.data?.message || 'Error de red o en el servidor');
            console.error('Error al solicitar el cambio de contraseña:', err);
        }
    };

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>
            <div className="solo-form-container">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <legend>Iniciar Sesión</legend>
                    <label htmlFor="email" className="labelForm">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="labelForm">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <div className="error-message">{error}</div>}
                    {infoMessage && <div className="info-message">{infoMessage}</div>}
                    <div className='linksc'>
                        <a href="#/recuperar" className="linksForm">
                            Olvidé mi contraseña
                        </a>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                    <label>¿Aún no tienes una cuenta? <a href="#/register">Regístrate</a></label>
                </form>
            </div>
        </>
    );
}

export default LoginForm;