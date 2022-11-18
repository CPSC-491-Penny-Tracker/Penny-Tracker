import React, {useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';
import Styles from "../components/listing_page.css";
import Title from "../components/title.js";
import Pagination from "../components/pagination.js";
import NavigationButton from "../components/navigation_button.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ApiService from "../service/ApiService";
import Card from "../components/card";
import Container from 'react-bootstrap/Container';

const Product = () => {
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [results, setResults] = useState([])
    
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

    const searchButton = ev => {
        ev.preventDefault();
        const { searchterm } = ev.target;
        console.log(searchterm.value);
        ApiService.getProducts(searchterm.value)
            .then(res => {
                setResults(res.shopping_results)
            })
            .catch(error => setError( error.message ));
        
    }
    
    return (
        <React.Fragment>
          <div className={Styles.container}>
            <h2>Product Price Options</h2>
              <Title title={category.title} subtitle={category.products_count} />

              <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} hasNextPage={hasNextPage}/>
          </div>
          <div>
            <Form className="d-flex me-4 ms-4 mt-4" onSubmit={searchButton}>
                <Form.Control
                type="search"
                placeholder="Search"
                name='searchterm'
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success" type='submit'>Search</Button>
            </Form>
            <div role="alert" className="text-danger">{error && <p>{error}</p>}</div>
            <Container>
               {results && results.map(el => <Card img={el.img} link={el.link} source={el.source} title={el.title} price={el.price}/>)}      
            </Container>            
          </div>
        </React.Fragment>
    );
}

export default Product;