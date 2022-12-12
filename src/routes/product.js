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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { withStyles } from "@material-ui/core/styles";
import './styles.css'

const Product = () => {
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    const [isMoving, setIsMoving] = useState(false);
    
    // SortFilter
    const [selectedSorting, setSelectedSorting] = useState("");
    const [selectedOrdering, setSelectedOrdering] = useState("asc");
    const [category, setCategory] = useState("");
    const [priceFilter, setPriceFilter] = useState({min: 0, max: 100});
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 2
        }
      };
    
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
          </div>
          <Carousel
            responsive={responsive}
            
            infinite={false}
            beforeChange={() => setIsMoving(true)}
            afterChange={() => setIsMoving(false )}
            containerClass="first-carousel-container container"
            deviceType={"mobile"}
            >
            {results.map(el => {
                return <Card img={el.img} link={el.link} source={el.source} title={el.title} price={el.price} />;
                })}
          </Carousel>   
        </React.Fragment>
    );
}
const styles = () => ({
    root: {
      textAlign: "center"
    },
    title: {
      maxWidth: 400,
      margin: "auto",
      marginTop: 10
    }
  });
// export default Product;
export default withStyles(styles)(Product);