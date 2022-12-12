import React, {useEffect, useState} from 'react'
import config from '../config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import JwtService from '../service/JwtService';

export default function sum() {
  const [amazon, setAmazonSummary] = useState('$0.00');
  const [bestbuy, setBestbuySummary] = useState('$0.00');
  const [ebay, setEbaySummary] = useState('$0.00');
  const [amazonbudget, setAmazonBudget] = useState('$0.00');
  const [bestbuybudget, setBestbuyBudget] = useState('$0.00');
  const [ebaybudget, setEbayBudget] = useState('$0.00');

  const [amazonCheckbox, setAmazonCheckbox] = useState(true);
  const [bestbuyCheckbox, setBestbuyCheckbox] = useState(true);
  const [ebayCheckbox, setEbayCheckbox] = useState(true);
  const [expense, setStoreExpense] = useState("")
  
  const submitExpense = (ev) => {
    ev.preventDefault();
    const {formPrice} = ev.target;
    let updatedprice = 0;
    if(expense === 'bestbuy') updatedprice = Number(bestbuy.replace(/[^0-9\.]+/g, "")) + Number(formPrice.value);
    else if (expense === 'amazon') updatedprice = Number(amazon.replace(/[^0-9\.]+/g, "")) + Number(formPrice.value);
    else if (expense === 'ebay') updatedprice = Number(ebay.replace(/[^0-9\.]+/g, "")) + Number(formPrice.value);
    else return;

    fetch(`${config.API_ENDPOINT}/summary/add/${expense}?amount=${updatedprice}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${JwtService.getAuthToken()}`
        }
      }).then(() => {
        if(expense === 'bestbuy') setBestbuySummary(`$${updatedprice}`);
        else if (expense === 'amazon') setAmazonSummary(`$${updatedprice}`)
        else setEbaySummary(`$${updatedprice}`)
      });
    
  }
  const checkforbudget = () => {
    if (Number(amazonbudget.replace(/[^0-9\.]+/g, "")) <= Number(amazon.replace(/[^0-9\.]+/g, ""))) 
        return true
    else if (Number(bestbuybudget.replace(/[^0-9\.]+/g, "")) <= Number(bestbuy.replace(/[^0-9\.]+/g, ""))) 
        return true
    else if (Number(ebaybudget.replace(/[^0-9\.]+/g, "")) <= Number(ebay.replace(/[^0-9\.]+/g, "")))
        return true
    return false
  }
  useEffect(() => {
    fetch(`${config.API_ENDPOINT}/summary`, {
        headers: {
          Authorization: `Bearer ${JwtService.getAuthToken()}`
        }
      }).then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) 
        : res.json().then(res => {
            const data = res.data.summary[0];
            setAmazonSummary(data.amazon);
            setBestbuySummary(data.bestbuy);
            setEbaySummary(data.ebay);
        })
      );
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
        {checkforbudget() && <div className='alert alert-danger ms-2 me-2'>Please update budget, one or more stores have exceeded budget</div>}
        <div className='ms-4'>
          <h3>
            <small>Your Summary</small>
          </h3>
        </div>
        <Form className='ms-4'>
            <div key={`default-checkbox`} className="mb-3">
            <Form.Check 
                defaultChecked={amazonCheckbox}
                type={'checkbox'}
                id={`amazon`}
                label={`Amazon`}
                onChange={() => setAmazonCheckbox(!amazonCheckbox)}
            />
            <Form.Check
                defaultChecked={bestbuyCheckbox}
                type={'checkbox'}
                label={`Bestbuy`}
                id={`bestbuy`}
                onChange={() => setBestbuyCheckbox(!bestbuyCheckbox)}
            />
            <Form.Check
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
        <Form onSubmit={submitExpense}>
            <div className='ms-2 mt-4'>Add Expenses</div>
            <Form.Select className='ms-2 mt-2 me-2' onChange={(e) => setStoreExpense(e.currentTarget.value)}>
                <option value="">Select Store to add expenses</option>
                <option value="amazon">Amazon</option>
                <option value="bestbuy">Bestbuy</option>
                <option value="ebay">Ebay</option>
            </Form.Select>
            <Form.Group className="ms-2 mt-2" controlId="formPrice">
                <Form.Label>Expense</Form.Label>
                <Form.Control required name="formPrice" type="number" min="1" step="any" placeholder="0.00" />
            </Form.Group>
            <Button className='ms-2 mt-2 mb-2' variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </React.Fragment>
  )
}
