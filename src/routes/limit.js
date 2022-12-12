import React, {useEffect, useState} from 'react'
import config from '../config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import JwtService from '../service/JwtService';

export default function limit() {
  const [amazon, setAmazonBudget] = useState('$0.00');
  const [bestbuy, setBestbuyBudget] = useState('$0.00');
  const [ebay, setEbayBudget] = useState('$0.00');
  const [amazonCheckbox, setAmazonCheckbox] = useState(true);
  const [bestbuyCheckbox, setBestbuyCheckbox] = useState(true);
  const [ebayCheckbox, setEbayCheckbox] = useState(true);
  const [budget, setStoreBudget] = useState("")
  
  const submitBudget = (ev) => {
    ev.preventDefault();
    const {formPrice} = ev.target;
    let updatedprice = 0;
    if(budget === 'bestbuy') updatedprice = Number(bestbuy.replace(/[^0-9\.]+/g, "")) + Number(formPrice.value);
    else if (budget === 'amazon') updatedprice = Number(amazon.replace(/[^0-9\.]+/g, "")) + Number(formPrice.value);
    else if (budget === 'ebay') updatedprice = Number(ebay.replace(/[^0-9\.]+/g, "")) + Number(formPrice.value);
    else return;

    fetch(`${config.API_ENDPOINT}/budget/add/${budget}?amount=${updatedprice}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${JwtService.getAuthToken()}`
        }
      }).then(() => {
        if(budget === 'bestbuy') setBestbuyBudget(`$${updatedprice}`);
        else if (budget === 'amazon') setAmazonBudget(`$${updatedprice}`)
        else setEbayBudget(`$${updatedprice}`)
      });
  }

  useEffect(() => {
    fetch(`${config.API_ENDPOINT}/budget`, {
        headers: {
            Authorization: `Bearer ${JwtService.getAuthToken()}`
        }
        }).then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) 
        : res.json().then(res => {
            const data = res.data.budgets[0];
            setAmazonBudget(data.amazon);
            setBestbuyBudget(data.bestbuy);
            setEbayBudget(data.ebay);
        })
        );
    }, []);  
  return (
    <React.Fragment>
        <div className='ms-4'>
          <h3>
            <small>Your Budget</small>
          </h3>
        </div>
        <Form className='ms-4'>
            <div key={`inline-checkbox`} className="mb-3">
            <Form.Check 
                inline
                defaultChecked={amazonCheckbox}
                type={'checkbox'}
                id={`amazon`}
                label={`Amazon`}
                onChange={() => setAmazonCheckbox(!amazonCheckbox)}
            />
            <Form.Check
                inline
                defaultChecked={bestbuyCheckbox}
                type={'checkbox'}
                label={`Bestbuy`}
                id={`bestbuy`}
                onChange={() => setBestbuyCheckbox(!bestbuyCheckbox)}
            />
            <Form.Check
                inline
                defaultChecked={ebayCheckbox}
                type={'checkbox'}
                label={`Ebay`}
                id={`ebay`}
                onChange={() => setEbayCheckbox(!ebayCheckbox)}
            />
            </div> 
        </Form>
        <div className='ms-4'>
            {amazonCheckbox && <div>Amazon: {amazon}</div>}
            {bestbuyCheckbox && <div>Bestbuy: {bestbuy}</div>}
            {ebayCheckbox && <div>Ebay: {ebay}</div>}
        </div>
        <hr />
        <Form onSubmit={submitBudget}>
            <div className='ms-2 mt-4'>Add Budget</div>
            <Form.Select className='ms-2 mt-2 me-2' onChange={(e) => setStoreBudget(e.currentTarget.value)}>
                <option value="">Select Store to add budget</option>
                <option value="amazon">Amazon</option>
                <option value="bestbuy">Bestbuy</option>
                <option value="ebay">Ebay</option>
            </Form.Select>
            <Form.Group className="ms-2 mt-2" controlId="formPrice">
                <Form.Label>Budget</Form.Label>
                <Form.Control required name="formPrice" type="number" min="1" step="any" placeholder="0.00" />
            </Form.Group>
            <Button className='ms-2 mt-2 mb-2' variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </React.Fragment>
  )
}
