import React, { Component } from 'react'
import SERVER_URL from './constants/server';
import Axios from 'axios';

export default class Recommend extends Component {
    constructor(){
        super();
        this.state = {
          ticketCost: 0,
          ticketDollarCost: 0,
          ticketDollarValue: 0
        }
      }

    storeInput = (e) => {
        // update state to reflect user input
        let newState = e.target.value
        this.setState({
            [e.target.name]: newState
        })
    }

    recommend = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('serverToken');
        Axios.post(`${SERVER_URL}/points/recommend/match`, {
            mileage_program: this.props.mileage_program,
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(json => {
            let current_valuation = json.data[0].current_month / 100
            console.log('The Current Month\'s valuation is ', current_valuation, 'cents per point.')
            this.setState({
                ticketDollarValue: this.state.ticketCost * current_valuation
            })
            console.log('The dollar value from converting your points for this ticket is: $' + this.state.ticketDollarValue)
            console.log('The dollar cost for this ticket is: $' + this.state.ticketDollarCost)
            
            const new_valuation = (td, tv, tc, ) => {
                return (Number(td) - Number(tv)) / Number(tc) + current_valuation
            }
            if(new_valuation(this.state.ticketDollarCost, this.state.ticketDollarValue, this.state.ticketCost) > current_valuation) {
                console.log('You are maximizing your points by increasing the value of each point to', new_valuation(this.state.ticketDollarCost, this.state.ticketDollarValue, this.state.ticketCost), 'cents per point!')
            }
            else {
                console.log('You\'re new valuation per point is', new_valuation(this.state.ticketDollarCost, this.state.ticketDollarValue, this.state.ticketCost), 'cents. It may be best to just save those points.')
            }
            
        })
        .catch(error => {
            console.log('ERROR retreiving programs DATA', error)
        })
    }

  render() {
    return (
      <div>
        <h4>Enter costs below to see which one is better for your mileage program</h4>
        <h4>{this.props.mileage_program}</h4>
        <form onSubmit={this.recommend}>
          <div className="form-control">
            <label name="ticketCost">Enter Ticket Points Cost:</label>
            <input type="number" name="ticketCost" onChange={this.storeInput} value={this.state.ticketCost} />
          </div>
          <div className="form-control">
            <label name="ticketDollarCost">Enter Ticket Dollar Cost:</label>
            <input type="number" name="ticketDollarCost" onChange={this.storeInput} value={this.state.ticketDollarCost} />
          </div>
          <div className="form-control">
            <button type="submit">Recommend</button>
          </div>
        </form>
      </div>
    )
  }
}
