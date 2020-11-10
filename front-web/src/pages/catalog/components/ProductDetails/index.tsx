import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useParams } from 'react-router';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import { ReactComponent as ProductImage } from 'core/assets/images/products.svg';
import { Link } from 'react-router-dom';
import ProductPrice from 'core/components/ProductPrice/Index';
import { makeRequest } from 'core/utils/request';
import { Product } from 'core/types/Products';
import ProductInfoLoader from '../Loaders/ProductInfoLoader ';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader ';

type ParamsType = {
    productsId: string;
}



const ProductDetails = () => {

    const { productsId } = useParams<ParamsType>();

    const [product, setProduct] = useState<Product>();

    const [isLoading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true);
        makeRequest({ url: `/products/${productsId}` })
            .then(response => setProduct(response.data))
            .finally(() => {
                setLoading(false);
            })
    }, [productsId]);



    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">Voltar</h1>
                </Link>
                <div className="row">
                    <div className="col-6 pr-5">
                        {isLoading ? <ProductInfoLoader/>: (
                            <>
                                <div className="product-details-card text-center">
                                    <img src={product ?.imgUrl} alt={product ?.name} className="products-details-image" />

                                </div>
                                <h1 className="product-details-name">
                                    {product ?.name}
                                </h1>
                                {product ?.price && <ProductPrice price={product ?.price} />}
                            </>
                        )}

                    </div>
                    <div className="col-6 product-details-card">
                        {isLoading ? <ProductDescriptionLoader/> : (
                            <>
                                <h1 className="product-description-title">Descrição do Produto</h1>
                                <p className="product-description-text">
                                    {product ?.description}
                                </p>

                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;