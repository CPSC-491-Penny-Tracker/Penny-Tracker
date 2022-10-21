import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import './summary.css'
import Radio from '@material-ui/core/Radio'
//import './summary.css'

const Summary = () => {
  const [store, setStore] = useState({
    types: [],
  })
  const [bestBuySpending, setBestBuySpending] = useState('')
  const [amazonSpending, setAmazonSpending] = useState('')
  const [ebaySpending, setEbaySpending] = useState('')
  const [targetSpending, setTargetSpending] = useState('')
  const [totalSpending, setTotalSpending] = useState('')
  const [logo, setLogo] = useState(null)

  const [noStore, setStoreError] = useState('')
  const [noBestBuySpending, seBestBuySpendingError] = useState('')
  const [noAmazonSpending, setAmazonSpendingError] = useState('')
  const [noEbaySpending, setEbaySpendingError] = useState('')
  const [noTargetSpending, setTargetSpendingError] = useState('')
  const [noTotalSpending, setTotalSpendingError] = useState('')
  const [noLogo, setLogoError] = useState('')


  const handleBestBuyChange = e => setBestBuySpending(e.target.value)
  const handleAmazonChange = e => setAmazonSpending(e.target.value)
  const handleEbayChange = e => setEbaySpending(e.target.value)
  const handleTargetChange = e => setTargetSpending(e.target.value)
  const handleTotalChange = e => setTotalSpending(e.target.value)
  const handleLogo = e => setLogo(e.target.value)

  const handleStoreChange = e => {
    const { value, checked } = e.target
    const { types } = store
    console.log(`${value} is ${checked}`);

    if (checked) {
      setStore({
        types: [...types, value],
      })
    } else {
      setStore({
        types: types.filter(e => e !== value),
      })
    }
  }

  const summaryPost = async () => {
    let errorDetected = false

    if (bestBuySpending == '') {
      setBestBuySpending('BestBuy Spending required.')
      errorDetected = true
    } else {
      setBestBuySpending('')
    }
    if (amazonSpending == '') {
      setAmazonSpending('Amazon Spending required.')
      errorDetected = true
    } else {
      setAmazonSpending('')
    }
    if (ebaySpending == '') {
      setEbaySpending('Ebay Spending required.')
      errorDetected = true
    } else {
      setEbaySpending('')
    }
    if (targetSpending == '') {
      setTargetSpendingError('Target Spending required.')
      errorDetected = true
    } else {
      setTargetSpendingError('')
    }
    if (logo == '') {
      setLogoError('logo required.')
      errorDetected = true
    } else {
      setLogoError('')
    }
    if (store.length == 0) {
      setStoreError('Store required.')
      errorDetected = true
    } else {
      setStoreError('')
    }
    if (errorDetected) {
      alert('Error: Missing required fields. Please fill out and resubmit.')
      return
    }
  }
  const data = new FormData()
  data.append('store', store.value)
  data.append('bestBuy_spending', bestBuySpending)
  data.append('amazon_spending', amazonSpending)
  data.append('ebay_spending', ebaySpending)
  data.append('target_spending', targetSpending)
  data.append('total_spending', totalSpending)
  data.append('logo', logo)
  
  return (
    <React.Fragment>
      <div className="summary">
        <div className="store">
          <h2>{noStore}</h2>
          <h3>
            <small>Choose your Store(s)</small>
          </h3>
        </div>
        <div>
          <div className='checkbox'>
            <FormControlLabel
              control={
                <input
                  onChange={handleStoreChange}
                  value='$23,000'
                  type="checkbox"
                  name='types'
                  aria-label='amazon'
                  icon={<FiberManualRecord className="radioUnchecked" />}
                />
              }
              label='Amazon'
            />
          </div>
        </div>
        <div>
          <div className='checkbox'>
            <FormControlLabel
              control={
                <input
                  onChange={handleStoreChange}
                  value='$15,000'
                  type="checkbox"
                  name='types'
                  aria-label='bestBuy'
                  icon={<FiberManualRecord className="radioUnchecked" />}
                />
              }
              label='Best Buy'
            />
          </div>
        </div>
        <div>
          <div className='checkbox'>
            <FormControlLabel
              control={
                <input
                  onChange={handleStoreChange}
                  value='$5,000'
                  type="checkbox"
                  name='types'
                  aria-label='ebay'
                  icon={<FiberManualRecord className="radioUnchecked" />}
                />
              }
              label='Ebay'
            />
          </div>
        </div>
        <div>
          <div className='checkbox'>
            <FormControlLabel
              control={
                <input
                  onChange={handleStoreChange}
                  value='$10,000'
                  type="checkbox"
                  name='types'
                  aria-label='target'
                  icon={<FiberManualRecord className="radioUnchecked" />}
                />
              }
              label='Target'
            />
          </div>
        </div>

        <form name="Total">
          <h3>Your total spending is: ${data.store}</h3>
        </form>

      </div>
    </React.Fragment>
  )
}
export default Summary
