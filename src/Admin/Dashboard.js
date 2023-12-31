import React, { useState, useEffect } from 'react';
import { GetData, DeleteData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AddBtn, HomeBtn, LogoutBtn } from '../Componentes/Buttons';
import AuthCheck from './Auth/AuthCheck';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await GetData();
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await DeleteData(productId);
            alert('Product Deleted !');
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (productId) => {
        navigate(`/Dashboard/edit/${productId}`);
    };

    return (
        <div>
            <AuthCheck/>
            <div className='dashboard-content'>
                <table className='table-container card-square-0'>
                    <thead>
                        <tr>
                            <th>
                                <h1>Id</h1>
                            </th>
                            <th>
                                <h1>Name</h1>
                            </th>
                            <th>
                                <h1>Type</h1>
                            </th>
                            <th>
                                <h1>Price</h1>
                            </th>
                            <th>
                                <h1>Stock</h1>
                            </th>
                            <th>
                                <h1>Actions</h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.pid}>
                                <td className='table-data'>{product.bid}</td>
                                <td className='table-data'>{product.bikename}</td>
                                <td className='table-data'>{product.bikeType}</td>
                                <td className='table-data'>{product.Stock}</td>
                                <td className='table-data'>{product.bikmodel}</td>
                                <td className='table-actions form-btn-container'>
                                    <button onClick={() => handleEdit(product.pid)} className='form-btn-x form-edit-btn'>
                                    <span className="material-symbols-outlined ico-x">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(product.pid)} className='form-btn-x form-delete-btn'>
                                    <span className="material-symbols-outlined ico-x">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddBtn />
            <LogoutBtn />
            <HomeBtn />
        </div>
    );
}
