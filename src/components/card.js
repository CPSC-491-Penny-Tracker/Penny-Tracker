import React from "react";

function card(props) {
    const {img, link, source, title, price} = props
  return (
    <div className="card" style={{ width: '25%', color: 'black' }}>
    <img className="card-img-top" src={img} alt="Card image cap"/>
    <div className="card-body">
        <h5 className="card-title" style={{fontSize: '13px'}}>{title}</h5>
        <p className="card-text" style={{fontSize: '12px'}}>{price}</p>
        <a href={link} className="btn btn-primary">Go</a>
    </div>
    </div>
  );
}

export default card;