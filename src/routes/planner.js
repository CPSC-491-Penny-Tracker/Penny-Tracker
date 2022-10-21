import React, { useState } from "react";


const Planner = () => {
  const [store, setStore] = useState('Amazon')
  const [budget, setBudget] = useState(0)
  const handleChange = (event) => {
    event.preventDefault(); 
    setBudget('')
    setStore('')
  }



  const changeStore = (newStore) => {
    //saves budget to store
    //chrome.storage.local.set({store: budget}, function(){})
    //chrome.storage.local.get([store], function(result){console.log(result.key)})
    localStorage.setItem(store, budget)
    const result = localStorage.getItem(store)
    console.log(result)
    //sets budget to default
    const bud = localStorage.getItem(newStore)
    if(bud==null)
      document.getElementById("budget").value = "";
    else
      setBudget(bud) 
    //sets store to selected store
    setStore(newStore)
  }  
  const data = new FormData()
  data.append('store', store)
  data.append('budget', budget)

  return(
    <React.Fragment>
      <div className="planner">

      <form name="store">
        <label form="store">
          Store: 
          <select name="store" value={store} onChange={(event) => changeStore(event.target.value)}>
            <option value="Amazon">Amazon</option>
            <option value="Target">Target</option>
            <option value="Ebay">Ebay</option>
            <option value="BestBuy">Best Buy</option> 
            {/*<option value="Macys">Macys</option> 
            <option value="Alibaba">Alibaba</option> */}
          </select>
        </label>
        <h3>The store is: {store}</h3>
      </form>

      <form name="budget">
        <label form="budget">
          Budget: $
          <input type="number" id="budget" name="budget" value={budget} onChange={(event) => setBudget(event.target.value)} />
        </label>
        <h3>Your budget is: {budget}</h3>
      </form>

    </div>
    </React.Fragment>
  )
};

/*class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {budget: '', store: ''};
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
  return (
    <div className="planner">
      <form name="budget">
        <label form="budget">
          Budget: $
          <input type="number" name="budget" value={this.state.budget} onChange={this.handleChange} />
        </label>
        <h3>Your budget is: {this.state.budget}</h3>
      </form>

      <form name="store">
        <label form="store">
          Store: 
          <select name="store" value={this.state.store} onChange={this.handleChange}>
            <option value="Amazon">Amazon</option>
            <option value="Walmart">Walmart</option>
            <option value="Ebay">Ebay</option>
            <option value="BestBuy">Best Buy</option> 
            <option value="Macys">Macys</option> 
            <option value="Alibaba">Alibaba</option> 
          </select>
        </label>
        <h3>The store is: {this.state.store}</h3>
      </form>
    </div>
  );
  }
}; */


export default Planner
