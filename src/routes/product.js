//import React from 'react'
//
//export default function product() {
//  return (
//    <div>product</div>
//  )
//}
import React, {useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';
import Styles from "../components/listing_page.css";
import Title from "../components/title.js";
//import SortFilter from "../../components/Listing/SortFilter/SortFilter";
//import ProductList from "../../components/ProductList";
import Pagination from "../components/pagination.js";
import NavigationButton from "../components/navigation_button.js";


const Product = () => {
    const { id } = useParams();

    // SortFilter
    const [selectedSorting, setSelectedSorting] = useState("");
    const [selectedOrdering, setSelectedOrdering] = useState("asc");
    const [category, setCategory] = useState("");

    const [priceFilter, setPriceFilter] = useState({min: 0, max: 100});

    const handleOnChangeSorting = (event) => {
        const [sort, order] = event.target.value.length? event.target.value.split("-") : ["", "asc"];
        setSelectedSorting(sort);
        setSelectedOrdering(order);
    }

    const handleFilterBlur = (min, max) => {
        setPriceFilter({min, max});
    }
    
    //ProductList
    const [products, setProducts] = useState([]);
    const [ productsNextPage ,setProductsNextPage] = useState([]);
    const [loading, setLoading] = useState(true);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize]= useState(3);
    const [hasNextPage, setHasNextPage] = useState(false);


    useEffect(()=>{
        const priceRange = {min: "0" , max: "100"}
        setPriceFilter(priceRange)
    }, [id])

    useEffect(()=>{
        setLoading(true);
        const min = 0;
        const max = 100;
        setLoading(false);

    }, [selectedSorting,selectedOrdering, currentPage, priceFilter])

    return (
        <React.Fragment>
          <div className={Styles.container}>
            <h2>Product Price Options</h2>
              <Title title={category.title} subtitle={category.products_count} />

              <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} hasNextPage={hasNextPage}/>
          </div>
        </React.Fragment>
    );
}

export default Product;