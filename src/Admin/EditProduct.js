import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditData, FindData } from '../services/api';
import { BackBtn } from '../Componentes/Buttons';
import AuthCheck from './Auth/AuthCheck';

export default function EditProduct() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        bid: '',
        bikename: '',
        bikeType: '',
        bikeprice: '',
        stock: '',
        bikemodel: '',
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await FindData(productId);
            setProduct(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await EditData(productId, product);
            alert('Product updated !');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='dashboard-content'>
            <AuthCheck/>
            <div className='cardx form-data-align'>
                <form onSubmit={handleSubmit} className='form-data-card'>
                    <label>Bike Id Name</label>
                    <input type='text' placeholder='Bike Id' name='bid' value={product.bid} onChange={handleInputChange} className='product-input' required />
                    <label>Bike Name</label>
                    <input type='text' placeholder='Bike Name' name='bikename' value={product.bikename} onChange={handleInputChange} className='product-input' required />
                    <label>Bike Type</label>
                    <input type='text' placeholder='Bike Type' name='bikeType' value={product.bikeType} onChange={handleInputChange} className='product-input' required />
                    <label>Bike Price</label>
                    <input type='number' placeholder='Stock' name='Stock' value={product.stock} onChange={handleInputChange} className='product-input' required />
                    <label>Bike Model</label>
                    <input type='text' placeholder='Bike Model' name='Bike Model' value={product.bikemodel} onChange={handleInputChange} className='product-input' required />
                    <label>Product Picture URL</label>
                    <input type='text' placeholder='Img URL' name='productimg' value={product.productimg} onChange={handleInputChange} className='product-input' required />
                    <button type='submit' className='button2'>Update Product</button>
                </form>
            </div>
            <BackBtn />
        </div>
    );
}
