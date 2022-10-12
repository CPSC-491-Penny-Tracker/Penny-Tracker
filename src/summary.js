import React, { useState } from 'react'
import './summary.css'

export default Summary = () => {
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
  const [noEbaySpending, setNoEbaySpendingError] = useState('')
  const [noTargetSpending, setNoTargetSpendingError] = useState('')
  const [noTotalSpending, setNoTotalSpendingError] = useState('')
  const [noLogo, setNoLogoError] = useState('')


  const handleBestBuyChange = e => setBestBuySpending(e.target.value)
  const handleAmazonChange = e => setAmazonSpending(e.target.value)
  const handleEbayChange = e => setEbaySpending(e.target.value)
  const handleTargetChange = e => setTargetSpending(e.target.value)
  const handleTotalChange = e => setTotalSpending(e.target.value)
  const handleLogo = e => setLogo(e.target.value)
  const handleClick = index => setActiveIndex(index)
  const checkActive = (index, className) => (activeIndex === index ? className : '')

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
  }
  return (
    <React.Fragment>
      <div className='tabs'>
        <div className='tab-tab'>
          <button className={`tab ${checkActive(1, 'active')}`} onClick={() => handleClick(1)}>
            <label for='tab-1'>Planner</label>
          </button>
        </div>
        <div className='tab-tab'>
          <button className={`tab ${checkActive(2, 'active')}`} onClick={() => handleClick(2)}>
            <label for='tab-2'>Compare</label>
          </button>
        </div>
        <div className='tab-tab'>
          <button className={`tab ${checkActive(3, 'active')}`} onClick={() => handleClick(3)}>
            <label for='tab-3'>Summary</label>
          </button>
        </div>
        <div className='tab-tab'>
          <button className={`tab ${checkActive(4, 'active')}`} onClick={() => handleClick(4)}>
            Profile
          </button>
        </div>
      </div>
      <div className='panels'>
        <div className={`panel ${checkActive(1, 'active')}`}>
          <h1>Your budget plan</h1>
        </div>
        <div className={`panel ${checkActive(2, 'active')}`}>
          <p>Product prices</p>
        </div>
        <div className={`panel ${checkActive(3, 'active')}`}>
          <p>Your summary</p>
        </div>
        <div className={`panel ${checkActive(4, 'active')}`}>
          <p>Sign in</p>
        </div>
      </div>
    </React.Fragment>
  )
}
