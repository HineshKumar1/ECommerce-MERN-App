import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';

function ProductDetails() {
    const params = useParams();
    const [product, setProduct] = useState({});

    // Fetch product details
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/${params.slug}`);
            setProduct(data?.product);
        } catch (error) {
            console.log(error);
        }
    };

    // Initial details
    useEffect(() => {
        if (params.slug) {
            getProduct();
        }
    }, [params?.slug]);

    return (
        <Layout>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img
                            src={`${process.env.REACT_APP_API}/product/image/${product._id}`}
                            alt="product_photo"
                            height={"400px"}
                            className="img img-responsive"
                        />
                    </div>
                    <div className='col-md-6'>
                        <h1 className='text-center'>Product Details</h1>
                        <h4>Name: {product?.title}</h4>
                        <p className="text-muted">{product?.description}</p>
                        <h4>Price: ${product?.price}</h4>
                        <h4>Quantity: {product?.quantity}</h4>
                        <h4>Category: {product?.category?.name}</h4>
                        <Button className='mt-2' size="medium">Add Cart</Button>
                    </div>
                </div>
                <hr />
                <div className='row mt-4'>
                    <div className='col'>
                        <h3>Similar Products</h3>
                        {/* Include similar product cards or a carousel here */}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductDetails;
