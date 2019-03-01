import React, { Component } from 'react'

export default class Recommend extends Component {
    constructor(){
        super();
        this.state = {
          itemCost: 0,
          ticketCost: 0
        }
      }

    storeInput = (e) => {
        // update state to reflect user input
        let newState = e.target.value
        this.setState({
            [e.target.name]: newState
        })
    }

    recommend = () => {

    }

  render() {
    return (
      <div>
        <h1>Enter costs below to see which one is better</h1>
        <form onSubmit={this.recommend}>
          <div className="form-control">
            <label name="itemcost">Enter Item Cost:</label>
            <input type="number" name="itemCost" onChange={this.storeInput} value={this.state.itemCost} />
          </div>
          <div className="form-control">
            <label name="ticketCost">Enter Ticket Cost:</label>
            <input type="number" name="ticketCost" onChange={this.storeInput} value={this.state.ticketCost} />
          </div>
          <div className="form-control">
            <button type="submit">Recommend</button>
          </div>
        </form>
      </div>
    )
  }
}
