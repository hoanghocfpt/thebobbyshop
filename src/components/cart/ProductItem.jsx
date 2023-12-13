"use client";
import { CartContext } from '../../context/CartContext';

import Image from 'next/image';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'; // Thêm dòng này nếu bạn sử dụng axios để gọi API

const ProductItem = () => {
    const { cart, removeFromCart, increaseItem, decreaseItem } = useContext(CartContext);

    
    const [productDetails, setProductDetails] = useState([]); // Thêm state này để lưu thông tin chi tiết của sản phẩm

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = await Promise.all(
                cart.map(async (item) => {
                    const response = await axios.get(`https://fakestoreapi.com/products/${item.id}`); // Thay đổi URL này theo API của bạn
                    return response.data;
                })
            );
            setProductDetails(details);
        };

        if (cart.length > 0) {
            fetchProductDetails();
        }
    }, [cart]);

    if (cart.length === 0) {
        return <p>Giỏ hàng trống</p>;
    }
    return (
        <ul className='w-full'>
            {productDetails.map((item, index) => (
                <li key={index} className='flex justify-between w-full border-b py-5 items-center'>
                    <div className='flex-shrink-0 max-w-full w-1/12 h-32'>
                        <Image className='w-full h-full object-cover' src={item.image} width={100} height={100} alt='' />
                    </div>
                    <div className='flex-shrink-0 max-w-full w-5/12 text-left px-4'>
                        <h4 className='font-bold text-base'>{item.title}</h4>
                        <span className='font-normal'>{item.price}</span>
                    </div>
                    <div className='flex-shrink-0 w-3/12 '>
                        <div className='w-28 px-2 flex h-10  border rounded-lg border-black '>
                            <div onClick={() => decreaseItem(item.id)} className='flex items-center justify-center cursor-pointer'>
                                <Image className='w-12' src='/asset/icons/minus.svg' width={24} height={24} alt='' />
                            </div>
                            <input className='w-full h-full outline-none text-center font-semibold' type='text' name='quantity' value={cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}></input>

                            <div onClick={() => increaseItem(item.id)} className='flex items-center justify-center cursor-pointer'>
                                <Image className='w-12' src='/asset/icons/plus.svg' width={24} height={24} alt='' />
                            </div>
                        </div>
                    </div>
                    <div className='flex-shrink-0 max-w-full w-2/12'>
                    <span className='font-medium text-lg text-black'>${(cart.find(cartItem => cartItem.id === item.id)?.quantity || 0) * item.price}</span>

                    </div>
                    <div className='flex-shrink-0 max-w-full w-1/12'>
                        <div onClick={() => removeFromCart(item.id)}  className='flex justify-end cursor-pointer'>
                            <Image className='w-6' src='/asset/icons/delete.svg' width={24} height={24} alt='' />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ProductItem;