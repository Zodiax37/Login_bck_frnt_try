import { useEffect, useState } from 'react';
import ProductoCard from '../components/ProductoCard';
import { obtenerProductos } from '../api/productos';

import { useNavigate } from 'react-router-dom';  // <--- importar

export default function CatalogoProductos() {
    const [productos, setProductos] = useState([]);
    
    const navigate = useNavigate(); // <--- crear instancia

    useEffect(() => {
        obtenerProductos().then(setProductos).catch(console.error);
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Catálogo de Productos</h2>
            <div className="row">
                {productos.map((producto) => (
                    <div className="col-md-4 mb-4" key={producto.Id}>
                        <ProductoCard producto={producto} />
                    </div>
                ))}
            </div>
            <div className='d-flex justify-content-center'>
                <button type="button" className='btn btn-success'  onClick={() => navigate('/preventa')} >Ir a Carrito/Preventa</button>
            </div>
        </div>
    );
}
