import { useState } from 'react';
import apiClient from '../config/apiClient.js';
import { useNavigate } from 'react-router-dom';

export function Recuperar() {
    const [email, setEmail] = useState('');
    const [claveAccesoUser, setClaveAccesoUser] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        setMessage('');
        setError('');

        try {
            const response = await apiClient.post('/api/auth/solicitarCambioContrasena', {
                email,
            });
            setMessage(response.data.message || 'Una clave de acceso ha sido enviada a tu correo electrónico.');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al solicitar el cambio de contraseña.');
        }
    };

    const cambiarContrasena = async () => {
        setMessage('');
        setError('');

        try {
            const response = await apiClient.post('/api/auth/cambiarContrasena', {
                email,
                nuevaContrasena,
                claveAccesoUser,
            });
            setMessage(response.data.message || 'Contraseña cambiada exitosamente.');
            setTimeout(() => {
                navigate('/login'); 
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cambiar la contraseña.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Recuperar Contraseña</h2>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Clave de Acceso:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={claveAccesoUser}
                                        onChange={(e) => setClaveAccesoUser(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nueva Contraseña:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={nuevaContrasena}
                                        onChange={(e) => setNuevaContrasena(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={cambiarContrasena}
                                >
                                    Cambiar Contraseña
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 mt-2"
                                    onClick={handleForgotPassword}
                                >
                                    Enviar Correo de Recuperación
                                </button>
                            </form>
                            {message && <div className="alert alert-success mt-3">{message}</div>}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recuperar;
