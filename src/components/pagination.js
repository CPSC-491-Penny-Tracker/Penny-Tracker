import React from "react";
import styles from "./pagination.css";

const Pagination = ({setCurrentPage, currentPage, hasNextPage}) => {

    return(
        <div className='container'>
            <input type="button" onClick={()=>setCurrentPage((currentPage)=> currentPage - 1)} disabled={currentPage === 1}/>
                <img src="/back.png" alt="back" />
            <input type="button" onClick={()=> setCurrentPage((currentPage)=> currentPage + 1)} disabled={!hasNextPage}/>
                <img src="/next.png" alt="next" />
            
        </div>
    )
}

export default Pagination;