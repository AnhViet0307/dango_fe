'use client'
import Topbar from '@/components/Topbar';
import Records from '@p/data/product.json'
import React, { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/IProduct';

export default function ProductDetails({
    params,
}: {
    params:{productId:string}
    }) {
    
    const [product, setProduct] = useState<IProduct>({
        id:0 ,
        name: '',
        price: 0,
        description:''
    });

    useEffect(() => {
            

            const productIdNumber= parseInt(params.productId,10);
          // Find the product with matching productId
            const foundProduct = Records.find((product) => product.id ===productIdNumber);

            if (foundProduct) {
               setProduct(foundProduct);
            }
        }, [params.productId]);
    
    return (
        <>
        <div className=' mb-20 outline outline-red-800 mb-20'>
            <Topbar />
            
        </div>
        <h1>Detail for product {product.id}</h1>
        <div>
            <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
            {/* Add more product details here */}
        </div>
                
            
        </>
    )
}
