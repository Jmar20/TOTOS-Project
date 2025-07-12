import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from "axios";

export function Orderviews() {
    const [orders, setOrders] = useState([]);
    const [mandiles, setMandiles] = useState([]);
    const [selectedMandiles, setSelectedMandiles] = useState([]);
    const [ruc, setRuc] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');
    const [showMandilesPanel, setShowMandilesPanel] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [estado, setEstado] = useState('pendiente');

    useEffect(() => {
        fetchOrders();
        fetchMandiles();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://pyfjs.onrender.com/api/pedido/pedidos', {
                params: { estado: estadoFilter },
                withCredentials: true,
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error al obtener los pedidos", error);
        }
    };

    const fetchMandiles = async () => {
        try {
            const response = await axios.get('https://pyfjs.onrender.com/api/mandil/mandiles', {
                params: { estado: false },
                withCredentials: true,
            });
            setMandiles(response.data);
        } catch (error) {
            console.error("Error al obtener los mandiles", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPedido = {
                ruc,
                mandiles: selectedMandiles,
                estado,
            };

            if (isEditing) {
                // Actualizar el pedido
                await axios.put(`https://pyfjs.onrender.com/api/pedido/pedidos/${selectedOrder._id}`, newPedido, { withCredentials: true });
                alert('Pedido editado exitosamente');
            } else {
                // Crear un nuevo pedido
                await axios.post('https://pyfjs.onrender.com/api/pedido/pedidos', newPedido, { withCredentials: true });
                alert('Pedido creado exitosamente');
            }

            // Reiniciar campos del formulario
            setSelectedMandiles([]);
            setRuc('');
            setEstado('pendiente');
            setShowMandilesPanel(false);
            setIsEditing(false);
            fetchOrders();
        } catch (error) {
            console.error("Error al crear o editar el pedido", error);
        }
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setRuc(order.ruc);
        setEstado(order.estado);
        setSelectedMandiles(order.mandiles.map(mandil => mandil.id)); 
        setIsEditing(true);
        setShowMandilesPanel(true);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('https://pyfjs.onrender.com/api/pedido/pedidos/search/ruc', {
                params: { ruc: searchTerm },
                withCredentials: true,
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error al buscar pedidos", error);
        }
    };

    const handleFilterByEstado = async () => {
        try {
            const response = await axios.get('https://pyfjs.onrender.com/api/pedido/pedidos/search/estado', {
                params: { estado: estadoFilter },
                withCredentials: true,
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error al filtrar pedidos por estado", error);
        }
    };

    const handleGeneratePDF = async (id) => {
        try {
            const response = await axios.get(`https://pyfjs.onrender.com/api/pedido/pedidos/${id}/pdf`, {
                responseType: 'blob',
                withCredentials: true,
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `pedido-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error al generar el PDF", error);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            await axios.delete(`https://pyfjs.onrender.com/api/pedido/pedidos/${id}`, { withCredentials: true });
            alert('Pedido eliminado exitosamente');
            fetchOrders();
        } catch (error) {
            console.error("Error al eliminar el pedido", error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Órdenes</title>
            </Helmet>

            <div className="title-container">
                <h1>Lista de Órdenes</h1>
            </div>

            <div className="filters-container">
                <input
                    className="filter-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por RUC"
                />
                <button className="filter-button" onClick={handleSearch}>Buscar</button>

                <label className="white">Filtrar por Estado:</label>
                <select
                    className="filter-select"
                    value={estadoFilter}
                    onChange={(e) => setEstadoFilter(e.target.value)}
                >
                    <option value="">Seleccionar Estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="completado">Completado</option>
                    <option value="cancelado">Cancelado</option>
                </select>
                <button className="filter-button" onClick={handleFilterByEstado}>Filtrar</button>
            </div>

            <div className="add-form">
                <button onClick={() => { setShowMandilesPanel(true); setIsEditing(false); }}>Agregar Pedido</button>
            </div>

            <table className='general-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.idPedido}</td>
                            <td>{order.ruc}</td>
                            <td>{order.fechaPedido}</td>
                            <td>{order.estado}</td>
                            <td className="buttons-table">
                                <button onClick={() => handleEditOrder(order)}>Editar</button>
                                <button onClick={() => handleGeneratePDF(order._id)}>Descargar PDF</button>
                                <button onClick={() => handleDeleteOrder(order._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showMandilesPanel && (
    <div className="modal-t">
        <div className="modal-ps">
            <h2>Seleccionar Mandiles</h2>
            <form>
                <div className="row-modal">
                    <label>RUC:</label>
                    <input
                        type="text"
                        className="modal-select"
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                    />
                </div>
                <div><label className="white">*Se debe elegir un mandil.</label></div>
                <div className="row-modal">
                    <select
                        className="modal-select"
                        value={selectedMandiles}
                        onChange={(e) => setSelectedMandiles([...e.target.selectedOptions].map(option => option.value))}
                        multiple
                    >
                        {mandiles.filter(mandil => mandil.estado === false).map(mandil => (
                            <option key={mandil.id} value={mandil.id}>
                                {mandil.id} - {mandil.color}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="row-modal">
                    <label>Estado del Pedido:</label>
                    <select
                        className="modal-select"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="completado">Completado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>
                <div className="row-modal">
                    <button className="button-aceptar" onClick={handleSubmit}>Guardar Pedido</button>
                    <button className="button-cancelar" onClick={() => setShowMandilesPanel(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    </div>
)}
        </div>
    );
}

export default Orderviews;
