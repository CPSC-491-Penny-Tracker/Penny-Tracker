import React from "react";
import styles from "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "./loading.js";

const ProductList = ({products, loading}) => {

    const renderProducts = () => {
        return products.map(product => (
            <ProductItem key={product.id} product={product} />
        ))
    }

    return(
        <div className={styles.container}>
            {loading && <LoadingIndicator />}
            {loading || renderProducts()}
        </div>
    )
}

export default ProductList;