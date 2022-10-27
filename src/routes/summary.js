import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../components/components'
import { Button } from 'react-bootstrap'
import './summary.css'
import Radio from '@material-ui/core/Radio'
//import './summary.css'
const useStyles = makeStyles(styles)

const Summary = () => {
  const classes = useStyles()
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

  const handleStoreChange = e => {
    const { value, checked } = e.target
    const { types } = store
    console.log(`${value} is ${checked}`)

    if (checked) {
      setStore({
        types: [...types, value],
      })
      let total = 0
      console.log(store)
      for (let i = 0; i < store.types.length; i++) {
        console.log('index:', i)
        if (store.types[i] == 'amazon') {
          console.log('we found amazon')
          total += parseInt(amazonSpending)
        } else if (store.types[i] == 'ebay') {
          console.log('we found ebay')
          total += parseInt(ebaySpending)
        } else if (store.types[i] == 'bestbuy') {
          console.log('we found bestbuy')
          total += parseInt(bestBuySpending)
        } else if (store.types[i] == 'target') {
          console.log('we found target')
          total += parseInt(targetSpending)
        }
        //else{
        //  console.log('we found Confirmation')
        //  total += 0
        //  console.log("OUR FINAL TOTAL: ", total)
        //}
      }
      console.log('Our total is:', total)
      setTotalSpending(total)
      console.log(totalSpending)
    } else {
      setStore({
        types: types.filter(e => e !== value),
      })
    }
  }

  const summaryPost = async () => {
    let errorDetected = false
    if (store.types.length == 0) {
      setStoreError('Please select a store.')
      errorDetected = true
    } else {
      setStoreError('')
    }
    if (bestBuySpending == '') {
      seBestBuySpendingError('BestBuy Total Required.')
      setBestBuySpending('0')
      errorDetected = true
    } else {
      setBestBuySpending('')
    }
    if (amazonSpending == '') {
      setAmazonSpendingError('Amazon Total Required.')
      setAmazonSpending('0')
      errorDetected = true
    } else {
      setAmazonSpending('')
    }
    if (ebaySpending == '') {
      setEbaySpendingError('Ebay Total Required.')
      setEbaySpending('0')
      errorDetected = true
    } else {
      setEbaySpending('')
    }
    if (targetSpending == '') {
      setTargetSpendingError('Target Total Required.')
      setTargetSpending('0')
      errorDetected = true
    } else {
      setTargetSpendingError('')
    }
    if (totalSpending >= 0) {
      setTotalSpendingError('')
    } else {
      setTotalSpendingError('No Store Total was Found.')
      errorDetected = true
    }
    if (errorDetected) {
      alert('Error: Missing required fields. Please fill out and try again.')
      return
    }
  }
  const data = new FormData()
  data.append('store', store.types)
  data.append('bestbuytotal', bestBuySpending)
  data.append('amazontotal', amazonSpending)
  data.append('ebaytotal', ebaySpending)
  data.append('targettotal', targetSpending)
  data.append('total', totalSpending)

  return (
    <React.Fragment>
      <div className='summary'>
        <div className='store'>
          <h3>
            <small>Your Summary</small>
          </h3>
        </div>
        <div>
          <h2 className={classes.redText}>{noStore}</h2>
          <div className='checkbox'>
            <FormControlLabel
              control={
                <input
                  onChange={handleStoreChange}
                  value='amazon'
                  type='checkbox'
                  name='types'
                  aria-label='amazon'
                  icon={<FiberManualRecord className='radioUnchecked' />}
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
                  value='bestbuy'
                  type='checkbox'
                  name='types'
                  aria-label='bestBuy'
                  icon={<FiberManualRecord className='radioUnchecked' />}
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
                  value='ebay'
                  type='checkbox'
                  name='types'
                  aria-label='ebay'
                  icon={<FiberManualRecord className='radioUnchecked' />}
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
                  value='target'
                  type='checkbox'
                  name='types'
                  aria-label='target'
                  icon={<FiberManualRecord className='radioUnchecked' />}
                />
              }
              label='Target'
            />
          </div>
        </div>
        <div className={classes.subtitle}>
          <h2 className={classes.redText}>{noAmazonSpending}</h2>
          <h3>
            <small>Amazon Total:</small>
          </h3>
        </div>
        <TextField value={amazonSpending} onChange={handleAmazonChange} id='name' label='Total $' variant='outlined' />
        <div className={classes.subtitle}>
          <h2 className={classes.redText}>{noBestBuySpending}</h2>
          <h3>
            <small>BestBuy Total:</small>
          </h3>
        </div>
        <TextField value={bestBuySpending} onChange={handleBestBuyChange} id='name' label='Total $' variant='outlined' />
        <div className={classes.subtitle}>
          <h2 className={classes.redText}>{noEbaySpending}</h2>
          <h3>
            <small>Ebay Total:</small>
          </h3>
        </div>
        <TextField value={ebaySpending} onChange={handleEbayChange} id='name' label='Total $' variant='outlined' />
        <div className={classes.subtitle}>
          <h2 className={classes.redText}>{noTargetSpending}</h2>
          <h3>
            <small>Target Total:</small>
          </h3>
        </div>
        <TextField value={targetSpending} onChange={handleTargetChange} id='name' label='Total $' variant='outlined' />
        <div className={classes.subtitle}>
          <h2 className={classes.redText}>{noTotalSpending}</h2>
          <h3>
            <small>Total: ${totalSpending}</small>
          </h3>
        </div>
        <form name='Total'>
          <h3>
            Your total spending for {store.types + ''}: ${totalSpending}
          </h3>
        </form>
        <Button
          onClick={() => {
            summaryPost()
          }}
          variant='contained'
          size='large'
        >
          My Total
        </Button>
      </div>
    </React.Fragment>
  )
}
export default Summary
