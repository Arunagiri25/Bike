import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddData } from '../services/api';
import { BackBtn } from '../Componentes/Buttons';
import AuthCheck from './Auth/AuthCheck';

export default function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        bid: '',
        bikename: '',
        bikeType: '',
        bikeprice: '',
        stock: '',
        bikemodel: '',
    });

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
            await AddData(product);
            alert('Product added!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='dashboard-content'>
            <AuthCheck/>
            <div className='cardx form-data-align'>
                <form onSubmit={handleSubmit} className='form-data-card '>
                    <input type='text' placeholder='bike id' name='bid' value={product.bid} onChange={handleInputChange} className='product-input' required/>
                    <input type='text' placeholder='bike name' name='bike name' value={product.bikename} onChange={handleInputChange} className='product-input' required />
                    <input type='text' placeholder='bike type' name='biketype' value={product.bikeType} onChange={handleInputChange} className='product-input' required />
                    <input type='number' placeholder='bike price' name='bike price' value={product.bikeprice} onChange={handleInputChange} className='product-input' required />
                    <input type='number' placeholder='bike stock' name='bike stock' value={product.stock} onChange={handleInputChange} className='product-input' required />
                    <input type='text' placeholder='bike model' name='bike model' value={product.bikemodel} onChange={handleInputChange} className='product-input' required />
                    <input type='text' placeholder='Img URL' name='productimg' value={product.productimg} onChange={handleInputChange} className='product-input' required />
                    <button type='submit' className='button2'>Add Product</button>
                </form>
            </div>
            <BackBtn />
        </div>
    );
}
