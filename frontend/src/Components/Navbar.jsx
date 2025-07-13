import { NavItem } from './NavItem';
import apiClient from '../config/apiClient.js';
import { useNavigate } from 'react-router-dom';

const navItems = ["Clientes", "Ordenes", "Inventario", "Informes"];

export function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiClient.post('/api/auth/logout');
            
            // Limpiar cookies localmente
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

            navigate('/login'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error.response?.data?.message || 'Error');
        }
    };

    return (
        <div className='navbar-container'>
            <div className='navbar-content'>
                <ul>
                    {navItems.map((item) => (
                        <NavItem key={item} locate={item} />
                    ))}
                </ul>
            </div>
            <div className='logout-container'>
                <button className='logout' onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
}

export default Navbar;
